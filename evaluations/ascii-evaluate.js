'use strict';

module.exports = function(hypothesis, target) {
  return hypothesis.word.split('').reduce(function(sum, char, index) {
    return -Math.abs(char.charCodeAt(0) - target.charCodeAt(index)) + sum;
  }, 0);
};
