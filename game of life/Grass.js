let LivingCreature = require('./LivingCreature')
var random = require("./random.js");

module.exports = class Grass extends LivingCreature {

  mul() {
      let found = this.chooseCell(0);
      let newCell = random(found);

      if (this.multiply >= 9 && newCell) {
          var newGrass = new Grass(newCell[0], newCell[1]);
          grassArr.push(newGrass);
          matrix[newCell[1]][newCell[0]] = 1;
          this.multiply = 0;
      }
      this.multiply++;
  }

}
