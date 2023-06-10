import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });
  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Manage Users</title>
      </Helmet>
      <h2>manage users : {users.length}</h2>
    </div>
  );
};

export default ManageUsers;
