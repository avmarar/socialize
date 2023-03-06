import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Grid,
  Segment,
  Header,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { REGISTER_USER } from "../graphql/mutations";
import { useForm } from "../utils/hooks";

const Register = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      navigate("/");
    },
    onError: (error) => {
      if (error)
        setErrors(error?.graphQLErrors?.[0]?.extensions?.exception?.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <>
      {loading && (
        <Dimmer active>
          <Loader size="massive" content="Registering User...." />
        </Dimmer>
      )}
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Register
          </Header>
          <Form size="large" onSubmit={onSubmit} noValidate>
            <Segment stacked>
              <Form.Input
                fluid
                label="Username"
                placeholder="Username"
                name="username"
                type="text"
                value={values?.username}
                onChange={onChange}
                icon="user"
                iconPosition="left"
                error={errors?.username}
              />
              <Form.Input
                fluid
                label="Email"
                placeholder="Email"
                name="email"
                type="email"
                value={values?.email}
                onChange={onChange}
                icon="mail"
                iconPosition="left"
                error={errors?.email}
              />
              <Form.Input
                fluid
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                value={values?.password}
                onChange={onChange}
                icon="lock"
                iconPosition="left"
                error={errors?.password}
              />
              <Form.Input
                fluid
                label="Confirm Password"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={values?.confirmPassword}
                onChange={onChange}
                icon="lock"
                iconPosition="left"
                error={errors?.confirmPassword}
              />
              <Button type="submit" primary>
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Register;
