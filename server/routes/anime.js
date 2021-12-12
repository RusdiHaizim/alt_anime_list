const { Router } = require("express");
const animeController = require("../controllers/animeControllers");
const router = Router();

// Get all anime
router.get("/anime", animeController.get_animes);
// Add new anime
// router.post("/anime", animeController.post_anime);
// For now, update and delete not available
// router.put("/items/:id", itemController.update_item);
// router.delete("/items/:id", itemController.delete_item);

// Query for anime based on search term
// router.get("/anime/:query", animeController.query_animes);

module.exports = router;
