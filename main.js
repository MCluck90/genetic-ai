let population = [];
let FITNESS_THRESHOLD = 0;
let maxFitness = Number.MIN_SAFE_INTEGER;

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
