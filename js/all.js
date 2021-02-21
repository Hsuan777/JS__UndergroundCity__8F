let backGround = document.querySelector('.js-backGround')
let gameStart = document.querySelector('.js-gameStart')
let gameRestart = document.querySelector('.js-gameRestart')
let displayMain = document.querySelector('.js-displayMain')
let displayGame = document.querySelector('.js-displayGame')
let displayGamer = document.querySelector('.js-displayGamer')
let gamerOneWinTimes = document.querySelector('.js-gamerOneWinTimes')
let gamerTwoWinTimes = document.querySelector('.js-gamerTwoWinTimes')
let gameBtnList = document.querySelector('.js-gameBtnList')
let gameBtnAll = document.querySelectorAll('.js-gameBtn')
let displayWinner = document.querySelector('.js-winner')
let winnerCircle = document.querySelector('.js-winnerCircle')
let winnerCross = document.querySelector('.js-winnerCross')
let winnerDraw = document.querySelector('.js-winnerDraw')

const game = function () {
  let vm = this
  // 若達到 9，則為平手
  let step = 0
  // 玩家勝利次數
  let gameRecord = {
    gamerOneWin:0,
    gamerTwoWin:0
  }
  // 點擊暫存紀錄，後續檢查是否已點過
  let recordStorage = []
  // 玩家一代表符號為 Ｏ，代表數字為 1
  // 玩家二代表符號為 Ｘ，代表數字為 -1
  let nowGamer = 1
  this.play = (e) => {
    let btnOfValue = e.target.value
    let record = {
      value: '',
      gamer: 1
    }
    let clicked = []
    recordStorage.forEach( item => {
      clicked .push(item.value)
    })
    if (clicked .indexOf(btnOfValue) === -1) {
      if (nowGamer === 1) {
        e.target.textContent = 'Ｏ'
        displayGamer.textContent = 'Ｘ TURN!'
        record.value = btnOfValue
        record.gamer = 1
        recordStorage.push(record)
        vm.isWin()
        nowGamer = -1
      } else {
        e.target.textContent = 'Ｘ'
        displayGamer.textContent = 'Ｏ TURN!'
        record.value = btnOfValue
        record.gamer = -1
        recordStorage.push(record)
        vm.isWin()
        nowGamer = 1
      }
    }
  }
  this.init = () => {
    step = 0
    recordStorage = []
    nowGamer = 1
    gameBtnAll.forEach( item => {
      item.textContent = ''
    })
    gameBtnList.classList.remove('d-none')
    displayWinner.classList.add('d-none')
    displayWinner.classList.remove('custom__winner--draw')
    winnerCircle.classList.add('d-none') 
    winnerCross.classList.add('d-none') 
    winnerDraw.classList.add('d-none') 
  }
  this.isWin = () => {
    let winer = null
    const textContent = (gamerBtn) => { 
      if (gamerBtn.textContent === 'Ｏ') {
        return 1
      } else if (gamerBtn.textContent === 'Ｘ') {
        return -1
      } else {
        return 0
      }
    }
    let slash = Math.abs(textContent(gameBtnAll[0]) + textContent(gameBtnAll[4]) + textContent(gameBtnAll[8]))
    let backSlash = Math.abs(textContent(gameBtnAll[2]) + textContent(gameBtnAll[4]) + textContent(gameBtnAll[6]))
    for (let n = 0; n < 3; n++) {
      row = Math.abs(textContent(gameBtnAll[3*n]) + textContent(gameBtnAll[3*n+1]) + textContent(gameBtnAll[3*n+2]))
      col = Math.abs(textContent(gameBtnAll[n]) + textContent(gameBtnAll[n+3]) + textContent(gameBtnAll[n+6]))
      if (row === 3) winer = textContent(gameBtnAll[3*n])
      if (col === 3) winer = textContent(gameBtnAll[n])
    }
    if (slash === 3) winer = textContent(gameBtnAll[0])
    if (backSlash === 3) winer = textContent(gameBtnAll[2])
    switch (winer) {
      case 1:
        gameBtnList.classList.add('d-none')
        displayWinner.classList.remove('d-none') 
        winnerCircle.classList.remove('d-none')
        gameRecord.gamerOneWin += 1
        gamerOneWinTimes.value = gameRecord.gamerOneWin 
        break
      case -1:
        gameBtnList.classList.add('d-none')
        displayWinner.classList.remove('d-none') 
        winnerCross.classList.remove('d-none')
        gameRecord.gamerTwoWin += 1
        gamerTwoWinTimes.value = gameRecord.gamerTwoWin 
        break
      case null:
        step += 1
        break
    }
    if (step === 9) {
      gameBtnList.classList.add('d-none')
      displayWinner.classList.remove('d-none') 
      displayWinner.classList.add('custom__winner--draw') 
      winnerDraw.classList.remove('d-none')
    }
    localStorage.setItem('WebGameRecord', JSON.stringify(gameRecord))
  }
  this.getWebGameRecord = () => {
    let WebGameRecord = JSON.parse(localStorage.getItem('WebGameRecord')) 
    gameRecord = WebGameRecord || gameRecord  
    gamerOneWinTimes.value = gameRecord.gamerOneWin 
    gamerTwoWinTimes.value = gameRecord.gamerTwoWin 
  }
}
const newGame = new game()
gameStart.addEventListener('click', () => {
  backGround.classList.add('bg-secondary')
  backGround.classList.remove('bg-dark')
  displayMain.classList.add('d-none')
  displayGame.classList.remove('d-none')
  newGame.getWebGameRecord()
})
gameBtnAll.forEach( item => {
  item.addEventListener('click', newGame.play)
})
gameRestart.addEventListener('click', newGame.init)