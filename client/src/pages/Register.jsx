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

const Register = (props) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const redirectToHome = () => {
    window.location.pathname = "/";
    // navigate("/", { replace: true });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: redirectToHome,
    onError: (error) => {
      if (error)
        setErrors(error?.graphQLErrors?.[0]?.extensions?.exception?.errors);
    },
    variables: values,
  });

  const registerUser = (e) => {
    e.preventDefault();
    addUser();
  };

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
          <Form size="large" onSubmit={registerUser} noValidate>
            <Segment stacked>
              <Form.Input
                fluid
                label="Username"
                placeholder="Username"
                name="username"
                type="text"
                value={values?.username}
                onChange={handleOnChange}
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
                onChange={handleOnChange}
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
                onChange={handleOnChange}
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
                onChange={handleOnChange}
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
