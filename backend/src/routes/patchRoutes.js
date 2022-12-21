const express = require("express");

const router = express.Router();

const patchRoutesFunctions = require("../handlers/patchRoutesFunctions");

router.patch("/videos/:id", patchRoutesFunctions.patchVideoById);
router.patch("/users/:id", patchRoutesFunctions.patchUserById);
router.patch("/categories/:id", patchRoutesFunctions.patchCategoryById);

// Admin Hero Slider
router.put("/hero_slider/:id", patchRoutesFunctions.updateHeroSliderById);

// Admin Advertising
router.put("/publicities/:id", patchRoutesFunctions.updatePublicityById);

module.exports = router;
