const axios = require('axios')
const Redis = require("ioredis")
const redis = new Redis();
const baseUrl = "http://localhost:4002"
const itemTypeDefs = `#graphql 
type Item {
  id:ID
  name: String
  imageUrl: String
  categoryId:String
  mongoUserId:String
  Category: Category
  Ingredients: [Ingredient]
}

type Category {
  name: String
}

type Ingredient {
  name: String
}


type Query {
  items: [Item] # GET/items
  categories: [Category] # GET/categories
  ingredients: [Ingredient] # GET/ingredients

  itemById(id: ID): Item #GET/item/:id
  categoryById(id: ID): Category #GET/category/:id



}

`;

const itemResolvers = {
  Query: {
    items: async () => {
      try {
        console.log('masuk gql')
        const itemsCache = await redis.get("items");
        if (itemsCache) {
          console.log("dariCache", itemsCache);
          const dataItems = JSON.parse(itemsCache);
          return dataItems
        }
        const { data } = await axios.get(baseUrl + '/items');
        console.log("dariaxios");
        console.log(data)
        const stringItems = JSON.stringify(data.items);
        await redis.set("items", stringItems);
        return data.items
      } catch (error) {
        console.log(error);
        return error
      }
    },

    categories: async () => {
      try {
        console.log('masuk gql')
        const categoriesCache = await redis.get("categories");
        if (categoriesCache) {
          console.log("dariCache");
          const dataCategories = JSON.parse(categoriesCache);
          return dataCategories
        }
        const { data } = await axios.get(baseUrl + '/categories');
        console.log("dariaxios");
        const stringCategories = JSON.stringify(data.categories);
        await redis.set("categories", stringCategories);
        
        return data.categories
      } catch (error) {
        console.log(error);
        return error
      }
    },

    ingredients: async () => {
      try {
        const ingredientsCache = await redis.get("ingredients");
        if (ingredientsCache) {
          console.log("dariCache");
          const dataIngredients = JSON.parse(ingredientsCache);
          return dataIngredients
        }
        const { data } = await axios.get(baseUrl + '/ingredients');
        console.log("dariaxios");
        const stringIngredients = JSON.stringify(data.ingredients);
        await redis.set("ingredients", stringIngredients);
        
        return data.ingredients
      } catch (error) {
        console.log(error);
        return error
      }
    },

    itemById: async (_,args) => { 
      try {
        console.log(args)
        const { data } = await axios.get(baseUrl + '/items/' + args.id)
        console.log(data)
        return data.items
      } catch (error) {
        console.log(error)
        return error
      }
    },

    categoryById: async (_,args) => { 
      try {
        console.log(args)
        const { data } = await axios.get(baseUrl + '/categories/' + args.id)
        console.log(data)
        return data.items
      } catch (error) {
        console.log(error)
        return error
      }
    }
  },

};

module.exports = {
  itemResolvers,
  itemTypeDefs
}