import { ApolloClient, InMemoryCache} from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://e97c-125-160-188-157.ngrok-free.app',
  cache: new InMemoryCache(),
});

module.exports = client