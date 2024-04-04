const client = require('./index');

const seed = async () => {
  console.log('Seeding the database');
  client.connect();
  try {
    // Clear the database
    await client.query(`
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS shopping_cart;
            DROP TABLE IF EXISTS traveler;
            DROP TABLE IF EXISTS users;
        `);
    console.log('1');
    // Recreate tables
    await client.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(255),
        passportNumber VARCHAR(255)
      );
      
      CREATE TABLE traveler (
        traveler_id SERIAL PRIMARY KEY,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        date_of_birth INTEGER NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        passportNumber VARCHAR(255) UNIQUE NOT NULL,
        user_id INTEGER REFERENCES users(user_id)
      );
      
      CREATE TABLE shopping_cart (
        cart_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        traveler_id INTEGER REFERENCES traveler(traveler_id),
        quantity INTEGER NOT NULL,
        CONSTRAINT unique_product_in_cart UNIQUE (user_id, traveler_id)
      );
      
      CREATE TABLE orders (
        order_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        traveler_id INTEGER REFERENCES traveler(traveler_id),
        quantity INTEGER NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Completed Seeding Database');
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.end();
  }
};

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;
