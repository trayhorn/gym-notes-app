import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Loader from "./Loader";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { PasswordInfo } from "./PasswordInfo";
import * as Yup from 'yup';

type AuthFormProps = {
	submitAction: (values: {
		username: string;
		password: string;
	}) => Promise<string>;
};

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number"
    )
    .required("Password is required"),
});

export default function AuthForm({ submitAction }: AuthFormProps) {
	const navigate = useNavigate();
	const { login } = useContext(AuthContext)!;

	const mutation = useMutation({
		mutationFn: submitAction,
		onSuccess: (username) => {
			login(username);
			navigate("/");
		},
		onError: (error: AxiosError<{message: string}>) => {
			if (!error.response) return;
			if(error.response.data.message.includes(
          "fails to match the required pattern:"
        )) return;
      const { message } = error.response.data;
      toast.error(message);
      console.error("Error during authentication:", message);
		}
	});

	return (
    <>
      {mutation.isPending ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            mutation.mutate(values);
          }}
					validateOnChange={false}
					validateOnBlur={false}
        >
            <Form className="flex flex-col gap-sm pr-md pl-md mx-auto md:max-w-[50%]">
              {submitAction.name === "registerUser" && <PasswordInfo />}
              <Field
                autoComplete="off"
                name="username"
                type="text"
                placeholder="Username"
              />
              <div className="text-error text-[14px]">
								<ErrorMessage name="username" />
							</div>
              <Field
                autoComplete="off"
                name="password"
                type="password"
                placeholder="Password"
              />
							<div className="text-error text-[14px]">
								<ErrorMessage name="password" />
							</div>
              <button className="btn" type="submit">
                Submit
              </button>
            </Form>
        </Formik>
      )}
    </>
  );
}