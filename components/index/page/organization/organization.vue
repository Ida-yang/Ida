<template>
    <div class="contentall">
        <div class="leftcontent">
            <el-tree
                node-key="deptid"
                highlight-current
                default-expand-all
                :data="datalist"
                :props="defaultProps"
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span class="showhover">
                        <el-button type="text" size="mini" icon="el-icon-circle-plus-outline" @click="handleappend(data)">
                        </el-button>
                        <el-button type="text" size="mini" icon="el-icon-edit" @click="handleUpdate(data)">
                        </el-button>
                        <el-button type="text" size="mini" icon="el-icon-remove-outline" @click="deletedept(node,data)">
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <div class="centercontent"></div>
        <div class="rightcontent">
            <!-- <ul class="followrecord"> -->
            <ul class="followrecord" v-for="item in roleList" :key="item.id">
                <li class="rolecontent">
                    ----<span><i class="el-icon-bell"></i>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <el-dialog
            title="添加"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="newform" :model="newform" label-width="80px">
                <el-form-item label="上级部门">
                    <el-input v-model="newform.parentname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="newform.deptname" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="appenddept()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改"
            :visible.sync="dialogVisible2"
            width="30%">
            <el-form ref="newform" :model="newform" label-width="80px">
                <el-form-item label="上级部门">
                    <el-input v-model="newform.parentname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="newform.deptname" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updatedept()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'organization',
        store,
        data(){
            return {
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },
                newform:{
                    parentid:null,
                    parentname:null,
                    deptid:null,
                    deptname:null,
                },
                props:{
                    value:'deptid',
                    label:'deptname',
                    children:'next',
                },
                roleList:[],
                dialogVisible:false,
                dialogVisible2:false,
            }
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
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.datalist = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'role/query.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    console.log(res.data)
                    _this.roleList = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            //上级部门添加
            handleappend(data){
                let _this = this
                console.log(data)
                this.newform.parentname = data.deptname
                this.newform.parentid = data.deptid
                this.dialogVisible = true
            },
            //上级部门添加提交按钮
            appenddept(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.parentid = this.newform.parentid
                data.parentname = this.newform.parentname
                data.deptname = this.newform.deptname
                console.log(data)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'dept/insertDept.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res)
                    if(res.data.msg && res.data.msg == 'success'){
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
                    _this.dialogVisible = false
                    _this.$options.methods.reloadTable.bind(_this)(true);
                }).catch(function(err){
                    console.log(err);
                });
            },
            //上级部门修改
            handleUpdate(data){
                console.log(data)
                let _this = this;
                this.newform.parentname = data.parentname
                this.newform.deptid = data.deptid
                this.newform.deptname = data.deptname
                this.dialogVisible2 = true
            },
            //上级部门修改提交按钮
            updatedept(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.deptid = this.newform.deptid
                data.deptname = this.newform.deptname
                console.log(data)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'dept/updateDeptById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res)
                    if(res.data.msg && res.data.msg == 'success'){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                    _this.dialogVisible2 = false
                    _this.$options.methods.reloadTable.bind(_this)(true);
                }).catch(function(err){
                    console.log(err);
                });
            },
            //上级部门删除提交按钮
            deletedept(node,data){
                let _this = this;
                let qs =require('querystring')
                let idData = {}
                idData.deptid = data.deptid
                console.log(idData)
                _this.$confirm('是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'dept/deleteDeptById.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idData),
                    }).then(function(res){
                        console.log(res)
                        if(res.data.msg && res.data.msg == 'success') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                });
            },
        }
    }
</script>

<style>
    .contentall{
        background-color: #ffffff;
        height: 100%;
    }
    .leftcontent{
        width: 30%;
        height: auto;
        float: left;
        box-sizing: border-box;
    }
    .centercontent{
        display: block;
        width: 1%;
        height: 100%;
        float: left;
        background-color: #f0f0f0;
    }
    .rightcontent{
        width: 69%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
    .rolecontent{
        width:94%;
        line-height:20px;
        height: auto;
        color: #000000;
        padding-top: 5px;
        padding-left: 10px;
        border-radius: 5px;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .showhover{
        visibility: visible;
    }
    .showhover:focus{
        visibility: hidden;
    }
</style>
