import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useActivityToday(){
 const{data:stays,isLoading}=useQuery({
    queryFn: getStaysTodayActivity,
    queryKey:["today-activity"] 
 })
 return{isLoading,stays }
}