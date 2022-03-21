export interface FetchVendorsProps {
  id: string,
  companyName: string,
  login: string,
  name: string
}

export interface FetchCategoryProps {
  id: string,
  parentId: string,
  name: string,
  path: string,
  pos: string
}

export interface CountriesDataProps {
  active_currency: string | null
  code: string
  code3: string
  country: string
  currency_id: string
  enabled: string
  id: string
  is_fraudlent: string
}

export interface CommonSelectProps {
  id: string | null | number,
  name: string
}