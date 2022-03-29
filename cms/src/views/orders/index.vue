<template>
  <div>
    <el-card>
      <el-button type="primary" @click="initGetOrdersList">全部订单</el-button>
      <el-button type="warning" plain @click="wfhList">未发货</el-button>
      <el-button type="success" plain @click="yfhList">已发货</el-button>
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
              @click="updateState(row)"
              :disabled="row.id === 2 ? true : false"
              >发货</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getOrder, updState } from '@/api/order'
import { options } from './options'

const queryForm = ref({
  query: ''
})
const tableData = ref([])

const initGetOrdersList = async () => {
  const res = await getOrder(queryForm.value)
  tableData.value = res
}
initGetOrdersList()

const wfhList = () => {
  queryForm.value.query = '未发货'
  initGetOrdersList()
  queryForm.value.query = ''
}

const yfhList = () => {
  queryForm.value.query = '已发货'
  initGetOrdersList()
  queryForm.value.query = ''
}
const updateState = async (data) => {
  await updState(data)
  initGetOrdersList()
}
</script>

<style lang="scss" scoped></style>
