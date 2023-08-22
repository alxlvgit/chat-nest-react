import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "https://server-nest-chat.onrender.com/auth/login",
        values
      );
      const accessToken = response.data.access_token;
      login(accessToken);
      console.log("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </Form>
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not registered? &nbsp;
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Create an account{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
