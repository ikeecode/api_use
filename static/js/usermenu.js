btn = document.querySelector('button')

btn.addEventListener('click', (e)=>{
  window.location.href = 'userslist.html'
})


let lis = document.querySelectorAll('li a')

lis.forEach((item, i) => {
  item.addEventListener('click', e=>{
    link = e.target.innerText.toLowerCase().replace(' ', '')
    window.location.href = link + '.html'
  })
})
