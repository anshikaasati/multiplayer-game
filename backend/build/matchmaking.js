"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = void 0;
exports.queuePlayer = queuePlayer;
exports.getMatch = getMatch;
const ticTacToe_1 = require("./ticTacToe");
const waitingPlayer = [];
exports.matches = {};
function queuePlayer(playerId) {
    if (waitingPlayer.length > 0) {
        const opponentId = waitingPlayer.shift();
        const matchId = `match_${Date.now()}`;
        exports.matches[matchId] = (0, ticTacToe_1.createGame)([opponentId, playerId]);
        return matchId;
    }
    else {
        waitingPlayer.push(playerId);
        return null; // Waiting for another player
    }
}
function getMatch(matchId) {
    return exports.matches[matchId] || null;
}
