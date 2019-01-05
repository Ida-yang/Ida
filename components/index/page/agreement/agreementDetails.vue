<template>
    <!-- 合同详情页 -->
    <el-row class="content1" :gutter="10">
        <!-- <p>合同详情页</p> -->
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card" v-model="agreementdetail">
                    <div slot="header" class="clearfix">
                        <span>{{agreementdetail.poolName}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()">收起</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>合同代码：<span>{{agreementdetail.contract_number}}</span></li>
                            <li>合同名称：<span>{{agreementdetail.contract_name}}</span></li>
                            <li>对应商机：<span>{{agreementdetail.opportunity_name}}</span></li>
                            <li>合同金额：<span>{{agreementdetail.amount}}</span></li>
                            <li>合同类型：<span>{{agreementdetail.contract_type}}</span></li>
                            <li>客户签约人：<span>{{agreementdetail.signatories}}</span></li>
                            <li>我方签约人：<span>{{agreementdetail.our_signatories}}</span></li>
                            <li>签约时间：<span>{{agreementdetail.start_date}}</span></li>
                            <li>到期时间：<span>{{agreementdetail.end_date}}</span></li>
                            <li>剩余天数：<span>{{agreementdetail.due_time}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="跟进记录" name="first">
                        <el-form class="agreementform" ref="agreementform" :model="agreementform">
                            <el-form-item prop="agreementContent">
                                <el-upload
                                class="upload-demo"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                        <div class="text" v-show="thisshow" style="height:150px;">
                            <ul>
                                <li>创建人：<span>{{agreementdetail.private_employee}}</span></li>
                                <li>创建人部门：<span>{{agreementdetail.private_employee}}</span></li>
                                <li>创建人机构：<span>{{agreementdetail.private_employee}}</span></li>
                                <li>创建时间：<span>{{agreementdetail.create_time}}</span></li>
                                <li>修改时间：<span>{{agreementdetail.update_time}}</span></li>
                                <!-- <li>修改人：<span>{{agreementdetail.signatories}}</span></li> -->
                            </ul>
                            <p>&nbsp;</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="回款计划" name="second">
                        <span style="text-align:center;">暂无计划</span>
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
                prop="poolName"
                label="公司名称">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.poolName}}
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
            clueDetails(){
                return store.state.clueDetailsList;
            }
        },
        data(){
            return {
                detailData:null,
                agreementform:{
                    agreementContent:'',
                },
                searchList:{
                    keyword:null,
                },
                agreementdetail:{
                    // name:'',
                },
                record:null,
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
                //加载详情页右侧表格
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'getContractAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                    console.log(_this.tableData)
                }).catch(function(err){
                    console.log(err);
                });
                //加载合同详情
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'getContractById.do?cId='+_this.$store.state.iscId+'&contractId='+this.detailData.id,
                }).then(function(res){
                    console.log(res.data)
                    _this.agreementdetail = res.data
                    // console.log(_this.agreementdetail)
                }).catch(function(err){
                    console.log(err);
                });
            },
            retract(){
                this.thisshow = !this.thisshow
            },
            getRow(index,row){
                console.log(row)
                this.$store.state.detailsData.submitData = {"id":row.contract_id}
                this.idArr.contractId = row.contract_id
                
                // this.detailData.contractId = row.contractId
                this.$options.methods.loadData.bind(this)(true);
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
                    url: _this.$store.state.defaultHttp+'customerTwo/getUserByClue.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
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
                    delItem.path === this.$route.fullPath && this.$router.push('/clue');
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
    .agreementform{
        height: auto;
        min-height: 200px;
        margin-bottom: 30px;
        position: relative;
    }
    .agreementform > .el-form-item:not(:first-child){
        float: left;
        margin-bottom: 5px;
    }
</style>
