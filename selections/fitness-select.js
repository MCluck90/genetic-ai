'use strict';

let fitness = function(population, maxFitness, minFitness){
    let newPop = [];
    let range = maxFitness - minFitness;
    population.forEach(function(hypothesis){
        let chance = 1 - ((maxFitness - hypothesis.fitness) / range);
        if(Math.random() < chance){
            newPop.push(hypothesis);
        }
    });
    return newPop;
}

module.exports = fitness;
