// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// let userGoal = 'Học Docker!';
// let userResult = 'Để biết DevOps!';
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
// app.use(express.static('public'));
// app.get("/", (req, res) => {
//   res.send(`
//     <html>
//       <head>
//         <link rel="stylesheet" href="styles.css">
//       </head>
//       <body>
//         <section>
//           <h2>Mục tiêu</h2>
//           <h3>${userGoal}</h3>
//           <h2>Kết quả</h2>
//           <h3>${userResult}</h3>
//         </section>
//          <form action="/store-goal" method="POST">
//           <div class="form-control">
//             <label>Mục tiêu</label>
//             <input type="text" name="goal" placeholder="${userGoal}">
//           </div>
//           <div class="form-control">
//             <label>Kết quả</label>
//             <input type="text" name="result" placeholder="${userResult}">
//           </div>
//           <button>Đặt mục tiêu</button>
//         </form>
//       </body>
//     </html>
//   `);
// });
// app.post("/store-goal", (req, res) => {
//   const enteredGoal = req.body.goal;
//   console.log(enteredGoal);
//   userGoal = enteredGoal;
//   if (req.body.goal != "") {
//   {
//     userResult = req.body.result;
//   }
//   res.redirect("/");
// } 
// });

// app.listen(80);

// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// let goals = {
//   "Học Docker!": ["Để biết DevOps!"],
// };

// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   let goalsHtml = Object.keys(goals)
//     .map(
//       (goal) => `
//     <section>
//       <h2>Mục tiêu</h2>
//       <h3>${goal}</h3>
//       <h2>Kết quả</h2>
//       <h3>${goals[goal].join(", ")}</h3>
//     </section>
//   `
//     )
//     .join("");

//   res.send(`
//     <html>
//       <head>
//         <link rel="stylesheet" href="styles.css">
//       </head>
//       <body>
//         ${goalsHtml}
//         <form action="/store-goal" method="POST">
//           <div class="form-control">
//             <label>Mục tiêu</label>
//             <input type="text" name="goal" placeholder="Nhập mục tiêu">
//           </div>
//           <div class="form-control">
//             <label>Kết quả</label>
//             <input type="text" name="result" placeholder="Nhập kết quả">
//           </div>
//           <button>Đặt mục tiêu</button>
//         </form>
//       </body>
//     </html>
//   `);
// });

// app.post("/store-goal", (req, res) => {
//   const enteredGoal = req.body.goal;
//   const enteredResult = req.body.result;

//   if (!goals[enteredGoal]) {
//     goals[enteredGoal] = [];
//   }
//   goals[enteredGoal].push(enteredResult);

//   res.redirect("/");
// });

// app.listen(80);

// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// let goals = {
//   "Học Docker!": ["Để biết DevOps!"],
// };

// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   let goalsHtml = Object.keys(goals)
//     .map(
//       (goal) => `
//     <section>
//       <h2>Lê Trung Hoà Hiếu</h2>
//       <h3>${goal}</h3>
//       <h2>Kết quả</h2>
//       <h3>${goals[goal].join(", ")}</h3>
//     </section>
//   `
//     )
//     .join("");

//   res.send(`
//     <html>
//       <head>
//         <link rel="stylesheet" href="styles.css">
//       </head>
//       <body>
//         ${goalsHtml}
//         <form action="/store-goal" method="POST">
//           <div class="form-control">
//             <label>Mục tiêu</label>
//             <input type="text" name="goal" placeholder="Nhập mục tiêu">
//           </div>
//           <div class="form-control">
//             <label>Kết quả</label>
//             <input type="text" name="result" placeholder="Nhập kết quả">
//           </div>
//           <button>Đặt mục tiêu</button>
//         </form>
//       </body>
//     </html>
//   `);
// });

// app.post("/store-goal", (req, res) => {
//   const enteredGoal = req.body.goal;
//   const enteredResult = req.body.result;

//   if (!enteredGoal) {
//     res.send(`
//       <html>
//         <head>
//           <script>
//             alert("You have not set a goal");
//             window.location.href = "/";
//           </script>
//         </head>
//         <body></body>
//       </html>
//     `);
//     return;
//   }

//   if (!goals[enteredGoal]) {
//     goals[enteredGoal] = [];
//   }
//   goals[enteredGoal].push(enteredResult);

//   res.redirect("/");
// });

// app.listen(80);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let goals = [{ userGoal: "Học Docker!", userResults: ["Để biết DevOps!"] }];

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  const goalSections = goals
    .map(
      ({ userGoal: goal, userResults: results }) => `
    <section>
      <h2>Lê Trung Hoà Hiếu</h2>
      <h3>${goal}</h3>
      <h2>Kết quả</h2>
      ${results.map((result) => `<h4>${result}</h4>`).join("")}
    </section>
  `
    )
    .join("");

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        ${goalSections}
        <form action="/store-goal" method="POST">
          <div class="form-control">
            <label>Mục tiêu</label>
            <input type="text" name="goal">
          </div>
          <div class="form-control">
            <label>Kết quả</label>
            <input type="text" name="result">
          </div>
          <button>Đặt mục tiêu và kết quả</button>
        </form>
      </body>
    </html> 
  `);
});

app.post("/store-goal", (req, res) => {
  const enteredGoal = req.body.goal;
  const enteredResult = req.body.result;

  console.log("Goal:", enteredGoal);
  console.log("Result:", enteredResult);

  const existingGoal = goals.find((g) => g.userGoal === enteredGoal);

  if (existingGoal) {
    if (!existingGoal.userResults.includes(enteredResult)) {
      existingGoal.userResults.push(enteredResult);
    }
  } else {
    goals.push({ userGoal: enteredGoal, userResults: [enteredResult] });
  }

  res.redirect("/");
});

app.listen(80);