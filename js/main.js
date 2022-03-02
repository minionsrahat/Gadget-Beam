let loadFoods = (phone) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
        .then(response => response.json())
        .then(data => displayPhones(data))
}


let showSpinner = () => {
    document.getElementById('spinner').classList.remove('d-none')
    document.getElementById('spinner').classList.add('d-flex')
}

let hideSpinner = () => {
    document.getElementById('spinner').classList.remove('d-flex')
    document.getElementById('spinner').classList.add('d-none')
}

let showAlert = () => {
    document.getElementById('alert').classList.remove('d-none')
}

let hideAlert = () => {
    document.getElementById('alert').classList.add('d-none')
}

let showMorebtn= () => {
    document.getElementById('show-more').classList.remove('d-none')
}

let hideMorebtn = () => {
    document.getElementById('show-more').classList.add('d-none')
}

let clear = () => {
    let wrapper = document.getElementById('wrapper')
    wrapper.textContent = "";
    document.getElementById('gadgetDetails').textContent="";

}


let displayPhones = (phones) => {
    let wrapper = document.getElementById('wrapper')
    if (phones.data.length > 0) {
        console.log(phones.data[20]);
        let counter=0;
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
          if(counter<=20)
          {
            wrapper.appendChild(div)
          }
         
          else{
            div.classList.add('hide-div')
            div.classList.add('d-none')
            wrapper.appendChild(div)
          }

        });

        if(counter>20){
         showMorebtn()
        }
    }

    else {
        showAlert()
    }
    hideSpinner()
}

const showMoreResults=()=>{
    hideMorebtn()
    console.log('hey');
    const hideDiv=document.querySelectorAll('.hide-div');
    Array.from(hideDiv).forEach(element => {
        element.classList.remove('d-none')
    });

}

document.getElementById('button-search').addEventListener('click', () => {
    hideAlert();
    clear();
    hideMorebtn();
    let searchQuery = document.getElementById('search-text').value
    if (searchQuery != "") {
        showSpinner()
        loadFoods(searchQuery)
    }
})





const gadgetDetails = (slug) => {
    url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showgadgetDetails(data))

}
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

hideMorebtn()