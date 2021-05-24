import Moment from "moment";
export const dateFormat = (date) =>
  Moment(date).zone(-7).format("DD/MM/YYYY HH:mm");
