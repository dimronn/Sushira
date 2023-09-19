const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandlers");
const {
  Item,
  Category,
  Ingredient,
  sequelize,
} = require("./models/index");
const { Op } = require("sequelize");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
const port = process.env.PORT || 4002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/items", async (req, res, next) => {
  console.log('masukItems')
  console.log(req.query);
  let categoryId = req.query.categoryId;
  console.log(categoryId)
  let filter = req.query.filter;
  if (!filter) {
    filter = "";
  }
  if (categoryId) {
    const result = await sequelize.transaction(async (t) => {
      try {
        const items = await Item.findAll({
          include: { all: true },
          order: [["id", "ASC"]],
          where: {
            name: {
              [Op.iLike]: `%${filter}%`,
            },
            categoryId: categoryId,
          },
          
        });

        res.status(200).json({
          items,
        });
      } catch (error) {
        console.log(error);
        next(error);
      }
    });
  } else {
    const result = await sequelize.transaction(async (t) => {
      try {
        const items = await Item.findAll({
          include: { all: true },
          order: [["id", "ASC"]],
          where: {
            name: {
              [Op.iLike]: `%${filter}%`,
            },
          },
        });

        res.status(200).json({
          items,
        });
      } catch (error) {
        console.log(error);
        next(error);
      }
    });
  }
});

app.get("/items/:id", async (req, res, next) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const id = req.params.id;
      console.log(id);
      const items = await Item.findOne({
        include: { all: true },
        order: [["id", "ASC"]],
        where: {
          id: id,
        },
      });

      res.status(200).json({
        items,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
});

app.get("/categories", async (req, res, next) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const categories = await Category.findAll();

      res.status(200).json({
        categories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
});

app.get("/ingredients", async (req, res, next) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const ingredients = await Ingredient.findAll();

      res.status(200).json({
        ingredients,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
});





app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
