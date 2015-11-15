'use strict';

module.exports = function(population, maxFitness, minFitness, tournamentSize) {
  let sorted = population.slice(0).sort(function(a, b) {
    if (a.fitness > b.fitness) {
      return -1;
    } else if (a.fitness < b.fitness) {
      return 1;
    } else {
      return 0;
    }
  });
  let newPopulation = [];
  for (let i = 0; newPopulation.length !== tournamentSize; i++) {
    let hypothesis = sorted[i];
    if (newPopulation.indexOf(hypothesis) >= 0) {
      if (i === sorted.length - 1) {
        i = -1;
      }
      continue;
    }
    if (Math.random() > i / tournamentSize) {
      newPopulation.push(hypothesis);
    }

    if (i === sorted.length - 1) {
      i = -1;
    }
  }
  return newPopulation;
};
