const express = require("express");
const postRoutesFunctions = require("../handlers/postRoutesFunctions");
const { upload, uploadImg, uploadAvatar } = require("./multers/multers");
const { hashPassword, verifyPassword } = require("../handlers/auth");

const router = express.Router();

// USERS
router.post("/users", hashPassword, postRoutesFunctions.signInUserByUser);
router.post(
  "/users/:id",
  uploadAvatar.single("file"),
  postRoutesFunctions.uploadAvatarUrl
);

// ADMIN
router.post("/users/admin", postRoutesFunctions.signInUserByAdmin);

// VIDEOS
router.post(
  "/videos",
  upload.single("file"),
  postRoutesFunctions.postVideo,
  postRoutesFunctions.attachCategoryToVideo
);

// LOGIN
router.post(
  "/login",
  postRoutesFunctions.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// CATEGORY-VIDEO
router.post("/category/video", postRoutesFunctions.attachCategoryToVideo);

// CATEGORIES
router.post("/categories", postRoutesFunctions.postCategory);

// Ajouter une video dans le Hero Slider
router.post("/hero_slider", postRoutesFunctions.postHeroSlider);

// Ajouter une vidéo dans le Fixture Slider
router.post("/fixtures", postRoutesFunctions.postFixture);

// Ajouter une publicité
router.post(
  "/publicity",
  uploadImg.single("file"),
  postRoutesFunctions.postAdvert
);

// Ajouter un composant à la HomePage
router.post("/home", postRoutesFunctions.postHome);
// Ajouter une video au carousel d'une section de la HomePage
router.post("/home/videos/", postRoutesFunctions.attachSectionToVideo);

// ajouter une vidéo en favori
router.post("/favorites", postRoutesFunctions.addVideoToFavorite);

module.exports = router;
