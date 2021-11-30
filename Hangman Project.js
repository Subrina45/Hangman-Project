function getWords(cb) {                            
    cb(['bacon', 'teacher', 'automobile'])           
  }
  export default function getRandomWord(cb) {
    getWords(words => {                                                    
  
      const randomWord = words[Math.floor(Math.random() * words.length)]   
      cb(randomWord.toUpperCase())                                         
    })
  }
const MAX_INCORRECT_GUESSES = 5                                           

export function guessesRemaining(word, guesses) {
  const incorrectGuesses = guesses.filter(char => !word.includes(char))   
  return MAX_INCORRECT_GUESSES - incorrectGuesses.length
}

export function isGameWon(word, guesses) {
  return !word.split('').find(letter => !guesses.includes(letter))        
}

export function isGameOver(word, guesses) {
  return !guessesRemaining(word, guesses) && !isGameWon(word, guesses)    
}

export function isStillPlaying(word, guesses) {
  return guessesRemaining(word, guesses) &&
         !isGameOver(word, guesses) &&
         !isGameWon(word, guesses)                                        
}
import * as status from './status'                                        

function getMessage(word, guesses) {
  if (status.isGameWon(word, guesses)) {                                  
    return 'YOU WIN!'
  } else if (status.isGameOver(word, guesses)) {                          
    return 'GAME OVER'
  } else {
    return `Guesses Remaining: ${status.guessesRemaining(word, guesses)}`
  }
}

export default function statusDisplay(word, guesses) {
  return `<div>${getMessage(word, guesses)}</div>`
}
function letterSlot(letter, guesses) {
    if (guesses.includes(letter)) {
      return `<span>${letter}</span>`
    } else {
      return '<span>&nbsp;</span>'
    }
  }
  
  export default function letterSlots(word, guesses) {
    const slots = word.split('').map(letter => letterSlot(letter, guesses))
  
    return `<div>${ slots.join('') }</div>`
  }
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')                   

  const firstRow = alphabet.slice(0, 13)                                    
  const secondRow = alphabet.slice(13)                                      
  
  function key(letter, guesses) {
    if (guesses.includes(letter)) {
      return `<span>${letter}</span>`                                       
    } else {
      return `<button data-char=${letter}>${letter}</button>`               
    }
  }
  
  export default function keyboard(guesses) {
    return `
      <div>
        <div>${ firstRow.map(char => key(char, guesses)).join('') }</div>   5
        <div>${ secondRow.map(char => key(char, guesses)).join('') }</div>  5
      </div>
    `
  }
import getRandomWord from './words'
import { isStillPlaying } from './status'
import letterSlots from './letter_slots'
import keyboard from './keyboard'
import statusDisplay from './status_display'
function drawGame(word, guesses) {
    document.querySelector('#status-display').innerHTML =
    statusDisplay(word, guesses)
    document.querySelector('#letter-slots').innerHTML =
    letterSlots(word, guesses)
    document.querySelector('#keyboard').innerHTML = keyboard(guesses)
  }
  getRandomWord(word => {                                                      
    const guesses = []                                                         
  
    document.addEventListener('click', event => {                              
      if (isStillPlaying(word, guesses) && event.target.tagName === 'BUTTON') {
        guesses.push(event.target.dataset.char)                                
        drawGame(word, guesses)                                                
      }
    })
  
    drawGame(word, guesses)                                                    
  })