const button = document.querySelector('#button')
const ajouter = document.querySelector('#ajouter')
const popup = document.querySelector('#popup')
const xbody = document.querySelector('#body')
const closebtn = document.querySelector('div#closebtn')
const post_url = 'http://127.0.0.1:5000/api/posts/'



// the data to retrieve form the form
const title        = document.getElementById("title")
const body       = document.getElementById("corps")



ajouter.addEventListener("click",function(){
  popup.style.top = "10px"
  popup.style.transition = "1s"
  xbody.classList.toggle('blur')
})

closebtn.addEventListener("click", ()=>{
  popup.style.top = "-600px"
  popup.style.transition = "1s"
  xbody.classList.toggle('blur')

})

popup.addEventListener('blur', ()=>{
  popup.style.top = "-600px"
})
// var post_url = 'http://127.0.0.1:5000/api/users/'


button.addEventListener('click', async (e)=>{
  console.log(name)
        form        = {
          'userId': user.user.id,
          "title" : title.value,
          "body" : body.value
      }

      // console.log(form)
      e.preventDefault()

      await fetch(post_url + '?token=' + user.token, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-type": "application/json charset=UTF-8",
                "Access-Control-Allow-Origin" : "*"
            }
        })
    window.location.reload()
})
