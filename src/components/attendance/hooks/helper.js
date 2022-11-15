export const editAttendanceDetails = async (attendence_id) => {
    const data ={
      _id: 1, name: "Attendance name", hotel: "abc", outlet: "outlet", amend: true, approve: false,
    slots:[
      {id:1,name:'slot1',users:[{id:1,name:"dhanya"}],startTime:"10:00pm",endTime:"12.00pm",status:'pending'},
      {id:2,name:'slot2',users:[{id:1,name:"dhanyaks"}],startTime:"10:00pm",endTime:"12.00pm",status:'completed'}
    ]
     }
    //  await axios.post(`/moveAllToConfirmList/${attendence_id}`);
    return data;
   
  };
  