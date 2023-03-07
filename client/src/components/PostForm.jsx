import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Modal, Form, Message } from "semantic-ui-react";
import { CREATE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";

import { useForm } from "../utils/hooks";

const PostForm = () => {
  const [open, setOpen] = useState(false);
  const { onChange, onSubmit, values } = useForm(createPostCB, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    onCompleted: (data) => {
      console.log(data);
      setOpen(false);
      values.body = "";
    },
    refetchQueries: [{ query: GET_POSTS }, "GetPosts"],
  });

  function createPostCB() {
    createPost();
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="teal">Create Post</Button>}
    >
      <Modal.Header>Write your post here.....</Modal.Header>
      <Modal.Content>
        {error && (
          <Message negative>
            <Message.Header>Empty Body!!!</Message.Header>
            <p>{error.message}</p>
          </Message>
        )}
        <Form size="large" onSubmit={onSubmit} noValidate>
          <Form.TextArea
            name="body"
            type="text"
            value={values?.body}
            onChange={onChange}
          />
          <Button type="submit" primary>
            Create Post
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default PostForm;
