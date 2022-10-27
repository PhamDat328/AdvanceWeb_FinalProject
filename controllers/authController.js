const User = require("../models/User");
const Account = require("../models/Account");
const formidable = require("formidable");
const fs = require("fs");

const uploadDir = __dirname + "/../public/images/uploads";
fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

const generateRandomUsername = () => {
  let username = "";
  for (let i = 0; i < 10; i++) {
    username += Math.floor(Math.random() * 10);
  }
  return username;
};

const generateRandomPassword = () => {
  let allAscii =
    "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  let password = "";
  for (let i = 0; i < 6; i++) {
    password += allAscii[Math.floor(Math.random() * allAscii.length)];
  }
  return password;
};

module.exports = {
  getLoginPage: (req, res, next) => {
    res.render("login", { title: "Express", layout: "blankLayout" });
  },
  getRegisterPage: (req, res, next) => {
    res.render("register", { title: "Express", layout: "blankLayout" });
  },

  postRegisterPage: async (req, res) => {
    const username = generateRandomUsername();
    const password = generateRandomPassword();

    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          req.session.flash = {
            type: "danger",
            info: "Oops!",
            message:
              "There was an error processing your submission. \n Please try again.",
          };
          return res.render("error");
        }
        const { fullName, email, address, phoneNumber, dateOfBirth } = fields;
        if (
          fullName === "" ||
          email === "" ||
          phoneNumber === "" ||
          address === "" ||
          dateOfBirth === ""
        ) {
          return res.render("register", {
            ...req.body,
            alert: "Please complete all the fill!",
          });
        }
        const fontIdImage = files.fontIdImage;
        const backIdImage = files.backIdImage;

        const dir = uploadDir + "/" + username;
        const pathFontIdImage =
          "/images/uploads/" +
          username +
          "/font." +
          fontIdImage.originalFilename.split(".")[1];
        console.log(pathFontIdImage);
        const pathBackIdImage =
          "/images/uploads/" +
          username +
          "/back." +
          backIdImage.originalFilename.split(".")[1];
        console.log(pathBackIdImage);

        fs.mkdirSync(dir);

        fs.renameSync(
          fontIdImage.filepath,
          dir + "/font." + fontIdImage.originalFilename.split(".")[1]
        );

        fs.renameSync(
          backIdImage.filepath,
          dir + "/back." + backIdImage.originalFilename.split(".")[1]
        );

        req.session.flash = {
          type: "success",
          info: "Good luck!",
          message: "You have been entered into the contest.",
        };
        const newUser = await User.create({
          fullName,
          email,
          address,
          phoneNumber,
          dateOfBirth,
          fontIdImage: pathFontIdImage,
          backIdImage: pathBackIdImage,
        });
        const newAccount = Account.create({
          username,
          password,
        });
      });
      res.redirect("/login");
    } catch (error) {
      res.render("register", { error: error });
    }
  },
};
