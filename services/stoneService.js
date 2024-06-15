const Stone = require('../models/Stone');
const User = require('../models/User');

exports.create = async (userId, stoneData) => {
    const createdStone = await Stone.create({
        owner: userId,
        ...stoneData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdStones: createdStone._id } });
    
    return createdStone;
}

exports.getAll = () => Stone.find();

exports.getOne = (stoneId) => Stone.findById(stoneId);

exports.getOneDetailed = (stoneId) => this.getOne(stoneId).populate('owner');
exports.like = async (stoneId, userId) => {
    await Stone.findByIdAndUpdate(stoneId, { $push: { likedList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { likedStones: stoneId } });
  
};

exports.delete = (stoneId) => Stone.findByIdAndDelete(stoneId);

exports.edit = (stoneId, StoneData) => Stone.findByIdAndUpdate(stoneId, StoneData,{ runValidators: true});


exports.getLastAddedStones = () => {

    const latestStones = Stone.find().sort({createdAt: -1}).limit(3);
    // const latestStones = Stone.find().sort({createdAt: -1}).limit(3);


    return latestStones;
}


exports.search = (name) => {
    let query = {};
  
    if(name) {
      query.name = new RegExp(name, 'i');
    }

    
    return Stone.find(query);
  };