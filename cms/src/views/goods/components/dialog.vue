<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="商品分类" prop="catname">
        <el-select v-model="form.catname" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.catname"
            :label="item.catname"
            :value="item.catname"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="cat_name">
        <el-input v-model="form.cat_name" />
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          ref="img"
          class="upload-demo"
          :action="
            props.dialogTitle === '添加商品'
              ? '/api/cate/add'
              : '/api/cate/update'
          "
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
        >
          <el-button type="primary">选择图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品价格" prop="cat_price">
        <el-input v-model="form.cat_price" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from 'vue'
import { addGood, updateGood, getCates } from '@/api/goods'
import { ElMessage } from 'element-plus'

// 图片上传
const img = ref()
const handleExceed = (files) => {
  img.value.clearFiles()
  img.value.handleStart(files[0])
}

// 获取商品列表
const options = []
const initCateList = async () => {
  const { cates } = await getCates({ query: '' })
  cates.forEach((item) => {
    options.push(item)
  })
  // console.log(cates)
}
initCateList()

const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogTableValue: {
    type: Object,
    default: () => {}
  }
})
const formRef = ref(null)
const form = ref({
  catname: '',
  cat_name: '',
  cat_icon: '',
  cat_price: 0,
  id1: 0,
  id2: 0
})
const rules = ref({
  catname: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ],
  cat_name: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ],
  cat_price: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ]
})

watch(
  () => props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)

const emits = defineEmits(['update:modelValue', 'initGoodList'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await img.value.submit()
      if (props.dialogTitle === '添加商品') {
        // console.log(form.value)
        const result = await addGood(form.value)
        if (result.catname) {
          ElMessage({
            message: '更新成功',
            type: 'success'
          })
        }
      } else {
        await updateGood(form.value)
        ElMessage({
          message: '更新成功',
          type: 'success'
        })
      }
      emits('initGoodList')
      handleClose()
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped></style>
