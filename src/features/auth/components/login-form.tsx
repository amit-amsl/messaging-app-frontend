import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField";
import { LoginInput, loginInputSchema, useLogin } from "@/lib/auth";
import { Link } from "react-router";
import clsx from "clsx";
import { useState } from "react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
  });
  const [serverError, setServerError] = useState("");

  const login = useLogin({
    onError: (error) => {
      setServerError(error?.response?.data?.message);
    },
  });

  const onSubmit = (data: LoginInput) => {
    login.mutate(data);
  };

  return (
    <div className="flex flex-col gap-3 container">
      <p className="text-5xl font-bold">Welcome back,</p>
      {serverError && <p className="text-red-500 font-bold">* {serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <FormField
            type="text"
            label="Username"
            register={register("username")}
            error={errors.username}
            isDisabled={login.isPending}
          />
          <FormField
            type="password"
            label="Password"
            register={register("password")}
            error={errors.password}
            isDisabled={login.isPending}
          />
          <button
            className={`${login.isPending && "btn-disabled"} btn btn-neutral`}
            type="submit"
          >
            {login.isPending && (
              <span className="loading loading-spinner"></span>
            )}
            Login
          </button>
        </div>
      </form>
      <div>
        <p className={clsx(login.isPending && "hidden")}>
          Don't have an account yet?{" "}
          <Link
            to={"/auth/register"}
            className="link link-hover font-bold text-sky-600"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
