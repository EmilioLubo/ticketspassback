const router = require("express").Router();
const passport = require("../config/passport");
const validator = require("../middlewares/validator");
const schema = require("../schemas/concert");
const { create, read, update, destroy, show } = require("../controllers/concert");

router.post("/", passport.authenticate("jwt", { session: false }), validator(schema), create);
router.get("/", read);
router.patch("/:id", passport.authenticate("jwt", { session: false }), update);
router.delete("/:id", passport.authenticate("jwt", {session: false}), destroy);
router.get("/:id", show);

module.exports = router;
