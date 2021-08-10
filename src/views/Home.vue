<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">
          系统标题
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <el-submenu :index="index + ''" v-for="(item, index) in routes" :key="index" v-if="!item.hidden">
              <template slot="title"><i :class="item.iconCls" style="color: #66b1ff; margin-right: 5px"></i>{{
                  item.name
                }}
              </template>
              <el-menu-item v-for="(children, index2) in item.children" :index="children.path" :key="index2">
                {{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    routes() {
      return this.$store.state.routes
    }
  }
}
</script>

<style scoped>

.homeHeader {
  background: #66b1ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.homeHeader .title {
  font-size: 30px;
  font-family: 华文楷体;
  color: white;
}
</style>
