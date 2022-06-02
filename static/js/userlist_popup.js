const button = document.querySelector('#button')
const ajouter = document.querySelector('#ajouter')
const popup = document.querySelector('#popup')
const closebtn = document.querySelector('div#closebtn')
// const url = 'http://127.0.0.1:5000/api/users/'



// the data to retrieve form the form
const name        = document.getElementById("name")
const email       = document.getElementById("email")
const username    = document.getElementById("username")
const website     = document.getElementById("website")
const password    = document.getElementById("password")
const phone       = document.getElementById("phone")
const nameCompany = document.getElementById("nameCompany")
const catchPhrase = document.getElementById("catchPhrase")
const bs          = document.getElementById("bs")
const street      = document.getElementById("street")
const suite       = document.getElementById("suite")
const city        = document.getElementById("city")
const zipcode     = document.getElementById("zipcode")
const lat         = document.getElementById("lat")
const lng         = document.getElementById("lng")



ajouter.addEventListener("click",function(){
  popup.style.top = "10px"
})

closebtn.addEventListener("click", ()=>{
  popup.style.top = "-700px"
})

popup.addEventListener('blur', ()=>{
  popup.style.top = "-700px"
})
// var url = 'http://127.0.0.1:5000/api/users/'



button.addEventListener('click', async (e)=>{
  console.log(name)
        form        = {
          "address": {
                  "city":city.value,
                  "geo": {
                      "lat":lat.value,
                      "lng": lng.value
              },
              "street": street.value,
              "suite": suite.value,
              "zipcode":zipcode.value
          },
          "company": {
              "bs":bs.value,
              "catchPhrase": catchPhrase.value,
              "name":nameCompany.value
          },
          "email": email.value,
          "name": name.value,
          "phone": phone.value ,
          "username": username.value,
          "website":website.value
      }
      console.log(form)
      e.preventDefault()

      await fetch(url + '?token=' + user.token, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-type": "application/json charset=UTF-8",
                "Access-Control-Allow-Origin" : "*"
            }
        })
})
