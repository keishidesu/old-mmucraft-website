const models = require('../models');

var databaseAPI = {
  get: {

    user: {

      info: (username, callback) => {
        models.users.findOne({
          where: { username: username }
        })
        .then((user) => { callback(user); })
        .catch((error) => { throw error; });
      },

      password: (username, callback) => {
        models.users.findOne({
          attributes: ['password'],
          where: { realname: username }
        })
        .then((user) => {
          if (user == null) 
            callback(undefined);
          else
            callback(user.password);
        })
        .catch((error) => { throw error; });
      },

      exists: {

        email: (email, callback) => {
          models.users.findOne({ where: { email: email } })
          .then((user) => {
            if (user) callback(true);
            else callback(false);
          })
          .catch((error) => { throw error; });
        },

        username: (username, callback) => {
          models.users.findOne({ where: { username: username } })
          .then((user) => {
            if (user) callback(true);
            else callback(false);
          })
          .catch((error) => { throw error; });
        },

        pending: (token, callback) => {
          models.pending.findOne({ where: { hash: token } })
          .then(pending => { 
            if (pending) callback(true, pending.email);
            else callback(false);
          })
          .catch(error => { throw error; });
        }

      }

    },

    onlines: (callback) => {
      models.users.findAll({
        attributes: ['realname'],
        where: { isLogged: 1 }
      })
      .then((users) => { callback(users); })
      .catch((error) => { throw error; });
    },

    announcements: (index, range, callback) => {
      models.announcement.findAll({
        offset: index,
        limit: range
      })
      .then((announcements) => { callback(announcements); })
      .catch((error) => { throw error; });
    },
  },

  set: {

    user: {

      pending: (email, hash, callback) => {
        models.pending.create({hash: hash, email: email})
        .then(pending => { callback(true); })
        .catch(error => {
          console.log(error);
          callback(false); 
        });
      },

      account: (email, ip, realname, password, callback) => {
        let timestamp = Date.now();
        let username = realname.toLowerCase();
        models.users.create({
          username: username,
          realname: realname,
          password: password,
          regdate: timestamp,
          regip: ip, 
          email: email
        })
        .then(user => { callback(true); })
        .catch(error => {
          console.log(error);
          callback(false);
        });
      }

    }

  },

  delete: {

    user: {
      
      pending: (email, callback) => {
        models.pending.findAll({ where: { email: email } })
        .then((pendings) => {
          if (pendings.length > 0) {
            models.pending.destroy({ where: { email: email } });
            callback(true);
          } else {
            callback(false);
          }
        });
      }

    }

  }
};

module.exports = databaseAPI;
