const url = 'http://127.0.0.1:5000/api/users'

async function getUsers(url){
  let users = await fetch(url)
  let data = await users.json()
  return data
}


async function create_table(){
  try {
    data = await getUsers(url)
  }
  catch {
    document.write('The APi isnt responding !! ')
    return false
  }
  // data = await getUsers()
  table = document.createElement('table')
  table.setAttribute('class', 'table')
  header = document.createElement('thead')
  header.innerHTML = `
          <th></th>
          <th>Username</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
          <th></th>
          <th></th>

  `
  table.appendChild(header)
  document.body.appendChild(table)
  // console.log(data)
  data.forEach((item,i) => {
      tr = itemBuilder(item, i)
      table.appendChild(tr)
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


create_table()



function itemBuilder(item, i){
  tr = document.createElement('tr')

  tr.innerHTML = `
      <td><input type="checkbox" name="" value=""></td>
      <td><input type="text" name="" value="${item.username}" disabled></td>
      <td><input type="text" name="" value="${item.name}" disabled></td>
      <td><input type="text" name="" value="${item.email}" disabled></td>
      <td><input type="text" name="" value="${item.phone}" disabled></td>
      <td><a href="#"><button class="btn btn-outline-secondary" type="button" name="button">Editer</button></a></td>
      <td><a href="#"><button class="btn btn-outline-primary" type="button" name="button">Modifier</button></a></td>
      <td><a href="#"><button class="btn btn-outline-danger" type="button" name="button">Supprimer</button></a></td>

  `
  return tr
}
