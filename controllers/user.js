const User = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv');


env.config();



module.exports = {
    Create: async (req, res) => {
        try {
            let user = {};
            let token = "";

            const { userName, email } = req.body;
            if (!userName || !email) {
                return res.status(400).json({
                    status: 'Error',
                    message: 'userName and email are required'
                });
            }

            const existingUser = await User.findOne({ userName });
            if (existingUser) {
                return res.status(400).json({
                    status: 'Error',
                    message: 'User with this userName already exists'
                });
            }


            user = await User.create(req.body);


            token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
            user.token = token;


            await user.save();


            return res.status(200).json({
                status: "Success",
                message: "User created successfully",
                data: user
            });
        } catch (e) {
            return res.status(500).json({
                status: 'Error',
                message: e.message
            });
        }
    },
    Read: async (req, res) => {
        try {
            let user = {};
            const id = req.params.id;

            user = await User.findById(id);
            return res.status(200).json({
                status: 'Success',
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            })
        }
    },
    Update: async (req, res) => {
        try {
            let user = {};
            const id = req.params.id;
            user = await User.findByIdAndUpdate(id, {
                $set: req.body
            });
            return res.status(200).json({
                status: 'Success',
                message: "SUccessfully updated the user",
                data: user
            })

        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            })
        }
    },
    Delete: async (req, res) => {
        try {
            const id = req.params.id;
            await User.findByIdAndDelete(id);
            return res.status(200).json({
                status: 'Success',
                message: "Successfully removed the user",
            })
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            })

        }
    },
    List: async (req, res) => {
        try {
            let users = [];
            users = await User.find({});
            return res.status(200).json({
                status: 'Success',
                message: "Listed all the registered users",
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Error',
                message: error.message
            })

        }
    }
}