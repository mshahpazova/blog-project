const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secret = 'd6F3Efeq';

module.exports = {
  encrypt(text) {
    const cipher = crypto.createCipher(algorithm, secret);
    const crypted = cipher.update(text,'utf8','hex');
    return crypted + cipher.final('hex');
  },

  decrypt(text) {
    const decipher = crypto.createDecipher(algorithm, secret);
    const dec = decipher.update(text,'hex','utf8');
    return dec + decipher.final('utf8');
  },

  hash(text) {
    return crypto.createHmac('sha256', secret)
                 .update(text)
                 .digest('hex');
  }
};
