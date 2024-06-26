import http from '@/utils/http'
import { Dict } from './types'

const api_name = '/admin/base/dict'

/**
 * 获取编码字典数据
 */
export function findByParentId(parentId: number | string) {
  return http.get<Dict.DictCodeItem[]>(`${api_name}/findByParentId/${parentId}`)
}

/**
 * 获取编码字典数据
 */
export function findByDictCode(dictCode: string) {
  return http.get<Dict.DictCodeItem[]>(`${api_name}/findByDictCode/${dictCode}`)
}
