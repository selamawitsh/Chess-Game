import React from 'react'
import Square from './Square'
import '../styles/ChessBoard.css' 
function ChessBoard() {
   
const initialBoard = [
    ['fas fa-chess-rook', 'fas fa-chess-knight', 'fas fa-chess-bishop', 'fas fa-chess-queen', 'fas fa-chess-king', 'fas fa-chess-bishop', 'fas fa-chess-knight', 'fas fa-chess-rook'],
    Array(8).fill('fas fa-chess-pawn'),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill('fas fa-chess-pawn white'),
    ['fas fa-chess-rook white', 'fas fa-chess-knight white', 'fas fa-chess-bishop white', 'fas fa-chess-queen white', 'fas fa-chess-king white', 'fas fa-chess-bishop white', 'fas fa-chess-knight white', 'fas fa-chess-rook white']
  ];

    //   for (let row=0; row<8 ; row++) {
    //     for (let col=0; col<8; col++){
    //         const isDark = (row + col) % 2 === 1;
    //         board.push(
    //             <Square key={`${row}-${col}`} isDark={isDark} />
    //         );
    //     }
    //   }
           
  return (
    <div className="board">
        {
            initialBoard.map((row, i)=>
            row.map((piece,j)=>{
                const isDark= (i+j) %2 ===1;
                return(
                    <Square 
                        isDark={isDark}
                        iconClass={piece}
                        key={`${i}-${j}`}
                    />
                )
            })
        )
        }
        </div>
  )
}

export default ChessBoard
