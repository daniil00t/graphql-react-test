import { ApolloServer, gql } from "apollo-server"
import axios from "axios"

interface User{
	name: string
	age: number
	email: string
}

const typeDefs = gql`
	type User {
		balance: String
		picture: String
		age: Int
		name: String
		gender: String
		company: String
		email: String
	}

	type Query {
		users: [User]
	}

	type Mutation {
		addUser(name: String, age: Int, email: String): User
	}
`;

const resolvers = {
	Query: {
	  users: () => axios.get("http://localhost:8080/users").then((response: {data: any}) => response.data),
	},
	Mutation: {
		addUser: (_: never, args: User) => {
			console.log(args);
			axios.post("http://localhost:8080/users", {name: args.name, age: args.age, email: args.email}).then((response: {data: any}) => response.data)
		}
	}
 };


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});