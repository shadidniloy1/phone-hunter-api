const loadPhone = async (searchText='iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)
    // 1. where to add the thing
    const phoneContainer = document.getElementById('phone-container');
    //clear container bedore adding new search
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    // display show all button if items are more than 12
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        // 3. inner html
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title justify-center">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        //4. append child
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading dots in page
    toggleLoadingDots(false);
}

//handle search button
const searchHandle = (isShowAll) => {
    toggleLoadingDots(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingDots = (isLoading) => {
    const loadingDots = document.getElementById('loading-dots');
    if (isLoading) {
        loadingDots.classList.remove('hidden');
    }
    else {
        loadingDots.classList.add('hidden');
    }
}

// handle show details button
const handleShowDetails = async (id) => {
    // console.log('clicked', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
        <div class="flex flex-col items-center my-8 bg-slate-100">
        <img src="${phone.image}" alt="" />
        </div>
        <p class="font-bold text-2xl">${phone.name}</p>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <h3><span class="text-lg font-bold">Storage:</span>${phone?.mainFeatures?.storage}</h3>
        <h3><span class="text-lg font-bold">Display Size:</span>${phone?.mainFeatures?.displaySize
        }</h3>
        <h3><span class="text-lg font-bold">Chipset:</span>${phone?.mainFeatures?.chipSet
        }</h3>
        <h3><span class="text-lg font-bold">Memory
        :</span>${phone?.mainFeatures?.memory
        }</h3>
        <h3><span class="text-lg font-bold">Brand:</span>${phone?.brand}</h3>

    `

    // show the modal
    show_details_modal.showModal();
}

// handle show all
const handleShowAll = () => {
    searchHandle(true);
}

loadPhone();