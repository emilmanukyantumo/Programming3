const matrix = [];
const side = 20;
var grassArr = [];
var grassEaterArr = [];
var monsterArr = [];
var angelArr = [];
var virusArr = [];
var creatureArr = [];

function generator(grass, grassEater, matrixSize, monster, angel, virus, creature){
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
    for (let i = 0; i < creature; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 5;
        creature.push(new LivingCreature(x, y));
    }
}

function setup() {
    // frameRate(20);
    generator(5, 40, 20, 10, 10, 5);
    createCanvas(matrix[0].length * side, matrix.length * side)
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("gray");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
                text('🥬',x * side, y * side, side, side)
            }
            else if(matrix[y][x] == 2){
                fill("yellow");
                text('🐐',x * side, y * side, side, side)
            }
            else if(matrix[y][x] == 3){
                fill("black");
            }
            else if(matrix[y][x] == 4){
                fill("blue");
            }
            else if(matrix[y][x] == 5){
                fill("red");
            }
            rect(x * side, y * side, side, side);
            
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in monsterArr) {
        monsterArr[i].eat();
    }
    for (var i in angelArr) {
        angelArr[i].eat();
    }
    for (var i in virusArr) {
        virusArr[i].eat();
    }
}

