<template>
  <div>
    <el-card>
      <el-row :gutter="20" class="header">
        <el-col :span="7">
          <el-input
            :placeholder="$t('table.placeholder')"
            clearable
            v-model="queryForm.query"
          ></el-input>
        </el-col>
        <el-button type="primary" :icon="Search" @click="initGetUsersList">{{
          $t('table.search')
        }}</el-button>
        <el-button type="primary" @click="handleDialogValue()">{{
          $t('table.adduser')
        }}</el-button>
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          :prop="item.prop"
          :label="$t(`table.${item.lable}`)"
          v-for="(item, index) in options"
          :key="index"
          :width="item.width"
        >
          <template v-slot="{ row }" v-if="item.prop === 'create_time'">
            <!-- <el-switch v-model="row.mg_state" /> -->
            {{ $filters.filterTimes(row.create_time) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="handleDialogValue(row)"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="delUser(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Dialog
      v-model="dialogVisible"
      :dialogTitle="dialogTitle"
      v-if="dialogVisible"
      @initUserList="initGetUsersList"
      :dialogTableValue="dialogTableValue"
    />
  </div>
</template>

<script setup>
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUser, deleteUser } from '@/api/users'
import { options } from './options'
import Dialog from './components/dialog.vue'
import { isNull } from '@/utils/filters'
import { ElMessageBox, ElMessage } from 'element-plus'
const queryForm = ref({
  query: ''
})
const tableData = ref([])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogTableValue = ref({})

const initGetUsersList = async () => {
  const res = await getUser(queryForm.value)
  tableData.value = res.users
}
initGetUsersList()

const handleDialogValue = (row) => {
  if (!isNull(row) && row.username === 'admin') {
    ElMessage.error('禁止修改')
  } else {
    if (isNull(row)) {
      dialogTitle.value = '添加用户'
      dialogTableValue.value = {}
    } else {
      dialogTitle.value = '编辑用户'
      dialogTableValue.value = JSON.parse(JSON.stringify(row))
    }
    dialogVisible.value = true
  }
}

const delUser = (row) => {
  if (row.username === 'admin') {
    ElMessage.error('禁止删除')
  } else {
    ElMessageBox.confirm('确定删除用户？', 'Warning', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await deleteUser(row)
        initGetUsersList()
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除'
        })
      })
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
::v-deep .el-input__suffix {
  align-items: center;
}
</style>
