<template>
    <div class="contentall">
        <div class="roleleftcontent">
            <el-tree
                node-key="deptid"
                highlight-current
                default-expand-all
                :data="datalist"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
            </el-tree>
        </div>
        <div class="centercontent"></div>
        <div class="rolerightcontent">
            <div class="searchList" style="width:100%;">
                <el-input v-model="searchList.searchName" placeholder="活动名称" style="width:300px;"></el-input>
                &nbsp;&nbsp;
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
            </div>
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist">
                    <el-checkbox class="checkone" @change="showname()" label="活动名称"></el-checkbox>
                    <el-checkbox class="checkone" @change="showleader()" label="负责人"></el-checkbox>
                    <el-checkbox class="checkone" @change="showamount()" label="线索量"></el-checkbox>
                    <el-checkbox class="checkone" @change="showcreatetime()" label="创建时间"></el-checkbox>
                    <el-checkbox class="checkone" @change="showwebsite()" label="网址"></el-checkbox>
                    <el-checkbox class="checkone" @change="showcues()" label="来源"></el-checkbox>
                    <el-checkbox class="checkone" @change="showremark()" label="备注"></el-checkbox>
                </el-checkbox-group>
                <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
                </el-popover>
            </div>
            <el-table
                :data="tableData"
                :default-sort = "{prop:'id',order: 'descending'}"
                ref="multipleTable"
                border
                stripe
                style="width:100%;text-align:center"
                @selection-change="selectInfo"
                >
                <el-table-column
                    fixed
                    header-align="center"
                    align="center"
                    type="selection"
                    width="45"
                    scope.row.id
                    prop="id"
                    @selection-change="selectInfo"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="name"
                    fixed
                    v-if="showhuodong"
                    header-align="left"
                    align="left"
                    min-width="150"
                    label="活动名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_employee"
                    fixed
                    v-if="showfuzeren"
                    header-align="left"
                    align="left"
                    min-width="90"
                    label="负责人"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="clueNum"
                    v-if="showliang"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="线索量"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    v-if="showshijian"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="创建时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="url"
                    v-if="showwangzhi"
                    header-align="left"
                    align="left"
                    min-width="160"
                    label="网址"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    v-if="showlaiyuan"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="来源"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="remarks"
                    v-if="showbeizhu"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    fixed="right"
                    width="140"
                    header-align="left"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 50, 100, 500]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableNumber">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            title="添加活动"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                <el-form-item prop="resourceid" label="来源">
                    <el-select v-model="newform.resourceid" placeholder="请选择来源" style="width:80%;">
                        <el-option v-for="item in typeData" :key="item.id" :label="item.typeName" :value="item.id">{{item.typeName}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name" label="活动名称">
                    <el-input v-model="newform.name" placeholder="请输入活动名称" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item prop="remarks" label="备注">
                    <el-input v-model="newform.remarks" placeholder="请输入活动备注" style="width:80%;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="adduser()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改活动"
            :visible.sync="dialogVisible2"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="resourceid" label="来源">
                    <el-select v-model="newform.resourceid" placeholder="请选择来源" style="width:80%;">
                        <el-option v-for="item in typeData" :key="item.id" :label="item.typeName" :value="item.id">{{item.typeName}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name" label="活动名称">
                    <el-input v-model="newform.name" placeholder="请输入活动名称" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item prop="remarks" label="备注">
                    <el-input v-model="newform.remarks" placeholder="请输入活动备注" style="width:80%;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updateuser()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'socialMarketing',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.activityList;
            },
            tableNumber(){
               return store.state.activityListnumber;     
            },
        },
        data(){
            return {
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },
                newform:{
                    resourceid:null,
                    name:null,
                    remarks:null,
                    secondid:null,
                },
                searchList:{
                    searchName:null,
                    secondid:null,
                    resourceid:null,
                },
                checklist:['活动名称','负责人','线索量','创建时间','网址','来源','备注'],
                idArr:{
                    id:null,
                },
                typeData:null,
                roleList:null,
                clickdata:null,

                showhuodong:true,
                showfuzeren:true,
                showliang:true,
                showshijian:true,
                showwangzhi:true,
                showlaiyuan:true,
                showbumen:true,
                showzhiwei:true,
                showfuze:true,
                showzhuangtai:true,
                showlaiyuan:true,
                showbeizhu:true,

                page:1,
                limit:20,
                dialogVisible:false,
                dialogVisible2:false,
                rules: {
                    name : [{ required: true, message: '活动名称不能为空', trigger: 'blur' },],
                    resourceid : [{ required: true, message: '来源不能为空', trigger: 'blur' },],
                },
            }
        },
        beforeCreate(){
            let _this = this
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                // console.log(res.data.map.success)
                _this.datalist = res.data.map.success
            }).catch(function(err){
                console.log(err);
            });
        },
        mounted(){
            this.reloadTable()
        },
        methods:{
            reloadTable(){
                let _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                pageInfo.searchName = this.searchList.searchName
                pageInfo.secondid = this.searchList.secondid
                pageInfo.cuesid = this.searchList.cuesid
                let data = {}
                data.type = '客户来源'

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'activity/getActivity.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    console.log(res.data.map.success)
                    _this.$store.state.activityList = res.data.map.success
                    _this.$store.state.activityListnumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    // console.log(res.data.rows)
                    _this.typeData = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleNodeClick(data){
                console.log(data)
                this.searchList.secondid = data.deptid
                // console.log(this.searchList)
                this.clickdata = data
                // console.log(this.clickdata)
                this.newform.secondid = data.deptid
                this.$options.methods.reloadTable.bind(this)(true);
            },
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                });
                this.idArr.id = newArr;
                console.log(this.idArr.id)
                
            },
            //活动添加
            handleAdd(){
                let _this = this
                this.newform.resourceid = null
                this.newform.name = null
                this.newform.remarks = null
                console.log(this.newform)

                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再添加活动',
                        type:'info'
                    })
                }else{
                    this.dialogVisible = true
                }
            },
            //活动添加提交按钮
            adduser(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.resourceid = this.newform.resourceid
                data.name = this.newform.name
                data.remarks = this.newform.remarks
                data.secondid = this.newform.secondid
                console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.name){
                        _this.$message({
                            message: "活动名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.resourceid){
                        _this.$message({
                            message: "来源不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'activity/insertActivity.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加活动成功',
                            type:'success'
                        })
                        _this.dialogVisible = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                });
                // alert('添加成功')
            },
            //活动修改
            handleEdit(index,row){
                let _this = this
                console.log(row)
                this.newform.id = row.id
                this.newform.secondid = row.secondid
                this.newform.resourceid = row.resourceid
                this.newform.name = row.name
                this.newform.remarks = row.remarks
                this.dialogVisible2 = true
                console.log(this.newform)
            },
            //活动修改提交按钮
            updateuser(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.resourceid = this.newform.resourceid
                data.name = this.newform.name
                data.remarks = this.newform.remarks
                data.secondid = this.newform.secondid
                console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.name){
                        _this.$message({
                            message: "活动名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.resourceid){
                        _this.$message({
                            message: "来源不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'updatePrivate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改活动成功',
                            type:'success'
                        })
                        _this.dialogVisible2 = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            showname(){
                this.showhuodong = !this.showhuodong
            },
            showleader(){
                this.showfuzeren = !this.showfuzeren
            },
            showamount(){
                this.showliang = !this.showliang
            },
            showcreatetime(){
                this.showshijian = !this.showshijian
            },
            showwebsite(){
                this.showwangzhi = !this.showwangzhi
            },
            showcues(){
                this.showlaiyuan = !this.showlaiyuan
            },
            showremark(){
                this.showbeizhu = !this.showbeizhu
            },
            search() {
                this.$options.methods.reloadTable.bind(this)(true);
            },
            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
        }
    }
</script>
<style>
    .contentall{
        background-color: #ffffff;
        height: 100%;
    }
    .roleleftcontent{
        width: 20%;
        height: auto;
        float: left;
        box-sizing: border-box;
    }
    .el-tree{
        margin: 20px 0;
    }
    .centercontent{
        display: block;
        width: 1%;
        height: 100%;
        float: left;
        background-color: #f0f0f0;
    }
    .rolerightcontent{
        width: 79%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
</style>
