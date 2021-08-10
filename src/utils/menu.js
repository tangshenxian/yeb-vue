import {getMenu} from "@/api/menu";
import {Message} from "element-ui";

export const initMenu = (router, store) => {
  //vuex中存在菜单信息不需要重新加载
  if (store.state.routes.length > 0) {
    return
  }
  getMenu().then(data => {
    if (data) {
      //格式化router
      let fmtRoutes = formatRoutes(data);
      //添加路由
      router.addRoutes(fmtRoutes);
      //将数据同步到vuex中
      store.commit('initRoutes', fmtRoutes)
    }
  }).catch(error => {
    Message.error(error.message)
  })
}

export const formatRoutes = (routes) => {
  let fmtRoutes = [];
  routes.forEach(router => {
    let {path, component, name, iconcls, children} = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }
    let fmtRouter = {
      path: path,
      name: name,
      iconCls: iconcls,
      children: children,
      component(resolve) {
        if (component.startsWith('Home')) {
          require(['../views/' + component + '.vue'], resolve)
        } else if (component.startsWith('Emp')) {
          require(['../views/emp/' + component + '.vue'], resolve)
        } else if (component.startsWith('Per')) {
          require(['../views/per/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sal')) {
          require(['../views/sal/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sta')) {
          require(['../views/sta/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sys')) {
          require(['../views/sys/' + component + '.vue'], resolve)
        }
      }
    }
    fmtRoutes.push(fmtRouter)
  })
  return fmtRoutes
}
