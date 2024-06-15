const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const stoneController = require('./controllers/stoneController');

router.use(homeController);
router.use('/auth', authController);
router.use('/stones', stoneController);

router.all('*', (req, res) => {
   res.render('404'); 
});

module.exports = router;
