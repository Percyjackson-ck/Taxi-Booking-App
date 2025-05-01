import userModel from '../models/userModel.js'

const createUser = async ({ fullname, email, password }) => {
  // Check if fullname contains both firstname and lastname
  if (!fullname || !fullname.firstname ) {
    throw new Error('Fullname must contain both firstname and lastname');
  }

  const { firstname, lastname } = fullname;

  // Check if email and password are provided
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  // Create a new user (await the promise returned by create())
  const user =  userModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password
  });

  return user;
};

export default createUser;
