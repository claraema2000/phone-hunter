const loadphn = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhn(phones);
}
const displayPhn = phones => {
    // console.log(phones);

    //1.get the id
    const phoneContainer = document.getElementById('phn-container');

    //clear phone container cards before adding new cards
    phoneContainer.textContent = "";

    //condition (display show all button id there is more than 12 phones)
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    //display only first 12 phones
    phones = phones.slice(0, 12);

    //forEach loop
    phones.forEach(phone => {
        // console.log(phone)

        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;

        //3. set innerHTML
        phoneCard.innerHTML = `
        <figure class="px-7 pt-7">
            <img src="${phone.image}" alt="Mobile Phone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p class="text-slate-500">There are many variations of passages of available, but the majority have suffered</p>
            <h2 class="card-title">$999</h2>
            <div class="card-actions">
                <button class="cmn-btn">Show Details</button>
            </div>
        </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });
}
//handle search button
const handleSearch = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadphn(searchText);
    console.log(searchText);
    
}
// loadphn();