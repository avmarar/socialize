import { useQuery } from "@apollo/client";
import moment from "moment";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Dimmer,
  Grid,
  Loader,
  Card,
  Icon,
  Label,
  Button,
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import Comments from "../components/Comments";

import { GET_POST } from "../graphql/queries";

const Post = () => {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();

  const { loading, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  let postMarkup;

  if (loading) {
    postMarkup = (
      <Dimmer active inverted>
        <Loader inverted>Loading Recent Posts</Loader>
      </Dimmer>
    );
  }
  if (data && data.getPost) {
    const {
      id,
      username,
      body,
      likes,
      likeCount,
      comments,
      commentCount,
      createdAt,
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>
                  <span className="date">
                    {moment(createdAt).fromNow(true)}
                  </span>
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button as="div" labelPosition="right">
                  <Button icon basic color="teal">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="teal" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} />
                )}
              </Card.Content>
            </Card>
            {comments && (
              <Comments user={user} comments={comments} postId={id} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

export default Post;
