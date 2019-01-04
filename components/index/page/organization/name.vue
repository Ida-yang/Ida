<template>
  <el-tree 
    class="expand-tree"
    node-key="deptid"
    highlight-current
    :data="datalist" 
    :props="defaultProps"
    :expand-on-click-node="false"
    :render-content="renderContent"
    default-expand-all>
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

export default {
  data(){
    return{
      datalist:[],
      defaultProps:{
        children:'next',
        label:'deptname'
      }
    }
  },
  mounted(){
    this.load()
  },
  methods:{
    load(){
      let _this = this
      axios({
        method: 'get',
        url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
      }).then(function(res){
        // console.log(res.data.map.success)
        _this.datalist = res.data.map.success
        console.log(_this.datalist)
      }).catch(function(err){
        console.log(err);
      });
    },
    renderContent(h,{node,data,store}){
      let _this = this;//指向vue
      return h(this.datalist,{
        props: {
          DATA: data,//节点数据
          NODE: node,//节点内容
          STORE: store,//完整树形内容
        },
        on: {//绑定方法
          nodeAdd: ((s,d,n) => _this.handleAdd(s,d,n)),
          nodeEdit: ((s,d,n) => _this.handleEdit(s,d,n)),
          nodeDel: ((s,d,n) => _this.handleDelete(s,d,n))
        }
      });
    },
    handleAdd(s,d,n){//增加节点
      console.log(s,d,n)
    },
    handleEdit(s,d,n){//编辑节点
      console.log(s,d,n)
    },
    handleDelete(s,d,n){//删除节点
      console.log(s,d,n)
    }
  }
}
</script>

<style>
</style>