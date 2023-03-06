import { useQuery } from "@apollo/client";
import React from "react";
import { Grid, Header, Loader, Dimmer } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import { GET_POSTS } from "../graphql/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <Grid
      columns={3}
      verticalAlign="middle"
      textAlign="justified"
      style={{ height: "100vh" }}
    >
      <Grid.Row className="page-title">
        <Header as="h2" content="Recent Posts" color="teal" />
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
        {data &&
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
