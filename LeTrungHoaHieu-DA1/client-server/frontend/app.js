const express = require("express");
const axios = require("axios"); // Import axios
const app = express();

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API endpoint
const API_URL = "http://backend/accounts";

// Render login page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .content {
          padding: 1rem;
        }
        form {
          padding: 1rem;
        }
        label {
          display: block;
          text-align: left;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input {
          width: calc(100% - 20px);
          padding: 10px;
          margin-bottom: 15px;
          border: none;
          border-bottom: 1px solid #ccc;
          background-color: #fff8e1; /* Light yellow background */
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        .header {
          display: flex;
          align-items: center;
          height: 50px;
          border-bottom: 1px solid #ccc;
          background-color: #fff;
          position: relative;
          padding: 0 10px;
        }
        .backButton {
          background-color: #fff;
          color: black;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }
        .title {
          margin: 0 auto;
          font-size: 18px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">Hệ thống ATM</h1>
      </div>
      <div class="content">
        <div>--- Đăng nhập ---</div>
        <form action="/home" method="POST">
          <input type="email" name="email" placeholder="Email" required value="pvhoang940@gmail.com" />
          <input type="password" name="password" placeholder="Password" required value="12345" />
          <button type="submit">OK</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Handle login
app.post("/home", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch all accounts from the backend
    const response = await axios.get(API_URL);
    const accounts = response.data;

    // Find the account that matches the email and password
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      // Login successful, render home page
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Home</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .content {
              padding: 1rem;
            }
            .viewInfo {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px;
              border: none;
              border-bottom: 1px solid #ccc;
              border-radius: 4px;
              text-decoration: none; /* Remove underline */
              color: inherit; /* Inherit text color */
              cursor: pointer; /* Pointer cursor */
            }
            .viewInfo span {
              display: flex;
              align-items: center;
            }
            .header {
              display: flex;
              align-items: center;
              height: 50px;
              border-bottom: 1px solid #ccc;
              background-color: #fff;
              position: relative;
              padding: 0 10px;
            }
            .backButton {
              background-color: #fff;
              color: blue;
              border: none;
              font-size: 16px;
              cursor: pointer;
            }
            .backButton img {
              filter: brightness(0) saturate(100%) invert(21%) sepia(83%) saturate(2425%) hue-rotate(206deg) brightness(92%) contrast(89%);
            }
            .title {
              margin: 0 auto;
              font-size: 18px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <button class="backButton" onclick="history.back()">
              <img width="15" height="15" src="https://img.icons8.com/metro/26/back.png" alt="back" /> Back
            </button>
            <h1 class="title">Hệ thống ATM</h1>
          </div>
          <div class="content">
            <p>--- Tài khoản: ${email} ---</p>
            <a class="viewInfo" href="/account-info?email=${email}&balance=${account.balance}">
              [Xem thông tin tài khoản]
              <span>
                <img width="15" height="15" src="https://img.icons8.com/ios/50/forward--v1.png" alt="forward--v1"/>
              </span>
            </a>
          </div>
        </body>
        </html>
      `);
    } else {
      // Login failed due to incorrect email or password
      return res.status(401).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Login Failed</title>
        </head>
        <body>
          <h1>Login Failed</h1>
          <p>Incorrect email or password. Please try again.</p>
          <a href="/">Go back to login</a>
        </body>
        </html>
      `);
    }
  } catch (error) {
    console.error("Error fetching account data:", error.message);
    return res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Error</title>
      </head>
      <body>
        <h1>Internal Server Error</h1>
        <p>There was an error fetching your account data. Please try again later.</p>
        <a href="/">Go back to login</a>
      </body>
      </html>
    `);
  }
});

// Render account information page
app.get("/account-info", (req, res) => {
  const { email, balance } = req.query;

  if (!email || !balance) {
    return res.status(400).send("<h1>Invalid account information</h1>");
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Hệ thống ATM</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .content {
          padding: 1rem;
        }
        .header {
          display: flex;
          align-items: center;
          height: 50px;
          border-bottom: 1px solid #ccc;
          background-color: #fff;
          position: relative;
          padding: 0 10px;
        }
        .backButton {
          background-color: #fff;
          color: blue;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }
        .backButton img {
          filter: brightness(0) saturate(100%) invert(21%) sepia(83%) saturate(2425%) hue-rotate(206deg) brightness(92%) contrast(89%);
        }
        .title {
          margin: 0 auto;
          font-size: 18px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <button class="backButton" onclick="history.back()">
          <img width="15" height="15" src="https://img.icons8.com/metro/26/back.png" alt="back" /> Back
        </button>
        <h1 class="title">Hệ thống ATM</h1>
      </div>
      <div class="content">
        <p>--- Tài khoản: ${email} ---</p>
        <p>--- Chi tiết --- </p>
        <p>Số tiền còn lại: ${balance}</p>
      </div>
    </body>
    </html>
  `);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
