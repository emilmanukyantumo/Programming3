class Virus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 40;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character, food1, food2, food3, food4) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == food1 || matrix[y][x] == food2 || matrix[y][x] == food3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell && this.energy >= 40) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            virusArr.push(new Virus (newX, newY));
            this.energy = 5;
        }
    }

    move() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }

    eat() {
        var found = this.chooseCell(2, 3);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        for (var i in angelArr) {
         if (this.x == angelArr[i].x && this.y == angelArr[i].y) {
             angelArr.splice(i, 1);
             break;
            }
        }
        for (var i in monsterArr) {
            if (this.x == monsterArr[i].x && this.y == monsterArr[i].y) {
                monsterArr.splice(i, 1);
                break;
            }
        }
            if (this.energy >= 20) {
                this.mul();
            }
        }

        else {
            this.move();
        }
    }

    die() {
        for (var i in virusArr) {
            if (this.x == virusArr[i].x && this.y == virusArr[i].y) {
                virusArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}
