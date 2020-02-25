const request = require ('request')

const foreCast =(lat,long,callback)=>
{
    const url="https://api.darksky.net/forecast/5de0b09c79c5d19f18484fdfb5c58c56/"+lat+","+long+'?limit=1'
    request({url,json:true},(error,response)=>
    {
       if(error)
       {
         callback('Internet Problem',undefined)
       }
       else if (response.body.error)
       {
           callback('Invalid Address',undefined)
       }
       else
       {
         const data={
             summary:response.body.daily.data[0].summary,
             rainChance:response.body.daily.data[0].precipProbability,
             visibility:response.body.currently.visibility,
             temperature:response.body.currently.temperature,
             windSpeed:response.body.currently.windSpeed
         }
           
         callback(undefined,data)
       }
    })
} 

module.exports= foreCast