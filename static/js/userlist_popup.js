var signin = document.getElementById("signin")
const button = document.querySelector('#button')
document.querySelector("#ajouter").addEventListener("click",function(){

   document.querySelector(".popup").classList.add("active")
   cliquer(signin)

   let butn = document.getElementById("signin")
   butn.addEventListener("click", function(){
       let input = document.getElementById("name")
       console.log("input",input.value)
   })


 })
 document.querySelector(".popup .close-btn").addEventListener("click",function(){
     document.querySelector(".popup").classList.remove("active")
 })


// var url = 'http://127.0.0.1:5000/api/users/'

button.addEventListener('click', (e) => {
        //console.log("hey")
        name        = document.getElementById("name")
        email       = document.getElementById("email")
        username    = document.getElementById("username")
        website     = document.getElementById("website")
        password    = document.getElementById("password")
        phone       = document.getElementById("phone")
        nameCompany = document.getElementById("nameCompany")
        catchPhrase = document.getElementById("catchPhrase")
        bs          = document.getElementById("bs")
        street      = document.getElementById("street")
        suite       = document.getElementById("suite")
        city        = document.getElementById("city")
        zipcode     = document.getElementById("zipcode")
        lat         = document.getElementById("lat")
        lng         = document.getElementById("lng")
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
          "name":name.value,
          "phone":phone.value ,
          "username": username.value,
          "website":website.value
      }
    //     fetch('', {
    //         method: "POST",
    //         body: JSON.stringify(form),
    //         headers: {
    //             "Content-type": "application/json charset=UTF-8"
    //         }
    //     })
    // })
})
