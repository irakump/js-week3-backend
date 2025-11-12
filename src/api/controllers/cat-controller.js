import {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

// Get cat by id
const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const getMyCats = async (req, res) => {
  console.log('getting cats for', res.locals.user.user_id);
  const cats = await findCatsByUserId(res.locals.user.user_id);
  res.json(cats);
};

// Get cats by user id
const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(req.params.id);

  if (cats) {
    res.json(cats);
  } else {
    res.sendStatus(404);
  }
};

// Post new cat
const postCat = async (req, res) => {
  console.log('req.body =', req.body);
  console.log('req.file =', req.file);

  if (req.file) {
    console.log('req.file.filename=', req.file.filename);
  } else {
    console.log('Filename not found')
  }

  // Salli kissan lisäys ilman kuvaa
  const newCat = req.body;

  if (req.file) {
    newCat.filename = req.file.filename; // Lisää tiedostonimi req.bodyyn, jotta addCat saa kaikki tiedot
  } else if (!newCat.filename) {
    newCat.filename = null;
  }

  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

// Modify cat
const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  if (result) {
    res.status(201);
    res.json({message: 'Cat item updated.', result});
  } else {
    res.sendStatus(400);
  }
};

// Delete cat
const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);

  if (result) {
    res.status(201);
    res.json({message: 'Cat item deleted.', result});
  } else {
    res.sendStatus(400);
  }
};

export {
  getCat,
  getCatById,
  getMyCats,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
};
