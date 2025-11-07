import { listAllCats, findCatById, addCat } from "../models/cat-model.js";   // muista .js-pääte

const getCat = (req, res) => {
  res.json(listAllCats());
};

// Get cat by id
const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

// Post cat
const postCat = (req, res) => {
  console.log(req.body);
  //console.log(req.file);
  //console.log(req.file.filename);

  // Lisää tiedostonimi req.bodyyn, jotta addCat saa kaikki tiedot
  req.body.filename = req.file.filename;

  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};


const putCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.json({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.json({message: 'Cat item deleted.'});
};


export {getCat, getCatById, postCat, putCat, deleteCat};
