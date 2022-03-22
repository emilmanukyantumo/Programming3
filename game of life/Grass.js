let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {

  mul() {
      var newCell = found[Math.floor(Math.random()*found.length)];

      if (this.multiply >= 8 && newCell) {

          var newGrass = new Grass(newCell[0], newCell[1]);
          grassArr.push(newGrass);
          matrix[newCell[1]][newCell[0]] = 1;
          this.multiply = 0;
      }
      this.multiply++;
  }
}
