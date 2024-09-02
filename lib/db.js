import mysql from 'mysql2/promise'; // Use the promise-based interface

// Database connection configuration
const connection = mysql.createPool({
  host: 'localhost', // Replace with your MySQL server's hostname
  port: 3306,        // Replace if your MySQL server uses a different port
  user: 'root',       // Replace with your MySQL username
  password: 'shavingmagicbeardgel1', // Replace with your MySQL password
  database: 'script_portal',  // Replace with your database name
});

// Function to execute SQL queries
export async function query(sql, values) {
  try {
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error; // Re-throw the error for handling in your API routes
  }
}