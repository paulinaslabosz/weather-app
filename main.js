const cityName = document.querySelector('.city-name');
const input = document.querySelector('input');
const button = document.querySelector('button');
const warn = document.querySelector('.warning');
const image = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')

const link = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&appid=ff66fa752296c3ea3f5605e8f62c6086'
const metric = '&units=metric'


let city 
let url



const getWeather = () =>
{
 city = (!input.value) ? 'New York' : input.value;
  url = link + city + key + metric
 
 axios.get(url) 
 .then (res =>{
         const temp = Math.floor(res.data.main.temp);
     const hum = res.data.main.humidity;
     const status = Object.assign({}, ...res.data.weather);
     

     cityName.textContent = res.data.name;
     temperature.textContent = temp + '°C';
     humidity.textContent = hum + '%';
     weather.textContent = status.main;

   
     warn.textContent = ""

     if (status.id >= 200 && status.id < 300) {
         image.setAttribute('src', 'images/thunderstorm.png')
     } else if (status.id >= 300 && status.id < 500) {
        image.setAttribute('src', 'images/drizzle.png')
     } else if (status.id >= 500 && status.id < 600) {
        image.setAttribute('src', 'images/rain.png')
     } else if (status.id >= 600 && status.id < 700) {
        image.setAttribute('src', 'images/ice.png')
     } else if (status.id >= 701 && status.id < 800) {
        image.setAttribute('src', 'images/fog.png')
     } else if (status.id === 800) {
        image.setAttribute('src', 'images/sun.png')
     } else if (status.id >= 801 && status.id < 805) {
        image.setAttribute('src', 'images/cloud.png')
     } else {
         image.setAttribute('src', 'images/unknown.png')
     }

    })
.catch(err => {
    warn.textContent = "Wprowadź poprawną wartość"
    
})

input.value = ""
}


const checkEnter = (e) => {
    if(e.key === 'Enter') {
        getWeather()
    }
}




getWeather()

button.addEventListener('click', getWeather)
input.addEventListener('keyup', checkEnter);