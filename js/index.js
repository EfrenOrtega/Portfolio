const $btn_menu = document.getElementById('menu-mobile')
const $menu = document.querySelector('.menu-mobile')
const $template = document.getElementById('card-project').content
const $projecs = document.querySelector('.projects-cards')
const fragment = document.createDocumentFragment()
const $warn = document.getElementById('warn')

const techImg = {
  "Tauri": "",
  "Python": "",
  "Flask": "reactjs.svg",
  "JS": ""
}

const cardProjects = document.getElementsByClassName('card')
const webProjects = document.getElementsByClassName('web')

let flag = false;
document.addEventListener('click', e => {
  if (e.target == $btn_menu) {
    document.querySelector('.menu-mobile').classList.add('visible')
  }

  if (e.target == $menu) {
    document.querySelector('.menu-mobile').classList.remove('visible')
  }



  if (e.target == document.getElementById('all')) {


    document.getElementById('all').classList.remove('active')
    document.getElementById('web').classList.remove('active')
    document.getElementById('mobile').classList.remove('active')
    document.getElementById('desktop').classList.remove('active')

    e.target.classList.add('active')


    for (let index = 0; index < cardProjects.length; index++) {
      cardProjects[index].style.display = "inline"
    }

    flag = true
  }

  if (e.target == document.getElementById('web')) {

    document.getElementById('all').classList.remove('active')
    document.getElementById('web').classList.remove('active')
    document.getElementById('mobile').classList.remove('active')
    document.getElementById('desktop').classList.remove('active')
    e.target.classList.add('active')

    for (let index = 0; index < cardProjects.length; index++) {

      if (cardProjects[index].dataset.tag != 'Web') {
        cardProjects[index].style.display = "none"
      } else {
        flag = true;
        cardProjects[index].style.display = "inline"
      }

    }
  }

  if (e.target == document.getElementById('mobile')) {

    document.getElementById('all').classList.remove('active')
    document.getElementById('web').classList.remove('active')
    document.getElementById('mobile').classList.remove('active')
    document.getElementById('desktop').classList.remove('active')
    e.target.classList.add('active')

    for (let index = 0; index < cardProjects.length; index++) {

      if (cardProjects[index].dataset.tag != 'Movil') {
        cardProjects[index].style.display = "none"
      } else {
        flag = true
        cardProjects[index].style.display = "inline"
      }

    }
  }

  if (e.target == document.getElementById('desktop')) {

    document.getElementById('all').classList.remove('active')
    document.getElementById('web').classList.remove('active')
    document.getElementById('mobile').classList.remove('active')
    document.getElementById('desktop').classList.remove('active')
    e.target.classList.add('active')

    for (let index = 0; index < cardProjects.length; index++) {

      if (cardProjects[index].dataset.tag != 'Escritorio') {
        cardProjects[index].style.display = "none"
      } else {
        flag = true
        cardProjects[index].style.display = "inline"
      }

    }
  }

  if (!flag) {
    $warn.style.display = "inline"
  } else {
    flag = false
    $warn.style.display = "none"

  }

})

document.addEventListener('touchmove', e => {
  if (e.target == $menu) {
    document.querySelector('.menu-mobile').classList.remove('visible')
  }
})

document.addEventListener('DOMContentLoaded', e => {
  fetch("./js/projects.json")
    .then(res => res.json())
    .then(json => {

      json.map(project => {
        $template.querySelector('#card').classList.add("card")
        $template.querySelector('#card').dataset.tag = project.tag
        $template.querySelector('#title').textContent = project.title
        $template.querySelector('#description').textContent = project.description
        $template.querySelector('#background').src = `./images/${project.image}`
        $template.querySelector('#techs').innerHTML = ''
        project.tech.map(tech => {
          $template.querySelector('#techs').innerHTML += `<img src="./images/${techImg[tech]}" alt=${tech}>`
        })

        let $clone = document.importNode($template, true);
        fragment.append($clone)

      })

      $projecs.appendChild(fragment)

    })
    .catch(e => {
      console.log(e)
    })
})