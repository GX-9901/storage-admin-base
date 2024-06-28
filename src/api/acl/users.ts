import http from '@/utils/http'
const api_name = '/admin/acl/user'
import { ResAclUserListParams } from './types'

export function getUsesLists(
  page: number,
  limit: number,
  name?: string,
  username?: string,
) {
  return http.get<ResAclUserListParams>(`${api_name}/${page}/${limit}`, {
    name,
    username,
  })
}
