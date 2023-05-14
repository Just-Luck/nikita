let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let strBtn = document.getElementById('start')
let clearBtn = document.getElementById('clear')

let mas = []
let count = 0
let timer 

canvas.addEventListener('click', (event) => {
    let x = event.offsetX
    let y = event.offsetY
    x = Math.floor(x/10)
    y = Math.floor(y/10)
    mas[y][x] = 1
    console.log(mas)
    drawField()
})

function goLife () {
    let n = 50, m = 50
    for (i = 0; i < n; i ++){
        mas[i] = []
        for (j = 0; j < m; j++){
            mas[i][j] = 0
        }
    }
}

goLife()

function drawField() {
    ctx.clearRect(0,0,600,600)
    for (i = 0; i < 50; i ++){
        for (j = 0; j < 50; j++){
            if (mas[i][j] == 1) ctx.fillRect(j*10,i*10,10,10)
                
        }
    }
}

function startLife(){
    let mas2 = []
    for (i = 0; i < 50; i++){
        mas2[i] = []
        for (j = 0; j < 50; j++){
            let neighbors = 0
            if (mas[fmp(i)-1][j] == 1) neighbors++ // up 
            if (mas[i][fpp(j) + 1] == 1) neighbors++ // right
            if (mas[fpp(i) + 1][j] == 1) neighbors++ // bottom
            if (mas[i][fmp(j)-1] == 1) neighbors++ // left
            if (mas[fmp(i)-1][fpp(j)+1] == 1) neighbors++
            if (mas[fpp(i)+1][fpp(j)+1] == 1) neighbors++
            if (mas[fpp(i)+1][fmp(j)-1] == 1) neighbors++
            if (mas[fmp(i)-1][fmp(j)-1] == 1) neighbors++
            (neighbors == 2 || neighbors == 3) ? mas2[i][j] = 1 : mas2[i][j] == 0
            

        }
    }
    mas = mas2
    drawField()
    count++
    document.getElementById('count').innerHTML = count 
    timer = setTimeout(startLife,300)
    strBtn.disabled = true;
}

function fmp (i) {
    if (i == 0) return 50
    else return i
}

function fpp (i) {
    if (i == 49) return -1
    else return i
}


strBtn.onclick = startLife

clearBtn.addEventListener('click', function() {
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        mas[i][j] = 0;
      }
    }
    count = 0;
    clearTimeout(timer);
    drawField();
    document.getElementById('count').innerHTML = count;
    strBtn.disabled = false;
});
