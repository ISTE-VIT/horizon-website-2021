import './automate.scss'

const automate = document.querySelector('#automate')
automate.querySelector('input').addEventListener('change', (e) => {
  console.log(e.target.checked)

  const classList = automate.querySelector('#automate-svg').classList
  if (e.target.checked) {
    classList.add('activated')
    automate.querySelector('.control').classList.remove('animated-switch')
  } else {
    classList.remove('activated')
    automate.querySelector('.control').classList.add('animated-switch')
  }
})
