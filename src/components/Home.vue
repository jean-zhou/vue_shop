<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
  <el-header>
    <div>
      <img src="../assets/heima.png" alt="">
      <span>
        电商管理系统
      </span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="toggle-button" @click="toggleCallapse">|||</div>
      <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff"
       unique-opened :collapse="isCollapse" :collapse-transition='false'
       router :default-active="activePath">
      <!-- 一级菜单 -->
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <!-- 菜单模板区 -->
        <template slot="title">
          <i :class="iconObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>

        <!-- 二级菜单 -->
          <el-menu-item :index="'/' + child.path" v-for="child in item.children"
          :key="child.id" @click="saveNavStatus('/' + child.path)">
            <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{child.authName}}</span>
          </template>
          </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false,
      // 高亮的路径，默认是一个空值
      activePath: ''
    }
  },
  // 使用生命周期的钩子函数，页面显示就获取数据
  created() {
    this.getMenuList()
    // 每次刷新页面需要拿到activePath的值，就是可以保存高亮的效果
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      // 发起ajax请求，把请求的结果赋值给data
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      // 如果没有拿到数据，就报错
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 拿到数据就赋值
      this.menuList = res.data
    },
    toggleCallapse () {
      this.isCollapse = !this.isCollapse
    },
    saveNavStatus (activePath) {
      // 每次点击，就把对应的activePath的值保存给sessionStorage
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d42;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;

  > div {
    display: flex;
    align-items: center;

    span {
      color: #fff;
      font-size: 20px;
      padding-left: 20px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.el-menu {
  border-right: none;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  color: #fff;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
}
</style>
