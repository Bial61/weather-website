const request = require ('request')

const foreCast =(lat,long,callback)=>
{
    const url="https://api.darksky.net/forecast/5de0b09c79c5d19f18484fdfb5c58c56/"+lat+","+long
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
         const data= `${response.body.daily.data[0].summary}
                     There is ${response.body.daily.data[0].precipProbability} chance of rain`  
         callback(undefined,data)
       }
    })
} 

module.exports= foreCast