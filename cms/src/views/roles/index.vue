<template>
  <div>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          :prop="item.prop"
          :label="item.lable"
          v-for="(item, index) in options"
          :key="index"
          :width="item.width"
        >
          <template #default="{ row }" v-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="editRole(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Dialog
      v-model="dialogVisible"
      v-if="dialogVisible"
      @initUserList="initGetUsersList"
      :dialogTableValue="dialogTableValue"
    />
  </div>
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUser } from '@/api/users'
import Dialog from './components/dialog.vue'
import { options } from './options'
import { ElMessage } from 'element-plus'

const queryForm = ref({
  query: ''
})
const tableData = ref([])

const dialogVisible = ref(false)
const dialogTableValue = ref({})
const initGetUsersList = async () => {
  const res = await getUser(queryForm.value)
  tableData.value = res.users
}
initGetUsersList()

const editRole = (row) => {
  // console.log(row.username)
  if (row.username === 'admin') {
    ElMessage.error('禁止修改')
  } else {
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
    dialogVisible.value = true
  }
}
</script>

<style lang="scss" scoped></style>
