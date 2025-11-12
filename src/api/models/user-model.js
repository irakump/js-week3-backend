import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
    const result = await promisePool.query('SELECT * FROM wsk_users');
    console.log('result', result);
    const rows = result[0];
    return rows;
};

const findUserById = async (id) => {
    const result = await promisePool.execute('SELECT * FROM wsk_users WHERE user_id = ?', [id]);
    console.log('result', result);
    const rows = result[0];

     if (rows.length === 0) {
        return false;
     }
     return rows;
};

const findUserByUsername = async (username) => {
    const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE username = ?', [username]);
    console.log('rows', rows);

     if (rows.length === 0) {
        return false;
     }
     return rows[0];  // return the first object (only one id searched)
};

const addUser = async (user) => {
  const {name, username, email, password, role} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
    const result = await promisePool.execute(sql, params);
    const rows = result[0];
    console.log('rows', rows);
    console.log(user);
     if (rows.affectedRows === 0) {
        return false;
     }
    return {user_id: rows.insertId};
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [user, id]);
    const result = await promisePool.execute(sql);
    const rows = result[0];

    console.log('rows', rows);
     if (rows.affectedRows === 0) {
        return false;
     }

     return {user_id: id};
};

const removeUser = async (id) => {

  // Get user first
  const [rows] = await promisePool.execute('SELECT * from wsk_users WHERE user_id = ?', [id]);

  // User does not exist
  if (rows.length === 0) {
        return false;
     }

     // Save user
  const userToRemove = rows[0];

  const [result] = await promisePool.execute('DELETE FROM wsk_users WHERE user_id = ?', [id]);
    console.log('result', result);

     if (result.affectedRows === 0) {
        return false;
     }

     return {user_id: userToRemove.user_id};
};

export {listAllUsers, findUserById, findUserByUsername, addUser, modifyUser, removeUser};

