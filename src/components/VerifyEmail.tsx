import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router";
import { verifyEmailApi } from "../api";
import Loader from "./Loader";
import type { AxiosError, AxiosResponse } from "axios";
import { GoVerified } from "react-icons/go";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) return <div>No token provided</div>;

  const mutation = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: (token: string) => verifyEmailApi({ token }),
  });

  useEffect(() => {
    mutation.mutate(token);
  }, [token]);

  return (
    <>
      {mutation.isPending && <Loader />}
      {mutation.isError && (
        <div>Error: {mutation.error?.response?.data.message}</div>
      )}
      {mutation.isSuccess && (
        <div className="flex flex-col items-center gap-4 h-[100vh] justify-center">
          <GoVerified className="text-green-500 text-2xl mx-auto size-16" />
          <div>{mutation.data.data?.message || "Email verified successfully!"}</div>
          <button onClick={() => navigate("/")} className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to App
          </button>
        </div>
      )}
    </>
  );
}
