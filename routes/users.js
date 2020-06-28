var controller = require('../controllers').users;
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', (req, res, next) => {
  let options = {
    title: 'Login',
    layout: 'layouts/general'
  };
  if (req.session.loggedIn) {
    res.redirect('/u/profile');
  } else {
    options.message = req.query.message;
    res.render('login', options);
  }
});

/* POST login page. */
router.post('/login', (req, res, next) => {
  let options = {
    title: 'Login'
  };
  let username = req.body.username;
  let password = req.body.password;
  controller.auth.login(username, password, (valid) => {
      if (valid) {
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/u/profile');
      } else {
        res.redirect('/u/login?message=Login Failed!');
      }
    }
  );
});

/* GET logout page. */
router.get('/logout', (req, res, next) => {
  if (req.session.loggedIn) {
    controller.auth.logout(req.session.username);
    delete(req.session.loggedIn);
    delete(req.session.username);
  }
  res.redirect('/');
});

router.get('/profile', (req, res, next) => {
  let options = {
    layout: 'layouts/general',
    title: 'Profile',
  };
  if (req.session.loggedIn) {
    let user = {};
    controller.getUserInfo(
      req.session.username,
      (userInfo) => {
        user.info = userInfo;
        controller.stats(userInfo.name,
        (stats) => {
          user.stats = stats['stats'];
          controller.achievements(userInfo.name,
          (achievements) => {
            user.achievements = achievements;
            controller.data(userInfo.name,
            (data) => {
              user.data = data;
              user.ranks = {
                boss: controller.getBossRank(user),
                mining: controller.getMiningRank(user),
                travel: controller.getTravelRank(user),
                player: controller.getPlayerRank(user),
                deaths: controller.getDeathRank(user),
                playTime: controller.getPlayTimeRank(user)
              }
              options.user = user;
              if (req.query.json) res.json(user);
              else res.render('profile', options);
            });
          });
        }
      );
      }
    );
  } else {
    res.redirect('/u/login?message=You are not logged in yet!');
  }
});

router.get('/profile/template', (req, res, next) => {
  const fs = require('fs');
  let data = fs.readFileSync(__dirname + '/../test/dummy-user-info/user.json', 'utf8');
  let options = {
    layout: 'layouts/general',
    title: 'Profile',
    user: JSON.parse(data)
  };
  res.render('profile', options);

});

module.exports = router;
