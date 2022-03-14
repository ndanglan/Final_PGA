import { RangeKeyDict } from "react-date-range"

export interface UserDataProps {
  access_level: string
  created: string
  fistName: string
  lastName: string
  last_login: string
  order: {
    order_as_buyer: number,
    order_as_buyer_total: number
  }
  product: number
  profile_id: string
  storeName: string
  vendor: string
  vendor_id: string
  wishlist: string
}

export interface FilterUsersProps {
  address: string
  count: number
  country: string
  date_range: RangeKeyDict
  date_type: string
  memberships: {
    group: string,
    value: string,
    name: string
  }[]
  order_by: string
  page: number
  phone: string
  search: string
  sort: string
  state: string
  status: string
  types: {
    groups: string,
    value: string,
    name: string
  }[]
  tz: number
}

export interface DeleteUsersProps {
  id: string,
  delete: number
}

export interface UserFormValues {
  access_level: string
  confirm_password: string
  email: string
  firstName: string
  forceChangePassword: number
  lastName: string
  membership_id: null | number | string
  password: string
  paymentRailsType: string
  roles: { id: string, name: string }[]
  taxExempt: number,
  status?: string,
  id?: string,
  statusComment?: string
}

export interface VendorDataProps {
  account_status: {
    E: string,
    D: string,
    U: string
  },
  info: {
    access_level: string
    companyName: string
    default_card_id: string
    earning: number
    email: string
    expense: string
    firstName: string
    first_login: string
    forceChangePassword: string
    income: string
    joined: string
    language: string
    lastName: string
    last_login: string
    membership_id: null | number | string
    order_as_buyer: number
    order_as_buyer_total: number
    paymentRailsId: string
    paymentRailsType: string
    pending_membership_id: null | number | string
    products_total: string
    profile_id: string
    referer: string
    roles: string[]
    status: string
    statusComment: string
    taxExempt: string
    vendor_id: string
  }
}