<template>
    <!-- 客户详情页 -->
    <el-row class="content1" :gutter="10">
        <!-- <p>客户详情页</p> -->
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card" v-model="customerdetail">
                    <div slot="header" class="clearfix">
                        <span>{{customerdetail[0].pName}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()">收起</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="TocustomerPool()">转移至客户池</el-button>
                        <!-- <el-button style="float:right;" class="info-btn" size="mini" @click="customerSwitching()">转移至客户</el-button> -->
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>姓名：<span>{{customerdetail[0].contacts[0].coName}}</span></li>
                            <li>手机：<span>{{customerdetail[0].phone}}</span></li>
                            <li>固话：<span>{{customerdetail[0].telephone}}</span></li>
                            <li>邮箱：<span>{{customerdetail[0].email}}</span></li>
                            <li>QQ：<span>{{customerdetail[0].qq}}</span></li>
                            <li>微信：<span>{{customerdetail[0].wechat}}</span></li>
                            <li>地址：<span>{{customerdetail[0].address}}</span></li>
                            <li>职务：<span>{{customerdetail[0].contacts[0].identity}}</span></li>
                            <li>性别：<span>{{customerdetail[0].contacts[0].sex}}</span></li>
                            <li>备注：<span>{{customerdetail[0].remark}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="跟进记录" name="first">
                        <el-form class="followform" :rules="rules" ref="followform" :model="followform">
                            <el-form-item prop="followContent">
                                <el-input type="textarea" placeholder="添加跟进内容" v-model="followform.followContent"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" style="width:300px;" prop="followType">
                                <el-select v-model="followform.followType" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in followTypes" :key="item.value" :value="item.label" :label="item.label"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系人" style="width:300px;" prop="contactsId">
                                <el-select v-model="followform.contactsId" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in contactList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="下次联系时间" style="width:300px;">
                                <el-date-picker
                                v-model="followform.contactTime"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间" style="width:200px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="状态" style="width:300px;margin-left:25px;" prop="state">
                                <el-select v-model="followform.state" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in stateList" :key="item.index" :label="item.state" :value="item.state"></el-option>
                                </el-select>
                            </el-form-item>
                            
                            <el-form-item label="快捷沟通" style="width:80%;">
                                <el-radio v-model="followform.followContent" v-for="item in fastcontactList" :key="item.communicationId" :label="item.content">{{item.name}}</el-radio>
                            </el-form-item>
                            <el-form-item>
                                <el-button style="float:right;" class="searchbutton" size="mini" @click="Submitfollowform">立即提交</el-button>
                            </el-form-item>
                        </el-form>
                        <ul class="followrecord" v-for="(item,index) in record" :key="item.followId">
                            <li class="recordicon">
                                <i class="el-icon-delete delico" @click="deletefollow(index)"></i>
                            </li>
                            <li class="verticalline"></li>
                            <li class="recordcontent">
                                <div>
                                    <p>{{item.createTime}}&nbsp;&nbsp;&nbsp;更新了一条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户联系人为：&nbsp;{{item.contacts[0].name}}
                                        &nbsp;&nbsp;&nbsp;<span>并约定下次联系时间：{{item.contactTime}}</span>
                                    </p>
                                    <p style="margin-top:15px;margin-bottom:15px;">{{item.followContent}}</p>
                                </div>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="联系人" name="second">
                        <el-table
                        :data="customerDetails"
                        border
                        stripe
                        style="width: 100%">
                            <el-table-column
                            prop="name"
                            header-align="center"
                            label="名称">
                            </el-table-column>
                            <el-table-column
                            prop="phone"
                            header-align="center"
                            label="手机">
                            </el-table-column>
                            <el-table-column
                            prop="telephone"
                            header-align="center"
                            label="固话">
                            </el-table-column>
                            <el-table-column
                            prop="email"
                            header-align="center"
                            label="邮箱">
                            </el-table-column>
                            <el-table-column
                            prop="qq"
                            header-align="center"
                            label="QQ">
                            </el-table-column>
                            <el-table-column
                            prop="wechat"
                            header-align="center"
                            label="微信">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            header-align="center"
                            label="地址">
                            </el-table-column>
                            <el-table-column
                            prop="identity"
                            header-align="center"
                            label="职务">
                            </el-table-column>
                            <el-table-column
                            prop="sex"
                            header-align="center"
                            label="性别">
                            </el-table-column>
                            <el-table-column
                            prop="status"
                            header-align="center"
                            label="是否在职">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            header-align="center"
                            label="备注">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <!-- <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:200px;"></el-input> -->
                <el-input  v-model="searchList.keyword" placeholder="请输入标题" style="width:80%;"></el-input>
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()"></el-button>
            </div>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="name"
                label="公司名称">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.name}}
                    </div>
                </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage number">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 30, 50, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next"
                :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'clueDetails',
        store,
        computed: {
            customerDetails(){
                return store.state.customerDetailsList;
            }
        },
        data(){
            return {
                detailData:null,
                followform:{
                    followType:'电话',
                    contactTime:'',
                    contactsId:'',
                    followContent:'',
                    state:'',
                },
                rules: {
                    followContent : [{ required: true, message: '请输入跟进内容', trigger: 'blur' },],
                    contactsId : [{ required: true, message: '请选择联系人', trigger: 'blur' },],
                    followType : [{ required: true, message: '请选择联系方式', trigger: 'blur' },],
                    // contactTime : [{ required: true, message: '请选择下次联系时间', trigger: 'blur' },],
                    
                },
                followTypes:[
                    {label:'电话',value:'1'},
                    {label:'微信',value:'2'},
                    {label:'QQ',value:'3'},
                    {label:'邮箱',value:'4'}
                ],
                stateList:[
                    {state:'初步了解',label:'1',value:'初步了解'},
                    {state:'拜访',label:'2',value:'拜访'},
                    {state:'商务',label:'3',value:'商务'},
                    {state:'合同',label:'4',value:'合同'},
                    {state:'失败',label:'5',value:'失败'},],
                searchList:{
                    keyword:null,
                },
                customerdetail:{
                    pName:'',
                },
                record:null,
                // 获取row的key值
                getRowKeys(row) {
                    if(row.id) {
                        return row.id;
                    } else if(row.functionId) {
                        return row.functionId;
                    } else {
                        return "";
                    }
                },
                fastcontactList:null,
                contactList:null,
                activeName2: 'first',
                tableData: null,
                tableNumber:null,
                page:1,
                limit:20,
                thisshow:true,
                idArr:{
                    id:null,
                },
            }
        },
        mounted(){
            this.loadData();
        },
        methods: {
            loadData() {
                this.detailData = this.$store.state.detailsData.submitData;
                this.idArr.id = this.$store.state.detailsData.submitData.id
                // console.log(this.detailData)
                let _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                // console.log(this);
                //详情页联系人
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolContacts.do?cId='+_this.$store.state.iscId+'&customeroneId='+this.detailData.id,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    console.log(res.data.map.success)
                    _this.$store.state.customerDetailsList = res.data.map.success
                    _this.contactList = res.data.map.success
                    _this.followform.contactsId = res.data.map.success[0].id
                }).catch(function(err){
                    console.log(err);
                });
                //加载快捷方式
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'getNameSelected.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    // console.log(res.data)
                    _this.fastcontactList = res.data
                }).catch(function(err){
                    console.log(err);
                });
                //加载详情页右侧表格
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolRight.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
                //加载跟进记录
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getFollowStaffAndpool.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id,
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.record = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
                //加载客户详情
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolById.do?cId='+_this.$store.state.iscId+'&id='+this.detailData.id,
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.customerdetail = res.data.map.success
                    // console.log(_this.customerdetail)
                }).catch(function(err){
                    console.log(err);
                });
            },
            retract(){
                this.thisshow = !this.thisshow
            },
            getRow(index,row){
                console.log(row.id)
                this.$store.state.detailsData.submitData = {"id":row.id}
                this.idArr.id = row.id
                
                // this.detailData.id = row.id
                this.$options.methods.loadData.bind(this)(true);
            },
            TocustomerPool(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                console.log(idArr)
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerpool/updateTo.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    // console.log(res)
                    if(res.status && res.status == 200) {
                        _this.$message({
                            message: '转入成功',
                            type: 'success'
                        });
                        _this.closeTag();
                    } else {
                        _this.$message({
                            message: res.data,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            customerSwitching(){
                // let _this = this;
                // let qs =require('querystring')
                // let idArr = [];
                // idArr.id = this.idArr.id
                // idArr.shift()
                // console.log(idArr)
                // axios({
                //     method: 'post',
                //     url:  _this.$store.state.defaultHttp+ 'customerTwo/insert.do?cId='+_this.$store.state.iscId+"&pId="+_this.$store.state.ispId,
                //     data:qs.stringify(idArr),
                // }).then(function(res){
                //     console.log(res)
                //     if(res.data && res.data == 'success') {
                //         _this.$message({
                //             message: '转换成功',
                //             type: 'success'
                //         });
                //     _this.closeTag();
                //     } else {
                //         _this.$message({
                //             message: res.data,
                //             type: 'error'
                //         });
                //     }
                // }).catch(function(err){
                //     console.log(err);
                // });
            },
            deletefollow(index){
                let _this = this
                let followData = {}
                followData.followId = this.record[index].followId
                // console.log(this.record[index].followId)
                let qs =require('querystring')
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'delFollow.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(followData)
                }).then(function(res){
                    // console.log(res)
                    if(res.data && res.data == '1' ) {
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.$store.state.detailsData.submitData = {"id":_this.detailData.id}
                        _this.$options.methods.loadData.bind(_this)(true);
                        
                    } else {
                        _this.$message({
                            message: res.data,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            search(){
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.keyword;
                searchList.page = this.page;
                searchList.limit = this.limit;
                console.log(searchList)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/getPoolRight.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
            },
            Submitfollowform(){
                let _this = this
                let data = {}
                data.followType = this.followform.followType
                data.contactTime = this.followform.contactTime
                data.followContent = this.followform.followContent;
                data.contactsId = this.followform.contactsId;
                data.state = this.followform.state;
                data.customerpool_id = this.detailData.id;
                console.log(data)

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'addFollow.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data,this),
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'success' ) {
                        _this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        _this.followform.contactTime = ''
                        _this.followform.followContent = ''
                        _this.$store.state.detailsData.submitData = {"id":_this.detailData.id}
                        _this.$options.methods.loadData.bind(_this)(true);
                        // _this.closeTag()
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            closeTag() {
                let tagsList = this.$store.state.tagsList;
                let index;
                tagsList.forEach((element, i) => {
                    if(element.name == this.$options.name) {
                        index = i;
                    }
                });
                const delItem = this.$store.state.tagsList.splice(index, 1)[0];
                const item = this.$store.state.tagsList[index] ? this.$store.state.tagsList[index] : this.$store.state.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push('/customer');
                }else{
                    this.$router.push('/welcome');
                }
            },
            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.loadData.bind(_this)();
            },
        },
    }
</script>

<style>
    .content1{
        background-color: #f7f7f7;
        min-height: 100%;
    }
    .number{
        padding: 0;
    }
    .right{
        height: auto;
        background-color: #fff;
        padding-bottom: 5px;
    }
    .top{
        height: auto;
        background-color: #fff;
    }
    .bottom{
        height: 100%;
        background-color: #fff;
        margin-top: 20px;
        padding: 5px 20px;
    }
    .el-card__body{
        padding: 0;
    }
    .text ul{
        padding-left: 30px;
        list-style: none;
    }
    .text ul li{
        float: left;
        font-size: 14px;
        margin: 5px;
    }
    .text ul li:not(:last-child){
        width: 31.5%;
    }
    .followform{
        height: auto;
        min-height: 200px;
        margin-bottom: 30px;
        position: relative;
    }
    .followform > .el-form-item:not(:first-child){
        float: left;
        margin-bottom: 5px;
    }
    .followrecord{
        clear: both;
        width: 100%;
        list-style: none;
        position: relative;
        /* background-color: pink; */
    }
    .followrecord li{
        float: left;
        font-size: 12px;
        margin-bottom: 10px;
        box-sizing:border-box; 
        -moz-box-sizing:border-box; /* Firefox */ 
        -webkit-box-sizing:border-box;
    }
    .followrecord .recordicon {
        float: left;
        position: absolute;
        /* right: 0; */
        width: 3%;
        /* height: auto; */
        height: 80px;
        /* height: 100px; */
        color: #ffffff;
        padding-top: 5px;
    }
    .verticalline{
        float: left;
        width: 3%;
        height: 19px;
        border-bottom: 1px solid #c2c4c9;
    }
    .followrecord .recordcontent{
        width:94%;
        line-height:20px;
        height: auto;
        /* min-height: 80px; */
        color: #000000;
        padding-top: 5px;
        padding-left: 10px;
        background-color: #f7f7f7;
        border-radius: 5px;
    }
    .delico{
        float: left;
        width:25px;
        height:25px;
        background-color:#ff8153;
        border: 1px solid #ffffff;
        border-radius:50%;
        line-height:25px;
        text-align:center;
    }
</style>
