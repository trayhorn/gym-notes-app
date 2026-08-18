import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router";
import * as Yup from "yup";
import { resetPasswordApi } from "../api";
import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number"
    )
    .required("Password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const mutation = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<{ message: string }>,
    { token: string; newPassword: string }
  >({
    mutationFn: ({ token, newPassword }) =>
      resetPasswordApi({ token, newPassword }),
    onSuccess: () => {
      toast.success(
        "Password reset successful. You can now log in with your new password."
      );
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Error during password reset:", error);
      toast.error(
        "An error occurred while resetting the password. Please try again."
      );
    },
  });

  useEffect(() => {
    if (!token) toast.error("No valid token is included");
  });

  if (!token) {
    return null;
  }

  return (
    <div className="h-[100vh] flex flex-col justify-center">
      <div>
        <h2 className="text-center text-lg font-bold mb-sm">
          Create New Password
        </h2>
        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          onSubmit={async values => {
            mutation.mutate({ token, newPassword: values.newPassword });
          }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form className="flex flex-col gap-sm pr-md pl-md mx-auto md:max-w-[50%] mt-5">
            <Field
              autoComplete="off"
              name="newPassword"
              type="password"
              placeholder="New Password"
            />
            <div className="text-error text-[14px]">
              <ErrorMessage name="newPassword" />
            </div>
            <Field
              autoComplete="off"
              name="confirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
            />
            <div className="text-error text-[14px]">
              <ErrorMessage name="confirmNewPassword" />
            </div>
            <button type="submit" className="btn">
              Reset Password
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
