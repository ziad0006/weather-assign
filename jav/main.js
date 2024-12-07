getResponse("cairo");

var searchInput = document.getElementById("searchInput");

var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var d;

searchInput.addEventListener("input", function () {
    var text = searchInput.value;

    getResponse(text);
});


async function getResponse(x = `cairo`) {
    var response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=b16e61b22a194b50b7e134412240712&q=${x}&days=3`
    );

    if (response.ok) {
        var data = await response.json();


        displayCurrent(data);
        displayForecast(data.forecast.forecastday);
    }
}


function displayCurrent(data) {
    var cartoona = ``;
    d = new Date(data.current.last_updated);



    cartoona = `<div class="col-md-4 ">
            <div class="card-header forecast-haeder p-2 d-flex justify-content-between">
                <span>${days[d.getDay()]}</span>
                <span>${d.getDate() + month[d.getMonth()]}</span>
            </div>
            <div class="card-body py-4 px-3">
                <div class="location">
                ${data.location.name}
                </div>
              
                <div class="number">
                    ${data.current.temp_c}<sup>o</sup>c <a href=""><img src="http:${data.current.condition.icon}" alt=""></a>
                </div>
                <div class="text text-info">${data.current.condition.text}</div>
            </div>
            <div class="d-flex gap-3 icon ps-3 pb-4 ">
                <span>  <i class="fa-solid fa-umbrella me-1"></i>20%</span>
                <small>  <i class="fa-solid fa-wind me-1"></i> 18km</small>
                <span>  <i class="fa-regular fa-compass me-1"></i> East</span>
              </div>
           </div>
`;

    document.getElementById("row-Data").innerHTML = cartoona;
}

function displayForecast(data) {
    var cartone = "";
    for (let i = 1; i < data.length; i++) {
        cartone += `
      <div class="col-md-4 text-center ">
            <div class="card-header forecast-haeder p-2 d-flex justify-content-center">
                <span>${days[new Date(data[i].date).getDay()]}</span>
               
            </div>
            <div class="card-body py-4 px-3 ">
                  <div> <a href=""><img src="https:${data[i].day.condition.icon}" alt=""></a></div>
                <div class="fs-3">
                   ${data[i].day.maxtemp_c}<sup>o</sup>c
                </div>
                <div>${data[i].day.mintemp_c}<sup>o</sup>c</div>
                <div class="text text-info">${data[i].day.condition.text}</div>
            </div>
            
           </div>
     
    
    `;
    }
    document.getElementById("row-Data").innerHTML += cartone;
}
