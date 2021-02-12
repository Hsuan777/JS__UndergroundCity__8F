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
  // 遊戲回合紀錄，遊戲回合、玩家勝利次數
  let gameRecord = {
    times: 0,
    gamerOneWin:0,
    gamerTwoWin:0
  }
  // 遊玩暫存紀錄
  let recordStorage = []
  // 玩家一先開始，代表符號為 Ｏ
  let nowGamer = 1
  // 若達到 9，則為平手
  this.play = (e) => {
    let btnOfvalue = e.target.value
    let record = {
      value: '',
      gamer: 1
    }
    let isClick = []
    recordStorage.forEach( item => {
      isClick.push(item.value)
    })
    if (isClick.indexOf(btnOfvalue) === -1) {
      if (nowGamer === 1) {
        e.target.textContent = 'Ｏ'
        displayGamer.textContent = 'Ｘ TURN!'
        record.value = btnOfvalue
        record.gamer = 1
        recordStorage.push(record)
        vm.isWin()
        nowGamer = 0
      } else {
        e.target.textContent = 'Ｘ'
        displayGamer.textContent = 'Ｏ TURN!'
        record.value = btnOfvalue
        record.gamer = 0
        recordStorage.push(record)
        vm.isWin()
        nowGamer = 1
      }
    }
  }
  this.init = () => {
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
    let top = []
    let center = []
    let bottom = []
    let left = []
    let right = []
    let centerStraight = []
    let slash = []
    let backSlash =[]
    let draw = 1
    recordStorage.forEach( item => {
      switch(item.value){
        case '1':
          top.push(item)
          left.push(item)
          slash.push(item)
          break
        case '2':
          top.push(item)
          centerStraight.push(item)
          break
        case '3':
          top.push(item)
          right.push(item)
          backSlash.push(item)
          break
        case '4':
          center.push(item)
          left.push(item)
          break
        case '5':
          center.push(item)
          centerStraight.push(item)
          slash.push(item)
          backSlash.push(item)
          break
        case '6':
          center.push(item)
          right.push(item)
          break
        case '7':
          left.push(item)
          bottom.push(item)
          backSlash.push(item)
          break
        case '8':
          bottom.push(item)
          centerStraight.push(item)
          break
        case '9':
          bottom.push(item)
          right.push(item)
          slash.push(item)
          break
      }
    })
    const check = (str) => {
      if (str.length === 3 ) {
        let one = str.every(item => {
          return item.gamer === 1
        })
        let two = str.every(item => {
          return item.gamer === 0
        })
        if (one) {
          gameBtnList.classList.add('d-none')
          displayWinner.classList.remove('d-none') 
          winnerCircle.classList.remove('d-none')
          gameRecord.gamerOneWin += 1
          gamerOneWinTimes.value = gameRecord.gamerOneWin 
        } else if (two) {
          gameBtnList.classList.add('d-none')
          displayWinner.classList.remove('d-none') 
          winnerCross.classList.remove('d-none')
          gameRecord.gamerTwoWin += 1
          gamerTwoWinTimes.value = gameRecord.gamerTwoWin 
        } else {
          draw += 1
        }
      }
    }
    check(top)
    check(center)
    check(bottom)
    check(left)
    check(right)
    check(centerStraight)
    check(slash)
    check(backSlash)
    if (draw === 9) {
      gameBtnList.classList.add('d-none')
      displayWinner.classList.remove('d-none') 
      displayWinner.classList.add('custom__winner--draw') 
      winnerDraw.classList.remove('d-none')
    }
    localStorage.setItem('WebGameRecord', JSON.stringify(gameRecord))
  }
  this.getWebGameRecord = () => {
    let WebGameRecord = JSON.parse(localStorage.getItem('WebGameRecord')) 
    gameRecord = WebGameRecord
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