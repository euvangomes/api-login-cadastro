const express = require("express");
const regisUser = require("./routes/cadastro");
const logUser = require("./routes/login");
const helprouter = require("./routes/callhelp");
const resetPass = require("./routes/reshelp");

const router = express.Router();

router.use(regisUser);
router.use(logUser);
router.use(helprouter);
router.use(resetPass);


module.exports = router;