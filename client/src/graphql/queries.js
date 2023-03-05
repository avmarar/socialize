import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      body
      likeCount
      likes {
        id
        username
        createdAt
      }
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
      username
      createdAt
    }
  }
`;

export { GET_POSTS };
