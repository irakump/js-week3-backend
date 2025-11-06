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
