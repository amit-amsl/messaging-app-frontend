import { configureAuth } from "react-query-auth";
import { z } from "zod";
import { api } from "./api-client";
import { Navigate } from "react-router";

type ApiAuthResponse = {
  message: string;
  user: {
    userId: number;
    username: string;
  } | null;
};

export const loginInputSchema = z.object({
  username: z
    .string({ required_error: "field is required" })
    .min(1, "Field is required"),
  password: z
    .string({ required_error: "field is required" })
    .min(1, "Field is required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const registerInputSchema = z
  .object({
    username: z
      .string({ required_error: "field is required" })
      .nonempty("Field is required")
      .min(4, "Username must be at least 4 characters")
      .max(10, "Username must not exceed 10 characters"),
    password: z
      .string({ required_error: "field is required" })
      .nonempty("Field is required")
      .min(7, "Password must be at least 7 characters")
      .max(14, "Password must not exceed 14 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;

async function getUser() {
  const response: ApiAuthResponse = await api.get("/auth/me");
  return response.user;
}

function userLogout() {
  return api.post("/auth/logout");
}

const reactQueryAuthConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response: ApiAuthResponse = await api.post("/auth/login", data);
    return response;
  },
  registerFn: async (data: RegisterInput) => {
    const response: ApiAuthResponse = await api.post("/auth/register", data);
    return response;
  },
  logoutFn: userLogout,
};

export const { useUser, useLogin, useLogout, useRegister } =
  configureAuth(reactQueryAuthConfig);

/* Custom Implementation of AuthLoader */
export const AuthLoader = ({
  children,
  renderLoading,
}: {
  children: React.ReactNode;
  renderLoading: React.ReactNode;
}) => {
  const { isFetched } = useUser();

  if (!isFetched) {
    return renderLoading;
  }

  return <>{children}</>;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  if (!user.data) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return children;
};
