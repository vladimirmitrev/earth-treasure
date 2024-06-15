const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { isStoneOwner } = require('../middlewares/stonesMiddlewares');
const Stone = require('../models/Stone');
const stoneService = require('../services/stoneService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/dashboard', async (req, res) => {
    const stones = await stoneService.getAll().lean();

    res.render('stones/dashboard', { stones });
});

router.get('/create', isAuth, (req, res) => {
    res.render('stones/create');
  });
  
router.post('/create', isAuth, async (req, res) => {
    const stonesData = req.body;
    const userId = req.user._id;
  
    try {
      await stoneService.create(userId, stonesData);
      
      res.redirect('/stones/dashboard');
  
    } catch (err){
       console.log(err);
       res.render('stones/create', {...stonesData, error: getErrorMessage(err)})
    }
  });

  router.get('/:stoneId/details', async (req, res) => {
    const stoneId = req.params.stoneId;
    const userId = req.user?._id;
    try {
      const stone = await stoneService.getOneDetailed(stoneId).lean();
      const likedList = stone.likedList.map(user => user.username).join(', ');
      const isOwner = stone.owner && stone.owner._id == userId;
      const isLiked = stone.likedList.some(user => user._id == userId);

      res.render('stones/details', { ...stone, likedList, isOwner, isLiked });
    } catch (err) {
      // console.log(err);
      res.redirect('/');
    }
});

router.get('/:stoneId/like', isAuth, async (req, res) => {
  try {
    await stoneService.like(req.params.stoneId, req.user._id);

    res.redirect(`/stones/${req.params.stoneId}/details`);

  } catch (err) {
    // console.log(err);
    res.redirect('/');
  }
});

router.get('/:stoneId/delete', isStoneOwner, async (req, res) => {
  await stoneService.delete(req.params.stoneId);

  res.redirect('/stones/dashboard');
});

router.get('/:stoneId/edit', isStoneOwner, async (req, res) => {

  res.render(`stones/edit`, { ...req.stone });
});

router.post('/:stoneId/edit', isStoneOwner, async (req, res) => {
  const stoneData = req.body;
  const stoneId = req.params.stoneId;

  try {
    await stoneService.edit(stoneId, stoneData);

    res.redirect(`/stones/${stoneId}/details`);
  } catch (err) {
    
    res.render(`stones/edit`, {...stoneData, error: getErrorMessage(err)});
  }
});


module.exports = router;