const request = require ('request')

const geoCode = (location,callback) =>
{

    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ location+".json?access_token=pk.eyJ1IjoiYmlsYWw2MSIsImEiOiJjazR6NXFoOW4wNzc2M2xtNWNmdGlsZmE0In0.vfu4tSIJiNibpegMTxENxA"

    request({url,json:true},(error,res)=>
    {
        if(error)
        {
            callback('Internet Problem',undefined)
        }
        else if(res.body.message)
        {
            callback('Address Not Found',undefined)

        }
        else if (res.body.features.length === 0)
        {
            callback('Address Not Found',undefined)
        }
        else
        {
            data=
            {
               latitude:res.body.features[0].center[1],
               longitude:res.body.features[0].center[0],
               place_name:res.body.features[0].place_name 
            }
           callback(undefined,data)
        }
    })
}

module.exports= geoCode