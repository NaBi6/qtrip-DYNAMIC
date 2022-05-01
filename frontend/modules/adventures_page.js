import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  // const url = new URL('http://13.235.110.70:8081/frontend/pages/adventures/?city=bengaluru');
  const place = new URLSearchParams('?city=london');
  // let city = place.get('city');
  // console.log(place.get("city"))
  return place.get('city');

}


//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  const res = await fetch(`${config.backendEndpoint}/adventures/?city=bengaluru`);
  let places = await res.json();
  // console.log(res)
  
  if(!res.ok){
    throw new Error(`HTTP error: ${res.status}`);
  }
    return places;
    console.log(places)
  }catch(err) {
    console.log('Error:', err);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
   const data = document.getElementById('data');
   adventures.forEach((e)=> {
     const div = document.createElement('div');
     div.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-4");
     div.innerHTML = `<a href="detail/?adventure=${e.id}" id="${e.id}">
     <div class="activity-card">
         <img src="${e.image}" alt="${e.name}" class="img-responsive">
         <div class="category-banner">${e.category}</div>
         <div class="card-text-container text-md-center w-100 mt-3">
             <div class="d-block d-md-flex justify-content-between flex-wrap px-2">
             <h5 class="text-left">${e.name}</h5>
             <p>₹${e.costPerHead}</p>
           </div>
           <div class="d-block d-md-flex justify-content-between flex-wrap px-2">
               <h5 class="text-left">Duration</h5>
               <p>${e.duration} Hours</p>
            </div>
            </div> 
            </div>
          </div>       
          </div>
          </a>
          `
     data.appendChild(div);
    //  console.log(e);
   })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
