////// starting point

var distance = document.querySelector('.row').offsetWidth - 15 - 150
var container = document.querySelector('.container-fluid')
var inputs = document.querySelectorAll('input')
var start = document.querySelector('.start')
var nitro = document.querySelector('.nitro')
var noss = document.querySelectorAll('.nos')
var traces = document.querySelectorAll('.trace')
var soundNitro = document.querySelector('.nitro audio')
var randList = [0, 1, 2, 3]
var rand = randList[Math.floor(Math.random() * randList.length)]
var p = 0

function Car(speed, weight, car, place, color) {
    this.place = document.querySelector(place)
    this.car = document.querySelector(car)
    this.color = color
    this.i = 0
    //console.log(car.charAt(car.length-1)-1);

    this.go = function () {
        if (this.i > distance) {
            clearInterval(this.inter)

            randList.splice(randList.indexOf(car.charAt(car.length-1)-1), 1)
            rand = randList[Math.floor(Math.random() * randList.length)]
            p++
            this.place.innerHTML = p
            this.place.style.color = this.color
            this.place.style.opacity = '1'

            if (p == 4) {
                start.style.display = 'flex'
                start.style.fontSize = '18px'
                start.style.fontWeight = 'bold'
                start.innerHTML = 'RESTART'
                nitro.style.display = 'none'
            }
        } else {
            this.r = Math.random() * 5 + this.sps
            this.i += this.r
            this.car.style.transform = `translateX(${this.i}px)`

            if (start.innerHTML == 'GO') {
                start.style.display = 'none'
            }
        }
    }

    var agent = this

    start.addEventListener('click', function (e) {
        if (start.innerHTML == 'RESTART') {
            location.reload()
        } else {
            agent.speed = document.querySelector(speed).value
            agent.weight = document.querySelector(weight).value

            agent.sps = +agent.speed / +agent.weight * 10

            agent.inter = setInterval(() => { agent.go() }, 15)

            setTimeout(() => {
                container.style.backgroundColor = 'rgb(153, 194, 255)'
                start.style.animation = 'shadow-restart 1.3s linear infinite'
                start.style.backgroundColor = 'rgb(217, 255, 0, 1)'
                nitro.style.display = 'block'

                for (input of inputs) {
                    input.disabled = true
                }
            }, 20);
        }
    });

    nitro.addEventListener('click', function (e) {
        soundNitro.play();
        this.style.display = 'none'

        var i = 0
        var rr = agent.i
        noss[rand].style.opacity = '1'

        if (car == `.car${rand+1}`) {
            traces[rand].style.transform = `translateX(${agent.i +91}px)`

            agent.interNitro = setInterval(() => {
                i++
                agent.go()
                if(i == 45|| agent.i > distance -20){
                    clearInterval(agent.interNitro)
                    noss[rand].style.opacity = '0'
                }
                traces[rand].style.width = `${agent.i - rr}px`
            }, 30)
        }
    });
}

var car1 = new Car('.speed1 input', '.weight1 input', '.car1', '.place1 p', '#3177fd')
var car2 = new Car('.speed2 input', '.weight2 input', '.car2', '.place2 p', '#c90000')
var car3 = new Car('.speed3 input', '.weight3 input', '.car3', '.place3 p', '#00ff00')
var car4 = new Car('.speed4 input', '.weight4 input', '.car4', '.place4 p', '#a131fe')



var speedInputs = document.querySelectorAll('.speed input')
var weightInputs = document.querySelectorAll('.weight input')

for (let i = 0; i < speedInputs.length; i++) {
    speedInputs[i].addEventListener('input', function (e) {
        var val = this.value.replace(/[^0-9]/g, '')

        if (val[0] == 0) {
            val = val.slice(1)
        }

        this.value = val
    });
    speedInputs[i].addEventListener('change', function (e) {
        var val = this.value

        if (val < 50) { val = 50 }
        else if (val > 500) { val = 500 }

        this.value = val
    });

    weightInputs[i].addEventListener('input', function (e) {
        var val = this.value.replace(/[^0-9]/g, '')

        if (val[0] == 0) {
            val = val.slice(1)
        }

        this.value = val
    });
    weightInputs[i].addEventListener('change', function (e) {
        var val = this.value

        if (val < 1000) { val = 1000 }
        else if (val > 3000) { val = 3000 }

        this.value = val
    });
}