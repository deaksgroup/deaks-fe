import axios from "axios";

// API Requests
export const fetchSlot = async (slotId) => {
  const { data } = await axios.get(`/getSlotAdmin/${slotId}`);
  return data;
};

export const cancelSlot = async (slotId) => {
  const { data } = await axios.patch(`/deleteSlot/${slotId}`);
  return data;
};

export const moveSlotUser = async (elements) => {
  const { slotId, userId, override } = elements;
  const { data } = await axios.patch(
    `/moveToConfirmedList/${slotId}/${userId}/${override}`
  );
  return data;
};

export const moveSlotUserToWaiting = async (elements) => {
  const { slotId, userId } = elements;
  const { data } = await axios.patch(`/moveToWaitingList/${slotId}/${userId}`);
  return data;
};

export const removeWaitingListUser = async (elements) => {
  const { slotId, userId } = elements;
  const { data } = await axios.patch(`/removeWaitingUser/${slotId}/${userId}`);
  return data;
};

export const removeConfirmedListUser = async (elements) => {
  const { slotId, userId } = elements;
  const { data } = await axios.patch(
    `/removeConfirmedUser/${slotId}/${userId}`
  );
  return data;
};

export const dedicateFilterHandler = async (values) => {
  const { bool, slotId } = values;
  const { data } = await axios.patch(`/updateSlot`, {
    requiredUpdate: "dedicated_filter",
    dedicatedFilter: bool,
    _id: slotId,
  });
  return data;
};

export const editSlotDetails = async (values) => {
  const { data } = await axios.patch(`/updateSlot`, values);
  return data;
};

export const getAllSlotData = async (values) => {
  const { data } = await axios.post(`/getAllSlotData`, values);
  return data;
};

export const moveAllUsersToWaiting = async (slot_id) => {
  const { data } = await axios.patch(`/moveAllToWaitingList/${slot_id}`);
  return data;
};

export const moveAllUsersToConfirmed = async (slot_id) => {
  const { data } = await axios.post(`/moveAllToConfirmList/${slot_id}`);
  return data;
};
