export const MEMBERSHIP_DATA = [
  {
    group: 'Membership',
    value: "M_4",
    name: 'General'
  },
  {
    group: 'Pending Membership',
    value: "P_4",
    name: 'General'
  },
]

export const TYPES_DATA = [
  {
    group: 'Membership',
    value: "1",
    name: 'Administrator'
  },
  {
    group: 'Membership',
    value: "2",
    name: 'Coupons management'
  },
  {
    group: 'Membership',
    value: "3",
    name: 'Content management'
  },
  {
    group: 'Membership',
    value: "4",
    name: 'Volume discounts management'
  },
  {
    group: 'Membership',
    value: "5",
    name: 'Vendor'
  },
  {
    group: 'Membership',
    value: "6",
    name: 'View order reports'
  },
  {
    group: 'Pending Membership',
    value: 'C',
    name: 'Registered Customers'
  },
  {
    group: 'Pending Membership',
    value: 'N',
    name: 'Anonymous Customers'
  }
]

export const STATUS_DATA = [
  {
    value: 'clear',
    name: 'Any status'
  },
  {
    value: 'E',
    name: 'Enable'
  },
  {
    value: 'D',
    name: 'Disable'
  },
  {
    value: 'U',
    name: 'Unapproved vendor'
  },
]

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/