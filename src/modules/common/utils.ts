import moment from "moment"

export const formatDateTime = (time: string) => {
  return moment.unix(parseInt(time)).format('YYYY-MM-DD')
}

export const timeToDateType = (time: number) => {
  return new Date(time * 1000)
}

export const dateTypeToStringType = (date: Date) => {
  return moment(date).format('YYYY-MM-DD')
}