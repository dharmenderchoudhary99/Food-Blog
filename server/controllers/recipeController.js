require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/*
 *GET /
 *HomePage
 */

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitNumber
    );
    const food = { latest, thai, american, chinese };

    res.render("index", { title: "Cooking Blog", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/*
 *GET /categories
 *Categories
 */

exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", { title: "Cooking Blog- Categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/*
 *GET /recipe/id
 *Categories
 */

exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    res.render("recipe", { title: "Cooking Blog- Recipe", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/*
 *GET /categories/:id
 *Categories By ID
 */

exports.exploreCategoriesNyId = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", {
      title: "Cooking Blog- Categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/*
 *POST /search
 *search
 */

exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;

    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "Cooking Blog - Search", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Ocurred" });
  }
};

/*
 *GET /exploreLatest
 *Explore Latest
 */
exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render("explore-latest", {
      title: "Cooking Blog- Explore Latest",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/*
 *GET /explore-Random
 *Explore Latest
 */
exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();

    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render("explore-random", {
      title: "Cookig Blog - Explore Random",
      recipe,
    });

    res.render("explore-latest", {
      title: "Cooking Blog- Explore Latest",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

/*
 *GET /explore-Random
 *Explore Latest
 */
exports.submitRecipe = async (req, res) => {
  res.ender("submit-recipe", {
    title: "Cooking Blog - Submit Recipe",
  });
};

// async function insertDummyCategoryData() {
//   try {
//     await Category.insertMany([
//       {
//         name: "Thai",
//         image: "thai-food.jpg",
//       },
//       {
//         name: "American",
//         image: "american-food.jpg",
//       },
//       {
//         name: "Chinese",
//         image: "chinese-food.jpg",
//       },
//       {
//         name: "Mexican",
//         image: "mexican-food.jpg",
//       },
//       {
//         name: "Indian",
//         image: "indian-food.jpg",
//       },
//       {
//         name: "Spanish",
//         image: "spanish-food.jpg",
//       },
//     ]);
//   } catch (error) {
//     console.log("error ", +error.message);
//   }
// }

// insertDummyCategoryData();

// async function insertDummyRecipeData() {
//   try {
//     await Recipe.insertMany(
//       [
//             {
//                "name": "Recipe Name Goes Here",
//               "description": `Recipe Description Goes Here`,
//                "email": "recipeemail@raddy.co.uk",
//               "ingredients": [
//                  "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                "category": "American",
//                 "image": "southern-friend-chicken.jpg"
//              },
//              {
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here`,
//                "email": "recipeemail@raddy.co.uk",
//                "ingredients": [
//                    "1 level teaspoon baking powder",
//                  "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                ],
//                "category": "American",
//                  "image": "southern-friend-chicken.jpg"
//               },
//              ]
//     );
//   } catch (error) {
//     console.log("error ", +error.message);
//   }
// }

// insertDummyRecipeData();
