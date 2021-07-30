import * as myConstants from "./libs/constant.js"
import * as creator from "./libs/creator.js"
import * as helper from "./libs/helper.js"


import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";


const PORT = process.env.PORT || 3035
var app = express();
const server = http.createServer(app);

var io = new Server(server);

app.set('port', PORT);


//CONNECTION INFORMATION
var connInf = {

}

//FOR STORING THE ROOM OF THE SOCKET
var socketRooms = {

}






const chooseWord = (room) => {
  let drawerID = connInf[room].gameState.drawerId;
  io.to(drawerID).emit("chooseWordTimer", 15);
  io.to(room).emit("chooseWord",
    drawerID,
    helper.getRandomWord(),
    helper.getRandomWord(),
    helper.getRandomWord()
  )
  startChooseWordTimer(drawerID);
}

function startChooseWordTimer(drawerID) {
  let room = socketRooms[drawerID];
  io.to(room).emit("roundInformation",
    connInf[room].gameState.drawerName,
    connInf[room].gameState.round + 1,
    myConstants.rounds[connInf[room].gameInformations.rounds]);
  connInf[room].chooseRemainingTime = 15;
  connInf[room].chooseTimer = setInterval(() => {
    connInf[room].chooseRemainingTime -= 1;
    io.to(drawerID).emit("chooseWordTimer", connInf[room].chooseRemainingTime);
    if (connInf[room].chooseRemainingTime <= 0) {
      clearInterval(connInf[room].chooseTimer);
      io.to(drawerID).emit("timeFinished");
    }
  }, 1000)

}

function startGameTimer(room) {
  //connInf[room].gameRemainingTime = myConstants.time[connInf[room].gameInformations.time];
  connInf[room].gameRemainingTime = 10;

  connInf[room].gameTimer = setInterval(() => {
    let remainingTime = connInf[room].gameRemainingTime;
    remainingTime -= 1;
    connInf[room].gameRemainingTime = remainingTime;
    io.to(room).emit("gameTimer", remainingTime);
    if (connInf[room].gameState.hintsShown == 0) {
      let hint = helper.dottedWord(connInf[room].gameState.chosenWord, connInf[room].gameState.dottedWord);
      io.to(room).emit("yourHint", hint, connInf[room].gameState.drawerId);
      connInf[room].gameState.dottedWord = hint;
      connInf[room].gameState.hintsShown += 1;
    }
    if (remainingTime <= 50 && connInf[room].gameState.hintsShown == 1) {
      let hint = helper.dottedWord(connInf[room].gameState.chosenWord, connInf[room].gameState.dottedWord);
      io.to(room).emit("yourHint", hint, connInf[room].gameState.drawerId);
      connInf[room].gameState.dottedWord = hint;
      connInf[room].gameState.hintsShown += 1;
    }

    if (remainingTime <= 20 && connInf[room].gameState.hintsShown == 2
      & connInf[room].gameState.chosenWord.length > 3) {
      let hint = helper.dottedWord(connInf[room].gameState.chosenWord, connInf[room].gameState.dottedWord);
      io.to(room).emit("yourHint", hint, connInf[room].gameState.drawerId);
      connInf[room].gameState.dottedWord = hint;
      connInf[room].gameState.hintsShown += 1;
    }

    if (remainingTime <= 0) {

      showScore(room);

    }

  }, 1000);
}

