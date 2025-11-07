import {
  listAllCats,
  findCatById,
  addCat,
  listCatsByUserId,
} from '../models/cat-model.js'; // muista .js-pääte

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getMyCats = async (req, res) => {
  const cats = await listCatsByUserId(res.locals.user.user_id);
  res.json(cats);
};

const getCatsByUserId = async (req, res) => {
  const cats = await listCatsByUserId(req.params.id);
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

/*
// Post cat
const postCat = async (req, res) => {
  //console.log('req.body =', req.//body);
  //console.log('req.file =', req.//file);
  //console.log('req.file.filename=', //req.file.filename);

  // Allow cat without image
  req.body.filename = req.file ? req.file.filename : req.body.filename || null;


  // Lisää tiedostonimi req.bodyyn, jotta addCat saa kaikki tiedot
  //req.body.filename = req.file.filename;

  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};
*/

// Post cat
const postCat = async (req, res) => {
  //console.log('req.body =', req.//body);
  //console.log('req.file =', req.//file);
  //console.log('req.file.filename=', //req.file.filename);

  const newCat = req.body;

  // Allow cat without image
  newCat.filename = req.file ? req.file.filename : newCat.filename || null;

  // If authenticated user info is available
  newCat.owner = res.locals.user?.user_id || req.body.owner;

  // Lisää tiedostonimi req.bodyyn, jotta addCat saa kaikki tiedot
  //req.body.filename = req.file.filename;

  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  // not implemented in this example, this is future homework -> lisää await ja kutsu kissan lisäyksen funktiota (cat-modelissa)
  res.status(200);
  res.json({message: 'Cat item updated.'});
};

const deleteCat = async (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.json({message: 'Cat item deleted.'});
};

export {
  getCat,
  getMyCats,
  getCatsByUserId,
  getCatById,
  postCat,
  putCat,
  deleteCat,
};
