const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(user){
            res.status(400).json({
                status: "error",
                message: "user with this email already exists!"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        return res.status(200).json({
            status: "success",
            message: "user created successfully!",
            data: newUser
        });
    } catch(error){
        return res.status(400).json({
            status: "error",
            error: error.message
        });
    }
}

const authUser = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email});
        if(!user){
            res.status(404).json({
                status: 'failed',
                message: 'User with this email does not exist'
            });
        }
        if(await bcrypt.compare(req.body.password, user.password)){
            res.status(200).json({
                message: 'success',
                token: jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'}),
                user
            })
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'Incorrect Password'
            });
        }
        
    } catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            status: "success",
            data: users
        });
    } catch(error){
        res.status(400).json({
            status: "error",
            error: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) throw Error("User not found");
        res.status(200).json({
            status: "success",
            data: user
        })
    }catch(error){
        res.status(404).json({
            status: "error",
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "user not found",
        });
      }
      return res.status(204).json({
        status: "success",
        message: "user deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
          });
        if (!user) throw Error("User not found");
          res.json({
            status: "success: user updated successfully",
            user,
        });
    } catch(error){
        return res.status(400).json({
            status: "failed",
            message: error.message,
          });
    }
}

module.exports = {
    createUser,
    updateUser,
    authUser,
    deleteUser,
    getUserById,
    getUsers
}