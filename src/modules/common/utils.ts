import moment from "moment"

export const formatDateTime = (time: string) => {
  return moment.unix(parseInt(time)).format('YYYY-MM-DD')
}