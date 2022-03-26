var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var Angel = require("./Angel");
var Virus = require("./Virus");
var Monster = require("./Monster");
let random = require('./random');

matrix = []
grassArr = [];
grassEaterArr = [];
monsterArr = [];
angelArr = [];
virusArr = [];
//var creatureArr = [];

function generator(matrixSize, grass, grassEater, monster, angel, virus){
  for(let i = 0; i < matrixSize; i++){
    matrix.push([]);
    for (let j = 0; j < matrixSize; j++) {
      matrix[i].push(0);
    }
  }
  for (let i = 0; i < grass; i++) {
    const x = Math.round(Math.random() * (matrixSize - 1));
    const y = Math.round(Math.random() * (matrixSize - 1));
    matrix[y][x] = 1;
    grassArr.push(new Grass(x, y));
  }
  for (let i = 0; i < grassEater; i++) {
    const x = Math.round(Math.random() * (matrixSize - 1));
    const y = Math.round(Math.random() * (matrixSize - 1));
    matrix[y][x] = 2;
    grassEaterArr.push(new GrassEater(x, y));
  }
  for (let i = 0; i < monster; i++) {
    const x = Math.round(Math.random() * (matrixSize - 1));
    const y = Math.round(Math.random() * (matrixSize - 1));
    matrix[y][x] = 3;
    monsterArr.push(new Monster(x, y));
  }
  for (let i = 0; i < angel; i++) {
    const x = Math.round(Math.random() * (matrixSize - 1));
    const y = Math.round(Math.random() * (matrixSize - 1));
    matrix[y][x] = 4;
    angelArr.push(new Angel(x, y));
  }
  for (let i = 0; i < virus; i++) {
    const x = Math.round(Math.random() * (matrixSize - 1));
    const y = Math.round(Math.random() * (matrixSize - 1));
    matrix[y][x] = 5;
    virusArr.push(new Virus(x, y));
  }
  // for (let i = 0; i < creature; i++) {
  //   const x = Math.round(Math.random() * (matrixSize - 1));
  //   const y = Math.round(Math.random() * (matrixSize - 1));
  //   matrix[y][x] = 5;
  //   creature.push(new LivingCreature(x, y));
  // }
}

generator(30, 15, 40, 10, 20, 5);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


function creatingObjects() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
          var grass = new Grass(x, y);
          grassArr.push(grass);
      }
      else if (matrix[y][x] == 2) {
          var grassEater = new GrassEater(x, y);
          grassEaterArr.push(grassEater);
      }
      else if (matrix[y][x] == 3) {
        var monster = new Monster(x, y);
        monsterArr.push(monster);
      }
      else if (matrix[y][x] == 4) {
        var angel = new Angel(x, y);
        angelArr.push(angel);
      }
      else if (matrix[y][x] == 5) {
        var virus = new Virus(x, y);
        virusArr.push(virus);
      }
    }
  }
}

creatingObjects();

function game() {
  if (grassArr[0] !== undefined) {
      for (var i in grassArr) {
          grassArr[i].mul();
      }
  }
  if (grassEaterArr[0] !== undefined) {
      for (var i in grassEaterArr) {
          grassEaterArr[i].eat();
      }
  }
  if (monsterArr[0] !== undefined) {
    for (var i in monsterArr) {
      monsterArr[i].eat();
    }
  }
  if (angelArr[0] !== undefined) {
    for (var i in angelArr) {
      angelArr[i].eat();
    }
  }
  if (virusArr[0] !== undefined) {
    for (var i in virusArr) {
      virusArr[i].eat();
    }
  }

  //! Object to send
  let sendData = {
      matrix: matrix,
      grassCounter: grassArr.length,
      grassEaterCounter: grassEaterArr.length,
      monsterCounter: monsterArr.length,
      angelCounter: angelArr.length,
      virusCounter: virusArr.length
  }

  //! Send data over the socket to clients who listens "data"
  io.sockets.emit("data", sendData);
}



setInterval(game, 100)

// function kill() {
//   grassArr = [];
//   grassEaterArr = []
//   meatEaterArr = []
//   allEaterArr = []
//   hunterArr = []
//   for (var y = 0; y < matrix.length; y++) {
//       for (var x = 0; x < matrix[y].length; x++) {
//           matrix[y][x] = 0;
//       }
//   }
//   io.sockets.emit("send matrix", matrix);
// }
// ////   Create static Json
// var statistics = {};

// setInterval(function () {
//   statistics.grass = grassArr.length;
//   statistics.grassEater = grassEaterArr.length;
//   fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
//   })
// }, 1000)
