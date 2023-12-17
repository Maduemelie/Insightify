const User = require('../models/userModel.js');



 const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }
   
}; 

module.exports = { getUser };