import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // debugger;
  //Updates the DOM with the cities
  cities.forEach((key) => { 
    // debugger;
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
 
}
// console.log("From init()", init());

//Implementation of fetch call

async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const res = await fetch(`${config.backendEndpoint}/cities`);
    let cities = await res.json();
    return cities;
  }
  catch(err){
    console.log('Error:', err);
    return null;
  }
 
}



//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement('div');
  container.className = "col-12 col-sm-6 col-lg-3 mb4";
  let innerHTML =`<a href="adventures/?city=london" id='london'>
              <div class="text-center tile-text">
                <h5>${city}</h5> 
                <p>${description}</p>
              </div>
 <img src = ${image} class='img-response img-fluid rounded h-100 pb-4'></a>`;
  container.innerHTML = innerHTML;
  document.getElementById('data').appendChild(container);
}

export { init, fetchCities, addCityToDOM };

