const  { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');
const { userResolvers, userTypeDefs } =require('./scheme/userScheme');
const { itemTypeDefs, itemResolvers } = require('./scheme/itemScheme');

const server = new ApolloServer({
  typeDefs: [userTypeDefs, itemTypeDefs],
  resolvers: [userResolvers, itemResolvers],
  status400ForVariableCoercionErrors:true,
})

startStandaloneServer(server, {
  listen: { port: 5000 },
}).then(({ url }) => { 
  console.log(`Server connected at ${url}`)
})  