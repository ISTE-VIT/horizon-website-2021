import * as PIXI from 'pixi.js'
import river from '../../assets/river.svg'
import './code-asymptote.scss'
// console.log('==========================', process.env.NODE_ENV)

let noOfIterations = 2000

if (process.env.NODE_ENV == 'development') {
  noOfIterations = 20
}

const speedTimeFactor = 0.01
const lineStyle = 0xffffff
const straightLineOpacity = 0.4
const straightLineWidth = 3
const renderingRefreshTimeout = 60000
const addRotatingTexture = true
const refreshSpiral = false

var prevSketch = null
var codeAsymptote = document.querySelector('#code-asymptote')
class Sketch {
  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.app = new PIXI.Application({
      resolution: window.devicePixelRatio || 1,
      // resizeTo: window,
      width: window.innerWidth,
      height: window.innerHeight,
      // + 200,
      autoResize: true,
      transparent: true,
    })

    codeAsymptote.appendChild(this.app.view)
    this.container = new PIXI.Container()
    this.containerSpiral = new PIXI.Container()
    this.phi = 0.5 + Math.sqrt(5) / 2
    this.center = 0.7237
    this.app.stage.addChild(this.container)
    this.app.stage.addChild(this.containerSpiral)

    this.time = 0
    addRotatingTexture && this.addStuff()
    this.addLines()
    this.render()
  }
  getRiver() {
    let block = new PIXI.Sprite.from(river)
    block.width = 500
    block.height = 500
    return block
  }

  addLines() {
    this.ctx = new PIXI.Graphics()
    this.ctx.lineStyle(straightLineWidth, lineStyle, straightLineOpacity)
    let lastRight = this.width
    let lastBottom = lastRight / this.phi
    let tempHorizontal, tempVertical
    this.ctx.moveTo(0, lastBottom)
    // hiding this line coz it overflows
    // this.ctx.lineTo(lastRight, lastBottom)
    this.ctx.moveTo(lastRight, lastBottom)
    // hiding this line coz it overflows
    // this.ctx.arc(lastRight, lastBottom, lastRight, 0.5 * Math.PI, Math.PI)

    let lastLeft = lastRight / this.phi
    this.ctx.moveTo(lastLeft, 0)
    // this.ctx.lineTo(lastLeft, lastBottom)
    this.ctx.moveTo(lastLeft, lastBottom)
    // this.ctx.arc(lastLeft, lastBottom, lastLeft, Math.PI, 1.5 * Math.PI)
    let lastTop = lastBottom / this.phi

    this.ctx.moveTo(lastLeft, lastTop)
    // this.ctx.lineTo(lastRight, lastTop)
    this.ctx.moveTo(lastLeft, lastTop)
    // this.ctx.arc(lastLeft, lastTop, lastTop, 1.5 * Math.PI, 0)

    lastRight = lastRight - (lastRight - lastLeft) / this.phi
    this.ctx.moveTo(lastRight, lastTop)
    // this.ctx.lineTo(lastRight, lastBottom)
    this.ctx.moveTo(lastRight, lastTop)
    // this.ctx.arc(lastRight, lastTop, lastBottom - lastTop, 0, 0.5 * Math.PI)

    tempVertical = lastBottom - (lastBottom - lastTop) / this.phi
    this.ctx.moveTo(lastLeft, tempVertical)
    // this.ctx.lineTo(lastRight, tempVertical)
    this.ctx.moveTo(lastRight, tempVertical)
    // this.ctx.arc(
    //   lastRight,
    //   tempVertical,
    //   lastBottom - tempVertical,
    //   0.5 * Math.PI,
    //   Math.PI,
    // )
    lastBottom = tempVertical

    tempHorizontal = lastLeft + (lastRight - lastLeft) / this.phi
    this.ctx.moveTo(tempHorizontal, lastTop)
    // this.ctx.lineTo(tempHorizontal, lastBottom)
    this.ctx.moveTo(tempHorizontal, lastBottom)
    // this.ctx.arc(
    //   tempHorizontal,
    //   lastBottom,
    //   tempHorizontal - lastLeft,
    //   Math.PI,
    //   1.5 * Math.PI,
    // )
    lastLeft = tempHorizontal

    tempVertical = lastTop + (lastBottom - lastTop) / this.phi
    this.ctx.moveTo(lastLeft, tempVertical)
    // this.ctx.lineTo(lastRight, tempVertical)
    this.ctx.moveTo(lastLeft, tempVertical)
    // this.ctx.arc(lastLeft, tempVertical, lastRight - lastLeft, 1.5 * Math.PI, 0)
    lastTop = tempVertical

    tempHorizontal = lastRight - (lastRight - lastLeft) / this.phi
    this.ctx.moveTo(tempHorizontal, lastTop)
    // this.ctx.lineTo(tempHorizontal, lastBottom)
    this.ctx.moveTo(tempHorizontal, lastTop)
    // this.ctx.arc(
    //   tempHorizontal,
    //   lastTop,
    //   lastRight - tempHorizontal,
    //   0,
    //   0.5 * Math.PI,
    // )
    lastRight = tempHorizontal

    tempVertical = lastBottom - (lastBottom - lastTop) / this.phi
    this.ctx.moveTo(lastLeft, tempVertical)
    // this.ctx.lineTo(lastRight, tempVertical)
    this.ctx.moveTo(lastRight, tempVertical)
    // this.ctx.arc(
    //   lastRight,
    //   tempVertical,
    //   lastRight - lastLeft,
    //   0.5 * Math.PI,
    //   Math.PI,
    // )
    lastBottom = tempVertical

    tempHorizontal = lastLeft + (lastRight - lastLeft) / this.phi
    this.ctx.moveTo(tempHorizontal, lastTop)
    // this.ctx.lineTo(tempHorizontal, lastBottom)
    this.ctx.moveTo(tempHorizontal, lastBottom)
    // this.ctx.arc(
    //   tempHorizontal,
    //   lastBottom,
    //   tempHorizontal - lastLeft,
    //   Math.PI,
    //   1.5 * Math.PI,
    // )
    lastLeft = tempHorizontal

    tempVertical = lastTop + (lastBottom - lastTop) / this.phi
    this.ctx.moveTo(lastRight, tempVertical)
    // this.ctx.lineTo(lastLeft, tempVertical)
    this.ctx.moveTo(lastLeft, tempVertical)
    // this.ctx.arc(lastLeft, tempVertical, lastRight - lastLeft, 1.5 * Math.PI, 0)

    this.containerSpiral.addChild(this.ctx)
  }

  addStuff() {
    this.centerX = this.width * this.center
    this.centerY = (this.width * this.center) / this.phi
    this.container.pivot.set(this.centerX, this.centerY)
    this.container.position.set(this.centerX, this.centerY)
    // let block = new PIXI.Sprite(PIXI.Texture.WHITE)
    // block.tint = 0xff0000
    // block.width = 10
    // block.height = 10
    // block.position.set(this.centerX, this.centerY)
    // this.container.addChild(block)
    for (let i = -noOfIterations; i < noOfIterations; i++) {
      let container = new PIXI.Container()
      let bl = this.getRiver()
      bl.width = this.width / this.phi
      // height same coz square
      bl.height = this.width / this.phi

      let angle = (i * Math.PI) / 2
      let scale = Math.pow(1 / this.phi, i)
      container.position.set(this.centerX, this.centerY)
      bl.position.set(-this.centerX, -this.centerY)
      container.rotation = angle
      container.scale.set(scale)
      container.addChild(bl)
      this.container.addChild(container)
    }
  }
  // add() {
  //   // let block = new PIXI.Sprite(PIXI.Texture.WHITE)
  //   // block.tint = 0xff0000
  //   // block.width = 100
  //   // block.height = 100
  //   // this.container.addChild(block)
  //   let riverSprite = this.getRiver()
  //   this.container.addChild(riverSprite)
  // }
  render() {
    this.app.ticker.add((delta) => {
      this.time += speedTimeFactor
      this.container.rotation = this.time
      this.container.scale.set(
        Math.pow(1 / this.phi, this.time / (Math.PI / 2)),
      )
    })
  }
}

// const sketch = new Sketch()
// sketch.app.destroy()

// logic to keep making the spiral flowing and also recreate it on resize
var prevSketch = null
let prevWidth = window.innerWidth

function addOrReplaceSketch() {
  if (window.innerWidth != prevWidth || prevSketch == null) {
    if (prevSketch && prevSketch.app) {
      prevSketch.app.destroy()
    }
    try {
      codeAsymptote.querySelector('canvas').remove()
    } catch (e) {
      // console.log('canvas not yet added, but might be there sometime else')
    }
    prevSketch = new Sketch()
    prevWidth = window.innerWidth
  }
}

// add new sketch on resize, making it responsive
window.addEventListener('resize', addOrReplaceSketch)

window.onload = function () {
  addOrReplaceSketch()
}
/* basically renderingRefreshTimeout is the amount of time in milliseconds after which you want to rerender your spiral making it look like it's going infinitely */

refreshSpiral && setInterval(addOrReplaceSketch, renderingRefreshTimeout)
