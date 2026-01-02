const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  deleteContact,
} = require("../Controllers/contactController");

// Clean syntax: map root path '/' to both GET and POST
router.route("/").get(getContacts).post(createContact);

// Map ID path '/:id' to DELETE
router.route("/:id").delete(deleteContact);

module.exports = router;
