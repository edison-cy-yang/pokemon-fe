import { PageQuery } from "../classes"

export function generatePageQueryHash(
  prefix: string,
  query: PageQuery
) {
  return `${prefix}--pp${query.perPage}--p-${query.page}`
}