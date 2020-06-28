// const database = require('./database');
// const util = require('./util');
// const request = require('request');
// const fs = require('fs');
// const nbt = require("nbt");
// const nodemailer = require('nodemailer');
// const ejs = require('ejs')

// const Hashids = require('hashids/cjs');
// const hashids = new Hashids(process.env.SECRET_KEY, 9);

// module.exports = {

//   auth: {

//     // Validate the input username and password
//     login: (username, password, callback) => {
//       // Get the raw hashed password from the database
//       database.get.user.password(username, (rawPassword) => {
//         if (rawPassword == undefined) {
//           callback(false);
//           return;
//         }

//         // Extract the salt and actual hashed password data
//         var line = rawPassword.split("$");
//         var salt = line[2];
//         var data = line[3];

//         // Reconstruct hashed password from input
//         var hashedPassword = util.hashPassword(password, salt);

//         // Compare and callback
//         callback(data === hashedPassword);
//       });
//     },

//     // Logout?
//     logout: (username) => {
//       // future related operations
//       return;
//     },

//     // Extract the salt and actual hashed password data
//     var line = rawPassword.split("$");
//     var salt = line[2];
//     var data = line[3];

//     // Reconstruct hashed password from input
//     var hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
//     hashedPassword += salt;
//     hashedPassword = crypto.createHash('sha256').update(hashedPassword).digest('hex');

//     // Compare and callback
//     callback(data === hashedPassword);
//   });
// };

// module.exports.stats = (realname, callback) => {
//   let uuid = util.constructUUID(realname);
//   fs.readFile(`${process.env.SERVER_PATH}/world/stats/${uuid}.json`, 'utf8', (err, data) => {
//     let stats = JSON.parse(data);
//     callback(stats);
//   });
// }

// module.exports.achievements = (realname, callback) => {
//   let uuid = util.constructUUID(realname);
//   fs.readFile(`${process.env.SERVER_PATH}/world/advancements/${uuid}.json`, 'utf8', (err, data) => {
//     let achievements = JSON.parse(data);
//     callback(achievements);
//   });
// }

// module.exports.data = (realname, callback) => {
//   let uuid = util.constructUUID(realname);
//   fs.readFile(`${process.env.SERVER_PATH}/world/playerdata/${uuid}.dat`, null, (err, data) => {
//     nbt.parse(data, (error, playerdata) => {
//       if (error) { throw error; }
//       callback(playerdata);
//     });
//   });
// }

// module.exports.getUserInfo = (username, callback) => {
//   databaseAPI.getUserInfo(username, (result) => {
//     let parseWorldName = (world) => {
//       if (world === "world") return "Overworld";
//       else if (world === "world_nether") return "Nether";
//       else if (world === "world_creative") return "Creative Overworld";
//       else if (world === "world_the_end") return "The End";
//       else return "Undefined";
//     }
//     let info = {
//       name: result.realname,
//       lastLogin: util.toDateString(result.lastlogin),
//       coordinate: {
//         x: result.x,
//         y: result.y,
//         z: result.z
//       },
//       regdate: util.toDateString(result.regdate),
//       world: parseWorldName(result.world),
//       email: result.email,
//       online: result.isLogged,
//       uuid: util.constructUUID(result.realname),
//       bodyskin: `https://minotar.net/armor/body/${username}/150.png`,
//     };
//     callback(info);
//   });
// };

// var intOrUndefinedToInt = (n) => { return n ? n : 0; };

// // returns null if the object key sequence is undefined
// var safeAccess = (object, path) =>  path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, object);

// module.exports.getBossRank = (playerdata) => {
//   let killed = safeAccess(playerdata, ['stats', 'minecraft:killed']);
//   let wither = intOrUndefinedToInt(killed['minecraft:wither']);
//   let ender_dragon = intOrUndefinedToInt(killed['minecraft:ender_dragon']);
//   let elder_guardian = intOrUndefinedToInt(killed['minecraft:elder_guardian']);

//   return {
//       ranked: 0, // some function to get global rank
//       summary: {
//         wither: wither,
//         ender_dragon: ender_dragon,
//         elder_guardian: elder_guardian,
//         total: wither * 8 + ender_dragon * 5 + elder_guardian
//     }
//   }
// }

// module.exports.getMiningRank = (playerdata) => {
//   let mined = safeAccess(playerdata, ['stats', 'minecraft:mined']);
//   let emerald = intOrUndefinedToInt(mined['minecraft:emerald_ore']);
//   let diamond = intOrUndefinedToInt(mined['minecraft:diamond_ore']);
//   let gold = intOrUndefinedToInt(mined['minecraft:gold_ore']);
//   let iron = intOrUndefinedToInt(mined['minecraft:iron_ore']);

