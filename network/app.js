const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const { Province, District, Ward } = require("./models/vn_public_apis");
const mongoose = require("mongoose");

// const Favorite = require("./models/favorite");

mongoose.connect(
  // Container
  // "mongodb://host.docker.internal:27017/vn_public_apis", // Container host
  // "mongodb://172.17.0.2:27017/vn_public_apis", // MongoDB image
  // NodeJS
  "mongodb://localhost:27017/vn_public_apis", // Local MongoDB
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();

app.use(bodyParser.json());

// app.get("/movies", async (req, res) => {
//   try {
//     const response = await axios.get("https://swapi.dev/api/films");
//     res.status(200).json({ movies: response.data });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// app.get("/people", async (req, res) => {
//   try {
//     const response = await axios.get("https://swapi.dev/api/people");
//     res.status(200).json({ people: response.data });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// Serve the HTML form
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VN Public APIs</title>
            <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f4;
        }
        h1 {
          color: #333;
        }
        form {
          background: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        label, input, button {
          display: block;
          width: 100%;
          margin-bottom: 10px;
        }
        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 10px;
          background: #007BFF;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background: #0056b3;
        }
        #result {
          margin-top: 20px;
          white-space: pre-wrap;
          background: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
      </style>
    </head>
    <body>
     <h1>Thông tin xã, phường, quận</h1>
      <form id="locationForm">
        <button type="button" onclick="fetchDataAndSave()">Lấy thông tin và lưu vào CSDL</button>
        <button type="button" onclick="fetchProvinces()">Lấy thông tin tỉnh/thành phố</button>
        <button type="button" onclick="fetchDistricts()">Lấy thông tin quận/huyện</button>
        <label for="provinceCode">Mã tỉnh/thành phố:</label>
        <input type="text" id="provinceCode" name="provinceCode">
        <button type="button" onclick="fetchDistrictsByProvince()">Lấy thông tin quận/huyện theo tỉnh/thành phố</button>
        <button type="button" onclick="fetchWards()">Lấy thông tin xã/phường</button>
        <label for="districtCode">Mã quận/huyện:</label>
        <input type="text" id="districtCode" name="districtCode">
        <button type="button" onclick="fetchWardsByDistrict()">Lấy thông tin xã/phường theo quận/huyện</button>
      </form>
      <div id="result"></div>

      <script>
        async function fetchDataAndSave() {
          const response = await fetch('/vn_public_apis');
          const data = await response.json();
          document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        } 

        async function fetchProvinces() {
          const response = await fetch('/provinces/getAll');
          const data = await response.json();
          document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        }

        async function fetchDistricts() {
          const response = await fetch('/districts/getAll');
          const data = await response.json();
          document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        }

        async function fetchDistrictsByProvince() {
          const provinceCode = document.getElementById('provinceCode').value;
          const response = await fetch(\`/districts/getByProvince/\${provinceCode}\`);
          const data = await response.json();
          document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        }

        async function fetchWards() {
          const response = await fetch('/wards/getAll');
          const data = await response.json();
          document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        }

        async function fetchWardsByDistrict() {
          const districtCode = document.getElementById('districtCode').value;
          const response = await fetch(\`/wards/getByDistrict/\${districtCode}\`);
          const data = await response.json();
          document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        }
      </script>
    </body>
    </html>
  `);
});

// Get data from the API and save to the database
app.get("/vn_public_apis", async (req, res) => {
  try {
    const response = await axios.get(
      "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
    );
    const provinces = response.data.data.data;
    console.log(provinces);

    // Save provinces to the database
    await Province.insertMany(provinces);

    const response2 = await axios.get(
      "https://vn-public-apis.fpo.vn/districts/getAll?limit=-1"
    );
    const districts = response2.data.data.data;
    console.log(districts);

    // Save districts to the database
    await District.insertMany(districts);

    const response3 = await axios.get(
      "https://vn-public-apis.fpo.vn/wards/getAll?limit=-1"
    );
    const wards = response3.data.data.data;
    console.log(wards);

    // Save wards to the database
    await Ward.insertMany(wards);

    // Send a single response with all the data
    res.status(200).json({ provinces, districts, wards });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Retrieve and display provinces
app.get("/provinces/getAll", async (req, res) => {
  try {
    const provinces = await Province.find();
    res.status(200).json(provinces);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Retrieve and display districts
app.get("/districts/getAll", async (req, res) => {
  try {
    const districts = await District.find();
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Retrieve and display districts by province code
app.get("/districts/getByProvince/:provinceCode", async (req, res) => {
  const { provinceCode } = req.params;
  try {
    const districts = await District.find({ provinceCode });
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Retrieve and display wards
app.get("/wards/getAll", async (req, res) => {
  try {
    const wards = await Ward.find();
    res.status(200).json(wards);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Retrieve and display wards by district code
app.get("/wards/getByDistrict/:districtCode", async (req, res) => {
  const { districtCode } = req.params;
  try {
    const wards = await Ward.find({ districtCode });
    res.status(200).json(wards);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

/* app.get("/provinces/getAll", async (req, res) => {
  try {
    const response = await axios.get(
      "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
    );

    const provinces = response.data.data.data;
    console.log(provinces);

    // Save provinces to the database
    await Province.insertMany(provinces);

    res.status(200).json({ provinces: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/districts/getAll", async (req, res) => {
  try {
    const response = await axios.get(
      "https://vn-public-apis.fpo.vn/districts/getAll?limit=-1"
    );
    const districts = response.data.data.data;
    console.log(districts);

    // Save districts to the database
    await District.insertMany(districts);

    res.status(200).json({ provinces: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/districts/getByProvince/:provinceCode", async (req, res) => {
  const { provinceCode } = req.params;
  try {
    const response = await axios.get(
      `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`
    );
    const districts = response.data.data.data;
    console.log(districts);

    // Save districts to the database
    await District.insertMany(districts);

    res.status(200).json({ districts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/wards/getAll", async (req, res) => {
  try {
    const response = await axios.get(
      "https://vn-public-apis.fpo.vn/wards/getAll?limit=-1"
    );

    const wards = response.data.data.data;
    console.log(wards);
    // Save wards to the database
    await Ward.insertMany(wards);

    res.status(200).json({ provinces: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/wards/getByDistrict/:districtCode", async (req, res) => {
  const { districtCode } = req.params;
  try {
    const response = await axios.get(
      `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`
    );
    const wards = response.data.data.data;
    console.log(wards);

    // Save wards to the database
    await Ward.insertMany(wards);

    res.status(200).json({ wards: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}); */

/* app.get("/favorites", async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});
app.post("/favorites", async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== "movie" && favType !== "character") {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name: favName });
    if (existingFav) {
      throw new Error("Favorite exists already!");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: "Favorite saved!", favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

mongoose.connect(
  // Container
  // "mongodb://host.docker.internal:27017/swfavorites",
  // or any 'http://host.docker.internal:8100',
  // NodeJS
  'mongodb://127.0.0.2:27017/swfavorites',
  // 'mongodb://localhost:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
 */
