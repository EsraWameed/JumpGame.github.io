document.addEventListener('DOMContentLoaded',() =>{
  const grid = document.querySelector('.grid')
  const doodler = document.createElement('canvas')
  let doodlerLeftSpace = 50
  let startPoint = 150
  let doodlerBottomspace = startPoint
  let isGameOver = false
  let platformCount = 5
let platforms =[]
let upTimerId
let downTimerId
let isJumping = true
//that's what we are starting with
let isGoingLeft = false
let isGoingRight = false
let leftTimerId
let rightTimerId
let score = 0

  function createDoodler(){
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    //getting the left of that platform
    doodlerLeftSpace = platforms[0].left
    doodler.style.left = doodlerLeftSpace +'px'
    doodler.style.bottom= doodlerBottomspace + 'px'
  }
class Platform{
  constructor(newPlatBottom){
    this.bottom = newPlatBottom
    this.left = Math.random() * 315
    this.visual = document.createElement('div')

    const visual = this.visual
    visual.classList.add('platform')
    visual.style.left = this.left +'px'
    visual.style.bottom = this.bottom + 'px'
    grid.appendChild(visual)
  }
}

function createPlatforms(){
for (let i=0; i<platformCount; i++) {
  let platGap = 600 / platformCount
  let newPlatBottom = 100 + i * platGap
  let newPlatform = new Platform(newPlatBottom)
  platforms.push(newPlatform)
  console.log(platforms)
     }
}
function movePlatforms(){
  if (doodlerBottomspace > 200){
    platforms.forEach(platform => {
      platform.bottom -= 4
      let visual = platform.visual
      visual.style.bottom = platform.bottom + 'px'

      if(platform.bottom < 10){
      let firstPlatform = platforms[0].visual
      firstPlatform.classList.remove('platform')
      //gets rid of the first item of an array
      platforms.shift()
      score++
      console.log(platforms)
      //bc 600 is how high our grid is
      let newPlatform = new Platform(600)
      //add to the end of our array
      platforms.push(newPlatform)
    }
    })
  }
}
//let's make the doodler move
function jump(){
  clearInterval(downTimerId)
  isJumping = true
  upTimerId = setInterval(function(){
    doodlerBottomspace +=20
    doodler.style.bottom = doodlerBottomspace + 'px'
    if (doodlerBottomspace > startPoint +200) {
      fall()
    }
  },30)
  //timerid if we don't want it to keep moving

}

function fall() {
  clearInterval(upTimerId)
  isJumping = false
  downTimerId = setInterval(function(){
    doodlerBottomspace -= 5
    doodler.style.bottom = doodlerBottomspace +'px'
    if(doodlerBottomspace <= 0){
      gameOver()

    }

    //4 statements need to be true for a collision to happen
   platforms.forEach(platform => {
     if
     (doodlerBottomspace >= platform.bottom && doodlerBottomspace<= (platform.bottom + 15) && (doodlerLeftSpace + 60 )  >= platform.left && doodlerLeftSpace <=(platform.left + 85)&& !isJumping )

{console.log('landed')
startPoint = doodlerBottomspace
jump()
}
   })
  },30)
}

function gameOver(){
  console.log('game over')
  isGameOver = true
  //using a loop
  while (grid.firstChild){
    grid.removeChild(grid.firstChild)
  }
  //display the score
  grid.innerHTML = score
  clearInterval(upTimerId)
  //doodler will no longer move down
  clearInterval(downTimerId)



}

//control function using keys on keyboard by linking up the keys
function control(e){
  if(e.key==="ArrowLeft"){
    moveLeft()
    //move ArrowLeft
  } else if (e.key === "ArrowRight"){
    moveRight()
    //move ArrowRight
  } else if (e.key === "ArrowUp"){
    moveStraight()
    //moveStraight
  }

}

function moveLeft(){
  if(isGoingRight){
    clearInterval(rightTimerId)
    isGoingRight = false
  }
  //setting a new variable. it is true if we are moving left
  isGoingLeft = true
  leftTimerId = setInterval(function(){
    if (doodlerLeftSpace >= 0) {
      doodlerLeftSpace -=5
      //to show in browser
      doodler.style.left = doodlerLeftSpace + 'px'
    } else moveRight()

  },30)
}
 function moveRight(){
   if(isGoingLeft){
     clearInterval(leftTimerId)
     isGoingLeft = false
   }
   isGoingRight = true
   rightTimerId = setInterval(function(){
     //we minus the doodler width of grid
     if(doodlerLeftSpace <= 340){
       doodlerLeftSpace += 5
       doodler.style.left = doodlerLeftSpace + 'PX'
     } else moveLeft()
 },30)
}

function moveStraight(){
  isGoingRight = false
  isGoingLeft = false
  clearInterval(rightTimerId)
  clearInterval(leftTimerId)
}



  function start(){
  if  (!isGameOver){
    createPlatforms()
    createDoodler()
    setInterval(movePlatforms,30)
    jump()
    document.addEventListener('keyup',control)
  }
}
//attach button
start()
})
