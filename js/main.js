let loadFoods = (phone) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
        .then(response => response.json())
        .then(data => displayPhones(data))
}


let showSpinner=()=>{
    document.getElementById('spinner').classList.remove('d-none')
    document.getElementById('spinner').classList.add('d-flex')
}


let hideSpinner=()=>{
    document.getElementById('spinner').classList.remove('d-flex')
    document.getElementById('spinner').classList.add('d-none')
}

let showAlert=()=>{
    document.getElementById('alert').classList.remove('d-none')
}

let hideAlert=()=>{
    document.getElementById('alert').classList.add('d-none')
}
 let clear=()=>{
    let wrapper = document.getElementById('wrapper')
    wrapper.textContent = ""
 }


let displayPhones = (phones) => {
    let wrapper = document.getElementById('wrapper')
    // console.log(phones.data);
    if (phones.data.length>0) {
        phones.data.forEach(element => {
            let div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML =`  <div class="card phone-div">
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
            wrapper.appendChild(div)
        });

    }

    else{
       showAlert()
    }
    hideSpinner()
}
document.getElementById('button-search').addEventListener('click', () => {
    hideAlert();
    clear();
    let searchQuery = document.getElementById('search-text').value
    if (searchQuery != "") {
        showSpinner()
        loadFoods(searchQuery)
    }
})