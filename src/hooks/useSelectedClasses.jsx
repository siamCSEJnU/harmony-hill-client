import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSelectedClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const { data: selectedClasses = [], refetch } = useQuery(
    ["selectedClasses"],
    async () => {
      const respone = await axiosSecure.get("/selectedClasses");
      return respone.data;
    }
  );
  // console.log(selectedClasses);
  const mySelectedClasses = selectedClasses.filter(
    (item) => item.studentEmail == user.email
  );
  return [mySelectedClasses, refetch];
};

export default useSelectedClasses;
