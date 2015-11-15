'use strict';

module.exports = function(population, size) {
  while (population.length < size) {
      let leftIndex = Math.floor(Math.random() * population.length);
      let rightIndex = Math.floor(Math.random() * population.length);

      // Masturbation won't make babies
      while (leftIndex === rightIndex) {
        rightIndex = Math.floor(Math.random() * population.length);
      }

      let left = population[leftIndex].word;
      let right = population[rightIndex].word;
      let split1 = Math.floor(left.length / 3);
      let split2 = split1 * 2;
      let child1 = {
        word: left.substring(0, split1) + right.substring(split1, split2) + left.substring(split2)
      };
      let child2 = {
        word: right.substring(0, split1) + left.substring(split1, split2) + right.substring(split2)
      };
      population.push(child1);
      if (population.length < size) {
        population.push(child2);
      }
  }
};
