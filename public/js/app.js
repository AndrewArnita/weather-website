console.log("Client side js is loaded successfully!")

//to fetch data:
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector("form")
const searchElement = document.querySelector("input")

//to display on the same screen rather than on the console:
const messageOne = document.querySelector("#p2")
const messageTwo = document.querySelector("#p3")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault() //prevent refreshing automatically

    if(searchElement.value.length === 0){
        messageOne.textContent = "Location cannot be empty!"
    }
    else{
    const location = searchElement.value

    messageOne.textContent = "Loading weather..."
    messageTwo.textContent = ""
    fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = "Location: " + data.address
            messageTwo.textContent = "Forecast: " + data.data
        }
    })
    })
    }

})