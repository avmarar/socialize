import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { DELETE_COMMENT, DELETE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";

const DeleteButton = ({ postId, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const navigate = useNavigate();
  const [deletePostOrComment] = useMutation(mutation, {
    variables: commentId ? { postId, commentId } : { postId },
    onCompleted: () => {
      setConfirmOpen(false);
      if (!commentId) navigate("/");
    },
    refetchQueries: [{ query: GET_POSTS }, "GetPosts"],
  });

  return (
    <>
      <Button
        icon
        negative
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePostOrComment()}
        content="Are you sure you want to delete the post?"
        confirmButton="Confirm"
      />
    </>
  );
};

export default DeleteButton;
