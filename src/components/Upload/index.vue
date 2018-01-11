<template>
  <el-upload
    name="uploadFile"
    :headers="headers"
    :action="uploadUrl"
    :on-success="success"
    :on-remove="remove"
    :multiple='false'
    :file-list="previewList"
    :list-type="getListType">
    <i class="el-icon-plus" v-if="imageBtn === 'plus'"></i>
    <el-button type="success" v-else-if="imageBtn === 'btn'">点击上传</el-button>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'
import { deleteImage, UploadRequestPath } from '@/api/upload'
export default {
  name: 'upload',
  props: {
    imageUrl: String,
    imageBtn: {
      type: String,
      default: 'plus'
    }
  },
  created() {
    if (this.imageUrl.length > 0) {
      this.previewList = [{ name: 'pic', url: process.env.BASE_API + this.imageUrl }]
    }
  },
  data() {
    return {
      uploadUrl: UploadRequestPath,
      headers: {
        Accept: 'application/json',
        Authorization: getToken()
      },
      previewList: []
    }
  },
  methods: {
    success(response, file, fileList) {
      this.emitImage(fileList)
    },
    remove(file, fileList) {
      this.previewList = []
      // 删除服务器上物理位置图片
      const param = {
        uploadFile: file.response
      }
      deleteImage(param)
      // 重新更新imageUrl
      this.emitImage(fileList)
    },
    emitImage(fileList) {
      let imageUrl = ''
      if (fileList.length > 0) {
        imageUrl = fileList[fileList.length - 1].response
      }

      this.$emit('update:imageUrl', imageUrl)
    }
  },
  watch: {
    imageUrl: function(val) {
      this.previewList = [{ name: 'pic', url: process.env.BASE_API + val }]
    }
  },
  computed: {
    getListType() {
      return (this.imageBtn === 'plus') ? 'picture-card' : 'test'
    }
  }
}
</script>

<style scoped>

</style>
