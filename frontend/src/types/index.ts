export interface Category {
  name: string
}

export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
  category: Category
}

export interface ProductsResponse {
  data: Product[]
  total: number
  page: number
  totalPages: number
}
