import React, { useEffect, useState } from 'react'
import Square from './Square'

const Board = () => {
  const [state, setstate] = useState(Array(9).fill(null));
  const [isXTurn, setisXTurn] = useState(true)
  const  [winCount , setWinCount] = useState({
    X:0,
    O:0
  })
  const [lossCount, setLossCount] = useState({
    X:0,
    O:0
  })
 
  useEffect(()=>{
    const Xwins = parseInt(localStorage.getItem('xWins') || '0');
    const Owins = parseInt(localStorage.getItem('oWins') || '0');
    const XLoss = parseInt(localStorage.getItem('xLosses') || '0');
    const OLoss = parseInt(localStorage.getItem('oLosses') || '0');
  
    setWinCount({ X: Xwins, O: Owins });
    setLossCount({ X: XLoss, O: OLoss });
  },[]);

  const checkWinner = ()=>{
    const winnerLogic = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for(let logic of winnerLogic){
      const [a,b,c] = logic;
      if(state[a] !== null && state[a] === state[b] && state[a] === state[c] ){
        return state[a]
      }
    }
    return null
  }
  const isWinner = checkWinner()

  const handleGameEnd = (winner) => {
    if (winner) {
      const updatedWinCount = { ...winCount };
      const updatedLossCount = { ...lossCount };
  
      updatedWinCount[winner] += 1;
      updatedLossCount[winner === 'X' ? 'O' : 'X'] += 1;
  
      localStorage.setItem('xWins', updatedWinCount.X);
      localStorage.setItem('oWins', updatedWinCount.O);
      localStorage.setItem('xLosses', updatedLossCount.X);
      localStorage.setItem('oLosses', updatedLossCount.O);
  
      setWinCount(updatedWinCount);
      setLossCount(updatedLossCount);
  
      // Optionally reset the game board after a win
    }
  };

  useEffect(() => {
    if (isWinner) {
      handleGameEnd(isWinner);
    }
  }, [isWinner]);

  const HandleClick = (index)=>{
    if(state[index] || isWinner)return;
    const copyState = [...state]
    copyState[index] = isXTurn ? "X" : "O"
    setstate(copyState)
    setisXTurn(!isXTurn)
  }

  const resetGame = () => {
    setstate(Array(9).fill(null));
    setisXTurn(true);
  };

  return (
  <div className='w-full h-full flex items-center justify-center bg-black text-white flex-col shadow-lg glassmorphism' style={{ backdropFilter: 'blur(10px)' }}>
     <h1 className='text-3xl font-bold mb-10'>
      TIC TAC TOE
     </h1>
     <div className="mb-4">
        <p>Player X Wins: {winCount.X} | Losses: {lossCount.X}</p>
        <p>Player O Wins: {winCount.O} | Losses: {lossCount.O}</p>
      </div>
      
      <div className='board-container flex flex-col items-center justify-center gap-10 w-[50%] h-[70%] p-6 bg-teal-900 rounded-xl shadow-lg glassmorphism' style={{ backdropFilter: 'blur(10px)' }}>
      {isWinner ? (
        <div className='text-center text-3xl font-bold '>
          The winner is : {isWinner}
        </div>
      ):(
        <>
          <div className="board-row flex gap-10 w-full h-1/3">
            <Square onClick={()=>HandleClick(0)} value={state[0]}/>
            <Square onClick={()=>HandleClick(1)} value={state[1]}/>
            <Square onClick={()=>HandleClick(2)} value={state[2]}/>
          </div>
          <div className="board-row flex gap-10 w-full h-1/3">
            <Square onClick={()=>HandleClick(3)} value={state[3]}/>
            <Square onClick={()=>HandleClick(4)} value={state[4]}/>
            <Square onClick={()=>HandleClick(5)} value={state[5]}/>
          </div>
          <div className="board-row flex gap-10 w-full h-1/3">
            <Square onClick={()=>HandleClick(6)} value={state[6]}/>
            <Square onClick={()=>HandleClick(7)} value={state[7]}/>
            <Square onClick={()=>HandleClick(8)} value={state[8]}/>
          </div>
        </>
      )}
    </div>
    <button onClick={resetGame} className="mt-4 p-2 bg-blue-500 rounded">Reset Game</button>

  </div>
  )
}

export default Board
