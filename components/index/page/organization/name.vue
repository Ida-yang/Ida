<template>
  <el-tree 
    node-key="deptid"
    highlight-current
    :data="datalist" 
    :props="defaultProps"
    :expand-on-click-node="false"
    default-expand-all>
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ data.deptname }}</span>
      <span>
        <el-button
          type="text"
          size="mini"
          @click="append(data)">
          添加
        </el-button>
        <el-button
          type="text"
          size="mini"
          @click="remove(node, data)">
          删除
        </el-button>
      </span>
    </span>
  </el-tree>
  <!--
* highlight-current ：为了点击时节点高亮
* expand-on-click-node : 只能箭头控制树形的展开收缩
* render-content : 节点渲染方式
* default-expanded-keys ：默认展开节点
-->
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  let deptid = 1000;

  export default {
    data(){
      return{
        datalist:[],
        defaultProps:{
          children:'next',
          label:'deptname'
        },
        // deptData:JSON.parse(JSON.stringify(this.datalist)),
      }
    },
    mounted(){
      this.loadData()
    },
    methods:{
      loadData(){
        let _this = this
        axios({
          method: 'get',
          url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
        }).then(function(res){
          console.log(res.data.map.success)
          let data = res.data.map.success
          _this.datalist = data
          console.log(_this.datalist)
        }).catch(function(err){
          console.log(err);
        });
      },
      append(data) {
        const newChild = { deptid: deptid++, deptname: 'testtest', next: [] };
        if (!data.next) {
          this.$set(data, 'next', []);
        }
        data.next.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const next = parent.data.next || parent.data;
        const index = next.findIndex(d => d.deptid === data.deptid);
        next.splice(index, 1);
      },
    }
  }
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>