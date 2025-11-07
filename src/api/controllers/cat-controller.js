import { listAllCats, findCatById, addCat } from "../models/cat-model.js";   // muista .js-pääte

const getCat = async (req, res) => {
  res.json(await listAllCats());
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

// Post cat
const postCat = async (req, res) => {
  console.log(req.body);
  //console.log(req.file);
  //console.log(req.file.filename);

  // Lisää tiedostonimi req.bodyyn, jotta addCat saa kaikki tiedot
  req.body.filename = req.file.filename;

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


export {getCat, getCatById, postCat, putCat, deleteCat};
