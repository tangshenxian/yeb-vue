import service from "@/utils/request";

const api = {
  login: '/login',
}

export function login(params) {
  return service({
    url: api.login,
    method: 'post',
    data: params
  })
}
