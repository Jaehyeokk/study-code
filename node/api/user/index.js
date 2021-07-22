const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

// Get User-list
router.get("/", ctrl.index);

// Get User
router.get("/:id", ctrl.show);

// Delete User
router.delete("/:id", ctrl.destroy);

// Post User
router.post("/", ctrl.create);

// Put User
router.put("/:id", ctrl.update);

module.exports = router;
