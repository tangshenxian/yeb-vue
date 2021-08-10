import service from "@/utils/request";

const api = {
  getMenu: '/system/cfg/menu',
}

export function getMenu(params) {
  return service({
    url: api.getMenu,
    method: 'get',
    params: params
  })
}
