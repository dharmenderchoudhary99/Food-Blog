const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController')

/*
App router
*/ 

router.get('/', recipeController.homepage)


module.exports = router;