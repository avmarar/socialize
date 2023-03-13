import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Form, Card } from "semantic-ui-react";

import { CREATE_COMMENT } from "../graphql/mutations";
import { GET_POST } from "../graphql/queries";
import { useForm } from "../utils/hooks";

const CommentForm = ({ postId }) => {
  const { onChange, onSubmit, values } = useForm(createCommentCB, {
    body: "",
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: { ...values, postId },
    onCompleted: (data) => {
      console.log(data);
      values.body = "";
    },
    refetchQueries: [{ query: GET_POST }, "GetPost"],
  });

  function createCommentCB() {
    createComment();
  }

  return (
    <Card fluid>
      <Card.Content>
        <p>Post your comment</p>
        <Form onSubmit={onSubmit} noValidate>
          <Form.Input
            name="body"
            type="text"
            value={values?.body}
            onChange={onChange}
          />
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
            type="submit"
            size="mini"
          />
        </Form>
      </Card.Content>
    </Card>
  );
};

export default CommentForm;
