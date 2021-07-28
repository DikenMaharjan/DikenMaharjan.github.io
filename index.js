// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))



const PORT = process.env.PORT || 5000
const express = require('express');
const path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', PORT);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

console.log("outside io");

var chooseWordTimer;
var gameTimer;

var answered = {};
var allPlayers = {};
var socketPlusRooms = {};
var gameInformations = {};
var numberOfPlayers = {};
var playerTurns = {};
var numOfReady = {};
var gameState = {};


const createGameState = (round, turn, ready, drawerName, drawerId, chosenWord) => {
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


function startChooseWordTimer(id) {
  remainingTime = 15;
  chooseWordTimer = setInterval(() => {
    remainingTime -= 1;
    io.to(id).emit("chooseWordTimer", remainingTime);
    if (remainingTime <= 0) {
      clearInterval(chooseWordTimer);
      io.to(id).emit("timeFinished");

    }
  }, 1000);
}

function dottedWord(word, dashedWord) {
  ans = ''
  if (dashedWord == '-1') {
    for (i = 0; i < word.length; i++) {
      if (word.charAt(i) != ' ') {
        ans += '_ ';
      } else {

        ans += '  ';
      }
    }
  } else {

    randomIndex = Math.floor(Math.random() * word.length) * 2;

    while (dashedWord.charAt(randomIndex) != '_') {
      randomIndex = Math.floor(Math.random() * word.length) * 2;
    }
    for (i = 0; i < dashedWord.length; i++) {
      if (i != randomIndex) {
        ans += dashedWord.charAt(i);
      } else {
        ans += word.charAt(i / 2);
      }
    }
  }
  return ans;
}



function startGameTimer(room) {

  remainingTime = time[gameInformations[room].time];
  gameTimer = setInterval(() => {
    remainingTime -= 1;
    io.to(room).emit("gameTimer", remainingTime);
    if (gameState[room].hintsShown == 0) {
      hint = dottedWord(gameState[room].chosenWord, gameState[room].dottedWord);
      io.to(room).emit("yourHint", hint, gameState[room].drawerId);
      gameState[room].dottedWord = hint;
      gameState[room].hintsShown += 1

    }
    if (remainingTime <= 50 && gameState[room].hintsShown == 1) {
      hint = dottedWord(
        gameState[room].chosenWord, gameState[room].dottedWord
      );
      io.to(room).emit("yourHint", hint, gameState[room].drawerId);
      gameState[room].dottedWord = hint;
      gameState[room].hintsShown += 1;
    }
    if (remainingTime <= 20 && gameState[room].hintsShown == 2 && gameState[room].chosenWord.length > 3) {
      hint = dottedWord(gameState[room].chosenWord, gameState[room].dottedWord);
      io.to(room).emit("yourHint", hint, gameState[room].drawerId);
      gameState[room].dottedWord = hint;
      gameState[room].hintsShown += 1;
    }
    if (remainingTime <= 0) {
      console.log(room);
      showScore(room);

    }
  }, 1000);
}

function showScore(room) {
  clearInterval(gameTimer);
  word = gameState[room].chosenWord;
  gameState[room].chosenWord = null;

  allIds = Object.keys(allPlayers[room]);
  totalPlayers = allIds.length;
  count = 0
  allIds.forEach((id) => {
    if (!(id in answered[room])) {
      answered[room][id] = 0;
      count += 1;
    }
  });
  numOfAnswers = totalPlayers - count - 1;

  finalScore = {
    nameList: [],
    scoreList: []
  };
  totalTime = time[gameInformations[room].time];

  idArray = Object.keys(answered[room]);
  sumOfTime = 0;
  console.log(answered[room]);

  for (i = 1; i < idArray.length; i++) {
    if (answered[room][idArray[i]] == 0) {
      finalScore.nameList.push(allPlayers[room][idArray[i]].name);
      finalScore.scoreList.push(0);
    } else {
      finalScore.nameList.push(allPlayers[room][idArray[i]].name);
      finalScore.scoreList.push(Math.round(((answered[room][idArray[i]] + (totalTime / 2)) / totalTime) * 350 - (i * 25)));
    }
    sumOfTime += answered[room][idArray[i]];
  }
  finalScore.nameList.push(allPlayers[room][idArray[0]].name);
  finalScore.scoreList.push(Math.round(sumOfTime / (totalPlayers * totalTime) * finalScore.scoreList[0]));

  console.log(finalScore);
  console.log(JSON.stringify(finalScore));
  io.to(room).emit("showScore", JSON.stringify(finalScore), word);
  answered[room] = {};
  setTimeout(() => {
    io.to(room).emit("hideScore");
    totalRounds = rounds[gameInformations[room].rounds];
    totalPlayer = numberOfPlayers[room];
    initialTurn = gameState[room].turn;
    initialRound = gameState[room].round;
    if (initialTurn >= totalPlayers - 1) {
      finalTurn = 0;
      finalRound = initialRound + 1;
    } else {
      finalTurn = initialTurn + 1;
      finalRound = initialRound;
    }
    io.to(room).emit(RENEW_BOARD);
    if (finalRound == totalRounds + 1) {
      io.to(room).emit("gameFinished");
    } else {
      gameState[room] = createGameState(
        finalRound,
        finalTurn,
        true,
        allPlayers[room][playerTurns[room][finalTurn]].name,
        playerTurns[room][finalTurn],
        null
      )
      chooseWord(room);
    }

  }, 5000);

}

const playerCreator = (name, host, socketId) => {
  var player = {};
  player.name = name;
  player.score = 0;
  player.answered = false;
  player.host = host;
  player.socketId = socketId;
  return player;
};

const getRandomWord = () => {
  num = Math.random();
  index = Math.floor(num * WORDS_LIST.length);
  return WORDS_LIST[index];
}


const chooseWord = (room) => {
  io.to(room).emit("chooseWord",
    gameState[room].drawerId,
    getRandomWord(),
    getRandomWord(),
    getRandomWord()
  )
  startChooseWordTimer(gameState[room].drawerId);


}

const createMessage = (name, message, correctAnswer, firstTimeAnswer, alreadyAnswered) => {
  let tempMessage = {}
  tempMessage.name = name;
  tempMessage.message = message;
  tempMessage.correctAnswer = correctAnswer;
  tempMessage.firstTimeAnswer = firstTimeAnswer;
  tempMessage.alreadyAnswered = alreadyAnswered;
  return tempMessage;
}

http.listen(PORT, () => {
  console.log("Server is listening on port ${ PORT }");
});


io.on("connection", (socket) => {


  console.log("Connected");

  socket.on("message", (message, time) => {

    let room = socketPlusRooms[socket.id];
    let name = allPlayers[room][socket.id].name;
    let chosenWord = gameState[room].chosenWord;
    if (chosenWord != null) {
      if (answered[room].hasOwnProperty(socket.id)) {
        if (message.toLowerCase().includes(chosenWord.toLowerCase())) {
          message = createMessage(name, "Your message contains answer.", true, false, true);
          io.to(socket.id).emit("yourMessage", JSON.stringify(message));
        } else {
          message = createMessage(name, message, false, true, true);
          io.to(room).emit("yourMessage", JSON.stringify(message));
        }
      }
      else {
        if (message.toLowerCase() == chosenWord.toLowerCase()) {
          message = createMessage(name, " guessed the word.", true, true, true);
          io.to(room).emit("yourMessage", JSON.stringify(message));
          answered[room][socket.id] = parseInt(time);
          if (Object.keys(answered[room]).length == numberOfPlayers[room]) {
            showScore(room);

          }
        }
        else {
          message = createMessage(name, message, false, false, false);
          io.to(room).emit("yourMessage", JSON.stringify(message));
        }

      }
    }
    else {
      message = createMessage(name, message, false, false, false);
      io.to(room).emit("yourMessage", JSON.stringify(message));
    }
  })

  socket.on(DRAWER_CLEAR, () => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_CLEAR);
  })


  socket.on(DRAWER_UNDO, () => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_UNDO);
  })

  socket.on(DRAWER_CURRENT_SEG_VALUES, (currentSegmentValues) => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_CURRENT_SEG_VALUES,
      currentSegmentValues);
  })

  socket.on(DRAWER_CURRENT_SEG_POINTS, (currentSegmentPoints) => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_CURRENT_SEG_POINTS,
      currentSegmentPoints);
  })

  socket.on(DRAWER_CLEAR_CURRENT_POINTS, () => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_CLEAR_CURRENT_POINTS);
  }
  )


  socket.on(DRAWER_HEIGHT, (height) => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_HEIGHT, height);
  })
  socket.on(DRAWER_WIDTH, (width) => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_WIDTH, width);
  });

  socket.on(DRAWER_SEGMENTS, currentSegment => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_SEGMENTS, currentSegment);
  })

  socket.on("ready", () => {
    numOfReady[socketPlusRooms[socket.id]] += 1;
    if (gameState[socketPlusRooms[socket.id]].ready == false) {
      if (numOfReady[socketPlusRooms[socket.id]] == numberOfPlayers[socketPlusRooms[socket.id]]) {
        chooseWord(socketPlusRooms[socket.id]);
        gameState[socketPlusRooms[socket.id]].ready = true;
      }

    }

  })

  socket.on("wordChosen", (word) => {
    clearInterval(chooseWordTimer);
    io.to(socketPlusRooms[socket.id]).
      emit("gameStarted", socket.id);
    gameState[socketPlusRooms[socket.id]].chosenWord = word;
    answered[socketPlusRooms[socket.id]][socket.id] = -1;
    startGameTimer(socketPlusRooms[socket.id]);

  })

  socket.on("getGameState", () => {
    socket.emit("gameState", JSON.stringify(gameState[socketPlusRooms[socket.id]]));
  })


  socket.on("newCode", (room, host, callback) => {
    if (io.sockets.adapter.rooms.get(room)) {
      callback(true);
    } else {
      if (host) {
        allPlayers[room] = {};
        numberOfPlayers[room] = 0;
        playerTurns[room] = [];
        numOfReady[room] = 0;
        gameState[room] = {};
        answered[room] = {};
      }
      callback(false);
    }
  });

  socket.on("createPlayer", (name, host, room, callback) => {
    let p = playerCreator(
      name,
      host,
      socket.id
    );

    socketPlusRooms[socket.id] = room;
    allPlayers[room][socket.id] = p;
    numberOfPlayers[room] += 1;
    playerTurns[room].push(socket.id);
    console.log(room);

    socket.join(room);
    callback(JSON.stringify(p));
    io.to(room).emit("allPlayers", allPlayers[room]);
  });

  socket.on("setGameInformation", (gameInfo) => {
    gameInformations[socketPlusRooms[socket.id]] = JSON.parse(gameInfo);
  });

  socket.on("getGameInformation", (callback) => {
    callback(JSON.stringify(gameInformations[socketPlusRooms[socket.id]]));
  });
  socket.on("rounds", (position) => {
    gameInformations[socketPlusRooms[socket.id]].rounds = position;
    gameInformations[socketPlusRooms[socket.id]].started = false;

    io.to(socketPlusRooms[socket.id]).emit("roundsChanged", position);
  });

  socket.on("time", (position) => {


    gameInformations[socketPlusRooms[socket.id]].time = position;
    gameInformations[socketPlusRooms[socket.id]].started = false;

    io.to(socketPlusRooms[socket.id]).emit("timeChanged", position);
  });

  socket.on("startGame", (start) => {

    gameInformations[socketPlusRooms[socket.id]].started = start;
    io.to(socketPlusRooms[socket.id]).emit("startChanged", start);
    gameState[socketPlusRooms[socket.id]] = createGameState(
      0,
      0,
      false,
      allPlayers[socketPlusRooms[socket.id]]
      [playerTurns[socketPlusRooms[socket.id]][0]].name,
      playerTurns[socketPlusRooms[socket.id]][0],
      null
    );

  });

  socket.on("disconnect", (reason) => {

    if (socketPlusRooms[socket.id]) {
      delete allPlayers[socketPlusRooms[socket.id]][socket.id];
      playerTurns[socketPlusRooms[socket.id]].splice(playerTurns[socketPlusRooms[socket.id]].indexOf(socket.id), 1);
      numOfReady[socketPlusRooms[socket.id]] -= 1;
      numberOfPlayers[socketPlusRooms[socket.id]] -= 1;
      if (numberOfPlayers[socketPlusRooms[socket.id]] == 0) {
        delete allPlayers[socketPlusRooms[socket.id]];
        delete gameInformations[socketPlusRooms[socket.id]];
        delete playerTurns[socketPlusRooms[socket.id]];
        delete numberOfPlayers[socketPlusRooms[socket.id]];
        delete numOfReady[socketPlusRooms[socket.id]];
        delete gameState[socketPlusRooms[socket.id]];
      }
      io.to(socketPlusRooms[socket.id]).emit("allPlayers", allPlayers[socketPlusRooms[socket.id]]);
      delete socketPlusRooms[socket.id];
    }
    console.log(reason);
  });


})

