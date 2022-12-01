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
//update amend
export const updateAmend = async (attendance_id) =>{
  const data =await axios.patch(`/attendance/amend/${attendance_id}`);
  return data.data;
}
//update aprove
export const updateAprove = async (attendance_id) =>{
  const data =await axios.patch(`/attendance/approve/${attendance_id}`);
  return data.data;
}
//update Slot
export const patchSlot = async (params) =>{
  const data =await axios.patch(`/attendance/updateSlot`,params);
  return data.data;
}
//delete attendance
export const deleteAttendanceItem = async (attendance_id) =>{
  const data =await axios.delete(`/attendance/delete/${attendance_id}`);
  return data.data;
}
//create pdf
export const createPdf = async (attendance_id) =>{
  const data =await axios.get(`/attendance/createAttendancePDF/${attendance_id}`);
  return data.data;
}
export const downloadPdf = async () =>{
  const data =await axios.get(`/attendance/download`);
  console.log(data)
  return data.data;
}