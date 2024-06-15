const router = require('express').Router();
// const electronicService = require('../services/electronicService');
const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');
const stoneService = require('../services/stoneService');

router.get('/', async (req, res) => {

  const latestStones = await stoneService.getLastAddedStones().lean();


  res.render('home', { latestStones });
});

router.get('/search', isAuth, async (req, res) => {
  const { name } = req.query; 
  
  try {
    const stones = await stoneService.search(name).lean();
    // const stones = await electronicService.search(name).lean();

    res.render('search', { stones, name });

  } catch (err) {
    res.render('search', { error: getErrorMessage(err), name })
  }

});

module.exports = router;
