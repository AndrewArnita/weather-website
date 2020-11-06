const request = require("request")

const requestWeather = (address, callback) => {
   const url = "https://api.weatherapi.com/v1/current.json?key=e9d18f1507ba42a09fa161727200311&q="+ address +"&lang=en"

   request({ url, json: true}, (error, {body}) => { //{ body } is a destructuring method for less code, ex: response.body.error is now body.error
    if(error){
        callback("Unable to connect to Weather API, check your Internet Connection", undefined)
    }
    else if(body.error){
        callback("Unable to find your requested location", undefined)
    }
    else{
        callback(undefined, body.current.condition.text +" today in " + address.charAt(0).toUpperCase() + address.slice(1) + ", " + body.location.country + ". The temperature is " + body.current.temp_c + "°C. There is a " + body.current.precip_mm + "% chance of raining.")
    }
})
}

module.exports = requestWeather
