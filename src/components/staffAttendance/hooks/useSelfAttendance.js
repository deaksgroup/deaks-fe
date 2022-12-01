import axios from "axios";


//list all the attendence
export const UseStaffAttendencelist = async (params) =>{
  const data =await axios.post(`staffAttendance/list`,params);
  return data?.data;
}
// Fetch details of staff attendeance by id
export const UseStaffAttendenceQuery = async (attendence_id) =>{
    const data =await axios.get(`/staffAttendance/detail/${attendence_id}`);
    return data?.data;
    }

//update Staff attendence
export const patchStaffAttendance = async (params) =>{
    const data =await axios.patch(`/staffAttendance/update`,params);
    return data.data;
  }