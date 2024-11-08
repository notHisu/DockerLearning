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

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let userGoal = "Học Docker!";
let userResult = ["Để biết DevOps!"];

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  let goalsHtml = `
    <section>
      <h2>Mục tiêu</h2>
      <h3>${userGoal}</h3>
      <h2>Kết quả</h2>
      <h3>${userResult.join(", ")}</h3>
    </section>
  `;

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        ${goalsHtml}
        <form action="/store-goal" method="POST">
          <div class="form-control">
            <label>Mục tiêu</label>
            <input type="text" name="goal" placeholder="${userGoal}">
          </div>
          <div class="form-control">
            <label>Kết quả</label>
            <input type="text" name="result" placeholder="Nhập kết quả">
          </div>
          <button>Đặt mục tiêu</button>
        </form>
      </body>
    </html>
  `);
});

app.post("/store-goal", (req, res) => {
  const enteredGoal = req.body.goal;
  const enteredResult = req.body.result;

  if (enteredGoal === userGoal) {
    userResult.push(enteredResult);
  } else {
    userGoal = enteredGoal;
    userResult = [enteredResult];
  }

  res.redirect("/");
});

app.listen(80);