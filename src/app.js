const express = require("express")
const path = require("path")
const hbs = require("hbs")
const requestWeather = require("./utils/request-weather.js")

//express documentation at expressjs.com
const app = express()
//open website on: heroku website or localhost:3000
const port = process.env.PORT || 3000

//Define path for Express config:
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//Set up static directory to serve:
app.use(express.static(publicDir))

//Setup handlebars engine and views location:
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)

//index
app.get("/", (req, res) => {
    res.render("index",{
        smalltitle: "Weather",
        title: "Weather App",
        name: "Andrew Arnita",
        age: 21,
    }) //render our views .hbs files
})

//about
app.get("/about", (req, res) => {
    res.render("about",{
        smalltitle: "About",
        title: "About",
        name: "Andrew Arnita",
        parag: "Yes this me there, what's up?"
    }) 
})

//help
app.get("/help", (req, res) => {
    res.render("help",{
        smalltitle: "Help",
        title: "Help!",
        name: "Andrew Arnita",
        parag: "Yo, if you need any help just call me bro!"
    })
})

app.get("/products", (req, res) => {
    if(!req.query.search){
        res.send({
            error: "You should provide a search!"
        })
    }else{
    res.send({
        products: []
    })
}
})

//weather:
app.get("/weather", (req, res) => {
    if(!req.query.address){
        res.send({
            error: "You haven't search for any location yet!"
        })
    }else{
        requestWeather(req.query.address, (error, data) => {
            if(error){
                res.send({
                    Error: error
            })
            }else{
                res.send({
                    address: req.query.address.charAt(0).toUpperCase() + req.query.address.slice(1),
                    data: data
            })
            }
        })
    }
})

app.get("/help/*", (req, res) => {
    res.render("404page",{
        smalltitle: "404",
        title: "Error 404",
        error: "Help Arcticle Not Found!"
    })
})

//everything else give me an error 404 page: must always be at the end
app.get("*", (req, res) => {
    res.render("404page",{
        smalltitle: "404",
        title: "Error 404",
        error: "Page Not Found!"
    })
})

//listen to a specific port on local host or heroku:
app.listen(port, () => {
    console.log("Server is up on port " + port)
})

