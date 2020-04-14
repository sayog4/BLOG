import { useState } from "react";
import Input from "../components/UI/Input";
import Layout from "../components/Layout";
import { preSignup } from "../actions/auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    errors: {},
    message: "",
    loading: "",
    showForm: true
  });
  const { name, email, password, errors, message, loading, showForm } = values;

  const changeHandler = e => {
    setValues({
      ...values,
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
      message: ""
    });
    const user = {
      name,
      email,
      password
    };
    preSignup(user)
      .then(data => {
        if (data.errors) {
          setValues({
            ...values,
            errors: data.errors,
            loading: false
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            loading: false,
            errors: {},
            message: data.message,
            showForm: false
          });
        }
      })
      .catch(err => console.log(err));
  };
  const signUpForm = () => (
    <form onSubmit={submitHandler} className="mt-2">
      <Input
        label="name"
        type="text"
        name="name"
        value={name}
        onChange={changeHandler}
        error={errors.name}
        placeholder="Enter your name"
      />
      <Input
        label="email"
        type="email"
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
  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  return (
    <React.Fragment>
      <Layout>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            {showLoading()}
            {showMessage()}
            {showForm && signUpForm()}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Signup;
