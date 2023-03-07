import { useMutation } from "@apollo/client";
import moment from "moment";
import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";

import { CREATE_COMMENT, DELETE_COMMENT } from "../graphql/mutations";
import { GET_POST } from "../graphql/queries";
import { useForm } from "../utils/hooks";

const Comments = ({ user, comments, postId }) => {
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

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_POST }, "GetPost"],
  });

  function createCommentCB() {
    createComment();
  }

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id}>
            <Comment.Content>
              <Comment.Author>{comment.username}</Comment.Author>
              <Comment.Metadata>
                <span className="date">
                  {moment(comment.createdAt).fromNow(true)}
                </span>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
              <Comment.Actions>
                {user && user.username === comment.username && (
                  <Comment.Action
                    as="a"
                    onClick={() =>
                      deleteComment({
                        variables: { postId, commentId: comment.id },
                      })
                    }
                  >
                    Delete
                  </Comment.Action>
                )}
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
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
        />
      </Form>
    </Comment.Group>
  );
};

export default Comments;
