import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { DELETE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";

const DeleteButton = ({ postId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId },
    onCompleted: () => {
      setConfirmOpen(false);
      navigate("/");
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
        onConfirm={() => deletePost()}
        content="Are you sure you want to delete the post?"
        confirmButton="Confirm"
      />
    </>
  );
};

export default DeleteButton;
