export interface ProductsProps {
  id: string,
  sku: string,
  price: string,
  enabled: string,
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
  price?: string,
  stock?: string,
  enable?: number
}

export interface DeleteProps {
  id: string,
  delete: number
}

export interface FetchVendorsProps {
  id: string,
  companyName: string,
  login: string,
  name: string
}

export interface CommonSelectProps {
  id: string | null | number,
  name: string
}
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

export interface FormValuesProps {
  id: string,
  vendor_id: string | number,
  name: string,
  brand_id: string,
  condition_id: string,
  categories: { categories_id: string, name: string }[],
  description: string,
  enabled: number,
  memberships: number[],
  shipping_to_zones: {
    id: string,
    zone_name: string,
    price: string
  }[],
  tax_exempt: number,
  price: string,
  sale_price_type: string,
  arrival_date: string,
  inventory_tracking: number,
  quantity: string,
  sku: string,
  participate_sale: number,
  sale_price: string,
  og_tags_type: string,
  og_tags: string,
  meta_desc_type: string,
  meta_description: string,
  meta_keywords: string,
  product_page_title: string,
  facebook_marketing_enabled: number,
  google_feed_enabled: number,
  imagesOrder: string[],
  deleted_images: string[],
  images: File[]
}

export interface detailsProductProps {
  arrival_date: string
  brand_id: string
  categories: { categories_id: string, name: string }[]
  cleanURL: string
  code: string
  description: string
  enabled: string
  facebook_marketing_enabled: string
  google_feed_enabled: string
  id: string
  images: {
    id: string,
    file: string,
    thumbs: string[]
  }[]
  inventory_tracking: string
  memberships: []
  meta_desc_type: string
  meta_description: string
  meta_keywords: string
  name: string
  og_tags: string
  og_tags_type: string
  participate_sale: string
  price: string
  product_page_title: string
  quantity: string
  sale_price: string
  sale_price_type: string
  shipping: { id: string, zone_name: string, price: string }[]
  sku: string
  sort_description: string
  tax_exempt: string
  vendor_id: string
  weight: string
  condition_id: string
}