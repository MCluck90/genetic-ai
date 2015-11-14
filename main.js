'use strict';

let cluster = require('cluster');
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
let runCount = yargs.runs || 1;
let cores = yargs.cores || require('os').cpus().length;
let select = require(`./selections/${selectKey}-select.js`);
let crossover = require(`./crossovers/${crossoverKey}-crossover.js`);
let evaluate = require(`./evaluations/${evaluateKey}-evaluate.js`);
let rand = require('./random-word.js');

if (cluster.isMaster && cores > 1) {
  for (var i = 0; i < cores; i += 1) {
    cluster.fork();
  }
  let deathCount = 0;
  cluster.on('exit', function(worker, code, signal) {
    deathCount++;
    if (deathCount === cores) {
      process.exit(0);
    }
  });
  return;
}

Array.prototype.includes = function(thing){
    for(let i = 0; i < this.length; ++i){
        if(this[i] === thing){
            return true;
        }
    }
    return false;
}

let mutate = function(pop){
    let mutatedIdx = [];
    let numMutated = Math.floor(pop.length * mutationRate);
    for(let i = 0; i < numMutated; ++i){
        let idx = Math.floor(Math.random() * pop.length);
        while(mutatedIdx.includes(idx)){
            idx = Math.floor(Math.random() * pop.length);
        }
        mutatedIdx.push(idx);
        pop[idx].word = pop[idx].word.split('');
        pop[idx].word[Math.floor(Math.random()*pop[idx].word.length)] = rand.char();
        pop[idx].word = pop[idx].word.join('');
    }
}

while (runCount === -1 || runCount > 0) {
  population = [];
  maxFitness = Number.MIN_SAFE_INTEGER;
  minFitness = 1;
  for(let i = 0; i < generationSize; ++i){
      let hypothesis = {};
      hypothesis.word = rand.word(target.length);
      hypothesis.fitness = evaluate(hypothesis, target);
      if (hypothesis.fitness > maxFitness) {
        maxFitness = hypothesis.fitness;
      }
      if(hypothesis.fitness < minFitness){
          minFitness = hypothesis.fitness;
      }
      population.push(hypothesis);
  }

  let generations = 0;
  while (maxFitness < FITNESS_THRESHOLD) {
    generations++;
    population = select(population, maxFitness, minFitness);
    crossover(population, generationSize);
    mutate(population);
    maxFitness = Number.MIN_SAFE_INTEGER;
    minFitness = 1;
    population.forEach(function(hypothesis, index) {
      hypothesis.fitness = evaluate(hypothesis, target);
      if (hypothesis.fitness > maxFitness) {
        maxFitness = hypothesis.fitness;
      }
      if (hypothesis.fitness < minFitness) {
        minFitness = hypothesis.fitness;
      }
    });
  }
  console.log(`Generations: ${generations}`);
  runCount = Math.max(runCount - 1, -1);
}
process.exit(0);
