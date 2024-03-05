const db = require("../db");

const seed = async () => {
  console.log("Seeding the database");
  try {
    // Clear the database
    await db.query(`
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS shopping_cart;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
        `);
    // Recreate tables
    await db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(255) NOT NULL,
        passportNumber VARCHAR(255) UNIQUE NOT NULL
      );
      
      CREATE TABLE products (
        product_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        type VARCHAR(20) NOT NULL
      );
      
      CREATE TABLE shopping_cart (
        cart_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(product_id),
        quantity INTEGER NOT NULL,
        CONSTRAINT unique_product_in_cart UNIQUE (user_id, product_id)
      );
      
      CREATE TABLE orders (
        order_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(product_id),
        quantity INTEGER NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;
