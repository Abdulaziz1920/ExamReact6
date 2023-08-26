import { useNavigate } from "react-router-dom";
import isAuth from "../../states";
// import * as React from "react";
import { Formik, Form, Field } from "formik";
import "./login.scss";

interface MyFormValues {
  username: string;
  password: string;
}

export const Login = () => {
  // const [user, setUser] = React.useState<MyFormValues>();
  const { login } = isAuth();
  const navigate = useNavigate();
  const initialValues: MyFormValues = {
    username: "",
    password: "",
  };
  return (
    <section id="form">
      <div className="forms">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            login(values, navigate);
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <Field id="username" name="username" placeholder="Username" />
            <Field id="password" name="password" placeholder="Password" />
            <button onClick={() => login}>Submit</button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Login;
