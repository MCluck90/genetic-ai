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
let select = require(`./${selectKey}-select.js`);
let crossover = require(`./${crossoverKey}-crossover.js`);
let evaluate = require(`./${evaluateKey}-evaluate.js`);
let randomWord = require('./random-word.js');

for(let i = 0; i < generationSize; ++i){
    let hypothesis = {};
    hypothesis.word = randomWord(target.lenght);
    hypothesis.fitness = evaluate(hypothesis);
    population.push(hypothesis);
}

while (maxFitness < FITNESS_THRESHOLD) {

  population = select(population, maxFitness);
  crossover(population, maxFitness);
  mutate(population, maxFitness);
  maxFitness = Number.MIN_VALUE;
  population.forEach(function(hypothesis) {
    hypothesis.fitness = evaluate(hypothesis);
    if (hypothesis.fitness > maxFitness) {
      maxFitness = hypothesis.fitness;
    }
  });
}
