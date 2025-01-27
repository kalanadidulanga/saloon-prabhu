//src/hooks/useServices.ts
import { useState, useEffect } from "react";
import useAxios from "./useAxios";

export type Service = {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { fetch } = useAxios();

  const fetchData = async () => {
    try {
      const response = await fetch({
        url: "/api/packages",
        method: "GET",
      });

      // Validate and transform image URLs if needed
      console.log(response.data.data);
      const processedData = response.data.data;

      setServices(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return services;
};

export default useServices;
