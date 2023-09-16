const axios = require('axios')
const Redis = require("ioredis")
const redis = new Redis();
const baseUrl = "http://localhost:4001"
const userTypeDefs = `#graphql 
type User {
  _id:ID
  username: String
  email: String
  password:String
  role:String
  phoneNumber:String
  address:String
}

type Response {
  message:String
  }


type Query {
  users: [User] # GET/users
  userById(id: ID): User #GET/users/:id


}

input FormUser {
  username:String!
  email:String!
  password:String!
  role:String
  phoneNumber:String
  address:String
}

type Mutation {
  register(inputUser: FormUser): Response
  delete(id:ID):Response

}
`;

const userResolvers = {
  Query: {
    users: async () => {
      try {
        const usersCache = await redis.get("users");
        if (usersCache) {
          console.log("dariCache");
          const dataUsers = JSON.parse(usersCache);
          return dataUsers
        }
        const { data } = await axios.get(baseUrl + '/users');
        console.log("dariaxios");
        const stringUsers = JSON.stringify(data);
        await redis.set("users", stringUsers);
        
        return data
      } catch (error) {
        console.log(error);
        return error
      }
    },
    userById: async (_,args) => { 
      try {
        console.log(args)
        const { data } = await axios.get(baseUrl + '/users/' + args.id)
        console.log(data)
        return data
      } catch (error) {
        console.log(error)
        return error
      }
    }
  },

  Mutation: {
    async register(_, args) { 
      try {
      console.log(args)
      const  {data}  = await axios({
        method: "POST",
        url: baseUrl + "/users",
        data: {
          ...args.inputUser
        }
      })
        await redis.del('users')
        console.log(data)
        return {
          ...args.inputUser
        }
      } catch (error) { 
        console.log(error)
        return error
      }
    },

    async delete(_, args) {
      try {
      console.log(args)
      const { data } = await axios({ 
        method: "DELETE",
        url: baseUrl + "/users/" + args.id
      })
        await redis.del('users')
        // console.log(data)
        return data
      } catch (error) {
        // console.log(error) 
        return error
      }
    },
    
  }
};

module.exports = {
  userResolvers,
  userTypeDefs
}