const { analyzePassword, generatePassword } = require('../dist');

const result = analyzePassword('119927773993', {
    rules: {
        minLength: 8,
        maxLength: 16,
        requiredSets: ['lower', 'upper', 'number', 'symbol'],
    }
});

const password = generatePassword({
    length: 16,
    sets: ['lower', 'upper', 'number', 'symbol'],
});

console.log(result);
console.log(password);
