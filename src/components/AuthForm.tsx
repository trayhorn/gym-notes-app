import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router";
import type { AxiosResponse } from "axios";
import type { authResponse } from "../types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type AuthFormProps = {
	submitAction: (values: {
		username: string;
		password: string;
	}) => Promise<AxiosResponse<authResponse>>;
};

export default function AuthForm({ submitAction }: AuthFormProps) {
	const navigate = useNavigate();
	const { login } = useContext(AuthContext)!;

	return (
		<>
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={async (values, actions) => {
					try {
						const { data: { token, user } } = await submitAction(values);
						login(token, user.username);
						actions.resetForm();
						navigate("/");
					} catch (error) {
						console.error("Error submitting form:", error);
					}
				}}
			>
				<Form className="flex flex-col gap-sm pr-md pl-md">
					<Field autoComplete="off" name="username" type="text" placeholder="Username" />
					<Field autoComplete="off" name="password" type="password" placeholder="Password" />
					<button className="btn" type="submit">Submit</button>
				</Form>
			</Formik>
		</>
	);
}