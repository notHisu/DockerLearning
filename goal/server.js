const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let userGoal = 'Học Docker!';
let userResult = 'Để biết DevOps!';
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static('public'));
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <section>
          <h2>Mục tiêu</h2>
          <h3>${userGoal}</h3>
          <h2>Kết quả</h2>
          <h3>${userResult}</h3>
        </section>
         <form action="/store-goal" method="POST">
          <div class="form-control">
            <label>Mục tiêu</label>
            <input type="text" name="goal" placeholder="${userGoal}">
          </div>
          <div class="form-control">
            <label>Kết quả</label>
            <input type="text" name="result" placeholder="${userResult}">
          </div>
          <button>Đặt mục tiêu</button>
        </form>
      </body>
    </html>
  `);
});
app.post("/store-goal", (req, res) => {
  const enteredGoal = req.body.goal;
  console.log(enteredGoal);
  userGoal = enteredGoal;
  if (req.body.goal != "") {
  {
    userResult = req.body.result;
  }
  res.redirect("/");
}
});

app.listen(80);


// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// let goals = [{ goal: "Học Docker!", result: "Để biết DevOps!" }];

// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   let goalsHtml = goals
//     .map(
//       (g) => `
//     <section>
//       <h2>Mục tiêu</h2>
//       <h3>${g.goal}</h3>
//       <h2>Kết quả</h2>
//       <h3>${g.result}</h3>
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
//   const newGoal = {
//     goal: req.body.goal,
//     result: req.body.result,
//   };
//   goals.push(newGoal);
//   res.redirect("/");
// });

// app.listen(80);