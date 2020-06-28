var controller = require('../controllers/index');
var content = require('../content');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
 res.render('index', {
    layout: 'layouts/general'
  });
});

router.get('/rules', (req, res, next) => {
  res.render('rules', {
    layout: 'layouts/general',
    title: 'Rules'
  });
});

router.get('/commands', (req, res, next) => {
  res.render('commands', {
    layout: 'layouts/general',
    title: 'Commands'
  });
});

router.get('/faq', (req, res, next) => {
  res.render('faq', {
    layout: 'layouts/general',
    title: 'FAQ',
    questions: content.questions
  });
});

router.get('/join', (req, res, next) => {
  res.render('join', {
    layout: 'layouts/general',
    title: 'Join'
  });
});

router.get('/invite', (req, res, next) => {
  res.render('invite', {
    layout: 'layouts/general',
    recaptcha: process.env.RECAPTCHA_SITE_KEY
  });
});

router.get('/register/:token', (req, res, next) => {
  let token = req.params.token;
  controller.users.auth.registration(token, (result) => {
    if (result) {
      res.render('register', {
        layout: 'layouts/general',
        token: token
      });
    } else {
      res.redirect('/');
    }
  });
});

router.post('/register/:token', (req, res, next) => {
  let {username, password, token} = req.body;
  let ip = req.ip;
  controller.users.auth.registration(token, (check, email) => {
    controller.users.set.register(username, password, email, ip, check, (code) => {
      let {alert, message} = controller.register.codes[code];
      res.render('register', {
        layout: 'layouts/general',
        token: token,
        alert: alert,
        message: message
      });
    });
  });
});

router.post('/invite', (req, res, next) => {
  controller.recaptcha(req.body['g-recaptcha-response'], (recaptcha) => {
    let email = req.body.email;
    controller.users.auth.invitation(email, recaptcha, req.hostname, (code) => {
      let {alert, message} = controller.invite.codes[code];
      res.render('invite', {
        layout: 'layouts/general',
        recaptcha: process.env.RECAPTCHA_SITE_KEY,
        alert: alert,
        message: message
      });
    })
  });
});

module.exports = router;
