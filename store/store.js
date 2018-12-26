﻿import Vue from 'vue'
import Vuex from 'vuex'
/*使用Vuex*/
Vue.use(Vuex)
/*配置全局数据*/
const state = {
  //配置访问地址
  defaultHttp: 'http://139.159.155.153:8080/yzcrm/', //线上服务器
  // defaultHttp:'http://192.168.1.105:8080/', //测试服务器

  //作者
  author:'Ida',
  //登录
  iscId:'',
  ispId:'',

  //标签页
  tagsList:[],
  


  //客户列表
  customerList:[],
  //客户列表总数
  customerListnumber: 0,
  //线索列表
  clueList:[],
  //线索列表总数
  clueListnumber:0,
  //线索详情列表
  clueDetailsList:[],
  //线索列表数据
  clueData:null,
  //添加或修改列表数据
  addOrUpdateData:null,
  //线索详情页列表
  detailsData:null,
  //线索池列表
  cluePoolList:[],
  //线索池列表总数
  cluePoolListnumber:0,
  //客户列表
  customerList:[],
  //客户列表总数
  customerListnumber:0,
  //客户池列表
  customerPoolList:[],
  //客户池列表总数
  customerPoolListnumber:0,
  //联系人列表
  contactsList:[],
  //联系人列表总数
  contactsListnumber:0,
  //合同列表
  agreementList:[],
  //合同列表总数
  agreementListnumber:0,
  //商机列表
  businessOpportunityList:[],
  //商机列表总数
  businessOpportunityListnumber:0,

}
/*配置全局函数*/
const mutations = {
  newAuthor(state,msg){
    state.author = msg;
  },
  iscId(state,msg){
    state.iscId = msg;
    localStorage.setItem('iscId',msg);
  },
  ispId(state,msg){
    state.ispId = msg;
    localStorage.setItem('ispId',msg);
  }

}

/*将store导出*/
const store = new Vuex.Store({
  state: state,
  mutations: mutations,
})

export default store;