
const bcrypt = require('bcrypt');

async function hashPassword(plainTextPassword) {
  try {
    const saltRounds = 10; // Number of rounds for salting
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

// Replace 'yourPasswordHere' with the plain text password you want to hash
hashPassword('tshering');
