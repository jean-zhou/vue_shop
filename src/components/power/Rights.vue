<template>
  <div>
            <!-- 麵包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片列表 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="等级">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-tag type="success" v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="info" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>  
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    }
  },
  // 权限的列表数据要在一刷新页面就拿到
  created() {
    this.getRightsList()
  },
  methods: {
    // 定义拿到列表数据的方法
    async getRightsList() {
      const { data:res } = await this.$http.get('rights/list')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败')
      }

      this.rightsList = res.data
    }
  }
}
</script>

<style lang="less" scoped>

</style>
