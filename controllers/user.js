const UserModel = require("../models/user");
const uniqid = require("uniqid");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports.SIGN_UP = async (req, res) => {
    try {
        if (req.body.email.includes("@") && req.body.password.length > 5) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    const user = new UserModel({
                        id: uniqid(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        money_balance: req.body.money_balance,
                    });
                    await user.save();
                })
            });
            res.status(200).json({ response: "User was created successfully" });
        } else {
            res.status(400).json({ response: "Validation failed" });
        }
    } catch (err) {
        res.status(500).json({ response: "Error inserting a user into DB" });
    }
};

module.exports.LOGIN = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ response: "Wrong email or password" });
        }
        bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
            if (isPasswordMatch) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.JWT_SECRET, { expiresIn: "2h" }, { algorithm: "RS256" });

                const refresh_token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" }, { algorithm: "RS256" })
                return res.status(200).json({ response: "You logged in", jwt: token, refresh_jwt: refresh_token });
            } else {
                return res.status(404).json({ response: "Wrong email or password" });
            }
        });
    } catch (err) {
        console.log("ERR", err);
        res.status(500).json({ response: "ERROR, please try later" });
    }
};


module.exports.GET_NEW_JWT_TOKEN = async (req, res) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ response: "Please login" });
            } else {
                user = jwt.decode(req.headers.authorization);
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.JWT_SECRET, { expiresIn: "2h" }, { algorithm: "RS256" });
                return res.status(200).json({ response: "You logged in", jwt: token })
            }
        })
    } catch (err) {
        console.log("ERR", err);
        res.status(500).json({ response: "ERROR, please try later" });
    }
};

module.exports.GET_ALL_USERS = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users: users });
    } catch (err) {
        res.status(500).json({ response: "Err in DB" });
    }
};

module.exports.GET_USER_BY_ID = async (req, res) => {
    try {
        const user = await UserModel.findOne({ id: req.params.id });
        res.status(200).json({ user: user });
    } catch (err) {
        res.status(404).json({ response: "User not found" });
    }
};


