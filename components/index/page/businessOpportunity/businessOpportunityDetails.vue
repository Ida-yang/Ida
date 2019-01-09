<template>
    <!-- 商机详情页 -->
    <el-row class="content1" :gutter="10">
        <!-- <p>商机详情页</p> -->
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card" v-model="opportunitydetail">
                    <div slot="header" class="clearfix">
                        <span>{{opportunitydetail[0].customerpool[0].name}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()">收起</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>姓名：<span>{{opportunitydetail[0].contacts[0].coName}}</span></li>
                            <li>手机：<span>{{opportunitydetail[0].contacts[0].phone}}</span></li>
                            <li>电话：<span>{{opportunitydetail[0].contacts[0].telephone}}</span></li>
                            <li>邮箱：<span>{{opportunitydetail[0].contacts[0].email}}</span></li>
                            <li>QQ：<span>{{opportunitydetail[0].contacts[0].qq}}</span></li>
                            <li>微信：<span>{{opportunitydetail[0].contacts[0].wechat}}</span></li>
                            <li>地址：<span>{{opportunitydetail[0].customerpool[0].address}}</span></li>
                            <li>性别：<span>{{opportunitydetail[0].contacts[0].sex}}</span></li>
                            <li>职务：<span>{{opportunitydetail[0].contacts[0].dentity}}</span></li>
                            <li>备注：<span>{{opportunitydetail[0].customerpool[0].remark}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            <div class="bottom1">
                <el-card class="box-card" v-model="opportunitydetail">
                    <div slot="header" class="clearfix">
                        <span>{{opportunitydetail[0].opportunity_name}}</span>
                        <el-button class="info-btn" size="mini" style="float:right;margin-left:10px;" @click="nextStep()" v-if="shownext">下一步</el-button>
                        <el-button class="info-btn" size="mini" style="float:right;margin-left:100px;" @click="endStep()">失败关闭</el-button>
                    </div>
                    <el-steps :active="active" finish-status="success" align-center style="padding:10px;">
                        <el-step v-for="item in stepList" :key="item.step_id" :title="item.step_name" :description="item.step_probability"></el-step>
                    </el-steps>
                </el-card>
            </div>
            <div class="bottom2">
                <el-card class="box-card" v-model="opportunitydetail">
                    <div slot="header" class="clearfix">
                        <span>基本信息</span>
                    </div>
                    <div class="text item" style="min-height:150px;">
                        <ul>
                            <li>创建人：<span>{{opportunitydetail[0].privateUser[0].private_employee}}</span></li>
                            <li>部门：<span>{{opportunitydetail[0].opportunity_id}}</span></li>
                            <li>机构：<span>{{opportunitydetail[0].opportunity_id}}</span></li>
                            <li>决策人：<span>{{opportunitydetail[0].contacts[0].coName}}</span></li>
                            <li>创建时间：<span>{{opportunitydetail[0].opportunity_time}}</span></li>
                            <!-- <li>签约时间：<span>{{opportunitydetail[0].opportunity_time}}</span></li> -->
                            <!-- <li>失败时间：<span>{{opportunitydetail[0].opportunity_time}}</span></li> -->
                            <li>预计成交金额：<span>{{opportunitydetail[0].opportunity_achievement}}</span></li>
                            <li>预计成交时间：<span>{{opportunitydetail[0].opportunity_deal}}</span></li>
                            <!-- <li>预计成交几率：<span>{{opportunitydetail[0].opportunityProgress.progress_probability}}</span></li> -->
                            <li>备注：<span>{{opportunitydetail[0].opportunity_remarks}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入标题" style="width:80%;"></el-input>
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()"></el-button>
            </div>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="opportunity_name"
                label="商机名称">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.opportunity_name}}
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
        <el-dialog
            title="添加商机阶段"
            :visible.sync="dialogVisible"
            width="30%">
            <!-- <span>这是一段信息</span> -->
            <el-form label-width="80px" :model="addstepList">
                <el-form-item label="商机阶段">
                    <el-input class="oppinput" v-model="addstepList.progress_name"></el-input>
                    <span class="protext">&nbsp;成功几率&nbsp;</span>
                    <el-input class="proinput" v-model="addstepList.progress_probability"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addStep()">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'businessOpportunityDetails',
        store,
        data(){
            return {
                detailData:null,
                searchList:{
                    keyword:null,
                },
                opportunitydetail:null,
                tableData: null,
                tableNumber:null,
                page:1,
                limit:20,
                thisshow:true,
                idArr:{
                    opportunity_id:null,
                },
                active: 0,
                stepList:null,
                addstepList:{
                    progress_id:null,
                    progress_name:null,
                    progress_probability:null,
                },
                dialogVisible:false,
                addstep:null,
                shownext:true,
            }
        },
        mounted(){
            this.loadData();
        },
        methods: {
            loadData() {
                this.detailData = this.$store.state.detailsData.submitData;
                this.idArr.opportunity_id = this.$store.state.detailsData.submitData.id
                // console.log(this.detailData)
                let _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                // console.log(this);
                //详情页联系人
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'opportunity/getopportunityById.do?cId='+_this.$store.state.iscId+'&opportunity_id='+_this.detailData.id,
                }).then(function(res){
                    console.log(res.data.map.success)
                    _this.opportunitydetail = res.data.map.success
                    _this.stepList = _this.opportunitydetail[0].addstep
                    _this.addstep = _this.opportunitydetail[0].opportunityProgress
                    // console.log(_this.addstep)
                    let addStep = _this.addstep
                    if(addStep == ''){
                        _this.active = 0;
                    }else{
                        for(var i = 0,length = addStep.length;i < length;i++){
                            // console.log(addStep[i].progress_name)
                            // console.log(i)
                            if(addStep[i].progress_name == '失败关闭'){
                                _this.active = i+6
                            }else{
                                _this.active = i+1
                            }
                        }
                    }
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    // console.log(res)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
            },
            addStep(){
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.progress_name = this.addstepList.progress_name
                data.progress_probability = this.addstepList.progress_probability
                // console.log(data)
                _this.$confirm('是否确认添加该商机阶段？一旦添加将不可修改', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method:'post',
                        url:_this.$store.state.defaultHttp+'insertStep.do?cId='+_this.$store.state.iscId+'&opportunity_id='+this.detailData.id,
                        data:qs.stringify(data)
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.code && res.data.code == '200'){
                            _this.$message({
                                message:'添加成功',
                                type:'success'
                            })
                        }else{
                            _this.$message({
                                message:res.data.msg,
                                type:'error'
                            })
                        }
                        // _this.dialogVisible = false
                        _this.addstepList.progress_name = ''
                        _this.addstepList.progress_probability = ''
                        _this.$options.methods.loadData.bind(_this)(true);
                    }).catch(function(err){
                        console.log(err)
                    });
                });
            },
            nextStep(){
                for(var i = 0,length = this.stepList.length;i < length;i++){
                    let _this = this;
                    let qs =require('querystring')
                    let data = {}
                    if(_this.active == i){
                        data.progress_name = this.stepList[i].step_name
                        data.progress_probability = this.stepList[i].step_probability
                        // console.log(data)
                        _this.$confirm('确认修改商机进度吗？一旦确定将不可撤回','提示',{
                            confirmButtonText:'确定',
                            cancelButtonText:'取消',
                        }).then(({value}) =>{
                            axios({
                                method:'post',
                                url:_this.$store.state.defaultHttp+ 'saveOpportunityProgress.do?cId='+_this.$store.state.iscId+'&oy_id='+_this.detailData.id,
                                data:qs.stringify(data),
                            }).then(function(res){
                                // console.log(res)
                                if(res.status && res.status == 200) {
                                    _this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    _this.active += 1
                                // _this.$options.methods.reloadTable.bind(_this)(true);
                                } else {
                                    _this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                }
                            }).catch(function(err){
                                console.log(err)
                            })
                        })
                    }
                }
            },
            endStep(){
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.progress_name = '失败关闭'
                data.progress_probability = '0%'
                _this.$confirm('确认关闭商机进度吗？一旦确定将不可撤回','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                }).then(({value}) =>{
                    axios({
                        method:'post',
                        url:_this.$store.state.defaultHttp+ 'saveOpportunityProgress.do?cId='+_this.$store.state.iscId+'&oy_id='+_this.detailData.id,
                        data:qs.stringify(data),
                    }).then(function(res){
                        // console.log(res)
                        if(res.status && res.status == 200) {
                            _this.$message({
                                message: '关闭成功',
                                type: 'success'
                            });
                            _this.active += 6
                            _this.shownext = !_this.shownext
                        // _this.$options.methods.reloadTable.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err)
                    })
                })
            },
            retract(){
                this.thisshow = !this.thisshow
            },
            getRow(index,row){
                console.log(row.opportunity_id)
                this.$store.state.detailsData.submitData = {"id":row.opportunity_id}
                this.idArr.opportunity_id = row.opportunity_id
                
                // this.detailData.opportunity_id = row.opportunity_id
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
                // console.log(searchList)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
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
                    delItem.path === this.$route.fullPath && this.$router.push('/businessOpportunity');
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
    .bottom1{
        height: auto;
        background-color: #fff;
        margin-top: 20px;
        /* padding: 5px 20px; */
    }
    .bottom2{
        height: 100%;
        background-color: #fff;
        margin-top: 20px;
        /* padding: 5px 20px; */
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
    .oppinput{
        width:50%;
        float:left;
    }
    .protext{
        font-size:12px;
        float:left;
    }
    .proinput{
        width:20%;
        float:left;
    }
</style>
