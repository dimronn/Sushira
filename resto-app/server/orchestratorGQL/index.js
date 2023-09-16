const  { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');
const { userResolvers, userTypeDefs } =require('./scheme/userScheme');

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
  status400ForVariableCoercionErrors:true,
})

startStandaloneServer(server, {
  listen: { port: 5000 },
}).then(({ url }) => { 
  console.log(`Server connected at ${url}`)
}) 