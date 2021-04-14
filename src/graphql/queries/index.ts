import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation SignupUser($name: String!, $password: String!, $email: String!) {
    register(input: { password: $password, email: $email, name: $name }) {
      email
      name
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginUser($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      email
      name
      id
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($password: String!, $email: String!) {
    unregister(password: $password, email: $email)
  }
`;

export const SIMPLE_QUERY = gql`
  query {
    me {
      name
      pagelinks {
        id
        link
      }
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($password: String!, $token: String!) {
    changePassword(input: { password: $password, token: $token }) {
      email
      name
      id
    }
  }
`;

export const FORGOT_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const ADD_PAGE_LINK = gql`
  mutation AddLink($link: String!) {
    addPageLink(input: { link: $link }) {
      id
    }
  }
`;
