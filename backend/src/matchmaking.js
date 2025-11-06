// src/matchmaking.js
const { createMatch, matches } = require("./ticTacToe");

let waitingPlayer = null;

function findMatch(playerId) {
  if (waitingPlayer) {
    const matchId = createMatch([waitingPlayer, playerId]);
    waitingPlayer = null;
    return matchId;
  } else {
    waitingPlayer = playerId;
    return null; // waiting for next player
  }
}

module.exports = { findMatch, matches };
