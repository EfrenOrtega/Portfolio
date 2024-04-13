const $btn_menu = document.getElementById('menu-mobile')
const $menu = document.querySelector('.menu-mobile')
const $template = document.getElementById('card-project').content
const $projecs = document.querySelector('.projects-cards')
const fragment = document.createDocumentFragment()
const $warn = document.getElementById('warn')

const $detailsProject = document.getElementById('details-project')
const $closeDetailsProject = document.getElementById('close')

const $carrousel = document.querySelector('.carrosuel')

const techImg = {
  "Tauri": "./images/tauri.svg",
  "Python": "./images/python.svg",
  "Flask": "./images/flask.svg",
  "JS": "./images/js.svg",
  "CSS": "./images/css.svg",
  "HTML": "./images/html.svg",
  "Nodejs": "./images/nodejs.svg",
  "PostgreSQL": "./images/postgresql.svg",
  "MongoDB": "./images/mongo.svg",
  "Android Studio": "./images/android-studio.svg",
  "MySql": "./images/mysql.svg",
  "ReactJs": "./images/reactjs.svg",
  "Figma": "./images/figma.svg",
  "nlp": "./images/nlpjs.svg",
  "IONIC" : "./images/ionic.svg",
  "Firebase" : "./images/firebase.svg"
}

let projects = []

const cardProjects = document.getElementsByClassName('card')
const webProjects = document.getElementsByClassName('web')

let flag = false;
let flag2 = false;
let previousBtn = null
document.addEventListener('click', e => {

  //Display the Menu to Mobile
  if (e.target == $btn_menu) {
    document.querySelector('.menu-mobile').classList.add('visible')
  }

  //Hide the menu to mobile
  if (e.target == $menu) {
    document.querySelector('.menu-mobile').classList.remove('visible')
  }

  //Control de Menu that display a specific kind of project (All, web, mobile, desktop)
  if (e.target == document.getElementById('all')) {

    flag2 = true;

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
    flag2 = true;
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
    flag2 = true;
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
    flag2 = true;
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

  //Load all projects info to display it
  if (e.target.matches(".card")) {

    let project = projects[e.target.dataset.index]
    $detailsProject.querySelector('#title').textContent = project.title
    $detailsProject.querySelector('#description').textContent = project.whatIs
    $detailsProject.querySelector('#descriptionDetail').textContent = project.description
    $detailsProject.querySelector('#github').href = project.github

    if (project.customer) {
      $detailsProject.querySelector('#project-customer').classList.add('active')
      $detailsProject.querySelector('#webSite').href = project.customer
      $detailsProject.querySelector('#webSite').textContent = project.customerSite
      $detailsProject.querySelector('#company').textContent = project.customer
    } else {
      $detailsProject.querySelector('#project-customer').classList.remove('active')
    }



    //==========
    //CARROSUEL
    //==========
    $detailsProject.querySelector('.carrosuel').innerHTML = ''
    let btns = document.getElementById('carrosuel-btns')

    let imagesLength = project.images.length

    if (project.images && imagesLength > 0) {
      btns.innerHTML = ''
      project.images.map((img, index) => {
        btns.innerHTML += `
        <span id="${index}" class="btn-carrosuel"></span>
      `

        $detailsProject.querySelector('.carrosuel').innerHTML += `
          <img class="project-carrosuel" src=${img} alt="Musix">
        `
      })
      $detailsProject.querySelector('.carrosuel-container').classList.add("active")
      $detailsProject.querySelector('.no-carrosuel').classList.remove("active")

      previousBtn = document.getElementById('0')

    } else {
      $detailsProject.querySelector('.carrosuel-container').classList.remove("active")
      $detailsProject.querySelector('.no-carrosuel').classList.add("active")
    }

    if (project.images && imagesLength > 0) {
      previousBtn.classList.remove('active')
      previousBtn = document.getElementById('0')
      previousBtn.classList.add('active')
      $carrousel.scrollLeft = 0
    }
      


    $detailsProject.querySelector('#functions').innerHTML = ''
    project.functions.map(funcion => {


      if (typeof funcion == "object") {

        let htmlFeatures = ""
        funcion.map((feature, index) => {

          if (index == 0) {
            htmlFeatures += `
            <li class = "sub-menu-name">${feature}.</li>
            <ul class="sub-menu">
          `
            return
          }

          htmlFeatures += `<li>${feature}.</li>`
        })

        htmlFeatures += `</ul>`

        $detailsProject.querySelector('#functions').innerHTML += htmlFeatures

      } else {
        $detailsProject.querySelector('#functions').innerHTML += `
        <li>${funcion}.</li>
        `
      }
    })

    $detailsProject.querySelector('#techs').innerHTML = ''
    project.tech.map(tech => {
      $detailsProject.querySelector('#techs').innerHTML += `
        <article>
          <figure>
            <img src="${techImg[tech]}" alt=${tech} title=${tech}>
          </figure>
          <figcaption>${tech}</figcaption>
        </article>
      `
    })

    $detailsProject.classList.add('visible')


    document.querySelector('.opacity').classList.add('visible')
  }

  //Close de project info
  if (e.target === $closeDetailsProject) {
    $detailsProject.classList.remove('visible')
    document.querySelector('.opacity').classList.remove('visible')
  }

  //CARROSUEL OF IMAGES
  if (e.target.matches('.btn-carrosuel')) {

    const $projectsCarrosuel = document.querySelectorAll('.project-carrosuel')

    let currentWidth = $projectsCarrosuel[0].clientWidth
    $carrousel.scrollLeft = (currentWidth * e.target.id)

    if (previousBtn) {
      previousBtn.classList.remove('active')
    }

    previousBtn = e.target
    e.target.classList.add('active')


  }

  //This is to show a msg when there aren't projects of a specific category (All, web, mobile, desktop)
  if (!flag2) return
  if (flag == false) {
    $warn.style.display = "inline"
  } else {
    $warn.style.display = "none"
  }
  flag = false
  flag2 = false

})

//Hide the menu to mobile when user swipe
document.addEventListener('touchmove', e => {
  if (e.target == $menu) {
    document.querySelector('.menu-mobile').classList.remove('visible')
  }
})

//Consume the projects.json to display the projects
document.addEventListener('DOMContentLoaded', e => {
  fetch("./js/projects.json")
    .then(res => res.json())
    .then(json => {

      projects = [...json]

      json.map((project, index) => {
        $template.querySelector('#card').classList.add("card")
        $template.querySelector('#card').dataset.index = index
        $template.querySelector('#card').dataset.tag = project.tag
        $template.querySelector('#title').textContent = project.title
        $template.querySelector('#description').textContent = project.whatIs
        $template.querySelector('#background').src = `./images/${project.image}`
        $template.querySelector('#techs').innerHTML = ''
        project.tech.map(tech => {
          $template.querySelector('#techs').innerHTML += `<img src="${techImg[tech]}" alt=${tech}>`
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