function showScore(room) {
  clearInterval(connInf[room].gameTimer);
  let word = connInf[room].gameState.chosenWord;
  connInf[room].gameState.chosenWord = null;

  let allIds = Object.keys(connInf[room].allPlayers);
  let totalPlayers = allIds.length;

  allIds.forEach((id) => {

    if (!(id in connInf[room].answered)) {
      connInf[room].answered[id] = 0
    }
  });

  let finalScore = {
    nameList: [],
    scoreList: []
  };
  let totalTime = myConstants.time[connInf[room].gameInformations.time];

  let idArray = Object.keys(connInf[room].answered);
  let sumOfTime = 0;


  for (let i = 1; i < idArray.length; i++) {
    if (connInf[room].answered[idArray[i]] == 0) {
      finalScore.nameList.push(connInf[room].allPlayers[idArray[i]].name);
      finalScore.scoreList.push(0);
    } else {
      finalScore.nameList.push(connInf[room].allPlayers[idArray[i]].name);
      finalScore.scoreList.push(Math.round(((connInf[room].answered[idArray[i]] + (totalTime / 2)) / totalTime) * 350 - (i * 25)));
    }
    sumOfTime += connInf[room].answered[idArray[i]];
  }
  finalScore.nameList.push(connInf[room].allPlayers[idArray[0]].name);
  finalScore.scoreList.push(Math.round(sumOfTime / (totalPlayers * totalTime) * finalScore.scoreList[0]));


  io.to(room).emit("showScore", JSON.stringify(finalScore), word);
  connInf[room].answered = {};
  connInf[room].scoreTimer = setTimeout(() => {
    io.to(room).emit("hideScore");
    let totalRounds = myConstants.rounds[connInf[room].gameInformations.rounds];
    let totalPlayers = connInf[room].numberOfPlayers;
    let initialTurn = connInf[room].gameState.turn;
    let initialRound = connInf[room].gameState.round;
    let finalRound;
    let finalTurn;
    if (initialTurn >= totalPlayers - 1) {
      finalTurn = 0;
      finalRound = initialRound + 1;
    } else {
      finalTurn = initialTurn + 1;
      finalRound = initialRound;
    }
    io.to(room).emit(myConstants.RENEW_BOARD);
    if (finalRound == totalRounds) {
      io.to(room).emit("gameFinished");
    } else {
      connInf[room].gameState = creator.createGameState
        (
          finalRound, finalTurn, true,
          connInf[room].allPlayers[connInf[room].playerTurns[finalTurn]].name,
          connInf[room].playerTurns[finalTurn],
          null
        )
      chooseWord(room);
    }

  }, 5000);


}

