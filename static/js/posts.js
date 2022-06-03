// /api/users/<int:user_id>/posts/
const url ='http://127.0.0.1:5000/api/users/'
const user = JSON.parse(localStorage.getItem('user'))
const userId = JSON.parse(localStorage.getItem('current_userId'))
const tableScroll = document.querySelector('div#body')
const adminWidth = '95vw'
const userWidth = '85vw'
const visiteurWith = '76vw'


tableScroll.addEventListener('scroll', (e)=>{
  return;
})

// customization for the width





async function getUsers(arg){
  arg = url + userId + '/posts/?token=' + user.token
  console.log(arg)
  let users = await fetch(arg)
  if (users.status != 200){
    return false
  }
  let data = await users.json()
  return data
}


async function create_table(){
  try {
    data = await getUsers(url)
  }
  catch(e) {
    return false
  }
  // data = await getUsers(url)
  if (data && data.length != 0){
  table = document.createElement('table')
  table.setAttribute('class', 'table')
  table.setAttribute('height', '10px')
  header = document.createElement('thead')
  header.setAttribute('id', 'myhead')
  tbody  = document.createElement('tbody')
  header.innerHTML = `
          <th></th>
          <th id='th1'>Title</th>
          <th id='th2'>Body</th>
          <th id='th3'></th>
          <th id='th4'></th>
          <th id='th5'>UserID</th>
          <th class="${isAdmin_or_User()}"></th>
          <th class="${isAdmin()}"></th>
  `
  table.appendChild(header)
  table.appendChild(tbody)

  document.body.querySelector('div#body').appendChild(table)
  data.reverse()
  data.forEach((item,i) => {
      tr = itemBuilder(item, i)
      tbody.appendChild(tr)
  })

  editer = table.querySelectorAll('button.editer')
  editer.forEach(item => {
    item.addEventListener('click', ()=>{
        window.location.href = 'usermenu.html'
      })
  })

// lors que vous cliquez une ligne du tableau un fond lui est appliqué
    let trs = document.querySelectorAll('tr')
    trs.forEach(item => {
      item.addEventListener('click', (e)=>{
        e.stopPropagation()
        item.classList.toggle('selected')
      })
    });

// eviter que le focus d'un input entraine la selection d'une ligne du tableau

  let inputs = document.querySelectorAll('input[type="text"]')
  inputs.forEach(item => {
    item.addEventListener('click', (e)=>{
      e.stopPropagation()
    })
  })



  let tds = document.querySelectorAll('td')

  tds.forEach(item => {


    if (item.firstChild.type != 'checkbox'){
      item.addEventListener('dblclick', (e)=>{
        e.stopPropagation()
        item.firstChild.disabled = false
      })

      item.firstChild.addEventListener('blur', ()=>{
        item.firstChild.disabled = true
      })

      item.firstChild.addEventListener('focusout', ()=>{
        item.firstChild.disabled = true
      })

      // item.firstChild.addEventListener('mouseout', ()=>{
      //   item.firstChild.disabled = true
      // })

      // custom width
      myhead = tableScroll.querySelector('#myhead')
      myhead.style.top = '140px'

      if(user.user.profil == 'admin'){
        myhead.style.width = adminWidth
        tableScroll.style.width = adminWidth
      }
      else if (user.user.profil == 'user') {
        myhead.style.width = userWidth
        tableScroll.style.width = userWidth
      }
      else {
        myhead.style.width = visiteurWith
        tableScroll.style.width = visiteurWith
      }

    }

    else{
      item.addEventListener('click', (e)=>{
          e.stopPropagation()
          let siblings = new Array()
          next = item.nextElementSibling
          siblings.push(next)
          while(next){
            next = next.nextElementSibling
            if (next != undefined && next.firstChild.type == 'text') siblings.push(next)
          }
          // console.log(siblings)

          if (item.firstChild.checked){
            siblings.forEach(element => {
              element.firstChild.disabled = false
            })
          }

          else{
            siblings.forEach(element => {
              element.firstChild.disabled = true
            })
          }

      })

    }
  })
  }
  else{
    if (data.length == 0){
      document.write('Cet utilisateur n\'a aucune donnees dans l\'Api')
    }
    else {
      document.write("Vous n'avez pas access à cette ressource")
    }
  }
}


create_table()



function itemBuilder(item, i){
  tr = document.createElement('tr')

  tr.innerHTML = `
      <td><input type="checkbox" name="" value=""></td>
      <td><input type="text" name="" value="${item.title}" disabled></td>
      <td><input type="text" name="" value="${item.body}" disabled></td>
      <td><input type="text" name="" value="" disabled></td>
      <td><input type="text" name="" value="${item.userId}" disabled></td>
      <td><a><button class="btn btn-outline-success editer" type="button" name="button">voir +</button></a></td>
      <td class="${isAdmin_or_User()}"><a href="#"><button class="btn btn-outline-primary" type="button" name="button">Modifier</button></a></td>
      <td class="${isAdmin()}"><a href="#"><button class="btn btn-outline-danger" type="button" name="button">Supprimer</button></a></td>

  `
  return tr
}


// affiche le profil de l'utilisateur
const profil = document.querySelector('#profil')
profil.style.border = "2px dashed white"
profil.style.backgroundColor = "#0285D1"
profil.style.width = "100px"
profil.value = user.user.profil



// les options selon les profils
//
// admin : peut tout faire
// user : peut tout faire sauf suppression
// visiteur : peut juste afficher les informations


// this hide de supprimer button
function isAdmin(){
  return (user.user.profil == 'admin' ? '' : 'hide')
}


function isAdmin_or_User(){
  return (user.user.profil == 'visiteur' ? 'hide' : '')
}
