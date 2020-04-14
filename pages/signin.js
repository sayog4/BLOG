import { useState } from "react";
import Input from "../components/UI/Input";
import Layout from "../components/Layout";
import { signIn, authenticate, isAuth } from "../actions/auth";
import Router from "next/router";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    errors: {},
    loading: ""
  });
  const { email, password, errors, error, loading } = values;

  const changeHandler = e => {
    setValues({
      ...values,
      error: "",
      [e.target.name]: e.target.value,
      errors: {}
    });
  };
  const submitHandler = e => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
      errors: {},
      error: ""
    });
    const user = {
      email,
      password
    };
    signIn(user)
      .then(data => {
        if (data.errors || data.error) {
          setValues({
            ...values,
            errors: data.errors || {},
            error: data.error || "",
            loading: false
          });
        } else {
          setValues({
            ...values,
            errors: {},
            error: "",
            loading: false
          });
          authenticate(data, () => {
            // change to user profile or dashboard
            if (isAuth()) {
              Router.push("/");
            } else {
              Router.push("/signin");
            }
          });
        }
      })
      .catch(err => console.log(err));
  };
  const signInForm = () => (
    <form onSubmit={submitHandler} className="mt-2">
      <Input
        label="email"
        type="text"
        name="email"
        value={email}
        onChange={changeHandler}
        error={errors.email}
        placeholder="Enter your email address"
      />
      <Input
        label="password"
        type="password"
        name="password"
        value={password}
        onChange={changeHandler}
        error={errors.password}
        placeholder="Enter your password"
      />
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  return (
    <React.Fragment>
      <Layout>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="display-4 text-center">Sign In</h1>
            {showLoading()}
            {showError()}
            {signInForm()}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default SignIn;
