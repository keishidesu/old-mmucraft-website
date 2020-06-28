// const md5 = require('md5');
// const crypto = require('crypto');

// module.exports = {

//   toDateString: (ts) => {
//     const options = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     };
//     return (new Date(ts)).toLocaleTimeString("en-US", options);
//   },

//   constructUUID: (name) => {
//     var hexString = md5('OfflinePlayer:' + name);
//     var tokens = hexString.match(/[a-fA-F0-9][a-fA-F0-9]/gi);
//     var byteArray = tokens.map((t, i) => {
//       if (i == 6) return parseInt(t, 16) & 0x0f | 0x30;
//       if (i == 8) return parseInt(t, 16) & 0x3f | 0x80;
//       return parseInt(t, 16);
//     });
//     var uuid = '';
//     byteArray.forEach((byte, i) => {
//       let s = byte.toString(16);
//       if (s.length == 1) s = '0' + s;
//       uuid += s;
//       if ([3, 5, 7, 9].includes(i)) uuid += '-';
//     });
//     return uuid;
//   },

//   generateSalt: (saltLength) => {
//     let salt = '';
//     for (let i = 0; i < saltLength; i ++) {
//       let value = Math.floor(Math.random() * 16);
//       salt += value.toString(16);
//     }
//     return salt;
//   },

//   hashPassword: (password, salt) => {
//     let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
//     hashedPassword += salt;
//     hashedPassword = crypto.createHash('sha256').update(hashedPassword).digest('hex');
//     return hashedPassword;
//   }

// };