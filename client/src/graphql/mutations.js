import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      createdAt
      username
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      createdAt
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($body: String!, $postId: ID!) {
    createComment(body: $body, postId: $postId) {
      id
      createdAt
      username
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export {
  REGISTER_USER,
  LOGIN_USER,
  CREATE_POST,
  LIKE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
};
