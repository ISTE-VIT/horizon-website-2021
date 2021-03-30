import '../scss/common.scss'
import '../scss/technica.scss'
import '../assets/technica.svg'
import '../assets/track-honeycomb.svg'
import '../assets/open-innovation.svg'
import '../assets/education.svg'
import '../assets/fin-tech.svg'
import '../assets/healthcare.svg'
import '../assets/triangle-line.svg'
import '../assets/discord.svg'
import '../assets/hackerearth.svg'
import '../assets/CodeofConduct.pdf'
import './technica-components/challenges/challenges'
import './technica-components/engagements/engagements'
import './technica-components/faqs/faqs'
import './technica-components/explore/explore'
import './technica-components/common-card/common-card'
import './technica-components/prizes/prizes'
import './technica-components/tracks/tracks'

VANTA.WAVES({
  el: '#hero',
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  scale: 1.0,
  scaleMobile: 1,
  color: 0x20202,
})

const vertLines = document.querySelectorAll('.vert-line.top')
const bottomLines = document.querySelectorAll('.vert-line.bottom')

vertLines.forEach((vertLine) => {
  const length = vertLine.getTotalLength()
  vertLine.style.strokeDasharray = length
  vertLine.style.strokeDashoffset = length
})
bottomLines.forEach((vertLine) => {
  const length = vertLine.getTotalLength()
  vertLine.style.strokeDasharray = length
  vertLine.style.strokeDashoffset = length
})

let allowEffectOnTopLines = true
let allowEffectOnBottomLines = true

window.addEventListener('scroll', (e) => {
  let scrollpercent =
    (document.body.scrollTop + document.documentElement.scrollTop) /
    document.documentElement.clientHeight

  if (allowEffectOnTopLines) {
    if (scrollpercent >= 1) {
      vertLines.forEach((vertLine) => {
        vertLine.style.strokeDasharray = 0
        vertLine.style.strokeDashoffset = 0
      })
      allowEffectOnTopLines = false
    } else {
      vertLines.forEach((vertLine) => {
        length = vertLine.getTotalLength()
        var draw = length * scrollpercent
        vertLine.style.strokeDashoffset = length - draw
      })
    }
  }
  if (allowEffectOnBottomLines) {
    const modifiedScrollPercent = Math.max(scrollpercent - 2.14, 0)

    if (modifiedScrollPercent >= 1) {
      bottomLines.forEach((bottomLine) => {
        bottomLine.style.strokeDasharray = 0
        bottomLine.style.strokeDashoffset = 0
      })
      allowEffectOnBottomLines = false
    } else {
      bottomLines.forEach((bottomLine) => {
        length = bottomLine.getTotalLength()
        var draw = length * modifiedScrollPercent
        bottomLine.style.strokeDashoffset = length - draw
      })
    }
  }
})

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  console.log('service worker working')
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
