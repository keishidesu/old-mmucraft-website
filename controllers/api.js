const database = require('./database');
const minestat = require('./minestat');
const exec = require('child_process').exec;
const utf8 = require('utf8');
const base64 = require('base-64');

module.exports = {

  get: {
    // Basic server stats
    stats: (callback) => {
      minestat.init('minecraft.mmu.edu.my', 25565, () => {
        if(minestat.online)
        {
          callback(JSON.stringify({
            address: minestat.address,
            online: minestat.online,
            version: minestat.version,
            players: minestat.max_players,
          }));
        }
        else
        {
          callback(JSON.stringify({
            address: minestat.address,
            online: minestat.online
          }));
        }
      });
    },
    
    // Online player names
    onlines: (callback) => {
      database.get.onlines((result) => {
        let array = [];
        result.forEach(item => array.push(item.realname));
        callback(array);
      });
    },

    // Get machine stats using command
    // Need to test this on Linux machine    
    sensors: (callback) => {
      exec('sensors', function(error, stdout, stderr){
        console.log(error);
        callback(stdout, error); 
      });
    },

    // Get announcement from database
    announcement: (index, range, callback) => {
      database.get.announcements(index, range, (result) => {
        let array = [];
        result.forEach(item => {
          let {id, author, date} = item;
          let encoded = item.content.toString();
          let message = utf8.decode(base64.decode(encoded));
          array.push({id, message, author, date});
        });
        callback(array);
      });
    }
  },

  set: {}
};