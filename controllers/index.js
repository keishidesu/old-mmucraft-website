const request = require('request');

module.exports = {
  api: require('./api'),
  users: require('./users'),

  // Post request for Google reCaptcha verification
  recaptcha: (payload, callback) => {
    let url = 'https://www.google.com/recaptcha/api/siteverify';
    let data = {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: payload
    }
    request.post(url, { form: data }, (error, response, body,) => {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      }
      else {
        console.log({error, response});
        callback(undefined);
      }
    });
  },

  invite: {
    // Error messages for invitation
    codes: [
      {alert: 'success', message: 'Invitation sent, check your email!'},
      {alert: 'warning', message: 'This email is used.'},
      {alert: 'danger', message: 'Invalid input for email!'},
      {alert: 'danger', message: 'Server side error, please report to admin!'},
      {alert: 'warning', message: 'Recaptcha verification failed.'},
      {alert: 'danger', message: 'Invitation email could not be send, please report to admin!'}
    ]
  },

  register: {
    // Error messages for registration
    codes: [
      {alert: 'success', message: 'Account created successfully!'},
      {alert: 'warning', message: 'This in-game name is not available.'},
      {alert: 'warning', message: 'Username contains illegal character(s).'},
      {alert: 'danger', message: 'Server side error, please report to admin!'},
      {alert: 'warning', message: 'Token mis-match.'}
    ]
  }

};