//   return {
//     ranked: 0, // some function to get global rank,
//     summary: {
//       emerald: emerald,
//       diamond: diamond,
//       gold: gold,
//       iron: iron,
//       total: emerald * 80 + diamond * 30 + gold * 10 + iron
//     }
//   }
// }

// module.exports.getTravelRank = (playerdata) => {
//   let pcustom = safeAccess(playerdata, ['stats', 'minecraft:custom']);
//   let pkeys = {
//     onLand: ["minecraft:horse_one_cm","minecraft:sprint_one_cm","minecraft:crouch_one_cm","minecraft:climb_one_cm","minecraft:walk_one_cm","minecraft:minecart_one_cm"],
//     onWater: ["minecraft:swim_one_cm","minecraft:walk_on_water_one_cm","minecraft:walk_under_water_one_cm","minecraft:boat_one_cm"],
//     onAir: ["minecraft:fly_one_cm","minecraft:fall_one_cm"],
//   };
//   let mapToSum = (source, keys) => keys.map(i => source[i]).reduce((a, b) => a + b);
//   let cmToKmTwoDecimal = (i) => (i/100/1000).toFixed(2);

//   // obtaining sum
//   let land = mapToSum(pcustom, pkeys.onLand);
//   let water = mapToSum(pcustom, pkeys.onWater);
//   let air = mapToSum(pcustom, pkeys.onAir);
//   let total = land + water + air;

//   // conversion of unit
//   land = cmToKmTwoDecimal(land);
//   water = cmToKmTwoDecimal(water);
//   air = cmToKmTwoDecimal(air);
//   total = cmToKmTwoDecimal(total);

//   return {
//     ranked: 0, // some function to get global rank,
//     summary: {
//       land: land,
//       water: water,
//       air: air,
//       total: total
//     }
//   }
// }

// module.exports.getPlayerRank = (playerdata) => {
//   let killed = safeAccess(playerdata, ['stats', 'minecraft:killed', 'minecraft:player']);
//   let killed_by = safeAccess(playerdata, ['stats', 'minecraft:killed_by', 'minecraft:player']);

//   // conversion of data type
//   killed = intOrUndefinedToInt(killed);
//   killed_by = intOrUndefinedToInt(killed_by);
//   return {
//     ranked: 0, // some function to get global rank,
//     summary: {
//       killed: killed,
//       killed_by: killed_by,
//       score: killed - killed_by
//     }
//   }
// }

// module.exports.getDeathRank = (playerdata) => {
//   let deaths = safeAccess(playerdata, ['stats', 'minecraft:custom', 'minecraft:deaths']);
//   let time_since_death = safeAccess(playerdata, ['stats', 'minecraft:custom', 'minecraft:time_since_death']);

//   // conversion of data type
//   deaths = intOrUndefinedToInt(deaths);
//   time_since_death = (intOrUndefinedToInt(time_since_death) / 60).toFixed(1);
//   return {
//     ranked: 0, // some function to get global rank,
//     summary: {
//       deaths: deaths,
//       time_since_death: time_since_death
//     }
//   }
// }

// module.exports.getPlayTimeRank = (playerdata) => {
//   let playTime = safeAccess(playerdata, ['stats', 'minecraft:custom', 'minecraft:play_one_minute']);

//   // conversion of minutes to hour
//   playTime = (playTime / 60).toFixed(1);
//   return {
//     ranked: 0, // some function to get global rank,
//     summary: {
//       playTime: playTime
//     }
//   }
// }

// module.exports.getUUID = (username, callback) => {
//   const options = {
//     host: 'api.mojang.com',
//     port: 443,
//     path: '/users/profiles/minecraft/' + username,
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     // Verify and perform an invitation
//     invitation: (email, recaptcha, hostname, callback) => {
//       if (!recaptcha.success) {
//         callback(4);
//       } else {
//         if (!email || !(email.endsWith('@student.mmu.edu.my') || email.endsWith('@mmu.edu.my'))) {
//           callback(2);
//         } else {
//           database.get.user.exists.email(email, (result) => {
//             if (result) {
//               callback(1);
//             } else {
//               let hash = hashids.encode(Date.now());
//               ejs.renderFile('./content/email.ejs', 
//                 {link: `${hostname}/register/${hash}`, year: new Date().getFullYear()}, {}, 
//                 (error, html) => {
                
//                   let transporter = nodemailer.createTransport({
//                     host: 'smtp.gmail.com',
//                     port: 587,
//                     secure: false,
//                     auth: {
//                       user: process.env.EMAIL_USER,
//                       pass: process.env.EMAIL_PASS
//                     }
//                   });

