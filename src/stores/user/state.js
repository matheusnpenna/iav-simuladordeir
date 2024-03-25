import { getToken } from "@/setup/api";

export default function () {
  return () => ({
    logged: !!getToken(),
    createdUsers: [],
    pagination: {},
    user: {},
  });
}
