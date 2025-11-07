import { listAllUsers, findUserById, addUser } from "../models/user-model.js";   // muista .js-pääte

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

// Get user by id
const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

// Post user
const postUser = async (req, res) => {
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};


const putUser = async (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.json({message: 'User item updated.'});
};

const deleteUser = async (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.json({message: 'User item deleted.'});
};


export { getUser, getUserById, postUser, putUser, deleteUser };

