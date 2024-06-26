/* Variables: switching display and units */
const imperialRadio = document.getElementById('imperial')
const metricRadio = document.getElementById('metric')
const metricFields = document.getElementById('measurements-metric')
const imperialFields = document.getElementById('measurements-imperial')
let units = 'metric'
const welcome = document.querySelector('.welcome')
const results = document.querySelector('.result')
const parameters = document.querySelector('.parameters')

/* Variables: data gathering/posting */
const metricHeight = document.getElementById('height-metric')
let cm = 0
const metricWeight = document.getElementById('weight-metric')
let kg = 0
const imperialHeightFt = document.getElementById('height-ft')
let ft = 0
const imperialHeightIn = document.getElementById('height-in')
let ins = 0
const imperialWeightSt = document.getElementById('weight-st')
let st = 0
const imperialWeightLb = document.getElementById('weight-lbs')
let lbs = 0
let bmi = 0
const score = document.querySelector('.score')
const classification = document.querySelector('.classification')
const range = document.querySelector('.range')

/*Event listeners */

imperialRadio.addEventListener('click', () => {
  switchFields()
  units = 'imperial'
})
metricRadio.addEventListener('click', () => {
  switchFields()
  units = 'metric'
})
metricHeight.addEventListener('keyup', () => {
  cm = Number(metricHeight.value)
  showReport()
  calculateBmi()
  return cm
})
metricWeight.addEventListener('keyup', () => {
  kg = Number(metricWeight.value)
  showReport()
  calculateBmi()
  return kg
})
imperialHeightFt.addEventListener('keyup', () => {
  ft = Number(imperialHeightFt.value)
  showReport()
  calculateBmi()
  return ft
})
imperialHeightIn.addEventListener('keyup', () => {
  ins = Number(imperialHeightIn.value)
  showReport()
  calculateBmi()
  return ins
})
imperialWeightSt.addEventListener('keyup', () => {
  st = Number(imperialWeightSt.value)
  showReport()
  calculateBmi()
  return st
})
imperialWeightLb.addEventListener('keyup', () => {
  lbs = Number(imperialWeightLb.value)
  calculateBmi()
  showReport()
  return lbs
})

/* Functions */

const switchFields = () => {
  metricFields.classList.toggle('hidden')
  imperialFields.classList.toggle('hidden')
}
const showReport = () => {
  welcome.classList.add('hidden')
  results.classList.remove('hidden')
  parameters.classList.remove('hidden')
}
const calculateBmi = () => {
  if (units === 'imperial') {
    totalLbs = st * 14 + lbs
    totalIns = ft * 12 + ins
    bmi = (totalLbs * 703) / totalIns ** 2
    score.innerHTML = bmi.toFixed(1)
    classifyScore()
    idealRange()
    return bmi
  } else {
    totalM = cm / 100
    bmi = kg / totalM ** 2
    score.innerHTML = bmi.toFixed(1)
    classifyScore()
    idealRange()
    return bmi
  }
}
const classifyScore = () => {
  if (bmi < 18.5) {
    classification.innerHTML = 'underweight'
  } else if (bmi > 18.5 && bmi < 25) {
    classification.innerHTML = 'a healthy weight'
  } else if (bmi >= 25 && bmi < 30) {
    classification.innerHTML = 'overweight'
  } else {
    classification.innerHTML = 'obese'
  }
}
const idealRange = () => {
  if (units === 'imperial') {
    const lWeight = (18.5 * totalIns ** 2) / 703
    const uWeight = (24.9 * totalIns ** 2) / 703
    const lower = `${(lWeight / 14).toFixed(1)}st ${(lWeight % 14).toFixed(
      1
    )}lbs`
    const upper = `${(uWeight / 14).toFixed(1)}st ${(lWeight % 14).toFixed(
      1
    )}lbs`
    range.innerHTML = `${lower} - ${upper}`
  } else {
    const lower = 18.5 * totalM ** 2
    const upper = 24.9 * totalM ** 2
    range.innerHTML = `${lower.toFixed(1)}kgs - ${upper.toFixed(1)}kgs`
  }
}
