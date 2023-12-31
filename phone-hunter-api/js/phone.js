const loadphn = async (searchText = 'iPhone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhn(phones, isShowAll);
}
const displayPhn = (phones, isShowAll) => {
    // console.log(phones);

    //1.get the id
    const phoneContainer = document.getElementById('phn-container');

    //clear phone container cards before adding new cards
    phoneContainer.textContent = "";

    //condition (display show all button id there is more than 12 phones)
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    //display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

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
                <button class="cmn-btn" onclick="handleShowDetails('${phone.slug}')">Show Details</button>
            </div>
        </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });
    //hide loading spinner
    toggleLoadingSpinner(false);
}

//
const handleShowDetails = async (id) => {
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const detail = data.data;
    showPhoneDetails(detail);
}
const showPhoneDetails = (info) => {
    console.log(info);
    const modalDetailContainer = document.getElementById('modal-detail-container');
    modalDetailContainer.innerHTML = `
    <figure class="px-36">
    <img src="${info.image}" alt="Mobile Phone" class="rounded-sm" />
    </figure>
    <h3 class="font-bold text-3xl">${info.name}</h3>
    <p class="py-3 text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="text-gray-700"><span class="text-black font-bold">Storage: </span>${info?.mainFeatures?.storage}</p>
    <p class="text-gray-700"><span class="text-black font-bold">Display Size: </span>${info?.mainFeatures?.displaySize}</p>
    <p class="text-gray-700"><span class="text-black font-bold">Chipset: </span>${info?.mainFeatures?.chipSet}</p>
    <p class="text-gray-700"><span class="text-black font-bold">Memory: </span>${info?.mainFeatures?.memory}</p>
    <p class="text-gray-700"><span class="text-black font-bold">Slug: </span>${info.slug}</p>
    <p class="text-gray-700"><span class="text-black font-bold">Release Date: </span>${info.releaseDate}</p>
    <p class="text-gray-700"><span class="text-black font-bold">Brand: </span>${info.brand}</p>
    <p class="text-gray-700"><span class="text-black font-bold">GPS: </span>${info.others?.GPS}</p>
    `
    //show the modal
    show_details_modal.showModal();
}

//handle search button
const handleSearch = (isShowAll) => {
    //show loading spinner
    toggleLoadingSpinner(true);

    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadphn(searchText, isShowAll);
    console.log(searchText);
}
//loading spinner
const toggleLoadingSpinner = (isLoading) =>{
    const spinner = document.getElementById("spinner");
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}

//handle show all
const handleShowAll = () => {
    handleSearch(true);
}
loadphn();