const crypto = require('crypto');
const { JSDOM } = require('jsdom');

function encryptMessage(message, secretKey) {
  const algorithm = "aes-256-cbc";
  const initVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, initVector);
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return initVector.toString('hex') + '.' + encryptedData;
}

function decryptMessage(encryptedMessage, secretKey) {
  const algorithm = "aes-256-cbc";
  const [iv, message] = encryptedMessage.split('.');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  let decryptedData = decipher.update(message, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

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

