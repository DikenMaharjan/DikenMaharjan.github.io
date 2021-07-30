
export const createGameState = (round, turn, ready, drawerName, drawerId, chosenWord) => {
    let tempGameState = {};
    tempGameState.round = round;
    tempGameState.turn = turn;
    tempGameState.ready = ready;
    tempGameState.drawerName = drawerName;
    tempGameState.drawerId = drawerId;
    tempGameState.chosenWord = chosenWord;
    tempGameState.hintsShown = 0;
    tempGameState.dottedWord = -1;
    return tempGameState;
}



export const createPlayer = (name, host, socketId) => {
    var player = {};
    player.name = name;
    player.score = 0;
    player.answered = false;
    player.host = host;
    player.socketId = socketId;
    return player;
};

export const createMessage = (name, message, correctAnswer, firstTimeAnswer, alreadyAnswered) => {
    let tempMessage = {}
    tempMessage.name = name;
    tempMessage.message = message;
    tempMessage.correctAnswer = correctAnswer;
    tempMessage.firstTimeAnswer = firstTimeAnswer;
    tempMessage.alreadyAnswered = alreadyAnswered;
    return tempMessage;
}
