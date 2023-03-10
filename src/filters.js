const { encryptMessage, decryptMessage } = require('./encryption.js');

// Step 1: Obtain your API token and secret key
const secretKey = 'e4745770e6a5cf58561eb0479d340262';

// Step 2: Encrypt your filters using the provided function and your secret key
let filters = JSON.stringify({
  filters: {
    simpleFilter: {
      column: 'Sales Rep',
      operator: '!null',
    },
  },
});
const encryptedFilters = encryptMessage(filters, secretKey);

// Output the encrypted filters to the console
console.log('Encrypted filters:', encryptedFilters);

// Step 3: Decrypt the encrypted filters using the provided function and your secret key
const decryptedFilters = decryptMessage(encryptedFilters, secretKey);
console.log('Decrypted filters:', decryptedFilters);
