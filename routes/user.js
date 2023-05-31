const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    SIGN_UP,
    LOGIN,
    GET_NEW_JWT_TOKEN,
    GET_ALL_USERS,
    GET_USER_BY_ID,
} = require("../controllers/user");

router.post("/signUp", SIGN_UP);
router.post("/login", LOGIN);
router.get("/getNewJwtToken", GET_NEW_JWT_TOKEN);
router.get("/getAllUsers", authMiddleware, GET_ALL_USERS);
router.get("/getUserById/:id", authMiddleware, GET_USER_BY_ID);

module.exports = router;