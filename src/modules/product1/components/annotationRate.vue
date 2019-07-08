<template>
  <div class="annotationRate">
    <h1>注释率计算</h1>
    <div class="top">
      <Upload class="upload" type="drag" :format="['zip']" action="/api/upload"
              :before-upload="handleUpload" :on-format-error="handleFormatError"
              :max-size="5">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>上传文件</p>
          <!--<Button icon="ios-cloud-upload-outline" v-if="!file"></Button>-->
          <p v-if="file">文件名为：{{ file.name }}</p>
        </div>
      </Upload>

      <Upload  class="top" action="/api/upload" >
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
      <div v-if="file !== null">
        <Button type="primary" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '上传' }}
        </Button>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        loadingStatus: false, // 上传中
        file: null, // 上传的文件数据
      }
    },
    computed: {},
    watch: {},
    methods: {
      handleUpload(file) {
        console.log(123)
        this.file = file;
        return false;
      },
      handleFormatError() {
        console.log("456")
        this.$Notice.warning({
          title: '文件格式不正确',
          // desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      upload() {
        this.loadingStatus = true; // 状态改成上传中
        console.log(this.file)
        let tt = new FormData()
        tt.append('file', this.file, this.file.name)
        console.log(tt)
        service.postDefault(this, '/api/upload', tt, ).then(function (result) {
          console.log(result)

          this.file = null;
          this.loadingStatus = false;
        }, function (err) {
          console.log(err)
        })

      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>

<style lang='less' scoped>
  .annotationRate {
    width: 1200px;
    margin: 0 auto;
    .top {
      display: flex;
      justify-content: left;
      align-items: center;
    }
    .upload {
      width: 200px;
      margin-right: 50px;
    }
  }
</style>
