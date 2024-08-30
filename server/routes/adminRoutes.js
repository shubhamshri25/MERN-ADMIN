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

const adminMiddleware = require("../middlewares/admin-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

// getting all the users
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// getting specific user
router.get("/users/:id", authMiddleware, adminMiddleware, getUserById);

// updating user by id
router.patch("/users/update/:id", authMiddleware, adminMiddleware, updateUserByid);

// deleting user by id
router.delete("/users/delete/:id", authMiddleware, adminMiddleware, deleteUserById);

// getting all the contacts
router.get("/contacts", authMiddleware, adminMiddleware, getAllContacts);

// deleting user by id
router.delete("/contacts/delete/:id", authMiddleware, adminMiddleware, deleteContactById);

module.exports = router;
