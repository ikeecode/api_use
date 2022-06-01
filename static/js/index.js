const form = document.querySelector('form')
const url = 'http://127.0.0.1:5000/api/authen/'

const token = document.querySelector('#token')

// fetch(url)
// window.location.href = url

async function getToken(data){
  let response = await fetch(url, {
    method: "POST",
    body:data,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin" : "*"
    }
  })

  let res = await response.json()
  return res
}


form.addEventListener('submit', async (e)=>{
  e.preventDefault()
  email = form.querySelector('#login').value
  password = form.querySelector('#password').value
  data =  JSON.stringify({
    username: email,
    password: password
  })

  let response = await getToken(data)
  token.innerText = response.token
  localStorage.setItem('user', JSON.stringify(response))
  next('userslist.html')

})


function next(page){
  window.location.href = page
}
