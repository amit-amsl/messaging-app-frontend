import { useUser } from "@/lib/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import onlineMessageIllustration from "@/assets/undraw_online-message_k64b.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate("/", {
        replace: true,
      });
    }
  }, [user.data, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-evenly">
      <div>{children}</div>
      <img
        src={onlineMessageIllustration}
        alt=""
        className="hidden lg:block h-[632px] w-[632px]"
      />
    </div>
  );
}
