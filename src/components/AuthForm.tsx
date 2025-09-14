import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Loader from "./Loader";

type AuthFormProps = {
	submitAction: (values: {
		username: string;
		password: string;
	}) => Promise<string>;
};

export default function AuthForm({ submitAction }: AuthFormProps) {
	const navigate = useNavigate();
	const { login } = useContext(AuthContext)!;

	const mutation = useMutation({
		mutationFn: submitAction,
		onSuccess: (username) => {
			login(username);
			navigate("/");
		},
		onError: (error) => {
			console.error("Error during authentication:", error);
		}
	});

	return (
		<>
			{mutation.isPending ? (
				<Loader />
			) : (
				<Formik
					initialValues={{ username: "", password: "" }}
					onSubmit={async (values) => {
						mutation.mutate(values);
					}}
				>
					<Form className="flex flex-col gap-sm pr-md pl-md">
						<Field
							autoComplete="off"
							name="username"
							type="text"
							placeholder="Username"
						/>
						<Field
							autoComplete="off"
							name="password"
							type="password"
							placeholder="Password"
						/>
						<button className="btn" type="submit">
							Submit
						</button>
					</Form>
				</Formik>
			)}
		</>
	);
}