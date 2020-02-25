const path = require('path')
const express = require('express')
const hbs= require ('hbs')
const geoCode =require('../src/geoCode')
const foreCast =require('../src/foreCast')


const app = express()
const port = process.env.PORT || 3000

//set path of views and static assests
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname,'../templates/partials') 

//Setup for handelbars engine and views
app.set('views', viewsPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

//Use static assests like css,client side js, images
app.use(express.static(publicDirectoryPath))

const testObj=
{
    title: 'Weather',
    name: 'Faizan Ali Gujjar @Next Level Developer'

}


app.get('', (req, res) => {
    res.render('index',testObj)
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Faizan Ali Gujjar @Next Level Developer '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Faizan Ali Gujjar @Next Level Developer '
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address)
    {
        return res.send({
            error:'You must provide an address'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,place_name}={})=>
    {
       if(error)
       {
           return res.send({error})
       }
     foreCast(latitude,longitude,(error,data)=>
     {
        if(error)
        {
            return res.send({error})
        }
        
        res.send({data,place_name})

     })
         
    })
   
})

app.get('/help/*', (req, res)=>{
    res.render('404',
    {
      title:'404', 
      errorMessage:'Article Not Found',
      name:'Faizan Ali Gujjar @Next Level Developer '
    })
});


app.get('*', (req, res)=>{
    res.render('404',
    {
      title:'404',
      errorMessage:'Page not found',
      name:'Faizan Ali Gujjar @Next Level Developer '
  
    })
});

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})