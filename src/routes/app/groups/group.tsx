import GroupView from "@/features/groups/components/group-view";
import { useParams } from "react-router";

export default function GroupRoute() {
  const params = useParams();
  const groupId = params.groupId as string;

  return (
    <>
      <GroupView groupId={groupId} />
    </>
  );
}
