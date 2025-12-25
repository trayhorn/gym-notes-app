import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Loader from "./Loader";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";


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
		onError: (error: AxiosError<{message: string}>) => {
			if(!error.response) return;
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
					onSubmit={async (values) => {
						mutation.mutate(values);
					}}
				>
					<Form className="flex flex-col gap-sm pr-md pl-md mx-auto md:max-w-[50%]">
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