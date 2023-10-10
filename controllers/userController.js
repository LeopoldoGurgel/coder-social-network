// functions thet will be called on user routes

const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      console.log('Get users function triggered')
      res.json(users);
    } catch (err) {
      console.log(err.message)
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.log(err.message)
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      console.log("user created")
      res.json(user);
    } catch (err) {
      console.log(err.message)
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      console.log(err.message)
      res.status(500).json(err);
    }
  },

  // updates user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({_id: req.params.userId})

      const {username, email} = req.body;

      if(!user) {
        return res.status(404).json({message:'No such user found.'});
      }

      if(email){
        user.email = email;
      }

      if(username){
        user.username = username;
      }

      const updatedUser = await user.save();

      res.json(updatedUser)
    }catch(err) {
      console.log(err.message)
      res.status(500).json(err);
    }
  }, 

  // adds a friend
  async addFriend(req,res) {
    try {
      const user = await User.findOne({_id: req.params.userId})

      if(!user){
        return res.status(404).json({message:"No such user found."})
      }

      const friend = await User.findOne({_id: req.params.friendId});

      if(!friend){
        return res.status(404).json({message: `We could not find a user with that id to add as a friend.`})
      }

      if(user.friends.includes(res.params.friendId)) {
        return res.status(400).json({message: `${friend.username} is already a friend of ${user.username}.`})
      }

      user.friends.push(req.params.friendId);

      const updatedUser = await user.save();

      res.json(updatedUser);
    } catch (err) {
      console.log(err.message)
      res.status(500).json(err)
    }
  },

  // removes a friend
  async removeFriend(req, res) {
    try {
    const user = await User.findOne({_id: req.params.userId});

    const friend = await User.findOne({_id: req.params.friendId});

    if(!user){
      return res.status(404).json({message:"No such user found."})
    };

    if(!friend){
      return res.status(404).json({message: `${user.username} has no such friend.`})
    };

    if(!user.friends.includes(res.params.friendId)) {
      return res.status(400).json({message: `${friend.username} and ${user.username} are not friends.`})
    };


    // this will return with an array of strings that are not the same as the one coming from req.params.friendID
    user.friends = user.friends.filter((friendId) => friendId.toString() !== req.params.friendId)
  
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err)
  }    
  }
};
