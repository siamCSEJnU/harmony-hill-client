import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: allUsers = [], isLoading } = useQuery(
    ["selectedClasses"],
    async () => {
      const respone = await axiosSecure.get("/users");
      return respone.data;
    }
  );
  return [allUsers, isLoading];
};

export default useAllUsers;
