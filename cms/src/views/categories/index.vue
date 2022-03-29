<template>
  <div>
    <el-card>
      <el-row :gutter="20" class="header">
        <el-col :span="7">
          <el-input
            placeholder="请输入搜索的分类名称"
            clearable
            v-model="queryForm.query"
          ></el-input>
        </el-col>
        <el-button type="primary" :icon="Search" @click="initGetCatesList">{{
          $t('table.search')
        }}</el-button>
        <el-button type="primary" @click="handleDialogValue()"
          >添加分类</el-button
        >
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          :prop="item.prop"
          :label="$t(item.lable)"
          v-for="(item, index) in options"
          :key="index"
        >
          <template #default="{ row }" v-if="item.prop === 'action'">
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
              @click="delCate(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Dialog
      v-model="dialogVisible"
      :dialogTitle="dialogTitle"
      v-if="dialogVisible"
      @initCateList="initGetCatesList"
      :dialogTableValue="dialogTableValue"
    />
  </div>
</template>

<script setup>
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getCates, deleteCate } from '@/api/goods'
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

const initGetCatesList = async () => {
  const res = await getCates(queryForm.value)
  tableData.value = res.cates
}
initGetCatesList()

const handleDialogValue = (row) => {
  // console.log(row)
  if (isNull(row)) {
    dialogTitle.value = '添加分类'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑分类'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true
}

const delCate = (row) => {
  ElMessageBox.confirm('确定删除商品？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deleteCate(row)
      initGetCatesList()
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
