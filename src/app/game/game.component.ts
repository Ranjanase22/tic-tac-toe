import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, HomeComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer: string = 'X';
  winner: string | null = null;
  moveCount: number = 0;
  gameMode: 'player' | 'computer' | null = null;

  constructor(private router: Router) { }

  startGame(mode: 'player' | 'computer'): void {
    this.gameMode = mode;
    this.resetGame();
  }

  makeMove(row: number, col: number): void {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      this.moveCount++;
      this.checkForGameEnd();
    }
  }

  checkForGameEnd(): void {
    const winner = this.checkWinner();
    if (winner) {
      if (winner === 'X') {
        this.winner = this.gameMode === 'computer' ? 'You win!' : 'X wins!';
      } else if (winner === 'O') {
        this.winner = this.gameMode === 'computer' ? 'Computer wins!' : 'O wins!';
      } else {
        this.winner = 'It\'s a draw!';
      }
      if (winner !== 'Draw') {
        this.triggerConfetti();
      }
    } else if (this.moveCount === 9) {
      this.winner = 'Draw';
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      if (this.gameMode === 'computer' && this.currentPlayer === 'O') {
        setTimeout(() => this.computerMove(), 500);
      }
    }
  }

  computerMove(): void {
    const bestMove = this.findBestMove();
    this.makeMove(bestMove.row, bestMove.col);
  }

  findBestMove(): { row: number, col: number } {
    let bestScore = -Infinity;
    let move = { row: 0, col: 0 };

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (!this.board[row][col]) {
          this.board[row][col] = 'O';
          const score = this.minimax(this.board, false);
          this.board[row][col] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { row, col };
          }
        }
      }
    }
    return move;
  }

  minimax(board: string[][], isMaximizing: boolean): number {
    const scores: { [key: string]: number } = { 'X': -10, 'O': 10, 'Draw': 0 };
    const winner = this.checkWinner();
    if (winner) {
      return scores[winner] || 0;
    }

    if (this.isBoardFull(board)) {
      return 0;
    }

    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (!board[row][col]) {
          board[row][col] = isMaximizing ? 'O' : 'X';
          const score = this.minimax(board, !isMaximizing);
          board[row][col] = '';
          bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }

  isBoardFull(board: string[][]): boolean {
    return board.flat().every(cell => cell !== '');
  }

  checkWinner(): string | null {
    const winningCombinations = [
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]]
    ];

    for (const combination of winningCombinations) {
      if (combination.every(cell => cell === 'X')) {
        return 'X';
      }
      if (combination.every(cell => cell === 'O')) {
        return 'O';
      }
    }

    return this.isBoardFull(this.board) ? 'Draw' : null;
  }

  resetGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.winner = null;
    this.moveCount = 0;
  }

  triggerConfetti(): void {
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
      colors: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93']
    });
  }

  goHome(): void {
    this.router.navigate(['/']); // Navigate to the home page
  }
}
