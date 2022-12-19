const router = require("express").Router();
const passport = require("../config/passport");
const validator = require("../middlewares/validator");
const { create, remove, empty, read, pay } = require("../controllers/cart");
const schema = require("../schemas/cart");
const isTheSameUser = require ("../middlewares/isTheSameUser");
const Cart = require("../models/Cart");

router.post("/", passport.authenticate("jwt", { session: false }), validator(schema), create);
router.get("/", passport.authenticate("jwt", { session: false }) ,read);
router.get("/pay", passport.authenticate("jwt", {session: false}), pay);
router.delete("/", passport.authenticate("jwt", {session: false}), remove)
router.delete("/:id", passport.authenticate("jwt", {session: false}), isTheSameUser(Cart), empty);

module.exports = router;