import './team.scss'
import './vaibhav.png'
import './vaibhav-alter.png'
import './abeer.png'
import './abeer-alter.png'
import './anushka.png'
import './anushka-alter.png'
import './jayesh.png'
import './jayesh-alter.png'
import './manasvi.png'
import './manasvi-alter.png'
import './saksham.png'
import './saksham-alter.png'
import './zaina.png'
import './zaina-alter.png'
import './lakshit.png'
import './lakshit-alter.png'
import './arun.png'
import './arun-alter.png'
import './hardhik.png'
import './hardhik-alter.png'
import './carousel-left.svg'
import './carousel-right.svg'
import './sasikumar.png'
import './amit-mahendrakar.png'

let currentPage = 0
const leftButton = document.querySelector('#carousel-left')
const rightButton = document.querySelector('#carousel-right')
const panels = document.querySelectorAll('.coordinators-panel')

const renderPanel = () => {
  panels.forEach((panel, idx) => {
    if (idx == currentPage) {
      panel.style.display = 'flex'
      panel.style.opacity = '1'
    } else {
      panel.style.display = 'none'
      panel.style.opacity = '0'
    }
  })
}

//show page 0
renderPanel()

rightButton.addEventListener('click', () => {
  currentPage = Math.min(currentPage + 1, 2)
  renderPanel()
})
leftButton.addEventListener('click', () => {
  currentPage = Math.max(currentPage - 1, 0)
  renderPanel()
})
