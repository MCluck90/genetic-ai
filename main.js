'use strict';

let yargs = require('yargs').argv;
let population = [];
const FITNESS_THRESHOLD = 0;
let maxFitness = Number.MIN_SAFE_INTEGER;
let minFitness = 1;
let target = yargs.word || 'HelloWorld'
let selectKey = yargs.select || 'fitness';
let crossoverKey = yargs.crossover || 'single';
let mutationRate = yargs.mutation || 0.05;
let generationSize = yargs.genSize || 100;
let evaluateKey = yargs.evaluate || 'ascii';
let select = require(`./selections/${selectKey}-select.js`);
let crossover = require(`./crossovers/${crossoverKey}-crossover.js`);
let evaluate = require(`./evaluations/${evaluateKey}-evaluate.js`);
let randomWord = require('./random-word.js');

let mutate = function(pop){
    let mutatedIdx = [];
    let numMutated = Math.floor(pop.length * mutationRate);
    for(let i = 0; i < numMutated; ++i){
        let idx = Math.floor(Math.random() * pop.length);
        /*TODO: make sure each index is unique
                then for each index randomly change
                one char in the word of the hypothesis at that index*/
    }
}

for(let i = 0; i < generationSize; ++i){
    let hypothesis = {};
    hypothesis.word = randomWord(target.lenght);
    hypothesis.fitness = evaluate(hypothesis);
    if (hypothesis.fitness > maxFitness) {
      maxFitness = hypothesis.fitness;
    }
    if(hypothesis.fitness < minFitness){
        minFitness = hypothesis.fitness;
    }
    population.push(hypothesis);
}

while (maxFitness < FITNESS_THRESHOLD) {
  population = select(population, maxFitness, minFitness);
  crossover(population, generationSize);
  mutate(population);
  maxFitness = Number.MIN_VALUE;
  minFitness = 1;
  population.forEach(function(hypothesis) {
    hypothesis.fitness = evaluate(hypothesis);
    if (hypothesis.fitness > maxFitness) {
      maxFitness = hypothesis.fitness;
    }
  });
}
