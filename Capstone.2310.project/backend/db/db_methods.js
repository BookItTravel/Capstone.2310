const axios = require("axios");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// Mock API endpoint for Amadeus product (flight, hotel, destination) information
const PRODUCTS_API_URL = "https://example.com/products";

// Simulated database storage
let users = [];
let shoppingCart = [];
let orders = [];

// Helper function to fetch products from third-party API
const fetchProductsFromAPI = async () => {
  try {
    const response = await axios.get(PRODUCTS_API_URL);
    return response.data;
  } catch (error) {
    console.log("Error fetching products from API:", error);
    throw error;
  }
};

// User Methods

// Add a new user
const addUser = async ({
  username,
  password,
  firstName,
  lastName,
  email,
  phone,
  passportNumber,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await db.query(
      `
            INSERT INTO users(username, password, firstName, lastName, email, phone, passportNumber)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        phone,
        passportNumber,
      ]
    );
  } catch (error) {
    throw error;
  }
};

// Update an existing users account
const updateUser = async (user_id, fields = {}) => {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await db.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${user_id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
};

// Retrieve all Users
const getAllUsers = async () => {
  try {
    const { rows } = await db.query(`
            SELECT user_id, username, firstName, lastName, email, phone, passportNumber
            FROM users;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Retrieve a user by id number
const getUserById = async (user_id) => {
  try {
    const {
      rows: [user],
    } = await db.query(`
            SELECT user_id, username, firstName, lastName, email, phone, passportNumber
            FROM users;
            WHERE id=${user_id}
        `);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist",
      };
    }
    return user;
  } catch (error) {
    throw error;
  }
};

// Retrieve a user by username
const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
            SELECT *
            FROM users
            WHERE username=$1
        `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

// Delete a user from the database
const deleteUser = async (username) => {
  try {
    const result = await db.query(
      `
            DELETE FROM users
            WHERE username=$1
            RETURNING *
        `,
      [username]
    );
    // Check if the user was deleted successfully
    if (result.rowCount === 0) {
      throw new Error(`User with username ${username} not found`);
    }
    // Return the deleted user
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Shopping Cart Methods

// Add a product to the cart
const addToCart = async (user_id, product_id, quantity) => {
    try {
        const {
          rows: [cartItem],
        } = await db.query(
          `
                INSERT INTO shopping_cart(user_id, product_id, quantity)
                VALUES($1, $2, $3)
                RETURNING *;
            `,
          [
            user_id, product_id, quantity
          ]
        );
        return cartItem;
      } catch (error) {
        throw error;
      }
};

// Remove a product from the cart
const removeFromCart = async (user_id, product_id) => {
    try {
        const {
          rows: [cartItem],
        } = await db.query(
          `
                DELETE FROM shopping_cart
                WHERE user_id=$1 AND product_id=$2
                RETURNING *;
            `,
          [user_id, product_id]
        );
        return cartItem;
      } catch (error) {
        throw error;
      }
};

// Update the cart
const updateCart = async (user_id, product_id, newQuantity) => {
    try {
        const {
          rows: [cartItem],
        } = await db.query(
          `
                UPDATE shopping_cart
                SET quantity=$1
                WHERE user_id=$2 AND product_id=$3
                RETURNING *;
            `,
          [newQuantity, user_id, product_id]
        );
        return cartItem;
      } catch (error) {
        throw error;
      }
};

// Order Methods

// Place an order
const placeOrder = async (user_id, product_id, quantity) => {
    try {
        const { rows: [order] } = await db.query(`
            INSERT INTO order (user_id, product_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [user_id, priduct_id, quantity]);
        return order;
    } catch (error) {
        throw error;
    }
};

// Retrieve order history based on user_id
const getOrderHistoryByUserId = async (user_id) => {
    try {
        const { rows } = await db.query(`
            SELECT *
            FROM orders
            WHERE user_id=$1;
        `, [user_id]);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Product Methods

// Helper function to get product information from Amadeus
const getProductInfo = async (product_id) => {
    const products = await fetchProductsFromAPI();
    return products.find((product) => product.id === product_id);
};

module.exports = {
  addUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  addToCart,
  removeFromCart,
  updateCart,
  placeOrder,
  getOrderHistoryByUserId,
  getProductInfo,
};