import promisePool from '../../utils/database.js';

// Data from database

// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?


const listAllCats = async () => {
    const result = await promisePool.query('SELECT * FROM wsk_cats');
    const rows = await result[0];
    console.log('rows', rows);

    // Set owner name to owner value in response
    for (let row of rows) {
      const user_id = row.owner;
      const ownerResponse = await promisePool.query('SELECT name FROM wsk_users WHERE user_id = ?', [user_id]);

      const ownerName = ownerResponse[0][0].name;
      console.log('Owner name:');
      console.log(ownerName);
      row.owner = ownerName;

    }

    return rows;
};

const findCatById = async (id) => {
    const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
    console.log('rows', rows);

     if (rows.length === 0) {
        return false;
     }

     const ownerId = rows[0].owner;
     //console.log('owner id: ' + ownerId);

     const ownerResponse = await promisePool.query('SELECT name FROM wsk_users WHERE user_id = ?', [ownerId]);
     const ownerName = ownerResponse[0][0].name;

     // Set owner name to owner value (to response, database is original)
     rows[0].owner = ownerName;
     console.log(ownerName);

     return rows[0];
};

const findCatsByUserId = async (user_id) => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats WHERE owner = ?', [user_id]);

  console.log(rows);
  return rows;
}

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
    const result = await promisePool.execute(sql, params);
    const rows = result[0];
    console.log('rows', rows);
     if (rows.affectedRows === 0) {
        return false;
     }
    return {cat_id: rows.insertId};
    //return cat;
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [cat, id]);
    const result = await promisePool.execute(sql);
    const rows = result[0];
    console.log('rows', rows);

     if (rows.affectedRows === 0) {
        return false;
     }
     return {cat_id: id};
};

const removeCat = async (id) => {
    const [rows] = await promisePool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
    console.log('rows', rows);
     if (rows.affectedRows === 0) {
        return false;
     }
     return {message: `Cat ${id} deleted`};
};

export {listAllCats, findCatById, findCatsByUserId, addCat, modifyCat, removeCat};
