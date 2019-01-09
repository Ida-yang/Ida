<template>
    <div class="contentall">
        <div class="leftcontent">
            <el-tree
                node-key="deptid"
                highlight-current
                default-expand-all
                :data="datalist"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span><i class="el-icon-info">&nbsp;</i>{{ node.label }}</span>
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
            <div style="margin:0 0 15px 15px;">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <el-button class="btn" size="mini" @click="handleEdit()">修改</el-button>
            </div>
            <ul class="followrecord" v-for="item in roleList" :key="item.id">
                <li class="rolecontent">
                    ----<span>&nbsp;<i class="el-icon-bell">&nbsp;</i>{{item.name}} - 【{{item.deptname}}】</span>
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
        <el-dialog
            title="添加角色"
            :visible.sync="dialogVisible3"
            width="30%">
            <el-form ref="roleform" :model="roleform" label-width="80px">
                <el-form-item label="所属部门">
                    <el-input v-model="roleform.deptname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="roleform.name" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="线索" name="first">
                    <el-checkbox :indeterminate="checksomeclue" v-model="checkAllclue" @change="CheckAllclues">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in cluerole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="客户" name="second">
                    <el-checkbox :indeterminate="checksomecustomer" v-model="checkAllcustomer" @change="checkAllcustomers">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in customerole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="联系人" name="third">
                    <el-checkbox :indeterminate="checksomecontact" v-model="checkAllcontact" @change="CheckAllcontacts">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in contactrole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="商机" name="fourth">
                    <el-checkbox :indeterminate="checksomeopportunity" v-model="checkAllopportunity" @change="CheckAllopportunitys">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in opportunityrole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="合同" name="fifth">
                    <el-checkbox :indeterminate="checksomeagreement" v-model="checkAllagreement" @change="CheckAllagreements">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in agreementrole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="addrole()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改角色"
            :visible.sync="dialogVisible4"
            width="30%">
            <el-form ref="roleform" :model="roleform" label-width="80px">
                <el-form-item label="所属部门">
                    <el-input v-model="roleform.deptname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="roleform.name" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="线索" name="first">
                    <el-checkbox :indeterminate="checksomeclue" v-model="checkAllclue" @change="CheckAllclues">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in cluerole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="客户" name="second">
                    <el-checkbox :indeterminate="checksomecustomer" v-model="checkAllcustomer" @change="checkAllcustomers">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in customerole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="联系人" name="third">
                    <el-checkbox :indeterminate="checksomecontact" v-model="checkAllcontact" @change="CheckAllcontacts">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in contactrole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="商机" name="fourth">
                    <el-checkbox :indeterminate="checksomeopportunity" v-model="checkAllopportunity" @change="CheckAllopportunitys">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in opportunityrole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="合同" name="fifth">
                    <el-checkbox :indeterminate="checksomeagreement" v-model="checkAllagreement" @change="CheckAllagreements">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroles" @change="handleCheckedrole">
                        <el-checkbox v-for="item in agreementrole" :key="item.id" :label="item.id">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="updaterole()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    const roleOptions = [];

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
                roleform:{
                    deptid:null,
                    deptname:null,
                    name:null,
                    ids:[],
                },
                searchList:{
                    deptid:null,
                    parentid:null,
                },
                roleList:[],
                clickdata:null,
                dialogVisible:false,
                dialogVisible2:false,
                dialogVisible3:false,
                dialogVisible4:false,
                
                activeName: 'first',
                
                checkAllclue: false,
                checkAllcustomer: false,
                checkAllcontact: false,
                checkAllopportunity: false,
                checkAllagreement: false,
                
                checksomeclue: false,
                checksomecustomer:false,
                checksomecontact:false,
                checksomeopportunity:false,
                checksomeagreement:false,

                checkedroles: [],

                cluerole: null,
                customerole:null,
                contactrole:null,
                opportunityrole:null,
                agreementrole:null,
            }
        },
        mounted(){
            this.loadData()
            this.reloadData()
            this.getresource()
        },
        methods:{
            loadData(){
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
            reloadData(){
                let _this = this
                let qs = require('querystring')
                let searchInfo = {}
                searchInfo.deptid = this.searchList.deptid
                searchInfo.parentid = this.searchList.parentid
                // console.log(searchInfo)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'role/selectRole.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(searchInfo)
                }).then(function(res){
                    // console.log(res.data)
                    _this.roleList = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            getresource(){
                let _this = this
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'resource/getResources.do',
                }).then(function(res){
                    console.log(res.data)
                    _this.cluerole = res.data.name1
                    _this.customerole = res.data.name2
                    _this.contactrole = res.data.name3
                    _this.opportunityrole = res.data.name4
                    _this.agreementrole = res.data.name5
                    // console.log(_this.cluerole)
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleNodeClick(data){
                // console.log(data)
                this.searchList.deptid = data.deptid
                this.searchList.parentid = data.parentid
                // console.log(this.searchList)
                this.clickdata = data
                // console.log(this.clickdata)
                this.$options.methods.reloadData.bind(this)(true);
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
                    _this.$options.methods.loadData.bind(_this)(true);
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
                    _this.$options.methods.loadData.bind(_this)(true);
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
                            _this.$options.methods.loadData.bind(_this)(true);
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
            handleClick(tab, event){
                // console.log(tab, event);
            },
            handleAdd(){
                let _this = this
                // console.log(this.clickdata.next)
                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再添加角色',
                        type:'info'
                    })
                }else if(this.clickdata && this.clickdata.next == ''){
                    this.roleform.deptname = this.clickdata.deptname
                    this.dialogVisible3 = true
                }else{
                    _this.$message({
                        message:'该部门下还有部门，不可添加角色',
                        type:'error'
                    })
                }
            },
            addrole(){
                console.log(this.checkedroles)
            },
            handleEdit(){
                let _this = this
                // console.log(this.clickdata.next)
                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再修改角色',
                        type:'info'
                    })
                }else if(this.clickdata && this.clickdata.next == ''){
                    this.dialogVisible4 = true
                }else{
                    _this.$message({
                        message:'该部门下还有部门，不可修改角色',
                        type:'error'
                    })
                }
            },
            updaterole(){},
            CheckAllclues(val) {
                if(val == true){
                    for(var i = 0,length = this.cluerole.length; i < length; i++){
                        this.checkedroles.push(this.cluerole[i].id)
                    }
                }else{
                    this.checkedroles = []
                }
            },
            checkAllcustomers(val) {
                if(val == true){
                    for(var i = 0,length = this.customerole.length; i < length; i++){
                        this.checkedroles.push(this.customerole[i].id)
                    }
                }else{
                    this.checkedroles = []
                }
            },
            CheckAllcontacts(val) {
                if(val == true){
                    for(var i = 0,length = this.contactrole.length; i < length; i++){
                        this.checkedroles.push(this.contactrole[i].id)
                    }
                }else{
                    this.checkedroles = []
                }
            },
            CheckAllopportunitys(val) {
                if(val == true){
                    for(var i = 0,length = this.opportunityrole.length; i < length; i++){
                        this.checkedroles.push(this.opportunityrole[i].id)
                    }
                }else{
                    this.checkedroles = []
                }
            },
            CheckAllagreements(val) {
                if(val == true){
                    for(var i = 0,length = this.agreementole.length; i < length; i++){
                        this.checkedroles.push(this.agreementole[i].id)
                    }
                }else{
                    this.checkedroles = []
                }
            },
            handleCheckedrole(e) {
                console.log(e)
                let checkedCount = e.length;
                this.checkAllclue = checkedCount === this.cluerole.length;
                this.checksomeclue = checkedCount > 0 && checkedCount < this.cluerole.length;
            }
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
    .el-icon-info{
        font-size: 12px;
    }
</style>
