import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField";
import Select from "react-select";
import { Link, useNavigate } from "react-router";
import { useGroupCandidates } from "@/features/groups/api/get-available-group-members";
import {
  createGroupInput,
  createGroupInputSchema,
  useCreateGroupChat,
} from "@/features/groups/api/create-group-chat";
import { ArrowLeft } from "lucide-react";

export default function GroupCreationRoute() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createGroupInput>({
    resolver: zodResolver(createGroupInputSchema),
  });

  const navigate = useNavigate();

  const groupCandidatesQuery = useGroupCandidates();

  const candidateOptions = groupCandidatesQuery.data;

  const createGroupChatMutation = useCreateGroupChat();

  const onSubmit = (data: createGroupInput) => {
    console.log(data);
    createGroupChatMutation.mutate(data);
    navigate("/groups");
  };

  return (
    <div className="bg-base-200 p-4 h-[calc(100%-64px)] md:h-full w-full flex flex-col">
      <div className="flex gap-2 items-center flex-shrink-0">
        <Link to={"/groups"}>
          <ArrowLeft
            size={28}
            className="hover:-translate-x-2 transition-transform"
          />
        </Link>
        <h1 className="text-4xl font-bold">Create group</h1>
      </div>
      <div className="divider"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 max-w-xl">
          <FormField
            type="text"
            label="Group name"
            register={register("group_name", { required: true })}
            error={errors.group_name}
            isDisabled={createGroupChatMutation.isPending}
          />
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">Group members</span>
            </div>
            <Controller
              name="group_members"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  isSearchable
                  isLoading={groupCandidatesQuery.isLoading}
                  isDisabled={
                    groupCandidatesQuery.isLoading ||
                    createGroupChatMutation.isPending
                  }
                  required
                  options={candidateOptions}
                  getOptionLabel={(option) => option.username}
                  getOptionValue={(option) => option.username}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              )}
            />
            <div className="label">
              <span className="label-text-alt">
                * Upon group creation you're automatically given group admin
                role
              </span>
            </div>
          </label>
          <button
            className={`${createGroupChatMutation.isPending && "btn-disabled"} btn btn-neutral self-end`}
            type="submit"
          >
            {createGroupChatMutation.isPending && (
              <span className="loading loading-spinner"></span>
            )}
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
