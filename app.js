const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5010;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
const uri =
  "mongodb+srv://HNGResume:admin@cluster0.mompd.mongodb.net/HNGResume?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((conn) => {
    console.log("DB connection is successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

app.get("/resume", (req, res) => {
  res.render("resume");
  console.log("log request");
});

app.get("/", (req, res) => {
  res.render("resume");
  console.log("log request");
});

app.post("/resume", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const response = await Contact.create({
      name,
      email,
      message,
    });
    res.status(200).redirect("/resume");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`serving is running on ${PORT}`);
});
