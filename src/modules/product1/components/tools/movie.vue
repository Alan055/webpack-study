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
    <al_table class="table" :tableTop="tableTop" :pagination.sync="pagination" :init="findData">
      <div class="item" v-for="(v,i) in tableData" :key="i">
        <span>{{pagination.pageNumber*pagination.pageSize+(i+1)}}</span>
        <span>{{v.id}}</span>
        <span :title="v.name">{{v.name}}</span>
        <span>{{v.type}}</span>
        <span>{{v.release_date}}</span>
        <span><a :href="v.jump_url" target="_blank">{{v.jump_url}}</a></span>
        <span>{{v.create_time}}</span>
      </div>
    </al_table>

  </div>
</template>

<script>
  import service from "@/js/service";
  import al_table from "@/components/pc/al_table.vue";


  export default {
    components: {al_table},
    data() {
      return {
        tableTop: ['序号', 'id', '电影名', '类型', '上架时间', '页面地址', '爬虫时间'],
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
        totalList: []
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
          if (res.code === 200) {
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
      findGroup() {
        service.getDefault(this, '/api/movieType', {}).then(function (result) {
          let res = result.data
          if (res.code === 200) {
            if (!this.typeList.length) {
              this.typeList = res.data.typeList.map(v => ({label: v.type_name, value: v.id, total: v.total}))
              this.totalList = res.data.totalList
            }
          }

        }, function (err) {
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
      width: 100%;
      margin: 0 auto;
      .input {
        margin-right: 10px;
      }
    }
    .table {
      height: ~"calc(100% - 202px)";
      .item {
        display: flex;
        justify-content: left;
        align-items: center;
        height: 40px;
        width: 100%;
        padding: 0;
        margin: 0;
        border-bottom: 1px solid #ccc;
        span {
          &:nth-child(3) {
            text-align: left;
            padding: 0 10px;
            justify-content: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: pre-wrap;
          }
          &:nth-child(6) a {
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
      /deep/ .top span, .content span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:nth-child(1) {width: 58px}
        &:nth-child(2) {width: 50px}
        &:nth-child(3) {width: 200px}
        &:nth-child(4) {width: 100px}
        &:nth-child(5) {width: 150px}
        &:nth-child(6) {width: 300px}
        &:nth-child(7) {width: 136px}
      }
    }
    .box {
      width: 1200px;
      margin: 20px auto;
      .cel {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          width: 25%;
        }
      }
    }

  }
</style>
