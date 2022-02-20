const express = require("express");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const database = require("./configs/database");
const User = require("./models/user.model");
const userRouter = require("./routes/user.routes");
const paperRouter = require("./routes/paper.routes");
const reviewRequestRouter = require("./routes/review-request.routes");
const reviewRouter = require("./routes/review.routes");
const fileUpload = require("express-fileupload");
const Paper = require("./models/paper.model");

async function initData() {
  const admin = await User.findOne({ email: "admi@ifri.org" });
  if (!admin) {
    await User.updateOne(
      { email: "admi@ifri.org" },
      {
        email: "admi@ifri.org",
        first_name: "Admin",
        last_name: "System",
        role: "ADMIN",
        password: await bcrypt.hash("password", 10),
      },
      { upsert: true }
    );
  }
  // let subjects = [
  //   "Mathematiques",
  //   "Mathematiques",
  //   "Informatique",
  //   "Informatique",
  //   "Ingenierie",
  //   "Santé",
  //   "Santé",
  //   "Sociologie",
  //   "Intellience Artificielle",
  //   "Sociologie",
  //   "Intellience Artificielle",
  //   "Ingenierie",
  //   "Santé",
  //   "Sociologie",
  //   "Intellience Artificielle",
  //   "Sociologie",
  //   "Intellience Artificielle",
  // ];
  // let i = 0;
  // for (let subject of subjects) {
  //   let st = "NEW";
  // //  st = i < (2 * subjects.length) / 3 ? "APPROVED" : "REJECTED";
  //   await Paper.create({
  //     title: "Ebauche de recherche appliqué en " + subject,
  //     subject: subject,
  //     keywords: `${subject},science,appliqué`,
  //     author: "lkgnagoli@gmail.com",
  //     summary: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et minima eum nesciunt libero inventore alias consequuntur beatae autem nemo labore saepe aliquid tempora, eveniet molestiae repudiandae illo praesentium? Facilis ad obcaecati quasi expedita? Voluptatem reiciendis reprehenderit vitae. Iure libero fugit hic laborum cum accusantium voluptatem? Dolorum eligendi sint voluptatum possimus earum incidunt vero repellendus minima nostrum consequuntur. Facere, totam beatae.`,
  //     status: st,
  //   });
  //   i++;
  // }

  // await Paper.updateMany(
  //   {},
  //   { 
  //   fileurl: "files/620ebf1bf3d1611de5cdb6df_code-du-travail-benin.pdf" ,
  //   summary: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et minima eum nesciunt libero inventore alias consequuntur beatae autem nemo labore saepe aliquid tempora, eveniet molestiae repudiandae illo praesentium? Facilis ad obcaecati quasi expedita? Voluptatem reiciendis reprehenderit vitae. Iure libero fugit hic laborum cum accusantium voluptatem? Dolorum eligendi sint voluptatum possimus earum incidunt vero repellendus minima nostrum consequuntur. Facere, totam beatae.`,
  // }
  // );
  // console.log("database initialized successfully");
}

database
  .connect()
  .then(() => {
    console.log("Successfully connected to database");
    initData();
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

const app = express();

app.use(express.json());

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use(userRouter);
app.use(paperRouter);
app.use(reviewRouter);
app.use(reviewRequestRouter);

module.exports = { app };
