import axios from "axios";

// Hooks
export const UseAttendenceQuery = async (attendence_id) =>{
const data =await axios.get(`/attendance/details/${attendence_id}`);
// {
//   _id: 1, name: "Attendance name", hotel: "abc", outlet: "outlet", amend: true, approve: false,status:"Pending",date:"2022-11-06",
// slots:[
//   {id:1,name:'slot1',users:[{id:"6363e07b427f466066c76e3f",label:"DevJith"}],startTime:"2018-01-01T00:00:00.000Z",endTime:"12:00:00",status:'Pending'},
//   {id:2,name:'slot2',users:[{id:1,label:"dhanyaks"}],startTime:"2018-01-01T00:00:00.000Z",endTime:"12.00pm",status:'Completed'}
// ]
//  }



console.log(data);
return data;
}
//list all the attendence
export const UseAttendencelist = async () =>{
  const data =await axios.post(`/attendance/list?startDate=2021-11-04T18:30:00.000+00:00&endDate=2023-11-20T18:30:00.000+00:00&status&hotel&outlet&searchQuery&pageSize=10&pageNum=1`);
  console.log(data);
  return data;
}