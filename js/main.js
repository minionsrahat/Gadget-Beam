//load gadget details via api
let loadGadgets = (phone) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
        .then(response => response.json())
        .then(data => displayPhones(data))
}

//Show spinner
let showSpinner = () => {
    document.getElementById('spinner').classList.remove('d-none')
    document.getElementById('spinner').classList.add('d-flex')
}

//Hide spinner
let hideSpinner = () => {
    document.getElementById('spinner').classList.remove('d-flex')
    document.getElementById('spinner').classList.add('d-none')
}

//show alert message
let showAlert = () => {
    document.getElementById('alert').classList.remove('d-none')
}


//hide alert message
let hideAlert = () => {
    document.getElementById('alert').classList.add('d-none')
}


// show view more button
let showMorebtn = () => {
    document.getElementById('show-more').classList.remove('d-none')
}


// hide view more button
let hideMorebtn = () => {
    document.getElementById('show-more').classList.add('d-none')
}



// show search title
let showSearchtitle = (searchQuery) => {
    document.getElementById('search-title').classList.remove('d-none')
    document.getElementById('search-title').innerHTML =
    `<h2 class="">
    Search Results for "${searchQuery}"
    </h2>
    <hr>`

}

// hide search title
let hideSearchtitle = () => {
    document.getElementById('search-title').classList.add('d-none')
}


//clear wrapper div and gadgetdetails div
let clear = () => {
    let wrapper = document.getElementById('wrapper')
    wrapper.textContent = "";
    document.getElementById('gadgetDetails').textContent = "";

}


//display all loaded phones details
let displayPhones = (phones) => {

    //get wrapper div
    let wrapper = document.getElementById('wrapper')


    if (phones.data.length > 0) {


        //declare counter for display only 20 phones
        let counter = 0;

        //iterate phone data
        phones.data.forEach(element => {
            counter++;
            let div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `  <div class="card shadow phone-div">
            <div class="d-flex align-items-center flex-column">
              <img src="${element.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${element.brand}</h5>
                <p class="card-text">
                ${element.phone_name}
                </p>
              </div>
            </div>
            <hr>
            <div class="text-center">
              <button type="button" onclick="gadgetDetails('${element.slug}')" class="btn btn-primary">Details</button>
            </div>
          </div>`
            if (counter <= 18) {
                //append phone data to wrapper div
                wrapper.appendChild(div)
            }

            else {

                //hide phones data
                div.classList.add('hide-div')
                div.classList.add('d-none')
                wrapper.appendChild(div)
            }

        });

        if (counter > 18) {

            //display view more button
            showMorebtn()
        }
    }

    else {

        //display alert
        showAlert()
    }

    //hide spinner
    hideSpinner()
}

const showMoreResults = () => {

    //hide view more button
    hideMorebtn()


    //show all hidden phone details
    const hideDiv = document.querySelectorAll('.hide-div');
    Array.from(hideDiv).forEach(element => {
        element.classList.remove('d-none')
    });

}


//load single gadget details
const gadgetDetails = (slug) => {
    url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showgadgetDetails(data))

}



//show single gadget details
const showgadgetDetails = (object) => {
    const gadgetDetailsDiv = document.getElementById('gadgetDetails');
    if (object.status) {
        const sensor = object.data.mainFeatures.sensors?.join(`,\n`);

        gadgetDetailsDiv.innerHTML = `
        <div class="intro-div d-flex flex-column align-items-center p-3">
                <img src="${object.data.image}" alt="Not Found">
                <h4>Model : ${object.data.name}</h4>
                <h4>Brand: ${object.data.brand}</h4>
                <h4>Release Date: ${object.data?.releaseDate ? object.data?.releaseDate : 'No Release Date Found'}</h4>
            </div>
            <table class="table table-striped table-hover w-75">
                    <th class="text-center" colspan="2">
                        Main Feature 
                    </th>
                    <tr>
                        <td class="w-25">Chip Set</td>
                        <td class="w-75">${object.data.mainFeatures.chipSet}</td>
                    </tr>
                    <tr >
                        <td class="w-25">Display Size</td>
                        <td class="w-75">${object.data.mainFeatures.displaySize}</td>
                    </tr>
                    <tr >
                        <td class="w-25">Memory</td>
                        <td class="w-75">${object.data.mainFeatures.memory}</td>
                    </tr>
                    <tr class='w-100'>
                        <td class="w-25">Sensors</td>
                        <td class="w-75 sensors">${sensor}</td>
                    </tr>
                    <tr >
                        <td class="w-25">Storage</td>
                        <td class="w-75">${object.data.mainFeatures.memory}</td>
                    </tr>
                </table>
                <table class="table table-striped table-hover w-75">
                <th class="text-center" colspan="2">
                    Others 
                </th>
                <tr >
                    <td class="w-25">Bluetooth</td>
                    <td class="w-75">${object.data.others?.Bluetooth ? object.data.others?.Bluetooth : 'Info Not Available'}</td>
                </tr>
                <tr >
                    <td class="w-25">GPS</td>
                    <td class="w-75">${object.data.others?.GPS ? object.data.others?.GPS : 'Info Not Available'}</td>
                </tr>
                <tr >
                    <td class="w-25">NFC</td>
                    <td class="w-75">${object.data.others?.NFC ? object.data.others?.NFC : 'Info Not Available'}</td>
                </tr>
                <tr >
                    <td class="w-25">Radio</td>
                    <td class="w-75">${object.data.others?.Radio ? object.data.others?.Radio : 'Info Not Available'}</td>
                </tr>
                <tr >
                    <td class="w-25">USB</td>
                    <td class="w-75">${object.data.others?.USB ? object.data.others?.USB : 'Info Not Available'}</td>
                </tr>
                <tr >
                    <td class="w-25">WLAN</td>
                    <td class="w-75">${object.data.others?.WLAN ? object.data.others?.WLAN : 'Info Not Available'}</td>
                </tr>
            </table>`;
        document.getElementById("gadgetDetails").scrollIntoView({ behavior: 'smooth' });
    }
}



// add event listener to search button
document.getElementById('button-search').addEventListener('click', () => {
    let searchQuery = document.getElementById('search-text').value.trim()

    //validate search query is valid or not
    if (searchQuery) {

        //hide alert msg and show spinner
        showSearchtitle(searchQuery)
        hideAlert();
        clear();
        hideMorebtn();
        showSpinner()

        //load all search results...
        loadGadgets(searchQuery)

        //clear input field
        document.getElementById('search-text').value=""
    }
    else {
        document.getElementById('search-text').value = ""
        alert("Please Enter Valid Search Query")
    }
})




//hide alert,view more button and clear content of wrapper div
hideAlert();
clear();
hideMorebtn();