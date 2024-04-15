require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/*
 *GET /
 *HomePage
 */
exports.homepage = async (req, res) => {
  res.render("index", { title: "Cooking Blog - Home" });
};

exports.homepage = async (req, res) => {
  try {

    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("index", { title: "Cooking Blog", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};


/*
 *GET /categories
 *Categories
 */
 exports.exploreCategories = async (req, res) => {
  res.render("index", { title: "Cooking Blog - Home" });
};

exports.exploreCategories = async (req, res) => {
  try {

    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", { title: "Cooking Blog- Categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
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


async function insertDummyRecipeData() {
  try {
    await Recipe.insertMany(
      [
            { 
               "name": "Recipe Name Goes Here",
              "description": `Recipe Description Goes Here`,
               "email": "recipeemail@raddy.co.uk",
              "ingredients": [
                 "1 level teaspoon baking powder",
                  "1 level teaspoon cayenne pepper",
                  "1 level teaspoon hot smoked paprika",
                ],
               "category": "American", 
                "image": "southern-friend-chicken.jpg"
             },
             { 
                "name": "Recipe Name Goes Here",
                "description": `Recipe Description Goes Here`,
               "email": "recipeemail@raddy.co.uk",
               "ingredients": [
                   "1 level teaspoon baking powder",
                 "1 level teaspoon cayenne pepper",
                  "1 level teaspoon hot smoked paprika",
               ],
               "category": "American", 
                 "image": "southern-friend-chicken.jpg"
              },
             ]
    );
  } catch (error) {
    console.log("error ", +error.message);
  }
}

insertDummyRecipeData();