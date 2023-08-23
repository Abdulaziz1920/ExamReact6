import { useNavigate } from "react-router-dom";
import isAuth from "../../states";
import * as React from "react";
import { Formik, Form, Field } from "formik";
import "./login.scss";

interface MyFormValues {
  username: string;
  password: string;
}

export const Login: React.FC<object> = () => {
  const [user, setUser] = React.useState<string>("");
  const { login } = isAuth();
  const navigate = useNavigate();
  const initialValues: MyFormValues = { username: "", password: "" };
  return (
    <section id="form">
      <div className="forms">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            setUser(values);
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <Field id="username" name="username" placeholder="Username" />
            <Field id="password" name="password" placeholder="Password" />
            <button type="submit" onClick={() => login(user, navigate)}>
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Login;
