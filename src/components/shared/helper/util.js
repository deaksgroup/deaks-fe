import { Chip } from "@mui/material";
import moment from "moment";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
const AppUrl = process.env.REACT_APP_BASE_URL;

export const timeConv = (val) => {
  return moment(val, ["HH.mm"]).format("hh:mm a");
};

export const TimeView = (val) => (
  <Chip size="small" icon={<AccessAlarmIcon />} label={val} />
);

export const ImageView = (imageId) => {
  return `${AppUrl}/images/${imageId}`;
};
