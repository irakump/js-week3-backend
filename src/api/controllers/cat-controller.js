import {listAllCats, findCatById, findCatsByUserId, addCat, modifyCat, removeCat} from '../models/cat-model.js';

const getCat = async (req, res) => {
  const cats = await listAllCats()
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

// Get cats by user id
const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(req.params.userId);

  if (cats) {
    res.json(cats);
  } else {
    res.sendStatus(404);
  }

}

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
  // not implemented in this example, this is future homework
  res.status(200);
  res.json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, getCatsByUserId, postCat, putCat, deleteCat};
