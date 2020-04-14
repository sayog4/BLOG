import Layout from "../../../../components/Layout";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { signUp } from "../../../../actions/auth";

const Verifyaccount = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    token: "",
    error: "",
    loading: false,
    success: false,
    showButton: true
  });
  const { token, error, loading, showButton, success } = values;

  useEffect(() => {
    const token = router.query.id;
    if (token) {
      setValues({ ...values, token });
    }
  }, [router]);

  const clickSubmit = e => {
    e.preventDefault();

    setValues({
      ...values,
      loading: true,
      error: false
    });
    signUp({ token }).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          showButton: false
        });
      } else {
        setValues({
          ...values,
          success: true,
          showButton: false,
          loading: false
        });
      }
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  return (
    <Layout>
      <div className="container">
        <h2 className="display-3">Ready to activate your account?</h2>
        {showLoading()}
        {error && error}
        {success &&
          "You have successfully verified your account. Please sign in"}
        {showButton && (
          <button className="btn btn-outline-primary" onClick={clickSubmit}>
            Verify Account
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Verifyaccount;
