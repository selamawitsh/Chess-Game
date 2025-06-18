import React from 'react'
import Square from './Square'
import '../styles/ChessBoard.css' 
import { useState } from 'react';

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

    const [board, setBoard] = useState(initialBoard);
    const [selectedSquare, setSelectedSquare] = useState(null); 

    function handleSquareClick(row, col) {
  const clickedPiece = board[row][col];

  if (selectedSquare) {
    // A piece is already selected — try to move
    const newBoard = board.map(r => [...r]); // deep copy

    const { row: fromRow, col: fromCol } = selectedSquare;

    newBoard[row][col] = board[fromRow][fromCol]; // move piece
    newBoard[fromRow][fromCol] = null; // clear old square

    setBoard(newBoard);
    setSelectedSquare(null); // clear selection
  } else if (clickedPiece) {
    // No selection yet, so select this piece
    setSelectedSquare({ row, col });
  }
}

           
  return (
    <div className="board">
        {
            board.map((row, i)=>
            row.map((piece,j)=>{
                const isDark= (i+j) %2 ===1;
                const isSelected = selectedSquare?.row === i && selectedSquare?.col === j;

                return(
                    <Square 
                        isDark={isDark}
                        iconClass={piece}
                        key={`${i}-${j}`}
                        onClick={() => handleSquareClick(i, j)}
                        isSelected={isSelected}
                    />
                )
            })
        )
        }
        </div>
  )
}

export default ChessBoard
