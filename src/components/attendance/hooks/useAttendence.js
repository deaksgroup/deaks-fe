import axios from "axios";

// Hooks
export const UseAttendenceQuery = async (attendence_id) =>{
const data =await axios.get(`/attendance/details/${attendence_id}`);
return data?.data;
}
//list all the attendence
export const UseAttendencelist = async (params) =>{
  const data =await axios.post(`/attendance/list`,params);
  return data.data;
}
//update attendence
export const patchAttendencestatus = async (attendance_id,status) =>{
  const data =await axios.patch(`/attendance/updateAttendance/${attendance_id}/${status}`);
  return data.data;
}
//Add New slot for  attendence
export const Addnewslot = async (params) =>{
  console.log(params)
  const data =await axios.post(`attendance/addSlot`,params);
  console.log(data);
  return data.data;
}
//update Slot
export const patchSlot = async (params) =>{
  const data =await axios.patch(`/attendance/updateSlot`,params);
  return data.data;
}