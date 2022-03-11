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
  date_range: {
    startDate: Date | undefined,
    endDate: Date | undefined,
    key: string
  }[]
  date_type: string
  memberships: string[]
  order_by: string
  page: number
  phone: string
  search: string
  sort: string
  state: string
  status: string[]
  types: string[]
  tz: number
}

export interface DeleteUsersProps {
  id: string,
  delete: number
}