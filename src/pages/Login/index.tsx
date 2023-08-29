import { useNavigate } from "react-router-dom";
import isAuth from "../../states";
import { Formik, Form, Field } from "formik";
import "./login.scss";

interface MyFormValues {
  username: string;
  password: string;
}

export const Login = () => {
  const { login } = isAuth();
  const navigate = useNavigate();
  const navigation = useNavigate();
  const initialValues: MyFormValues = {
    username: "",
    password: "",
  };
  const nav = () => {
    navigation("/register");
  };
  return (
    <section>
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
            <button onClick={() => login}>Sign up</button>
            <button onClick={nav}>Register</button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Login;
