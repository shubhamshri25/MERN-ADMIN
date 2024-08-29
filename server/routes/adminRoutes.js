const expreress = require("express");
const router = expreress.Router();
const {
  getAllUsers,
  getUserById,
  getAllContacts,
  updateUserByid,
  deleteUserById,
  deleteContactById,
} = require("../controllers/admin-controllers");

// getting all the users
router.get("/users", getAllUsers);

// getting specific user
router.get("/users/:id", getUserById);

// updating user by id
router.put("/users/:id", updateUserByid);

// deleting user by id
router.delete("/users/:id", deleteUserById);

// getting all the contacts
router.get("/contacts", getAllContacts);

// deleting user by id
router.delete("/users/:id", deleteContactById);

module.exports = router;
