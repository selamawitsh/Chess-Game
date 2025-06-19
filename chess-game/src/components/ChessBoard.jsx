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

    const [board, setBoard] = useState(initialBoard);
    const [selectedSquare, setSelectedSquare] = useState(null); 
    const [currentTurn, setCurrentTurn] = useState('white');

  function isValidPawnMove(fromRow, fromCol, toRow, toCol, piece, board) {
      const isWhite = piece.includes('white');
      const direction = isWhite ? -1 : 1;

      const startRow = isWhite ? 6 : 1;
      const target = board[toRow][toCol];

      // 1. Normal move (1 square forward)
      if (toCol === fromCol && toRow === fromRow + direction && !target) {
        return true;
      }

      // 2. First move (2 squares forward)
      if (toCol === fromCol && fromRow === startRow && toRow === fromRow + 2 * direction && !target && !board[fromRow + direction][fromCol]) {
        return true;
      }

      // 3. Diagonal capture
      if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction && target) {
        const isEnemy = isWhite !== target.includes('white');
        if (isEnemy) return true;
      }

      return false;
  }

  function isValidKnightMove(fromRow, fromCol, toRow, toCol, piece, board) {
  const dx = Math.abs(toCol - fromCol);
  const dy = Math.abs(toRow - fromRow);

  const target = board[toRow][toCol];

  // L-shape check (2 + 1)
  const isLShape = (dx === 2 && dy === 1) || (dx === 1 && dy === 2);

  if (!isLShape) return false;

  // If target square is empty, move is valid
  if (!target) return true;

  // If there's a piece, it must be from the opposite team
  const isWhite = piece.includes('white');
  const isEnemy = isWhite !== target.includes('white');
  return isEnemy;
  }

  function isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board) {
  const isSameRow = fromRow === toRow;
  const isSameCol = fromCol === toCol;
  const target = board[toRow][toCol];

  if (!isSameRow && !isSameCol) return false; // must be straight

  const isWhite = piece.includes('white');

  // Determine direction
  const stepRow = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
  const stepCol = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;

  // Check path (exclude the destination square)
  let r = fromRow + stepRow;
  let c = fromCol + stepCol;
  while (r !== toRow || c !== toCol) {
    if (board[r][c]) return false; // path is blocked
    r += stepRow;
    c += stepCol;
  }

  // Check destination
  if (!target) return true;

  const isEnemy = isWhite !== target.includes('white');
  return isEnemy;
}

  function isValidBishopMove(fromRow, fromCol, toRow, toCol, piece, board) {
  const dx = Math.abs(toCol - fromCol);
  const dy = Math.abs(toRow - fromRow);

  if (dx !== dy) return false; // must be perfect diagonal

  const stepRow = toRow > fromRow ? 1 : -1;
  const stepCol = toCol > fromCol ? 1 : -1;

  let r = fromRow + stepRow;
  let c = fromCol + stepCol;

  // Check path for obstructions
  while (r !== toRow && c !== toCol) {
    if (board[r][c]) return false; // path is blocked
    r += stepRow;
    c += stepCol;
  }

  const target = board[toRow][toCol];
  if (!target) return true;

  const isWhite = piece.includes('white');
  const isEnemy = isWhite !== target.includes('white');
  return isEnemy;
}

function isValidQueenMove(fromRow, fromCol, toRow, toCol, piece, board) {
  return (
    isValidRookMove(fromRow, fromCol, toRow, toCol, piece, board) ||
    isValidBishopMove(fromRow, fromCol, toRow, toCol, piece, board)
  );
}

function isValidKingMove(fromRow, fromCol, toRow, toCol, piece, board) {
  const dx = Math.abs(toCol - fromCol);
  const dy = Math.abs(toRow - fromRow);

  if (dx > 1 || dy > 1) return false; // can only move one square

  const target = board[toRow][toCol];
  if (!target) return true;

  const isWhite = piece.includes('white');
  const isEnemy = isWhite !== target.includes('white');
  return isEnemy;
}


  function handleSquareClick(row, col) {
  const clickedPiece = board[row][col];

  if (selectedSquare) {
    const { row: fromRow, col: fromCol } = selectedSquare;
    const pieceToMove = board[fromRow][fromCol];

    // Check if it's a pawn
    const isPawn = pieceToMove.includes('pawn');
     // Check if it's a knight
    const isKnight = pieceToMove.includes('knight');
    // Check if it's a rook
    const isRook = pieceToMove.includes('rook');
    // Check if it's a bishop
    const isBishop = pieceToMove.includes('bishop');
    // Check if it's a queen
    const isQueen = pieceToMove.includes('queen');
    // Check if it's a king
    const isKing = pieceToMove.includes('king');



    let validMove = false;

    if (isPawn && !isValidPawnMove(fromRow, fromCol, row, col, pieceToMove, board)) {
      // Invalid move
      setSelectedSquare(null);
      return;
    }
    else if (isKnight) {
      validMove = isValidKnightMove(fromRow, fromCol, row, col, pieceToMove, board);
    }
    else if (isRook) {
      validMove = isValidRookMove(fromRow, fromCol, row, col, pieceToMove, board);
    }
    else if (isBishop) {
      validMove = isValidBishopMove(fromRow, fromCol, row, col, pieceToMove, board);
    } 
    else if (isQueen) {
      validMove = isValidQueenMove(fromRow, fromCol, row, col, pieceToMove, board);
    } 
     else if (isKing) {
      validMove = isValidKingMove(fromRow, fromCol, row, col, pieceToMove, board);
    }

    if (!validMove) {
      setSelectedSquare(null);
      return;
    }

    // Make a copy of the board
    const newBoard = board.map(r => [...r]);

    // Move the piece
    newBoard[row][col] = pieceToMove;
    newBoard[fromRow][fromCol] = null;

    setBoard(newBoard);
    setSelectedSquare(null);

    // Switch turn
    setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
  } 
  else if (clickedPiece) {
    const isWhite = clickedPiece.includes('white');

    // Check if clicked piece belongs to the player whose turn it is
    if ((currentTurn === 'white' && isWhite) || (currentTurn === 'black' && !isWhite)) {
      setSelectedSquare({ row, col });
    }
  }
}


           
  return (
    <>
    <h2 style={{ textAlign: 'center' }}>Turn: {currentTurn.toUpperCase()}</h2>
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
    </>
    
  )
}

export default ChessBoard
