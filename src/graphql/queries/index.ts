import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation LoginUser($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      email
      name
      id
    }
  }
`;
export const SIMPLE_QUERY = gql`
  query {
    me {
      name
    }
  }
`;
