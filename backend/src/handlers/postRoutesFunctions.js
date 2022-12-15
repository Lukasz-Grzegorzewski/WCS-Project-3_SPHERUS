const database = require("../../database");

/* POST USER */
const signInUserByUser = (req, res) => {
  const {
    firstname,
    lastname,
    nickname,
    birthday = null,
    email,
    password,
    isAdmin = 0,
  } = req.body;

  let finalBirthday = birthday;
  if (req.body.birthday === "") {
    finalBirthday = null;
  }

  database
    .query("SELECT email FROM user WHERE email = ?", [email])
    .then(([[resp]]) => {
      if (!resp) {
        database
          .query(
            "INSERT INTO user (firstname, lastname, nickname, birthday, email, password, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              firstname,
              lastname,
              nickname,
              finalBirthday,
              email,
              password,
              isAdmin,
            ]
          )
          .then(([result]) => {
            res
              .location(`/users/${result.insertId}`)
              .status(201)
              .send({ message: "user created" });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving the user");
          });
      } else {
        res.status(500).send("Fuck saving the user");
      }
    })
    .catch((err) => {
      console.warn(err);
      res.status(409).send("Fuck");
    });
};

/* user by admin */
const signInUserByAdmin = (req, res) => {
  const { firstname, lastname, nickname, birthday, email, password, isAdmin } =
    req.body;

  database
    .query(
      "INSERT INTO user(firstname, lastname, nickname, birthday, email, password, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [firstname, lastname, nickname, birthday, email, password, isAdmin]
    )
    .then(([result]) => {
      res
        .location(`/user/${result.insertId}`)
        .status(201)
        .send({ message: "user created" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

// POST VIDEO

const postVideo = (req, res) => {
  const { description, display, title, date, filename } = req.body;

  const url = `/assets/videos/${filename}`;
  database
    .query(
      "INSERT INTO video(url, description, display, title, date) VALUES (?, ?, ?, ?, ?)",
      [url, description, Number(display), title, date]
    )
    .then(([result]) => {
      res
        .location(`/videos/${result.insertId}`)
        .status(201)
        .send({ message: "video added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the video");
    });
};

// POST CATEGORY
const postCategory = (req, res) => {
  const { name } = req.body;

  database
    .query("INSERT INTO category(name) VALUES (?)", [name])
    .then(([result]) => {
      res
        .location(`/categories/${result.insertId}`)
        .status(201)
        .send({ message: "category added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the category");
    });
};

// attach category to video

const attachCategoryToVideo = (req, res) => {
  const { videoId, categoryId } = req.body;

  database
    .query("INSERT INTO video_category(video_id, category_id) VALUES (?, ?)", [
      videoId,
      categoryId,
    ])
    .then(() => {
      res.status(201).send({ message: "category atached to the video" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error ataching category to the video");
    });
};

// Post Hero Slider
const postHeroSlider = (req, res) => {
  const { fkVideo } = req.body;

  database
    .query("INSERT INTO hero_slider(fk_video) VALUES (?)", [fkVideo])
    .then(([hero]) => {
      hero.status(201).send({ message: "Hero Slider Updated" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error update the hero slider");
    });
};

module.exports = {
  signInUserByUser,
  signInUserByAdmin,
  postVideo,
  postCategory,
  attachCategoryToVideo,
  postHeroSlider,
};
