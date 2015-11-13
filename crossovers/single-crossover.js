'use strict';

let single = function(population, size){
    while(population.length < size){
        let idx1 = Math.floor(Math.random() * population.length);
        let idx2 = Math.floor(Math.random() * population.length);
        //don't let anyone mate with themselves
        while(idx2 == idx1){
            idx2 = Math.floor(Math.random() * population.length);
        }

        let word1 = population[idx1].word;
        let word2 = population[idx2].word;
        let splitIdx = word1.length / 2;

        let child1 = {};
        child1.word = word1.substring(0,splitIdx) + word2.substring(splitIdx);
        population.push(child1);

        if(population.length < size){
            let child2 = {};
            child2.word = word2.substring(0,splitIdx) + word1.substring(splitIdx);
            population.push(child2);
        }
    }
}

module.exports = single;
