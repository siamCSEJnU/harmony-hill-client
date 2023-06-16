import { useQuery } from "@tanstack/react-query";

const useAllClasses = () => {
  const { data: allClasses = [], isLoading } = useQuery(
    ["allClasses"],
    async () => {
      const response = await fetch("http://localhost:5000/allClasses");
      return response.json();
    }
  );
  return [allClasses, isLoading];
};

export default useAllClasses;
