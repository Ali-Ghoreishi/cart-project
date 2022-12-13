// import mysql from "mysql2"
// import dotenv from "dotenv"

// import path from "path"

// //* Load Config
// dotenv.config({ path: process.cwd()+'/build/config/config.env' });


// //* Open the connection to MySQL server
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD
// });



// //* Run create database statement
// const createDB = () => {
//   connection.query(
//     `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`,
//     function (err: any, results: any) {
//       if (err) {
//         return console.log("The database was not created");
//       }
//       console.log(`Database created`);
//     }
//   );
//   // Close the connection
//   connection.end();
// }

// createDB();