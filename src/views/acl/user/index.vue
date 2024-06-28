<script setup lang="ts" name="user">
import {
  Search,
  Refresh,
  Plus,
  Delete,
  Setting,
  Edit,
  UserFilled,
} from '@element-plus/icons-vue'
// import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import { getUsesLists } from '@/api'
import { UserList } from '@/api/acl/types'

const currentPage = ref(1)
const pageSize = ref(5)
const list = ref<UserList>([])
const total = ref(0)
const loading = ref(false)

const getUsersListsInfo = async () => {
  loading.value = true
  const res = await getUsesLists(currentPage.value, pageSize.value, '')
  console.log(res.data)
  list.value = res.data.records
  total.value = res.data.total
  console.log(list.value)
  loading.value = false
}
onMounted(getUsersListsInfo)

const handleSizeChange = (nowPageSizes: number) => {
  pageSize.value = nowPageSizes
  getUsersListsInfo()
}
const handleCurrentChange = (nowCurrent: number) => {
  currentPage.value = nowCurrent
  getUsersListsInfo()
}
</script>

<template>
  <div>
    <el-card shadow="never">
      <el-form inline class="user-seacher">
        <div>
          <el-form-item label="用户名：">
            <el-input placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称：">
            <el-input placeholder="请输入昵称"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button :icon="Search" type="primary">搜索</el-button>
          <el-button :icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="m-t-25">
      <div class="user-center-header">
        <div>
          <el-button :icon="Plus">添加</el-button>
          <el-button :icon="Delete">批量删除</el-button>
        </div>
        <el-space>
          <el-icon :size="18">
            <Refresh />
          </el-icon>
          <el-icon :size="18">
            <Setting />
          </el-icon>
        </el-space>
      </div>
      <el-table
        class="m-t-20 user-center-table"
        :data="list"
        row-key="id"
        border
      >
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="用户昵称" prop="name"></el-table-column>
        <el-table-column label="角色列表" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" sortable sort-by="createTime">
          <template v-slot="{ row }">
            <el-tooltip :content="row.createTime" placement="top">
              <el-text :truncated="true">{{ row.createTime }}</el-text>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" sortable sort-by="updateTime">
          <template v-slot="{ row }">
            <el-tooltip :content="row.updateTime" placement="top">
              <el-text :truncated="true">{{ row.updateTime }}</el-text>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" width="250px">
          <template v-slot="{}">
            <el-button type="primary" link :icon="UserFilled">
              分配角色
            </el-button>
            <el-button type="primary" link :icon="Edit">编辑</el-button>
            <el-button type="primary" link :icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block m-t-20">
        <el-pagination
          v-model:current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          v-model:page-size="pageSize"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}

.user-seacher {
  display: flex;
  justify-content: space-between;
}

.user-center-header {
  display: flex;
  justify-content: space-between;
}

.user-center-table :deep(.cell) {
  text-align: center;
}

.demo-pagination-block {
  display: flex;
  justify-content: flex-end;
}
</style>
