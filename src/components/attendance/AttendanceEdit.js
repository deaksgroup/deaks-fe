import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    Backdrop,
    Button,
    CircularProgress,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { ContentWrapper } from "../shared/components/ContentWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { UseAttendenceQuery } from "./hooks/useAttendence";
import { getUsersList } from "../shared/services/usersService";
import { DeaksModal } from "../shared/components/DeaksModal";
import { AttendanceModal } from './AttendanceModal'
import './style/attendenceStyle.css'
export const AttendanceEdit = () => {
    const navigate = useNavigate();
    const { attendanceId } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setmodalType] = useState('');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState({});
    const [slotUsers, setslotUsers] = useState([]);
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [data, setData] = useState([]);
    //   const data = info;
    useEffect(() => {
        userList();
        getuserDataBYId();

    }, []);
    const userList = async () => {
        const list = await getUsersList();
        const exclusiveUserOptionData = list?.data?.map((item) => ({
            label: item?.name,
            id: item._id,
        }));
        setUserData(exclusiveUserOptionData);
    }
    const getuserDataBYId = () => {
        const data = UseAttendenceQuery(attendanceId);
        setData(data);
    }
    const [initialValues, setInitialValues] = useState({
        _id:data?._id,
        attendanceName: data?.attendanceName,
        hotelName: data?.hotelName,
        outletName: data?.outletName,
        status: data?.status,
        date: data?.date,
        slots: data?.slots
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: "",

        onSubmit: async (values) => {
            //   const {
            //     Abbreviation,
            //     SOAmail,
            //     appleMapLink,
            //     googleMapLink,
            //     hotelName,
            //     hotelLogo,
            //     fileName,
            //     adminNumber,
            //   } = values;
            //   let formData = new FormData();
            //   formData.append("Abbreviation", Abbreviation); //append the values with key, value pair
            //   formData.append("SOAmail", SOAmail);
            //   formData.append("appleMapLink", appleMapLink);
            //   formData.append("googleMapLink", googleMapLink);
            //   formData.append("hotelName", hotelName);
            //   formData.append("hotelLogo", hotelLogo);
            //   formData.append("filename", fileName);
            //   formData.append("adminNumber", adminNumber); 
        },
    })

    return (
        <ContentWrapper ContentWrapper headerName="Edit Attendence">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Typography className="heading">{formik.values.attendanceName}</Typography>
                <div className="attendanceformWrapper">
                    <TextField
                        type="date"
                        id="date"
                        name="date"
                        label="Date"
                        value={formik.values.date}
                        size="small"
                        disabled
                    />
                    <TextField
                        id="hotel"
                        name="hotel"
                        label="Hotel Name"
                        value={formik.values.hotelName}
                        size="small"
                        disabled
                    />
                    <TextField
                        id="outlet"
                        name="outlet"
                        label="Outlet Name"
                        value={formik.values.outletName}
                        size="small"
                        disabled
                    />
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel size="small" id="verificationStatus">
                            Attendence Status
                        </InputLabel>
                        <Select
                            size="small"
                            name="verificationStatus"
                            labelId="verificationStatus"
                            id="verificationStatus"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            label="Verification Status"
                        >
                            <MenuItem size="small" value={"Pending"}>
                                Pending
                            </MenuItem>
                            <MenuItem size="small" value={"Completed"}>
                                Completed
                            </MenuItem>
                            <MenuItem size="small" value={"Not Submitted"}>
                                Not Submitted
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {data.slots?.map((item, index) => {
                    return (
                        <div className="slotsection" key={index}>
                            <Typography className="heading">{item.name}</Typography>
                            <Autocomplete
                                multiple
                                id="tags-outlined-group"
                                getOptionSelected={(option, value) =>
                                    option.label === value.label
                                }
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                options={
                                    !userData
                                        ? [{ label: "Loading...", id: 0 }]
                                        : userData
                                }
                                value={
                                    !item?.users
                                        ? [{ label: "Loading...", id: 0 }]
                                        : item?.users
                                }
                                filterSelectedOptions
                                onChange={(event, newValue) => {
                                    // onChangeSelectedUsers(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Users" />
                                )}
                            />
                            <div className="textfield">
                                <TextField
                                    id="startTime"
                                    name="startTime"
                                    label="Start Time"
                                    value={item.startTime}
                                    size="small"
                                    disabled
                                />
                                <TextField
                                    id="endTime"
                                    name="endTime"
                                    label="End Time"
                                    value={item.endTime}
                                    size="small"
                                    disabled
                                />
                            </div>
                            <Button
                                sx={{
                                    marginTop: "20px",
                                    background: "#8d2557",
                                    float: "right",
                                    width: "100px",
                                    height: "35px",
                                    marginBottom: '20px'
                                }}
                                variant="contained"
                                onClick={() => {
                                    setModalOpen(true);
                                    setSelectedSlot(item);
                                    setslotUsers(item.users);
                                    setmodalType(item.name)
                                }}
                            >
                                Edit
                            </Button>
                            <DeaksModal
                                modalOpen={modalOpen}
                                setModalOpen={setModalOpen}
                                modalHeader={modalType}
                                modalWidth={700}
                            >
                                <AttendanceModal
                                    modalType={modalType}
                                    setModalOpen={setModalOpen}
                                    userData={userData}
                                    selectedSlot={selectedSlot}
                                    attendencedata={data}
                                    setslotUsers={setslotUsers}
                                    slotUsers={slotUsers}

                                />
                            </DeaksModal>
                        </div>
                    )
                })}
                <Button
                    sx={{
                        marginTop: "20px",
                        background: "#08AD0A",
                        float: "left",
                        width: "110px",
                        height: "45px",
                        marginBottom: '20px'
                    }}
                    onClick={() => { setAddModalOpen(true) }}
                >
                    ADD SLOT
                </Button>
                <Button
                    sx={{
                        marginTop: "20px",
                        background: "#1976d2",
                        float: "right",
                        width: "110px",
                        height: "45px",
                        marginBottom: '20px',
                        marginleft: '10px'
                    }}
                    variant="contained"
                    type="submit"
                >
                    SAVE
                </Button>
                <DeaksModal
                    modalOpen={addModalOpen}
                    setModalOpen={setAddModalOpen}
                    modalHeader={modalType}
                    modalWidth={700}
                >
                    <AttendanceModal
                        modalType={modalType}
                        setModalOpen={setAddModalOpen}
                        userData={userData}
                    />
                </DeaksModal>

            </form>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </ContentWrapper>
    );
};
