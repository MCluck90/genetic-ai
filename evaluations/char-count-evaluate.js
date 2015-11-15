'use strict';

module.exports = function(hypothesis, target) {
  return hypothesis.word.split('').reduce(function(sum, char, index) {
    return sum + ((char !== target[index]) ? -1 : 0);
  }, 0);
};
