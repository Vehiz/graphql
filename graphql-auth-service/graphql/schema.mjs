import {gql} from 'apollo-server';

export const typeDefs = gql`

type User {
    
    name: String!
    email: String!
    password: String!
    token: String!
}

input SignupInput {
    name: String!
    email: String!
    password: String!
}

input LoginInput {
    email: String!
    password: String!
}

type Query {
    user(id:ID): User!
}
type Mutation {
    signup(signupInput: SignupInput): User
    login(loginInput: LoginInput): User
}
`
