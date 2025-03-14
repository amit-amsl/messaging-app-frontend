import { useUserProfile } from "@/features/users/api/get-user-profile";
import { useUser } from "@/lib/auth";
import { useParams } from "react-router";
import { format, formatDistanceToNow } from "date-fns";
import { useAuthenticatedSocket } from "@/lib/use-socket";
import { UserRoundPen } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  updateUserInput,
  updateUserInputSchema,
  useUpdateUser,
} from "@/features/users/api/update-user";
import Dialog from "@/components/dialog";
import ThemeSwitcher from "@/components/theme-switcher";

export default function ProfileRoute() {
  const params = useParams();
  const userId = params.userId as string;
  const user = useUser();
  const [imagePreview, setImagePreview] = useState("");
  const { connected } = useAuthenticatedSocket();

  const userProfileQuery = useUserProfile({ userId });

  const userProfile = userProfileQuery.data;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<updateUserInput>({
    resolver: zodResolver(updateUserInputSchema),
    defaultValues: {
      bio: "",
    },
    values: {
      bio: userProfile?.bio ?? "",
    },
  });

  const updateUserMutation = useUpdateUser();

  const onSubmit = (data: updateUserInput) => {
    console.log(data);
    updateUserMutation.mutate({ data, userId });
  };

  if (!userProfile) return null;

  return (
    <div className="h-[calc(100%-64px)] md:h-full overflow-y-auto w-full p-3 custom-chat-bg">
      <div className="bg-base-200 overflow-y-auto p-3 rounded-md flex flex-col gap-6">
        <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#0f172a]  to-[#334155] h-52 md:h-64 rounded-md shadow-2xl flex gap-4 items-center relative animate-in fill-mode-both slide-in-from-top-10 duration-1000">
          <div className="flex gap-4 items-end">
            <div
              className={`avatar ${!userProfile.profile_img_url && "placeholder"} ${connected ? "online" : "offline"} ml-10 animate-in fill-mode-both fade-in duration-1000`}
            >
              <div className="bg-neutral text-neutral-content w-28 md:w-40 shadow-xl rounded-full">
                {userProfile.profile_img_url ? (
                  <img className="" src={userProfile.profile_img_url} alt="" />
                ) : (
                  <span className="text-3xl md:text-5xl">
                    {userProfile.username.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2 animate-in fill-mode-both fade-in delay-200 duration-1000">
              <h1 className="text-3xl md:text-5xl text-neutral-content">
                {userProfile.username}
              </h1>
              <div
                className="tooltip before:w-auto before:sm:w-max  tooltip-bottom"
                data-tip={format(userProfile.createdAt, "PPPPpppp")}
              >
                <p className="text-sm md:text-xl text-neutral-content/50">
                  joined {formatDistanceToNow(userProfile.createdAt)} ago
                </p>
              </div>
            </div>
          </div>
          {user.data && user.data?.userId === +userId && (
            <Dialog
              title="Update profile"
              triggerButtonBody={<UserRoundPen />}
              triggerButtonClasses="text-white fixed top-2 right-2"
              isActionPending={updateUserMutation.isPending}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold">Profile Image</h2>
                    <div className="flex justify-center">
                      <img
                        src={
                          imagePreview === ""
                            ? userProfile.profile_img_url
                            : imagePreview
                        }
                        alt=""
                        className="size-28 md:size-40 rounded-full"
                      />
                    </div>
                    <Controller
                      name="image"
                      control={control}
                      render={({ field: { onChange, ...field } }) => (
                        <input
                          {...field}
                          disabled={updateUserMutation.isPending}
                          value={undefined}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              onChange(file);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                          className="file-input file-input-bordered w-full max-w-xs"
                          type="file"
                        />
                      )}
                    />
                    {errors && (
                      <span className="text-error font-bold">
                        {errors.image?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold">Bio</h2>
                    <textarea
                      {...register("bio")}
                      disabled={updateUserMutation.isPending}
                      className="textarea textarea-bordered md:textarea-lg w-full max-w-xl"
                      placeholder="tell us about yourself..."
                    ></textarea>
                    {errors && (
                      <span className="text-error font-bold">
                        {errors.bio?.message}
                      </span>
                    )}
                  </div>
                  <button
                    disabled={updateUserMutation.isPending}
                    type="submit"
                    className="btn place-self-end"
                  >
                    {updateUserMutation.isPending && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Save changes
                  </button>
                </div>
              </form>
            </Dialog>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold">Personal statistics</h2>
          <div className="stats stats-vertical md:stats-horizontal shadow">
            <div className="stat place-items-center animate-in fill-mode-both fade-in duration-1000">
              <div className="stat-title">Messages sent</div>
              <div className="stat-value">{userProfile.stats.sentMessages}</div>
            </div>
            <div className="stat place-items-center animate-in fill-mode-both fade-in duration-1000 delay-200">
              <div className="stat-title">Messages recieved</div>
              <div className="stat-value">
                {userProfile.stats.receivedMessages}
              </div>
            </div>
            <div className="stat place-items-center animate-in fill-mode-both fade-in duration-1000 delay-500">
              <div className="stat-title">Groups member of</div>
              <div className="stat-value">
                {userProfile.stats.groupsMemberOf}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-2">
            <h2 className="text-3xl font-bold">About me</h2>
          </div>
          <div className="bg-base-100 p-4 rounded-xl shadow">
            <p className="text-base md:text-xl animate-in fill-mode-both fade-in duration-1000 delay-200">
              {userProfile.bio.trim().length === 0
                ? "This user does not have a bio"
                : userProfile.bio}
            </p>
          </div>
        </div>
        {user.data && user.data?.userId === +userId && (
          <div className="flex flex-col gap-2 items-center md:hidden">
            <h2 className="text-xl sm:text-2xl font-bold">
              Theme switch (Dark/Light)
            </h2>
            <button className="opacity-60 hover:opacity-100 transition-opacity">
              <ThemeSwitcher />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/*
            {user.data && user.data?.userId === +userId && (
            <button
              className={`btn btn-outline ${bioEditMode && "btn-active"} border-0 btn-sm`}
              onClick={() => setBioEditMode(!bioEditMode)}
            >
              <SquarePen />
              Edit
            </button>
          )} 

          {bioEditMode ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 max-w-xl">
                  <textarea
                    {...register("bio")}
                    disabled={updateUserMutation.isPending}
                    className="textarea textarea-bordered md:textarea-lg w-full max-w-xl"
                    placeholder="tell us about yourself..."
                  ></textarea>
                  {errors && (
                    <span className="text-error font-bold">
                      {errors.bio?.message}
                    </span>
                  )}
                  <button
                    disabled={updateUserMutation.isPending}
                    type="submit"
                    className="btn place-self-end"
                  >
                    {updateUserMutation.isPending && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-base md:text-xl animate-in fill-mode-both fade-in duration-1000 delay-200">
                {userProfile.bio.trim().length === 0
                  ? "This user does not have a bio"
                  : userProfile.bio}
              </p>
            )}

const user = useUser();
  const { socket, connected } = useAuthenticatedSocket();
  const { lastMessage, sendMessage } = useSocketEvent<string>(
    socket,
    "msg-test"
  );

  return (
    <div className="flex flex-col">
      <span>socket.io test zone:</span>
      <span>
        status:{" "}
        {connected && (
          <span className="text-green-500 font-bold">connected</span>
        )}
      </span>
      <button
        className="btn"
        onClick={async () => {
          await sendMessage(user.data);
        }}
      >
        test
      </button>
      <div>{JSON.stringify(lastMessage)}</div>
    </div>
  );
*/
