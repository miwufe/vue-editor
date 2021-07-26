import request from '@/utils/request'
export function getData(params) {
  let data = params || {}
  return request({
    url: '/api/fraud/clue-num',
    method: 'get',
    params: data
  })
}
