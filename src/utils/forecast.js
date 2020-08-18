const request = require('request');
const forecast =(latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=042a3d6be8e12bbda9d861b960fcb4c2&query='+ latitude +','+ longitude +'&units=m'
    request({ url,json:true },(error,{body})=>{
        if(error){
            callback('Something went wrong with weatherstack !',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)    
        }
        else{
            callback(undefined,"\nStatus: "+body.current.weather_descriptions[0]+ "\nIt is currently "+body.current.temperature+" degrees out. There is a  "+body.current.precip+"% chance of rain.")
        }
    
    })
}
module.exports = forecast