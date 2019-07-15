<template>
  <div class="annotationRate">
    <h1>注释率计算</h1>
    <div class="top">
      <Upload class="upload" type="drag" :format="['zip']" action="/api/upload"
              :before-upload="handleUpload" :on-format-error="handleFormatError"
              :max-size="5">
        <div style="padding: 8px 4px">
          <!--<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>-->
          <p>点击或拖入此处，上传文件</p>
          <!--<Button icon="ios-cloud-upload-outline" v-if="!file"></Button>-->
          <p v-if="file">文件名为：{{ file.name }}</p>
        </div>
      </Upload>

      <div v-if="file !== null">
        <Button type="primary" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '疯狂计算中' : '上传并计算' }}
        </Button>
      </div>
    </div>

    <div class="listBox" v-if="tableContent.length">
      <div class="listTop"><span v-for="(v,i) in tableTop" :key="i">{{v}}</span></div>
      <div class="listContent">
        <div v-for="(v,i) in tableContent" :key="i">
          <span>{{i+1}}</span>
          <span :title="v.name">{{v.name}}</span>
          <span>{{v.rate}}</span>
          <span>{{v.codeNum}}</span>
          <span>{{v.jsNum}}</span>
          <span>{{v.noteNum}}</span>
          <span :title="v.path">{{v.path}}</span>
        </div>
        <div>
          <span>总计</span>
          <span></span>
          <span>{{(sum.noteNum/sum.codeNum*100).toFixed(2)}}%</span>
          <span>{{sum.codeNum}}</span>
          <span>{{sum.jsNum}}</span>
          <span>{{sum.noteNum}}</span>
          <span></span>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  // 	console[val.rate>=20 ? 'info' : 'warn'](`文件${val.name}：总JS有${val.codeNum}行、实际js有${val.jsNum}行、注释有${val.noteNum}行、注释率为${val.rate + '%'}、路径是${val.path}`)

  export default {
    data() {
      return {
        loadingStatus: false, // 上传中
        file: null, // 上传的文件数据
        tableTop: ['序号','文件名','注释率','总代码行数','实际JS行数','注释行数','路径'],
        tableContent: [],
        sum: {}
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
          let res = result.data
          if (res.code === 200){
            this.tableContent = res.data.list
            this.sum = res.data.sum
          }
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: left;
    >h1{
      height: 42px;
    }
    .top {
      display: flex;
      justify-content: left;
      align-items: center;
      height: 64px;
      .upload {
        display: flex;
        width: 200px;
        margin-right: 50px;
      }
    }
    .listBox{
      width: 100%;
      overflow: auto;
      flex-grow: 1;
      .listTop{
        background: @themeColor;
        color: #fff;
        height: 36px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span{
          border-right: 1px solid #ccc;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          &:last-child{
            border: none;
          }
        }
      }
      .listContent{
        height: ~"calc(100% - 36px)";
        .al_scorll();
        overflow: auto;
        >div{
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: nowrap;
          overflow: hidden;
          span:nth-child(2){text-align: left}
          span:nth-child(7){text-align: left}
        }
      }
      .listTop, .listContent{
        span:nth-child(1){width: 58px}
        span:nth-child(2){width: 150px}
        span:nth-child(3){width: 100px}
        span:nth-child(4){width: 100px}
        span:nth-child(5){width: 100px}
        span:nth-child(6){width: 100px}
        span:nth-child(7){width: 390px}
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 5px;
        }
      }
    }
  }
</style>
