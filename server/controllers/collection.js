import Collection from "../models/collection.js";

// create new collection
export const addCollection = async (req, res) => {
  const collection = req.body;
  const newCollection = new Collection(collection);
  try {
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// add movies to collection
export const addToCollection = async (req, res) => {
  const { id: _id } = req.params;
  const movie = {
    id: req.body.id,
    title: req.body.title,
    release_date: req.body.release_date,
    genre_ids: req.body.genre_ids,
    poster_path: req.body.poster_path,
  };

  try {
    const existingCollection = await Collection.findById(_id);
    existingCollection.movies.push(movie);
    await existingCollection.save();
    res.status(200).json(existingCollection);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get collection details
export const getCollectoinDetails = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const collection = await Collection.findById(_id);
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: "Collection doesn't exist" });
  }
};

// get all collections
export const getAllCollections = async (req, res) => {
  try {
    let collections = Collection.find();
    const result = await collections;
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get matching collections
export const getMatchingCollections = async (req, res) => {
  const { id } = req.params;
  try {
    let collections = Collection.find({ movies: { $elemMatch: { id: id } } });
    !collections && res.status(400).json("No matching collection");

    const result = await collections;
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// add imgs to cover
export const addCover = async (req, res) => {
  const { id: _id } = req.params;
  const img = req.body.img;
  try {
    const updatedCover = await Collection.findByIdAndUpdate(
      _id,
      {
        $set: {
          cover: img,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCover);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE COLLECTION
export const deleteCollection = async (req, res) => {
  const { id: _id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(_id))
  //   return res.status(404).send("No collection with that id");

  await Collection.findByIdAndRemove(_id);

  res.json({ message: "Collection deleted" });
};
