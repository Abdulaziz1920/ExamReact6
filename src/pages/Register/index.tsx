import { Formik, Form, Field } from "formik";
import { useState } from "react";
import request from "../../server/https_request";
import TOKEN from "../../constants";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface MyFormValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

function Register() {
  const [user, setUser] = useState<MyFormValues>();
  const navigate = useNavigate();
  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  };
  async function regs() {
    try {
      const res = await request.post("auth/register", user);
      Cookies.set(TOKEN, res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log("Ошибка отправки данных на сервер", error);
    }
  }
  console.log(user)
  return (
    <section>
      <div className="forms">
        <h1>Register</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            setUser(values);
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <Field id="firstName" name="firstName" placeholder="First name" />
            <Field id="lastName" name="lastName" placeholder="Last name" />
            <Field id="username" name="username" placeholder="User name" />
            <Field id="password" name="password" placeholder="Password" />
            <button onClick={regs}>Register</button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default Register;
