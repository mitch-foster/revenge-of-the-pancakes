/**
 * @param {integer} numberOfStacks     Number of stacks of pancakes (cases).
 * @param {array}   pancakeStacksArray An array of strings that consist of either '-' or '+' to represent face-down and face-up pancakes
 */

function servePancakesHappySideUp(numberOfStacks, pancakeStacksArray) {
  // check that 1 <= number of stacks <= 100
  if (numberOfStacks < 1 || numberOfStacks > 100) throw new Error(`Number of stacks must <= 1 and >= 100. ${numberOfStacks} number of stacks of pancakes is invalid.`);
  // check input (must be '-' or '+') and that 1 <= number of pancakes <= 100
  pancakeStacksArray.forEach((e, i)=> {
    if (e.length < 1 || e.length > 100) throw new Error(`Number of pancakes in a stack must <= 1 and >= 100. ${e.length} number of pancakes is invalid.`);
    if (e.split('').filter(e => e !== '-' && e !== '+').length !== 0) throw new Error(`Invalid character in pancake stack #${i+1}. Stacks of pancakes can only include the characters + and - .`);
  })

  function findIndexToFlipFrom(pancakeArray) {
    for (i = 0; i < pancakeArray.length; i++) {
      if (pancakeArray[i+1] === '-') return i;
    };
  }

  function findLowestFaceDownPancake(pancakeArray) {
    const bottomPancakeIndex = pancakeArray.length - 1;
    for (i = bottomPancakeIndex; i >= 0; i--) {
      if (pancakeArray[i] === '-') return i;
    }
    // no pancakes are face-down
    return null;
  }

  function flipPancakes(indexToFlipAt, pancakeArray) {
    const pancakesToFlip = pancakeArray.splice(0,indexToFlipAt + 1);
    const flippedPancakes = pancakesToFlip.reverse().map(e => e === '+' ? '-' : '+');
    return [...flippedPancakes, ...pancakeArray];
  }

  function ensureHappySideUp(pancakeStack, stackNumber) {
    let flipCount = 0;
    (function recursiveFlipping(pancakeArray){
      const topPancake = pancakeArray[0];
      const lowestFaceDownPancake = findLowestFaceDownPancake(pancakeArray);
      // if none of the pancakes are '-' (face-down) we don't need to flip anymore
      if (lowestFaceDownPancake === null) return;
      flipCount++;
      // if the top pancake is '-' (face-down) then we flip from the lowest face down pancake
      if (topPancake === '-') return recursiveFlipping(flipPancakes(lowestFaceDownPancake, pancakeArray));
      // if the top pancake is '+' (face-up) then we need to find the highest '-' (face-down) pancake and flip all pancakes up to the index one less than the highest '-' (face-down) of the pancakeArray
      return recursiveFlipping(flipPancakes(findIndexToFlipFrom(pancakeArray), pancakeArray));
    }(pancakeStack.split('')));
    return `Case #${stackNumber + 1}: ${flipCount}`;
  }

  return pancakeStacksArray.map((e, i) => ensureHappySideUp(e, i));
}

console.log(servePancakesHappySideUp(5, [
  '-',
  '-+',
  '+-',
  '+++',
  '--+-'
]))

module.exports = servePancakesHappySideUp;
