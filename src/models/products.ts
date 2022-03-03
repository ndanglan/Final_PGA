export interface FetchCategoryProps {
  id: string,
  parentId: string,
  name: string,
  path: string,
  pos: string
}

export interface CategoryProps {
  id: string,
  name: string
}

export interface ProductsProps {
  id: string,
  sku: string,
  price: string,
  enable: string,
  weight: string,
  arrivalDate: string,
  name: string,
  description: string,
  created: string,
  vendor: string,
  vendorID: string,
  amount: string,
  participateSale: string,
  category: string,
  condition: string | null,
}

export interface FilterProps {
  category: string,
  count: number,
  order_by: string,
  page: number,
  search: string,
  search_type: string,
  sort: string,
  stock_status: string,
  vendor: string,
  availability: string
}

export interface EditProps {
  id: string,
  price: string,
  stock: string
}

export interface DeleteProps {
  id: string,
  delete: number
}