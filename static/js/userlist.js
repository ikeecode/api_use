const url = 'http://127.0.0.1:5000/api/users/'
const user = JSON.parse(localStorage.getItem('user'))
const userId = JSON.parse(localStorage.getItem('current_userId'))
const tableScroll = document.querySelector('div#body')
const adminWidth = '95vw'
const userWidth = '85vw'
const visiteurWith = '76vw'
const itemsId = {}
const xdata = {}
const compteur = document.querySelector('#compteur')
// const popup   = document.querySelector('#popup')


// console.log(userId)
tableScroll.addEventListener('scroll', (e)=>{
  tableScroll.scroll({
    top: tableScroll.scrollHeight,
    left: 0,
    behavior: 'smooth'
  })
  setInterval(function(){
    compteur.innerHTML = Math.ceil(tableScroll.scrollTop / 55)
  }, 100)
  }
)




async function getUsers(arg){
  arg = url + '?token=' + user.token
  // console.log(arg)
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
    // console.log(data)
    data.reverse()
    // console.log(data)

    data.forEach((item, i) => {
      xdata[item.id] = item
    });

  }
  catch(e) {
    return false
  }
  // console.log(xdata)
  // data = await getUsers(url)
  if (data){
  table = document.createElement('table')
  table.setAttribute('class', 'table')
  table.setAttribute('height', '10px')
  header = document.createElement('thead')
  header.setAttribute('id', 'myhead')
  tbody  = document.createElement('tbody')
  header.innerHTML = `
          <th></th>
          <th id='th1'>Username</th>
          <th id='th2'>Name</th>
          <th id='th3'>Email</th>
          <th id='th4'>Phone</th>
          <th id='th5'></th>
          <th class="${isAdmin_or_User()}"></th>
          <th class="${isAdmin()}"></th>
  `
  table.appendChild(header)
  table.appendChild(tbody)
  // les usersID des donnees en cles valeurs {username: id}

  document.body.querySelector('div#body').appendChild(table)
  data.forEach((item,i) => {
      tr = itemBuilder(item, i)
      tbody.appendChild(tr)
      itemsId[item.username] = item.id
  })

  let getId = function (name){
    return itemsId[name]
  }

  editer = table.querySelectorAll('button.editer')
  editer.forEach(item => {
    item.addEventListener('click', (e)=>{
        xname = e.target.parentNode.parentNode.parentNode.children[1].firstChild.value
        id = getId(xname)
        localStorage.setItem('current_userId', JSON.stringify(id))
        window.location.href = 'usermenu.html'
        // console.log(JSON.parse(localStorage.getItem('current_userId')))
      })
  })

  modifier = table.querySelectorAll('button.modifier')
  modifier.forEach(item => {
    item.addEventListener('click', (e)=>{
      popup.classList.toggle('xmodifier')
      popup.style.top = "30px"
      h2.innerText = 'Modification d\'un user'
      popup.style.transition = "1s"
      body.classList.toggle('blur')
      button.innerText = 'modifier'
      xname = e.target.parentNode.parentNode.parentNode.children[1].firstChild.value
      id = getId(xname)
      itemdata = xdata[id]
      localStorage.setItem('current_userId', JSON.stringify(id))

      name.value        = itemdata['name']
      email.value       = itemdata['email']
      username.value    = itemdata['username']
      website.value     = itemdata['website']
      password.value    = itemdata['password']
      phone.value       = itemdata['phone']
      nameCompany.value = itemdata['company']['name']
      catchPhrase.value = itemdata['company']['catchPhrase']
      bs.value          = itemdata['company']['bs']
      street.value      = itemdata['address']['street']
      suite.value       = itemdata['address']['suite']
      city.value        = itemdata['address']['city']
      zipcode.value     = itemdata['address']['zipcode']
      lat.value         = itemdata['address']['geo']['lat']
      lng.value         = itemdata['address']['geo']['lng']

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
    if (!item.classList.contains('no')) {
      if (item.firstChild.type != 'checkbox'){
        item.addEventListener('dblclick', (e)=>{
          e.stopPropagation()
          item.firstChild.disabled = false
        })

        item.firstChild.addEventListener('blur', ()=>{
          item.firstChild.disabled = true
          // console.log(item.firstChild)
          let changed = {}
          parent = item.firstChild.parentElement.parentElement
          xname = item.firstChild.parentElement.parentElement.children[1].firstChild.value
          id = getId(xname)
          dataToSend = xdata[id]
          inputs = parent.querySelectorAll('input')
          inputs.forEach((item, i) => {
            if(item.type !='checkbox'){
              // console.log(item.type)
              changed[item.name] = item.value
            }
          })
          // faire les changements
          dataToSend.name = changed.name
          dataToSend.email = changed.email
          dataToSend.phone = changed.phone
          args = url + id + '/?token=' + user.token
          // console.log(args)
          putUser(args, dataToSend)
        })

        item.firstChild.addEventListener('focusout', ()=>{
          item.firstChild.disabled = true

          // console.log('y')
        })

        // item.firstChild.addEventListener('mouseout', async (e)=>{
        //   item.firstChild.disabled = true
        //   let changed = {}
        //   parent = item.firstChild.parentElement.parentElement
        //   xname = item.firstChild.parentElement.parentElement.children[1].firstChild.value
        //   id = getId(xname)
        //   dataToSend = xdata[id]
        //   inputs = parent.querySelectorAll('input')
        //   inputs.forEach((item, i) => {
        //     if(item.type !='checkbox'){
        //       // console.log(item.type)
        //       changed[item.name] = item.value
        //     }
        //   })
        //   // faire les changements
        //   dataToSend.name = changed.name
        //   dataToSend.email = changed.email
        //   dataToSend.phone = changed.phone
        //   args = url + id + '/?token=' + user.token
        //   // console.log(args)
        //   putUser(args, dataToSend)
        //
        //   // console.log(dataToSend)
        //   // console.log(id)
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
    }
  })
  }
  else{
    document.write("Vous n'avez pas access à cette ressource")
  }
}


create_table()



function itemBuilder(item, i){
  tr = document.createElement('tr')

  tr.innerHTML = `
      <td><input type="checkbox" name="" value=""></td>
      <td><input type="text" name="username" value="${item.username}" disabled readonly></td>
      <td><input type="text" name="name" value="${item.name}" disabled></td>
      <td><input type="text" name="email" value="${item.email}" disabled></td>
      <td><input type="text" name="phone" value="${item.phone}" disabled></td>
      <td class='no'><a><button class="btn btn-outline-success editer" type="button" name="button">voir +</button></a></td>
      <td class="${isAdmin_or_User()} no"><a href="#"><button class="btn btn-outline-primary modifier" type="button" name="button">Modifier</button></a></td>
      <td class="${isAdmin()} no"><a href="#"><button class="btn btn-outline-danger modifier" type="button" name="button">Supprimer</button></a></td>

  `
  return tr
}


// affiche le profil de l'utilisateur
const profil = document.querySelector('#profil')
profil.style.border = "5px dashed white"
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

// console.log(itemsId)


// Make an HTTP PUT Request
async function putUser(xurl, Xdata) {
  var response = await fetch(xurl, {
      method: 'PUT',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(Xdata)
  })
  var resData = await response.json()
  // console.log(response.status)
  if(response.status == 401){
    document.querySelector('#message').style.backgroundColor = 'red'
    document.querySelector('#message').style.color = 'white'
    document.querySelector('#message').style.fontSize = '22px'
    document.querySelector('#message').innerHTML = 'This profil is  ' +  resData.message
  }
  else if (response.status == 500) {
    document.querySelector('#message').style.backgroundColor = 'green'
    document.querySelector('#message').style.color = 'white'
    document.querySelector('#message').style.fontSize = '22px'
    document.querySelector('#message').innerHTML = 'Mauvaise manipulation des valeurs'
  }
  else {
    document.querySelector('#message').innerHTML = ''
  }

  // console.log(resData)
}
