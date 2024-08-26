export const MAX_PAGINATION_SIZE = 10

export interface PaginatedResult<T> {
  count: number
  next?: string | null
  results: T
}

export interface PageQuery {
  page: number
  perPage: number
}

export interface Page {
  id: string
  query: PageQuery
  totalCount: number
  entityIds: string[] // References to the entities contained on this page
}