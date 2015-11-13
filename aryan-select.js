'use strict';

let fitness = function(population, maxFitness){
    let newPop = [];
    population.forEach(function(hypothesis){
        let chance = (hypothesis.fitness === 0)? 1 : maxFitness / hypothesis.fitness;
        if(Math.random() < chance){
            newPop.push(hypothesis);
        }
    });
    return newPop;
}

module.exports = fitness;
