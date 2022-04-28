import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  debugger;
  //Updates the DOM with the cities
  cities.forEach((key) => { 
    debugger;
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
 
}
// console.log("From init()", init());

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const res = await fetch('http://3.110.34.3:8082/cities').catch(error => {
    console.error('Error:', error);
  });
  let items = await res.json();
  return items;
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement('div');
  container.className = "col-12 col-sm-6 col-lg-3 mb4";
  let innerHTML =`<a href="#">
              <div class="text-center tile-text">
                <h5>${city}</h5> 
                <p>${description}</p>
              </div>
 <img src = ${image} class='img-response img-fluid rounded h-100 pb-4'></a>`;
  container.innerHTML = innerHTML;
  document.getElementById('data').appendChild(container);
}

export { init, fetchCities, addCityToDOM };

