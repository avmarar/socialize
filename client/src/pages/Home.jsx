import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Grid, Header, Loader, Dimmer, Transition } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import { GET_POSTS } from "../graphql/queries";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const { user } = useContext(AuthContext);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <Grid
      columns={3}
      verticalAlign="middle"
      textAlign="justified"
      style={{ height: "100vh" }}
    >
      <Grid.Row className="page-title">
        <Grid.Column className="header-column">
          <Header as="h2" content="Recent Posts" color="teal" />
        </Grid.Column>
        {user && (
          <Grid.Column className="btn-column">
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
      {loading && (
        <Grid.Row>
          (
          <Dimmer active inverted>
            <Loader inverted>Loading Recent Posts</Loader>
          </Dimmer>
          )
        </Grid.Row>
      )}
      <Grid.Row>
        <Transition.Group>
          {data &&
            data.getPosts &&
            data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
