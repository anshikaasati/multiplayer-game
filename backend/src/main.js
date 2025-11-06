// src/main.js
const { createMatch, makeMove } = require("./ticTacToe");
const { findMatch } = require("./matchmaking");

// RPC to create or find a match
function rpcFindOrCreateMatch(ctx, logger, nk, payload) {
  const playerId = ctx.user_id;
  const matchId = findMatch(playerId);

  if (matchId) {
    return { matchId };
  } else {
    return { waiting: true };
  }
}

// RPC to make a move
function rpcMakeMove(ctx, logger, nk, payload) {
  const { matchId, x, y } = JSON.parse(payload);
  const playerId = ctx.user_id;

  const result = makeMove(playerId, matchId, x, y);
  return result;
}

// Register RPCs
function InitModule(ctx, logger, nk, initializer) {
  initializer.registerRpc("find_or_create_match", rpcFindOrCreateMatch);
  initializer.registerRpc("make_move", rpcMakeMove);
}

module.exports = { InitModule };
