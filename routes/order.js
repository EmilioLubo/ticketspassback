const router = require("express").Router();
const passport = require("../config/passport");
const { create, read } = require("../controllers/order");

router.post("/", passport.authenticate("jwt", { session: false }), create);
router.get("/", passport.authenticate("jwt", { session: false }), read);

module.exports = router;