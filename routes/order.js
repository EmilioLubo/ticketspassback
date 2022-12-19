const router = require("express").Router();
const passport = require("../config/passport");
const { create } = require("../controllers/order");

router.post("/", passport.authenticate("jwt", { session: false }), create);

module.exports = router;