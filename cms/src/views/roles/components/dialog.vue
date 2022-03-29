<template>
  <el-dialog
    :model-value="dialogVisible"
    title="Title"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
      <el-form-item label="角色" prop="role_name">
        <el-input v-model="form.role_name" />
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
import { updateRole } from '@/api/users'
import { ElMessage } from 'element-plus'

const props = defineProps({
  dialogTableValue: {
    type: Object,
    default: () => {}
  }
})
const formRef = ref(null)
const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})
const rules = ref({
  role_name: [
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

const emits = defineEmits(['update:modelValue', 'initUserList'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (
      form.value.role_name === '超级管理员' ||
      form.value.role_name === '普通员工'
    ) {
      await updateRole(form.value)
      ElMessage({
        message: '更新成功',
        type: 'success'
      })
      emits('initUserList')
      handleClose()
    } else {
      ElMessage({
        message: '请输入正确的角色',
        type: 'warning'
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>
