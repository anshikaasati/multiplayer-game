"use strict";
const { registerRpc, socketSendMatchState } = require("@heroiclabs/nakama-runtime");
const { queuePlayer, getMatch } = require("./matchmaking");
const { makeMove } = require("./ticTacToe");
registerRpc("find_match", (ctx, logger, nk, payload) => {
    const playerId = ctx.user_id;
    const matchId = queuePlayer(playerId);
    return { matchId };
});
registerRpc("make_move", (ctx, logger, nk, payload) => {
    const { matchId, x, y } = JSON.parse(payload);
    const match = getMatch(matchId);
    if (!match)
        throw new Error('Match not found');
    try {
        const updatedState = makeMove(match, ctx.user_id, x, y);
        match.players.forEach(p => nk.socketSendMatchState(matchId, updatedState, [p]));
        return updatedState;
    }
    catch (err) {
        return { error: err.message };
    }
});
