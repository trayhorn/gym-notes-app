import { Formik, Field, Form, ErrorMessage } from "formik";
import { requestPasswordResetApi } from "../api";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function RequestPasswordResetPage() {
  const mutation = useMutation({
    mutationFn: requestPasswordResetApi,
    onSuccess: () => {
      toast.success(
        "Password reset request successful. Please check your email for further instructions."
      );
    },
    onError: (error: AxiosError) => {
      console.error("Error during password reset request:", error);
      toast.error(
        "An error occurred while requesting password reset. Please try again."
      );
    },
  });

  return (
    <div className="h-[100vh] flex flex-col justify-center">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async values => {
          mutation.mutate(values);
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form className="flex flex-col gap-sm pr-md pl-md mx-auto min-w-[400px] md:max-w-[50%]">
          <Field
            autoComplete="off"
            name="email"
            type="email"
            placeholder="Email"
          />
          <div className="text-error text-[14px]">
            <ErrorMessage name="email" />
          </div>
          <button type="submit" className="btn">
            Request Password Reset
          </button>
        </Form>
      </Formik>
    </div>
  );
}
