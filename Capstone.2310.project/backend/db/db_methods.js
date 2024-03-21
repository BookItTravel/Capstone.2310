const axios = require("axios");
const client = require('./index');
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// User Methods

// Add a new user
const addUser = async ({
  username,
  password,
  email,
 
}) => {
  
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, password, email)
            VALUES($1, $2, $3)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,
      [
        username,
        password,
        email,
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
    } = await client.query(
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
    const { rows } = await client.query(`
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
    } = await client.query(`
            SELECT user_id, username, firstName, lastName, email, phone, passportNumber
            FROM users
            WHERE user_id=${user_id}
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
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE username=$1
        `,
      [username]
    );
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

// Delete a user from the database
const deleteUser = async (username) => {
  try {
    const result = await client.query(
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

// Traveler Methods

const addTraveler = async ({
   firstname, lastname, date_of_birth, email, passportNumber, user_id
}) => {
  try {
    const {
      rows: [traveler],
    } = await client.query(
      ` INSERT INTO traveler(firstname, lastname, date_of_birth, email, passportNumber, user_id)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [firstname, lastname, date_of_birth, email, passportNumber, user_id]
    )
  return traveler
    } catch (error) {
      throw (error)
    }
}

// Shopping Cart Methods

// Add a traveler to the cart
const addToCart = async (user_id, traveler_id, quantity) => {
    try {
        const {
          rows: [cartItem],
        } = await client.query(
          `
                INSERT INTO shopping_cart(user_id, traveler_id, quantity)
                VALUES($1, $2, $3)
                RETURNING *;
            `,
          [
            user_id, traveler_id, quantity
          ]
        );
        return cartItem;
      } catch (error) {
        throw error;
      }
};

// Remove a traveler from the cart
const removeFromCart = async (user_id, traveler_id) => {
    try {
        const {
          rows: [cartItem],
        } = await client.query(
          `
                DELETE FROM shopping_cart
                WHERE user_id=$1 AND traveler_id=$2
                RETURNING *;
            `,
          [user_id, traveler_id]
        );
        return cartItem;
      } catch (error) {
        throw error;
      }
};

// Update the cart
const updateCart = async (user_id, traveler_id, newQuantity) => {
    try {
        const {
          rows: [cartItem],
        } = await client.query(
          `
                UPDATE shopping_cart
                SET quantity=$1
                WHERE user_id=$2 AND traveler_id=$3
                RETURNING *;
            `,
          [newQuantity, user_id, traveler_id]
        );
        return cartItem;
      } catch (error) {
        throw error;
      }
};

// Retrieve a cart by user id number
const getCartByUserId = async (user_id) => {
  try {
    const {
      rows: [cart],
    } = await client.query(`
            SELECT user_id, cart_id, traveler_id, quantity
            FROM shopping_cart;
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

// Order Methods

// Place an order
const placeOrder = async (user_id, traveler_id, quantity) => {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO order (user_id, traveler_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [user_id, traveler_id, quantity]);
        return order;
    } catch (error) {
        throw error;
    }
};

// Retrieve order history based on user_id
const getOrderHistoryByUserId = async (user_id) => {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM orders
            WHERE user_id=$1;
        `, [user_id]);
        return rows;
    } catch (error) {
        throw error;
    }
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
  getCartByUserId,
  placeOrder,
  getOrderHistoryByUserId,
  addTraveler
  //getProductInfo,
};