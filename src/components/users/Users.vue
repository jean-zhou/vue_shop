<template>
  <div>
    <!-- 麵包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格卡片区 -->
    <el-card class="box-card">

      <!-- 顶部的搜索按钮区 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容"
          v-model="queryList.query" clearable @clear="getUserList">
            <el-button slot="append"
            icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格数据区 -->
      <el-table :data="userList" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>

        <!-- 用户状态区 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-switch v-model="scope.row.mg_state"
            @change="usersStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>

        <!-- 用户操作区 -->
        <el-table-column label="操作" width="180px">
          <template>
            <!-- {{scope.row}} -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryList.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryList.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryList: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryList
      })
      console.log(res)
      // 要判断是否拿到数据
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 这个是自定义了事件，每次页面修改，就会触发这个事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryList.pagesize = newSize
      // 每次修改页面的数据的时候，需要重新请求数据
      this.getUserList()
    },
    // 自定义事件，拿到当前的页面
    handleCurrentChange(currentSize) {
      console.log(currentSize)
      // 每次页面修改了以后，就会监听到这个事件，所以就可以修改数据的值，
      this.queryList.pagenum = currentSize
      this.getUserList()
    },
    // 监听switch开关的改变
    async usersStateChange(usersState) {
      // 是el-switch触发的事件api
      console.log(usersState)
      // 发起请求 会拿到一个数据
      const { data: res } = await this.$http.put(`users/${usersState.id}/state/${usersState.mg_state}`)
      console.log(res)
      if (res.meta.status !== 200) {
        usersState.mg_state = !usersState.mg_state
        return this.$message.error('数据更新失败')
      }
      return this.$message.success('设置状态成功')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