io.on("connection", (socket) => {

  console.log("Connected");

  socket.on("message", (text, time) => {
    let room = socketRooms[socket.id];
    let name = connInf[room].allPlayers[socket.id].name;
    let chosenWord = connInf[room].gameState.chosenWord;
    if (chosenWord != null) {
      if (connInf[room].answered.hasOwnProperty(socket.id)) {

        if (text.toLowerCase().includes(chosenWord.toLowerCase())) {
          let message = creator.createMessage(name, "Your message contains answer.", true, false, true);
          io.to(socket.id).emit("yourMessage", JSON.stringify(message));
        } else {
          let message = creator.createMessage(name, text, false, true, true);
          io.to(room).emit("yourMessage", JSON.stringify(message));
        }
      }
      else {
        if (text.toLowerCase() == chosenWord.toLowerCase()) {
          let message = creator.createMessage(name, " guessed the word.", true, true, false);
          io.to(room).emit("yourMessage", JSON.stringify(message));
          connInf[room].answered[socket.id] = parseInt(time);
          if (Object.keys(connInf[room].answered).length == connInf[room].numberOfPlayers) {
            showScore(room);
          }
        }
        else {
          let message = creator.createMessage(name, text, false, false, false);
          io.to(room).emit("yourMessage", JSON.stringify(message));
        }

      }
    }
    else {
      let message = creator.createMessage(name, text, false, false, false);
      io.to(room).emit("yourMessage", JSON.stringify(message));
    }
  })

  socket.on(myConstants.DRAWER_CLEAR, () => {
    socket.to(socketRooms[socket.id]).emit(myConstants.RECEIVER_CLEAR);
  })


  socket.on(myConstants.DRAWER_UNDO, () => {
    socket.to(socketRooms[socket.id]).emit(myConstants.RECEIVER_UNDO);
  })

  socket.on(myConstants.DRAWER_CURRENT_SEG_VALUES, (currentSegmentValues) => {
    socket.to(socketRooms[socket.id]).emit(myConstants.RECEIVER_CURRENT_SEG_VALUES,
      currentSegmentValues);
  })

  socket.on(myConstants.DRAWER_CURRENT_SEG_POINTS, (currentSegmentPoints) => {
    socket.to(socketRooms[socket.id]).emit(myConstants.RECEIVER_CURRENT_SEG_POINTS,
      currentSegmentPoints);
  })

  socket.on(myConstants.DRAWER_CLEAR_CURRENT_POINTS, () => {
    socket.to(socketRooms[socket.id]).emit(myConstants.RECEIVER_CLEAR_CURRENT_POINTS);
  })


  socket.on(myConstants.DRAWER_HEIGHT, (height) => {
    socket.to(socketRooms[socket.id]).emit(myConstants.RECEIVER_HEIGHT, height);
  })
  socket.on(myConstants.DRAWER_WIDTH, (width) => {
    socket.to(socketRooms[socket.id]).emit(myConstants.RECEIVER_WIDTH, width);
  });

  socket.on(myConstants.DRAWER_SEGMENTS, currentSegment => {
    socket.to(socketRooms[socket.id]).emit(myConstants.RECEIVER_SEGMENTS, currentSegment);
  })


  socket.on("getGameState", () => {
    socket.emit("gameState", JSON.stringify(connInf[socketRooms[socket.id]].gameState));
  })


  socket.on("newCode", (room, host, codeExists) => {
    if (io.sockets.adapter.rooms.get(room)) {
      codeExists(true);
    } else {
      if (host) {
        connInf[room] = {
          allPlayers: {},
          numberOfPlayers: 0,
          playerTurns: [],
          numOfReady: 0,
          gameState: {},
          answered: {}
        }
      }
      codeExists(false);
    }
  });

  socket.on("createPlayer", (name, host, room, callback) => {
    let p = creator.createPlayer(
      name,
      host,
      socket.id
    );

    socketRooms[socket.id] = room;
    connInf[room].allPlayers[socket.id] = p;
    connInf[room].numberOfPlayers += 1;
    connInf[room].playerTurns.push(socket.id);

    socket.join(room);
    callback(JSON.stringify(p));
    io.to(room).emit("allPlayers", connInf[room].allPlayers);
  });

  socket.on("setGameInformation", (gameInfo) => {
    connInf[socketRooms[socket.id]].gameInformations = JSON.parse(gameInfo);
  });

  socket.on("getGameInformation", (callback) => {
    callback(JSON.stringify(connInf[socketRooms[socket.id]].gameInformations));
  });


  socket.on("rounds", (position) => {
    let room = socketRooms[socket.id];
    connInf[room].gameInformations.rounds = position;
    connInf[room].gameInformations.started = false;

    io.to(room).emit("roundsChanged", position);
  });

  socket.on("time", (position) => {
    let room = socketRooms[socket.id];
    connInf[room].gameInformations.time = position;
    connInf[room].gameInformations.started = false;

    io.to(room).emit("timeChanged", position);

  });

  socket.on("startGame", (start) => {
    let room = socketRooms[socket.id];
    connInf[room].gameInformations.started = start;
    socket.to(room).emit("startChanged", start);
    connInf[room].gameState = creator.createGameState(
      0,
      0,
      false,
      connInf[room].allPlayers[connInf[room].playerTurns[0]].name,
      connInf[room].playerTurns[0],
      null
    )


  });

  socket.on("ready", () => {
    let room = socketRooms[socket.id];
    connInf[room].numOfReady += 1;
    if (connInf[room].gameState.ready == false) {
      if (connInf[room].numOfReady == connInf[room].numberOfPlayers) {
        chooseWord(room);
        connInf[room].gameState.ready = true;
      }
    }
  })

  socket.on("wordChosen", (word) => {
    let room = socketRooms[socket.id];
    clearInterval(connInf[room].chooseTimer);
    io.to(room).emit("gameStarted", socket.id);
    io.to(room).emit("gameTimer", myConstants.time[connInf[room].gameInformations.time]);
    connInf[room].gameState.chosenWord = word;
    connInf[room].answered[socket.id] = -1;
    startGameTimer(room);
  })

  socket.on("disconnect", (reason) => {
    let room = socketRooms[socket.id];
    if (room) {
      delete connInf[room].allPlayers[socket.id];
      connInf[room].playerTurns.splice(connInf[room].playerTurns.indexOf(socket.id), 1);
      connInf[room].numberOfPlayers -= 1;
      connInf[room].numOfReady -= 1;
      if (connInf[room].numberOfPlayers == 0) {
        clearInterval(connInf[room].chooseTimer);
        clearInterval(connInf[room].gameTimer);
        clearTimeout(connInf[room].scoreTimer);
        delete connInf[room];
      } else {
        io.to(room).emit("allPlayers", connInf[room].allPlayers);
      }
      delete socketRooms[socket.id];
    }
    console.log(reason);
  });


})



server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});