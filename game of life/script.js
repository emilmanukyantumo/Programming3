var matrix = [];
const side = 20;
let socket = io()
function setup() {
  // frameRate(20);

  լետ 
  socket.on('data',drawGame)
  function drawGame(data) {
    console.log(data);
    matrix = data.matrix
    createCanvas(matrix[0].length * side, matrix.length * side);
    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 0) {
          fill("gray");
        } else if (matrix[y][x] == 1) {
          fill("green");
          text("🥬", x * side, y * side, side, side);
        } else if (matrix[y][x] == 2) {
          fill("yellow");
          text("🐐", x * side, y * side, side, side);
        } else if (matrix[y][x] == 3) {
          fill("black");
        } else if (matrix[y][x] == 4) {
          fill("blue");
        } else if (matrix[y][x] == 5) {
          fill("red");
        }
        rect(x * side, y * side, side, side);
      }
    }
  }
}
