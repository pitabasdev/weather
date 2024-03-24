const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Weather = require("./model/weather");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://pitabaspradhan834:pitabasp934@cluster0.p6ocoqf.mongodb.net/weather?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/weather/val1/:temp/val2/:humidity/val3/:rain/val4/:light", async (req, res) => {
    try {
      const { temp, humidity, rain, light } = req.params;
      
      const newWeatherData = new Weather({
        temp: temp,
        humidity: humidity,
        rain: rain,
        light: light,
      });

      await newWeatherData.save();
  
      res.status(201).json({ message: "Weather data added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add weather data" });
    }
});

app.get("/weather", async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.render("weather", { weatherData: weatherData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Render weather.ejs when accessing root route
app.get("/", async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.render("weather", { weatherData: weatherData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
