import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DeaksModal } from "../../shared/components/DeaksModal";
import {
  fetchFilteredPrivet,
  fetchFilteredPublic,
  fetchGroups,
} from "../../shared/services/groupServices";
import {
  findManyUsers,
  getUsersList,
} from "../../shared/services/usersService";

export const NewSlotModal = ({
  open,
  setOpen,
  hotel,
  tableValues,
  setTableValues,
  editFormData,
  setEditFormData,
  formEditMode,
  editRowIndex,
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [dedicatedFilter, setDedicatedFilter] = useState(false);
  const [exclusiveGroups, setExclusiveGroups] = useState([]);
  const [exclusiveUserList, setExclusiveUserList] = useState([]);
  const [publicGroups, setPublicGroups] = useState([]);
  const [selectedPrivetGroup, setSelectedPrivateGroup] = useState([]);
  const [selectedPublicGroup, setSelectedPublicGroup] = useState([]);
  const [selectedExclusiveUsers, setSelectedExclusiveUsers] = useState([]);
  const [editFormExclusiveUsers, setEditFormExclusiveUsers] = useState([]);
  const [editFormPublicGroups, setEditFormPublicGroups] = useState([]);
  const [editFormPrivetGroups, setEditFormPrivetGroups] = useState([]);
  const [subscribersView, setSubscribersView] = useState(true);
  const [formData, setFormData] = useState({
    shiftName: "",
    startTime: "",
    endTime: "",
    hourlyPay: "",
    vacancy: 0,
    release: 0,
    priority:"",
  });
  const { shiftName, startTime, endTime, hourlyPay, vacancy, release,priority } =
    formData;
const priorityOption = [{id:"HIGH", label : "HIGH"},{id:"LOW", label : "LOW"}]
  const isFormDataChanged = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // useEffect(() => {
  //   if (startTime && endTime) {
  //     var beginningTime = moment(startTime, "h:mma");
  //     var endingTime = moment(endTime, "h:mma");
  //     // setShiftTimeChecker(endingTime.isBefore(beginningTime));
  //   }
  // }, [endTime, startTime]);

  const filterUsersFromTable = useCallback(async (userArray) => {
    const user = await findManyUsers(userArray);
    setEditFormExclusiveUsers(user?.data);
  }, []);

  const filterPublicGroupFromTable = useCallback(async (groupArray) => {
    const group = await fetchFilteredPublic(groupArray);
    setEditFormPublicGroups(group?.data);
  }, []);

  const filterPrivetGroupFromTable = useCallback(async (groupArray) => {
    const group = await fetchFilteredPrivet(groupArray);
    setEditFormPrivetGroups(group?.data);
  }, []);

  useEffect(() => {
    const {
      shiftName,
      startTime,
      endTime,
      hourlyPay,
      vacancy,
      release,
      subscribersView,
      dedicatedFilter,
      selectedExclusiveUsers,
      selectedPublicGroup,
      selectedPrivetGroup,
      priority,
    } = editFormData;
    if (editFormData) {
      setFormData({
        shiftName,
        startTime,
        endTime,
        hourlyPay,
        vacancy,
        release,
        priority,
      });
      if (selectedExclusiveUsers) {
        filterUsersFromTable(selectedExclusiveUsers);
      }
      if (selectedPublicGroup) {
        filterPublicGroupFromTable(selectedPublicGroup);
      }
      if (selectedPrivetGroup) {
        filterPrivetGroupFromTable(selectedPrivetGroup);
      }
      setSelectedExclusiveUsers(selectedExclusiveUsers);
      setSubscribersView(subscribersView);
      setDedicatedFilter(dedicatedFilter);
    }
  }, [
    editFormData,
    filterUsersFromTable,
    filterPublicGroupFromTable,
    filterPrivetGroupFromTable,
  ]);

  useEffect(() => {
    if (open === false) {
      setFormData({
        shiftName: "",
        startTime: "",
        endTime: "",
        hourlyPay: "",
        vacancy: "",
        release: "",
        priority:""
      });
      setEditFormData([]);
      setEditFormExclusiveUsers([]);
      setEditFormPublicGroups([]);
      setEditFormPrivetGroups([]);
    }
  }, [open, setEditFormData]);

  var jobAllocationChecker = Number(vacancy) > Number(release);
  const allFormElementsValidator =
    (shiftName?.length > 0) & !jobAllocationChecker & (hourlyPay?.length > 0);

  // Fetching Public groups, Privet groups & users
  const dedicatedGroups = useCallback(async () => {
    const list = await fetchGroups({
      hotel,
    });
    const exclusiveOptionData = list?.data?.map((item) => ({
      label: item?.groupTitle,
      id: item._id,
    }));
    setExclusiveGroups(exclusiveOptionData);
  }, [hotel]);

  const publicGroupOptions = useCallback(async () => {
    const list = await fetchGroups({
      groupType: "Public",
    });
    const publicGroups = list?.data?.map((item) => ({
      label: item?.groupTitle,
      id: item._id,
    }));
    setPublicGroups(publicGroups);
  }, []);

  const dedicatedUser = useCallback(async () => {
    const list = await getUsersList({});
    const exclusiveUserOptionData = list?.data?.map((item) => ({
      label: item?.name,
      id: item._id,
    }));
    setExclusiveUserList(exclusiveUserOptionData);
  }, []);

  // Saving selected users in useState
  const onChangeSelectedUsers = (users) => {
    setEditFormExclusiveUsers(users);
    let userArray = [];
    users?.map((item) => userArray.push(item.id));
    setSelectedExclusiveUsers(userArray);
  };

  const onChangeSelectedPrivateGroup = (privateGroup) => {
    setEditFormPrivetGroups(privateGroup);
    let privateArray = [];
    privateGroup?.map((item) => privateArray.push(item.id));
    setSelectedPrivateGroup(privateArray);
  };

  const onChangeSelectedPublicGroup = (publicGroup) => {
    setEditFormPublicGroups(publicGroup);
    let publicArray = [];
    publicGroup?.map((item) => publicArray.push(item.id));
    setSelectedPublicGroup(publicArray);
  };

  useEffect(() => {
    if (dedicatedFilter) {
      if (hotel) {
        dedicatedGroups();
      }
      dedicatedUser();
      publicGroupOptions();
    }
    dedicatedUser();
  }, [
    dedicatedGroups,
    dedicatedFilter,
    hotel,
    dedicatedUser,
    publicGroupOptions,
  ]);

  // Declaring variable as an array
  let tableArrayElement = tableValues;
  // Pushing new values into it
  const saveSlotRow = () => {
    tableArrayElement.push({
      shiftName,
      startTime,
      endTime,
      hourlyPay,
      vacancy,
      release,
      dedicatedFilter,
      selectedPrivetGroup,
      selectedPublicGroup,
      selectedExclusiveUsers,
      subscribersView,
      priority,
    });
    setTableValues(tableArrayElement);
    setOpen(false);
  };

  const editSlot = () => {
    const newRowElement = {
      shiftName,
      startTime,
      endTime,
      hourlyPay,
      vacancy,
      release,
      dedicatedFilter,
      selectedPrivetGroup,
      selectedPublicGroup,
      selectedExclusiveUsers,
      subscribersView,
      priority,
    };
    tableArrayElement = tableArrayElement.splice(
      editRowIndex,
      1,
      newRowElement
    );
    setOpen(false);
  };
  const convertToMinutes = (timeString) => {
    var hms = timeString.split(':');
    return Math.ceil(parseInt(hms[1]) / 60) + parseInt(hms[0])
  }
  const total = () => {
    if (convertToMinutes(endTime) > convertToMinutes(startTime)) {
      const total = convertToMinutes(endTime) - convertToMinutes(startTime);
      return ((total) * hourlyPay);
    } else {
      const total = ((convertToMinutes('24:00') - convertToMinutes(startTime)) + (convertToMinutes(endTime) - convertToMinutes('00:00')));
      return ((total) * hourlyPay);
    }
  }
  return (
    <DeaksModal modalOpen={open} setModalOpen={setOpen} modalWidth={1000}>
      <h1>Add New Slot</h1>
      <div className="ModalFormWrapperSlots">
        <div className="mainFormItems">
          <TextField
            name="shiftName"
            label="Shift Name"
            size="small"
            InputLabelProps={{ required: true }}
            onChange={isFormDataChanged}
            value={shiftName}
            helperText=""
          />
          <TextField
            name="startTime"
            type="time"
            label="Start Time"
            size="small"
            onChange={isFormDataChanged}
            InputLabelProps={{ shrink: true, required: true }}
            value={startTime}
          />
          <TextField
            name="endTime"
            type="time"
            label="End Time"
            size="small"
            onChange={isFormDataChanged}
            InputLabelProps={{ shrink: true, required: true }}
            value={endTime}
          // helperText={

          // }
          />
          <TextField
            name="hourlyPay"
            type="number"
            label="Hourly pay"
            size="small"
            onChange={isFormDataChanged}
            InputLabelProps={{ required: true }}
            value={hourlyPay}
          />
          <TextField
            name="vacancy"
            label="Vacancy"
            size="small"
            onChange={isFormDataChanged}
            InputLabelProps={{ required: true }}
            value={vacancy}
            type="number"
          />
          <TextField
            error={jobAllocationChecker}
            name="release"
            label="Release"
            size="small"
            onChange={isFormDataChanged}
            InputLabelProps={{ required: true }}
            value={release}
            type="number"
            helperText={
              jobAllocationChecker
                ? "Release should be greater than or equal to vacancy"
                : ""
            }
          />
          <Autocomplete
              id="priority"
              size="small"
              options={priorityOption}
              inputValue={priority}
              value={ priority ?
                {id:priority,label:priority}:""
              }
              renderInput={(params) => (
                <TextField {...params} value="" label="Select Priority" />
              )}
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  priority: newValue.id,
                });
              }}
            />
        </div>
        {endTime && startTime && hourlyPay ? (
          <p className="totalText">
            Total: $ {
              total()
            }
          </p>
        ) : (
          ""
        )}

        <div className="switcherDedicatedView">
          <h2 className="labelAuto">Dedicated Filter</h2>
          <Switch
            disabled={!allFormElementsValidator}
            {...label}
            defaultChecked={dedicatedFilter}
            onClick={() => {
              setDedicatedFilter(!dedicatedFilter);
            }}
          />
        </div>
        {dedicatedFilter ? (
          <div className="filterView">
            <div className="filter">
              <div className="switcher">
                <h3 className="labelAuto">Dedicated Users</h3>
              </div>
              <Autocomplete
                multiple
                id="tags-outlined-group"
                getOptionSelected={(option, value) =>
                  option.label === value.label
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={
                  !exclusiveUserList
                    ? [{ label: "Loading...", id: 0 }]
                    : exclusiveUserList
                }
                value={
                  !editFormExclusiveUsers
                    ? [{ label: "Loading...", id: 0 }]
                    : editFormExclusiveUsers
                }
                filterSelectedOptions
                onChange={(event, newValue) => {
                  onChangeSelectedUsers(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Users" />
                )}
              />
            </div>

            <div className="filter">
              <div className="switcher">
                <h3 className="labelAuto">Private Groups</h3>{" "}
              </div>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={exclusiveGroups}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={editFormPrivetGroups}
                filterSelectedOptions
                onChange={(event, newValue) => {
                  onChangeSelectedPrivateGroup(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Private Groups" />
                )}
              />
            </div>

            <div className="filter">
              <div className="switcher">
                <h3 className="labelAuto">Public Group</h3>
              </div>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={publicGroups}
                value={editFormPublicGroups}
                filterSelectedOptions
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  onChangeSelectedPublicGroup(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="dd"
                    label="Select Public Group"
                  />
                )}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="saveNewSlot">
          <FormControlLabel
            className="subscribersView"
            control={
              <Checkbox
                checked={subscribersView}
                onClick={() => {
                  setSubscribersView(!subscribersView);
                }}
              />
            }
            label="Preview job for all subscribed users"
          />
          <Button
            className="addSlotButton"
            variant="contained"
            disabled={!allFormElementsValidator}
            onClick={() => {
              formEditMode ? editSlot() : saveSlotRow();
            }}
          >
            {formEditMode ? "Edit Slot" : "Save Slot"}
          </Button>
        </div>
      </div>
    </DeaksModal>
  );
};
