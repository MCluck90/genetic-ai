'use strict';

let fitness = function(population, maxFitness, minFitness){
    let newPop = [];
    let range = maxFitness - minFitness;
    if (range === 0) {
      range = 1;
    }
    population.forEach(function(hypothesis){
        let chance = 1 - ((maxFitness - hypothesis.fitness) / range);
        if(Math.random() < chance){
            newPop.push(hypothesis);
        }
    });
    if (newPop.length === 1) {
      let hypothesis = population[Math.floor(Math.random() * population.length)];
      while (newPop.indexOf(hypothesis) >= 0) {
        hypothesis = population[Math.floor(Math.random() * population.length)];
      }
      newPop.push(hypothesis);
    }
    return newPop;
}

module.exports = fitness;
