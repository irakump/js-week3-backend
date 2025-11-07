// mock data
const userItems = [
  {
    user_id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 2,
    name: 'Michael Brown',
    username: 'mbrown',
    email: 'michael@metropolia.fi',
    role: 'admin',
    password: 'mike456',
  },
  {
    user_id: 3,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'pass123',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems.length + 1; // tämä pitäisi tulla tietokannasta (auto incerement)
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password
  });
  return {user_id: newId};
};

export {listAllUsers, findUserById, addUser};


import promisePool from '../../utils/database.js';



// TODO: muokkaa nämä vastaamaan user-db:tä, poista ylemmät tekstit
/*
const listAllUsers = async () => {
    const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
    console.log('rows', rows);
    return rows;
};

const findUserById = async (id) => {
    const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
    console.log('rows', rows);
     if (rows.length === 0) {
        return false;
     }
     return rows[0];
};

const addUser = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
    return {cat_id: rows[0].insertId};
};

const modifyUser = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [cat, id]);
    const rows = await promisePool.execute(sql);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
     return {message: 'success'};
};

const removeUser = async (id) => {
    const [rows] = await promisePool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
    console.log('rows', rows);
     if (rows.affectedRows === 0) {
        return false;
     }
     return {message: 'success'};
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat};
*/
