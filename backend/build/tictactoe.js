"use strict";
// src/ticTacToe.js
// In-memory storage for simplicity (use DB for production)
const matches = {};
// Initialize a new match
function createMatch(players) {
    const matchId = "match_" + Date.now();
    matches[matchId] = {
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        currentPlayer: "X",
        winner: null,
        players: players,
    };
    return matchId;
}
// Make a move
function makeMove(playerId, matchId, x, y) {
    const match = matches[matchId];
    if (!match)
        return { error: "Match not found" };
    if (match.winner)
        return { error: "Game over" };
    const playerSymbol = match.players[0] === playerId ? "X" : "O";
    if (playerSymbol !== match.currentPlayer)
        return { error: "Not your turn" };
    if (match.board[x][y])
        return { error: "Cell already occupied" };
    match.board[x][y] = playerSymbol;
    match.currentPlayer = match.currentPlayer === "X" ? "O" : "X";
    match.winner = checkWinner(match.board);
    return { matchId, board: match.board, currentPlayer: match.currentPlayer, winner: match.winner };
}
// Check winner
function checkWinner(board) {
    const lines = [
        // rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];
    for (const line of lines) {
        const [a, b, c] = line;
        if (board[a[0]][a[1]] &&
            board[a[0]][a[1]] === board[b[0]][b[1]] &&
            board[a[0]][a[1]] === board[c[0]][c[1]]) {
            return board[a[0]][a[1]];
        }
    }
    // Check draw
    if (board.flat().every(cell => cell !== null))
        return "Draw";
    return null;
}
// Export functions
module.exports = { createMatch, makeMove, matches };
