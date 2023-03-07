import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

import { LIKE_POST } from "../graphql/mutations";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button icon color="red" onClick={likePost}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button icon basic color="red" onClick={likePost}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button icon basic color="red">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right">
      {likeButton}
      <Label basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
