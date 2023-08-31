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
    //show the modal
    show_details_modal.showModal(); 
    console.log(info);
    // const modalContainer = document.getElementById('modal-container');
    // const modal = document.createElement('div');
    // modal.innerHTML =`
    //         <dialog id="show_details_modal" class="modal modal-bottom sm:modal-middle">
    //             <form method="dialog" class="modal-box">
    //                 <figure class="px-5 pt-5 text-center">
    //                     <img src="${data.image}" alt="Mobile Phone" class="rounded-xl" />
    //                 </figure>
    //                 <h3 class="font-bold text-2xl">${data.name}</h3>
    //                 <p class="py-3 text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    //                 <p class="text-gray-700"><span class="text-black font-bold">Storage: </span>${data.mainFeatures.storage}</p>
    //                 <p class="text-gray-700"><span class="text-black font-bold">Display Size: </span>${data.mainFeatures.displaySize}</p>
    //                 <p class="text-gray-700"><span class="text-black font-bold">Chipset: </span>${data.mainFeatures.chipSet}</p>
    //                 <p class="text-gray-700"><span class="text-black font-bold">Memory: </span>${data.mainFeatures.memory}</p>
    //                 <p class="text-gray-700"><span class="text-black font-bold">Slug: </span>${data.slug}</p>
    //                 <p class="text-gray-700"><span class="text-black font-bold">Release Date: </span>${data.releaseDate}</p>
    //                 <p class="text-gray-700"><span class="text-black font-bold">Brand: </span>${data.brand}</p>
    //                 <p class="text-gray-700"><span class="text-black font-bold">GPS: </span>${data.others.GPS}</p>
    //                 <div class="modal-action">
    //                     <button class="btn bg-red-500 text-white font-semibold">Close</button>
    //                 </div>
    //             </form>
    //         </dialog>
    // `;
    // modalContainer.appendChild(modal);


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