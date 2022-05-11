import React, { useEffect } from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App(){
  const [dices, setDices] = React.useState(allNewDice()) 
  const [tenzies, setTenzies] = React.useState(false)
  const [numOfRoll, setNumOfRoll] = React.useState(0)
  
  React.useEffect(() => {
    const allHeld = dices.every(die => die.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    } else {
      setTenzies(false)
    }
  }, [dices])


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDices = []
    for(let i = 0; i < 10; i++){
      newDices.push(generateNewDie())
    }
    return newDices;
  }

  function rollDice() {
    if(tenzies){
    setDices(allNewDice)
    setNumOfRoll(0)
    } else{
      setNumOfRoll(old => old + 1)
      setDices(oldDices => oldDices.map(dice => {
        return dice.isHeld ? 
        dice :
        generateNewDie()
      }))
  }
  }

  function holdDice(id) {
    setDices(oldDices => oldDices.map(dice => {
      return dice.id === id ? 
      {...dice, isHeld: !dice.isHeld} :
       dice
    }))
  }
  
  const diceElements = dices.map(die => (
      <Die handle={() => holdDice(die.id)} key={die.id} value={die.value} hold={die.isHeld}/>
  ))


  

  

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are 
            the same. Click each die to freeze it at its current 
            value between rolls.</p>
      <div className="container-die">
      {diceElements}
      </div>
        <button className="rollDice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        <h2 className="roll-amount">Num of Roll: {numOfRoll}</h2>
    </main>

  )
}