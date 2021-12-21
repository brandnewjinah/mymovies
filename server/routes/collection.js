import express from "express";
import { checkAuth, checkToken } from "../middleware/checkAuth.js";
import {
  addCollection,
  addToCollection,
  getCollectoinDetails,
  getAllCollections,
  getMatchingCollections,
  addCover,
  deleteCollection,
} from "../controllers/collection.js";

const router = express.Router();

// @route POST /collections
// @desc Create a new collection
// @access Private
router.post("/", addCollection);

// @route patch /collections/addToCollection/:id
// @desc Create a new collection
// @access Private
router.patch("/addToCollection/:id", addToCollection);

// @route GET /collections/:id
// @desc Get collection details
// @access Private
router.get("/:id", getCollectoinDetails);

// @route GET /collections
// @desc Get all collections
// @access Private
router.get("/", getAllCollections);

// @route GET /collections/search/:id
// @desc Get collections that includes the id
// @access Private
router.get("/search/:id", getMatchingCollections);

// @route PUT /collections/addCover/:id
// @desc Create a new collection
// @access Private
router.put("/addCover/:id", addCover);

// @route DELETE /collections/:id
// @desc Delete selected collection
// @access Private
router.delete("/:id", deleteCollection);

export default router;
