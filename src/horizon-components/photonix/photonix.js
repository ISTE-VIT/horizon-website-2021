import Parallax from 'parallax-js'
import './photonix.scss'
import '../../assets/photonix-woman.webp'
var scene = document.querySelector('#photonix .col-lg-6')
var parallaxInstance = new Parallax(scene, {
  relativeInput: true,
  invertX: false,
  // hoverOnly: true,
  invertY: false,
  limitX: 30,
  limitY: 100,
})
