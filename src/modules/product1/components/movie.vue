<template>
  <div class="reptile">
    <h1>电影爬虫数据展示</h1>
    <div class="select">
      <label>电影名：</label> <Input class="input" v-model="keyword" style="width:200px"/>
      <label>类型查询：</label>
      <Select v-model="type" style="width:100px">
        <Option v-for="item in typeList" :value="item.label" :key="item.value">{{ item.label }}</Option>
      </Select>
      <label>上架时间：</label>
      <DatePicker class="input" type="daterange" v-model="date" style="width: 200px"></DatePicker>
      <Button type="primary" class="input" @click="init()">查询</Button>
    </div>
    <div class="table">
      <div class="top">
        <span v-for="(v,i) in tableTop" :key="i">{{v}}</span>
      </div>
      <div class="content">
        <div class="item" v-for="(v,i) in tableData" :key="i">
          <span>{{pagination.pageNumber*pagination.pageSize+(i+1)}}</span>
          <span>{{v.id}}</span>
          <span :title="v.name">{{v.name}}</span>
          <span>{{v.type}}</span>
          <span>{{v.release_date}}</span>
          <span><a :href="v.jump_url" target="_blank">{{v.jump_url}}</a></span>
          <span>{{v.create_time}}</span>
        </div>
      </div>
      <div class="bottom">
        <p>共 <span>{{pagination.total}}</span> 条数据</p>
        <Page :total="pagination.total" show-sizer @on-change="tableChange" @on-page-size-change="sizeChange"/>
      </div>
    </div>

    <div><span v-for="(v,i) in typeList" :key="i">{{v.label}}</span></div>
    <div><span v-for="(v,i) in typeList" :key="i">{{v.total}}</span></div>

  </div>
</template>

<script>
  import service from "@/js/service";


  export default {
    data() {
      return {
        tableTop: ['序号', 'id', '电影名', '类型', '上架时间', '页面地址', '爬虫时间' ],
        tableData: [], // 表格数据
        pagination: { // 分页数据
          pageNumber: 0, // 当前是第几页
          pageSize: 10, // 一页显示多少条数据
          total: 0, // 表格中数据在后台的总条数
        },
        keyword: '', // 关键词
        answerNum: '', // 回答数量
        date: [null, null], // 提问时间
        typeList: [],
        type: '',
        typeTotal: []
      }
    },
    computed: {},
    watch: {},
    methods: {
      findData() {
        let obj = {
          pageNumber: this.pagination.pageNumber,
          pageSize: this.pagination.pageSize,
          keyword: this.keyword,
          type: this.type,
        }
        if (this.date[0]) {
          obj.startDate = moment(this.date[0]).format("YYYY.MM.DD") + ' 00:00'
          obj.endDate = moment(this.date[1]).format("YYYY.MM.DD") + ' 23:59'
        }
        service.postDefault(this, '/api/movie', obj).then(function (result) {
          let res = result.data
          if(res.code === 200){
            this.tableData = res.data.list
            this.pagination.total = res.data.total
            // if(!this.typeList.length){
            //   this.typeList = result.data.typeList.map(v=>({label:v.type_name ,value: v.id, total: v.total}))
            // }
          }
        }, function (err) {
          console.log(err)
        })
      },
      tableChange(i) {
        this.pagination.pageNumber = i - 1
        this.findData()
      },
      sizeChange(size) {
        this.pagination.pageNumber = 0
        this.pagination.pageSize = size
        this.findData()
      },
      findGroup(){
        service.getDefault(this,'/api/movieType',{}).then(function(result){
          let res = result.data
          if(res.code === 200){
            if(!this.typeList.length){
              this.typeList = res.data.map(v=>({label:v.type_name ,value: v.id, total: v.total}))
            }
          }

        },function(err){
        	console.log(err)
        })
      },



      init() {
        this.findData()
        this.findGroup()
      }
    },
    created() {
      this.init()
    },
    mounted() {
    },
  }
</script>

<style lang='less' scoped>
  .reptile {
    height: 100%;
    h1 {
      height: 42px;
    }
    .select {
      height: 60px;
      display: flex;
      justify-content: left;
      align-items: center;
      width: 1200px;
      margin: 0 auto;
      .input {
        margin-right: 10px;
      }
    }
    .table {
      position: relative;
      height: ~"calc(100% - 162px)";
      width: 1200px;
      margin: 0 auto;
      border: 1px solid #ccc;
      .top {
        height: 40px;
        display: flex;
        justify-content: left;
        align-items: center;
        border-bottom: 1px solid #ccc;
      }
      .content {
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: flex-start;*/
        /*align-items: center;*/
        height: ~"calc(100% - 89px)";
        overflow: auto;
        .item {
          display: flex;
          justify-content: left;
          align-items: center;
          height: 40px;
          width: 100%;
          padding: 0;
          margin: 0;
          border-bottom: 1px solid #ccc;
          &:last-child {
            /*border-bottom: none;*/
          }
          span {
            list-style: none;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: pre-wrap;
            &:nth-child(3){
              text-align: left;
              padding: 0 10px;
              justify-content: left;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: pre-wrap;
            }
            &:nth-child(6) a{
              display: flex;
              text-align: left;
              justify-content: left;
              align-items: center;
              padding: 0 10px;
              width: 100%;
              height: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: pre-wrap;
              word-break: break-all
            }
          }
        }
      }
      .top span, .content span {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #ccc;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:last-child {
          border-right: none;
        }
      }
      .bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 52px;
        border-top: 1px solid #ccc;
        background: #fff;
        p{
          margin: 0 10px;
          span{
            color: red;
          }
        }
      }
    }

  }
</style>
