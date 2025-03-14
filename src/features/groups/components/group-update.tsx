import FormField from "@/components/FormField";
import { useGroupCandidates } from "../api/get-available-group-members";
import { Controller, useForm } from "react-hook-form";
import {
  updateGroupInput,
  updateGroupInputSchema,
  useUpdateGroupChat,
} from "../api/update-group-chat";
import { zodResolver } from "@hookform/resolvers/zod";
import Select, { StylesConfig } from "react-select";
import { Contact, GroupConversation } from "@/types/api";

const styles: StylesConfig<
  Contact & { isAdmin: boolean; isFixed: boolean },
  true
> = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

export default function UpdateGroupChat({
  groupChat,
  groupId,
}: {
  groupChat: GroupConversation;
  groupId: string;
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<updateGroupInput>({
    resolver: zodResolver(updateGroupInputSchema),
    defaultValues: {
      group_name: "",
      group_members: [],
    },
    values: {
      group_name: groupChat.groupName,
      group_members: [
        ...groupChat.users.map((gUser) =>
          gUser.isAdmin ? { ...gUser, isFixed: true } : gUser
        ),
      ],
    },
  });
  //groupChat.users.filter((gUser) => !gUser.isAdmin
  const groupCandidatesQuery = useGroupCandidates();

  const candidateOptions = groupCandidatesQuery.data;

  const updateGroupChatMutation = useUpdateGroupChat();

  const onSubmit = (data: updateGroupInput) => {
    console.log(data);
    updateGroupChatMutation.mutate({ data, groupId });
  };

  return (
    <div className="p-4 w-full flex flex-col">
      <h1 className="text-4xl font-bold">Update group</h1>
      <div className="divider"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 max-w-xl">
          <FormField
            type="text"
            label="Group name"
            register={register("group_name", { required: true })}
            error={errors.group_name}
            isDisabled={updateGroupChatMutation.isPending}
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
                  isDisabled={groupCandidatesQuery.isLoading}
                  styles={styles}
                  isClearable={false}
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
                * Group admin/s can not be omitted!
              </span>
            </div>
          </label>
          <button
            className={`${updateGroupChatMutation.isPending && "btn-disabled"} btn btn-neutral self-end`}
            type="submit"
          >
            {updateGroupChatMutation.isPending && (
              <span className="loading loading-spinner"></span>
            )}
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
