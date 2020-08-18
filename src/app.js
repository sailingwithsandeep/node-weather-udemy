const express = require('express');
const app = express()
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { error } = require('console');


//define paths
const publicDirectoryPath = path.join(__dirname,'../assets')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000
//Handlebars and static
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup directory
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'SGKsl'
    })
})
app.get('/help',(req,res)=>{
     res.render('help',{
         message:'dgkldgkdslkdlkgldgkldkgldgkdlgdlskxvkxnljlrkfdklvjlskd',
         title:'Help Page'
     })
})

app.get('/about',(req,res)=>{
     res.render('about',{
         title:'About Us'
     })
 })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide search term!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'Rajkot',
    //     location:'Rajkot',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term!'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormessage:'Help Article Not Found Please Try Again!',
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errormessage:'Page Not Found!'
    })
})
 


app.listen(port ,()=>{
    console.log('Server is up!');
})