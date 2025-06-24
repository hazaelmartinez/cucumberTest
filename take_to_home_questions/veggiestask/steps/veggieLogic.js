const { When, Then, defineStep } = require('@cucumber/cucumber');
const assert = require('assert');

// Track how many cucumbers, carrots, and salads we have
let cucumberCount = 0;
let carrotCount = 0;
let saladCount = 0;

/**
 * This step works for both:
 *   Given I have X cucumber(s)
 *   Then I have X cucumber(s)
 * It sets or checks the number of cucumbers.
 */
defineStep(/^I have (\d+) cucumbers?$/, function (count) {
  // If we're in a "Then" step, check the count
  if (typeof this.step === 'function' && this.step.keyword.trim() === 'Then') {
    assert.strictEqual(cucumberCount, Number(count));
  } else {
    // Otherwise, set the count (for "Given")
    cucumberCount = Number(count);
  }
});

/**
 * This step works for both:
 *   Given I have X carrot(s)
 *   Then I have X carrot(s)
 * It sets or checks the number of carrots.
 */
defineStep(/^I have (\d+) carrots?$/, function (count) {
  if (typeof this.step === 'function' && this.step.keyword.trim() === 'Then') {
    assert.strictEqual(carrotCount, Number(count));
  } else {
    carrotCount = Number(count);
  }
});

/**
 * Eat some cucumbers, but never go below zero!
 */
When('I eat {int} cucumbers', function (count) {
  cucumberCount = Math.max(0, cucumberCount - count);
});

/**
 * Eat some carrots, but never go below zero!
 */
When('I eat {int} carrots', function (count) {
  carrotCount = Math.max(0, carrotCount - count);
});

/**
 * Make a salad using some cucumbers and carrots, if we have enough.
 */
When('I make a salad with {int} cucumbers and {int} carrots', function (cucumbersUsed, carrotsUsed) {
  if (cucumberCount >= cucumbersUsed && carrotCount >= carrotsUsed) {
    cucumberCount -= cucumbersUsed;
    carrotCount -= carrotsUsed;
    saladCount += 1;
  }
});

/**
 * Check how many salads we have.
 */
Then('I have {int} salad', function (expected) {
  assert.strictEqual(saladCount, expected);
}); 
