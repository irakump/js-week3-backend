import {listAllUsers, findUserById, addUser, modifyUser, removeUser} from '../models/user-model.js';
import {findCatById, findCatsByUserId, removeCat} from '../models/cat-model.js';

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
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

// Modify user
const putUser = async (req, res) => {

  const result = await modifyUser(req.body, req.params.id);

  if (result) {
    res.status(201);
    res.json({message: 'User item updated.', result});
  } else {
    res.sendStatus(400);
  }

};

// Delete user
const deleteUser = async (req, res) => {

  // Test if user exists
  const user = await findUserById(req.params.id);

  if (user) {

    // Remove cats owned by removed user
    const catResult = await findCatsByUserId(req.params.id);
    //console.log('catresult:');
    //console.log(catResult);

    if (catResult) {
      for (let i = 0; i < catResult.length; i++) {
        const catId = catResult[i].cat_id;
        //console.log(catId);

        const removedCatResult = await removeCat(catId);
        console.log({message: 'Cat deleted', removedCatResult});
      }


    }

    const result = await removeUser(req.params.id);

    res.status(201);
    res.json({message: 'User item deleted.', result});
  } else {
    res.sendStatus(400);
  }

};

export {getUser, getUserById, postUser, putUser, deleteUser};
