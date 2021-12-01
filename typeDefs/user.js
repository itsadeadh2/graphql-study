const {gql} = require("apollo-server-express");

module.exports = gql`
    extend type Query{
      user: User
    }
    extend type Mutation {
        signUp(input: signupInput): User
        login(input: loginInput): Token
    }
    type User {
      id: ID!
      name: String!
      email: String!
      tasks: [Task!]
      createdAt: Date!
      updatedAt: Date!
    }

    input loginInput {
        email: String!
        password: String!
    }
    type Token {
        token: String!
    }    
    input signupInput {
        name: String!
        email: String!
        password: String!
    }
`;
