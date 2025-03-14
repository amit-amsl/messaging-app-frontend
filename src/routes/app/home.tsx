import { Leaf } from "lucide-react";
import chattingIllustration from "@/assets/undraw_chatting_5u5z.svg";

export default function HomeRoute() {
  return (
    <div className="h-[calc(100%-64px)] md:h-dvh w-full p-4 flex flex-col items-center justify-around gap-4 custom-chat-bg">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <Leaf className="size-6 md:size-9" />
          <h1 className="text-5xl md:text-8xl font-bold">LeafChat</h1>
        </div>
        <p className="text-2xl md:text-3xl font-semibold">
          Simple, reliable, private and group messaging for free, available all
          over the world.
        </p>
      </div>
      <div>
        <img src={chattingIllustration} alt="" />
      </div>
    </div>
  );
}
