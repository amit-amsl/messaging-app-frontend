import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

type Contact = {
  id: number;
  username: string;
};
type ContactsList = ReadonlyArray<Contact>;

async function fetchContactsList(): Promise<ContactsList> {
  return api.get("/users/contacts-list");
}

export const useContactsList = () =>
  useQuery({
    queryKey: ["contacts-list"],
    queryFn: () => fetchContactsList(),
  });