//                   let message = {
//                     from: 'MMUCraft',
//                     to: email,
//                     subject: 'Welcome to MMUCraft!',
//                     html: html
//                   };

//                   transporter.sendMail(message, (error) => {
//                     if (error) {
//                       console.log(error);
//                       callback(5);
//                     } else {
//                       database.set.user.pending(email, hash, (okay) => {
//                         if (okay) callback(0);
//                         else callback (3);
//                       });
//                     }
//                   });
//                 });
//             }
//           });
//         }
//       }
//     },

//     // Verify a registration
//     registration: (token, callback) => {
//       database.get.user.exists.pending(token, (result, email) => {
//         callback(result, email);
//       });
//     }

//   },
  
//   get: {
//     // Return the player's statistic in JSON format
//     stats: (realname, callback) => {
//       let uuid = util.constructUUID(realname);
//       fs.readFile(`${process.env.SERVER_PATH}/world/stats/${uuid}.json`, 'utf8', (err, data) => {
//         let stats = JSON.parse(data);
//         callback(stats);
//       });
//     },

//     // Return the player's advancement in JSON format
//     achievements: (realname, callback) => {
//       let uuid = util.constructUUID(realname);
//       fs.readFile(`${process.env.SERVER_PATH}/world/advancements/${uuid}.json`, 'utf8', (err, data) => {
//         let achievements = JSON.parse(data);
//         callback(achievements);
//       });
//     },
    
//     // Return the player's data in JSON format
//     data: (realname, callback) => {
//       let uuid = util.constructUUID(realname);
//       fs.readFile(`${process.env.SERVER_PATH}/world/playerdata/${uuid}.dat`, null, (err, data) => {
//         nbt.parse(data, (error, playerdata) => {
//           if (error) { throw error; }
//           callback(playerdata);
//         });
//       });
//     },
    
//     // Get basic user info from database
//     info: (username, callback) => {
//       database.get.user.info(username, (result) => {
//         let parseWorldName = (world) => {
//           if (world === "world") return "Overworld";
//           else if (world === "world_nether") return "Nether";
//           else if (world === "world_creative") return "Creative Overworld";
//           else if (world === "world_the_end") return "The End";
//           else return "Undefined";
//         }
//         let info = {
//           name: result.realname,
//           lastLogin: util.toDateString(result.lastlogin),
//           coordinate: {
//             x: result.x,
//             y: result.y,
//             z: result.z
//           },
//           regdate: util.toDateString(result.regdate),
//           world: parseWorldName(result.world),
//           email: result.email,
//           online: result.isLogged,
//           uuid: util.constructUUID(result.realname),
//           bodyskin: `https://minotar.net/armor/body/${username}/150.png`,
//           headskin: `https://minotar.net/armor/bust/${username}/100.png`,
//         };
//         callback(info);
//       });
//     },
    
//     // Untested
//     // Request premium user's UUID from Mojang database
//     uuid: (username, callback) => {
//       let url = `https://api.mojang.com/users/profiles/minecraft/${username}`
//       request.get(url)
//       .on('response', (response) => {
//         if (response.statusCode == 200)
//           callback(JSON.parse(output).id);
//         else
//           callback(undefined);
//       })
//       .on('error', (error) => {
//         console.log(error);
//         callback(undefined);
//       });
//     }
//   },

//   set: {

//     // Perform a registration
//     register: (realname, password, email, ip, check, callback) => {
//       // Boolean value from registration token verification
//       if (!check) {
//         callback(4);
//       } else {
//         if (realname.indexOf(' ') !== -1) {callback(2); return;}
//         if (realname.indexOf('-') !== -1) {callback(2); return;}
//         if (realname.indexOf('\t') !== -1) {callback(2); return;}
//         if (realname.indexOf('\n') !== -1) {callback(2); return;}
//         let username = realname.toLowerCase();
//         database.get.user.exists.username(username, (result) => {
//           if (result) {
//             callback(1);
//           } else {
//             database.delete.user.pending(email, (result) => {
//               if (result) {
//                 let salt = util.generateSalt(16);
//                 let hashedPassword = util.hashPassword(password, salt);
//                 let formattedPassword = `\$SHA\$${salt}\$${hashedPassword}`;
//                 database.set.user.account(email, ip, realname, formattedPassword, (result) => {
//                   if (result) callback(0);
//                   else callback(3);
//                 });
//               } else {
//                 callback(3);
//               }
//             });
//           }
//         });
//       }
//     }

//   }
// };