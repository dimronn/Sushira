const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandlers");
const {
  User,
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
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const result = await sequelize.transaction(async (t) => {
      const user = await User.create(
        {
          username,
          email,
          password,
        },
        { transaction: t }
      );

      res.status(201).json({
        message: `New admin with username ${user.username} has been created`,
      });
      return user;
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { email, password } = req.body;
      console.log(req.body);
      if (!email) {
        throw { name: "null email" };
      }
      if (!password) {
        throw { name: "null password" };
      }
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw { name: "null user" };
      }

      const isCorrectPassword = bcrpyt.compareSync(password, user.password);
      if (!isCorrectPassword) {
        throw { name: "incorrect password" };
      }
      const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      console.log(access_token);
      res.status(200).json({
        message: `Login as ${user.username}`,
        access_token: access_token,
        username: user.username,
      });
      return user;
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get("/items", async (req, res, next) => {
  console.log(req.query);
  let categoryId = req.query.categoryId;
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

app.post("/items", async (req, res, next) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const { inputItem, inputIngredients } = req.body;
      let ingredients = Object.values(inputIngredients);
      const { name, imageUrl, categoryId } = inputItem;
      const items = await Item.create(
        {
          name: name,
          imageUrl: imageUrl,
          categoryId: categoryId,
        },
        { tra }
      );
      const mapIngredients = ingredients.map((e) => {
        return {
          name: e,
          itemId: items.id,
        };
      });
      console.log(mapIngredients);
      const dataIngredients = await Ingredient.bulkCreate(mapIngredients);

      res.status(200).json({
        message: `New item with id ${items.id} been added to the menu`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
});

app.patch("/items/:id", async (req, res, next) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const id = req.params.id;
      console.log(id, req.body);
      const { inputItem, inputIngredients } = req.body;
      let ingredients = Object.values(inputIngredients);
      const { name, imageUrl, categoryId } = inputItem;
      const items = await Item.update(
        {
          name: name,
          imageUrl: imageUrl,
          categoryId: categoryId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const mapIngredients = ingredients.map((e) => {
        return {
          name: e,
          itemId: id,
        };
      });
      console.log(mapIngredients, "map ingredient");
      const destroy = await Ingredient.destroy({ where: { itemId: id } });
      const dataIngredients = await Ingredient.bulkCreate(mapIngredients);

      res.status(200).json({
        message: `Item with id ${id} edited`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
});

app.delete("/items/:id", async (req, res, next) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const id = req.params.id;
      const items = await Item.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: `Item with id ${id} deleted`,
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

app.post("/categories", async (req, res, next) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const newCategory = await Category.create({
        name: req.body[0],
      });

      res.status(200).json({
        message: "New category has been added to the menu",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
});

app.delete("/categories/:id", async (req, res, next) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const id = req.params.id;
      const category = await Category.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: `Category with id ${id} deleted`,
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
