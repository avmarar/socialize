import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
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
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../graphql/mutations";
import { useForm } from "../utils/hooks";

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCb, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      context.login(data.login);
      navigate("/");
    },
    onError: (error) => {
      if (error)
        setErrors(error?.graphQLErrors?.[0]?.extensions?.exception?.errors);
    },
    variables: values,
  });

  function loginUserCb() {
    loginUser();
  }

  return (
    <>
      {loading && (
        <Dimmer active>
          <Loader size="massive" content="Logging In...." />
        </Dimmer>
      )}
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log In
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

export default Login;
