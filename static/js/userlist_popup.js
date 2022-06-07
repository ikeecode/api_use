const button  = document.querySelector('#button')
const ajouter = document.querySelector('#ajouter')
const popup   = document.querySelector('#popup')
const body    = document.querySelector('#body')
const closebtn = document.querySelector('div#closebtn')
// const url = 'http://127.0.0.1:5000/api/users/'
const h2    = document.querySelector('h2')


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
  popup.classList.toggle('xajouter')
  // popup.classList.toggle('xajouter')
  popup.style.top = "10px"
  h2.innerText = 'Formulaire d\'ajout d\'un user'
  popup.style.transition = "1s"
  body.classList.toggle('blur')
  button.innerText = 'ajouter'

})

closebtn.addEventListener("click", ()=>{
  popup.style.top = "-700px"
  popup.style.transition = "1s"
  body.classList.toggle('blur')
  popup.classList.remove('xmodifier')
  popup.classList.remove('xajouter')

})


// var url = 'http://127.0.0.1:5000/api/users/'


button.addEventListener('click', async (e)=>{
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

      if (popup.classList.contains('xajouter')) {
        await fetch(url +  '?token=' + user.token, {
              method: "POST",
              body: JSON.stringify(form),
              headers: {
                  "Content-type": "application/json charset=UTF-8",
                  "Access-Control-Allow-Origin" : "*"
              }
          })
      }
      if (popup.classList.contains('xmodifier')) {
        current_userId = JSON.parse(localStorage.getItem('current_userId'))
        // form['id'] = current_userId
        // console.log(form)
        // console.log(url + current_userId + '/?token=' + user.token)
        await fetch(url + current_userId + '/?token=' + user.token, {
              method: "PUT",
              body: JSON.stringify(form),
              headers: {
                  "Content-type": "application/json charset=UTF-8",
                  "Access-Control-Allow-Origin" : "*"
              }
          })
      }
    window.location.reload()
})
