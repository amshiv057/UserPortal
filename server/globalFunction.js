var CryptoJS = require("crypto-js");

const reqEncKey = "U2FsdGVkX18s6c8VorV8aKWr6bq8B2V5kFAQxFJvnKb1nByRKfmHmTZQ3CAfmWl";
const reqEncrypt = function reqEncrypt(obj) {
    var text = JSON.stringify(obj); 
    var ciphertext = CryptoJS.AES.encrypt(text, reqEncKey);
    return ciphertext.toString();
};


const reqDeEncrypt = function reqDeEncrypt(text) {
    var bytes = CryptoJS.AES.decrypt(text, reqEncKey);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext); 
};
module.exports = { reqEncrypt, reqDeEncrypt }