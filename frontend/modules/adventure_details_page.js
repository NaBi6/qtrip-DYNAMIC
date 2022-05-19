import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // debugger;
  const urlParams = new URLSearchParams(search);
  //storing the urlParms and rendering the data through adventureId
  const adventureId = urlParams.get("adventure");
  return adventureId;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // debugger;
  try {
    //fetching the data from backend 
  const res = await fetch(config.backendEndpoint+`/adventures/detail/?adventure=${adventureId}`);
  let advs = await res.json();
  // console.log(advs);
  return advs;

  //try and catch, if data is empty throw the error and return null message.
  }catch(err){
    console.log('Error:', err);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // debugger;
    document.getElementById('adventure-name').innerHTML = adventure.name;
    document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;
    //looping the image Array 
    adventure.images.map((image) => {
      let ele = document.createElement('div');
      ele.className = "col-lg-8";
      ele.innerHTML = `<img src="${image}" alt="Not_Found" srcset="" class="activity-card-image pb-3 pb-md-0" />`;
      document.getElementById("photo-gallery").appendChild(ele);
    });
    document.getElementById('adventure-content').innerHTML = adventure.content;
  
  //HTML is already designed, just inserting the values using DOM
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // debugger;
  //using the bootstrap carousel classes
  document.getElementById('photo-gallery').innerHTML =`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
//image index to be set active, added id="carousel-inner" to line70 
images.map((image,idx)=>{
  let ele = document.createElement('div');
  ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
  ele.innerHTML = `<img src="${image}" alt="Not_Found" srcset="" class="activity-card-image pb-3 pb-md-0" />`;
  //used the id="carousel-inner"
  document.getElementById("carousel-inner").appendChild(ele); 
});
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available){
    document.getElementById('reservation-panel-available').style.display = "block"; //shown
    document.getElementById('reservation-panel-sold-out').style.display = "none"; //hidden
    document.getElementById('reservation-person-cost').innerHTML = adventure.costPerHead;
  }else{
    document.getElementById('reservation-panel-sold-out').style.display = "block";
    document.getElementById ('reservation-panel-available').style.display = "none";
  }
  // console.log(adventure);
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = persons*adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";

    let formEle = form.elements;

    let bodyString = JSON.stringify({
      name: formEle["name"].value,
      date: formEle["date"].value,
      person: formEle["person"].value,
      adventure: adventure.id

    });
    try{
      let res = fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json"
        },
      });
      if(!res.ok){
        alert("Success!");
        window.location.reload();
      }else{
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    }
    catch(err){
      console.log(err);
      alert("Failed - fetch call resulted in error");
    }
  });
  
}


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  } 
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
