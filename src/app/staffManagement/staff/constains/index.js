import moment from "moment";

export const GENDER = [
  { id: "0", name: "Nam" },
  { id: "1", name: "Nữ" },
];

export const TEAMS = [
  { value: 1, name: "Nhóm 1" },
  { value: 2, name: "Nhóm 2" },
  { value: 3, name: "Nhóm 3" },
];

export const FORMAT_DATE_SUBMIT = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
