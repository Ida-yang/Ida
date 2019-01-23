<template>
    <!-- 方案 -->
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
                <el-input v-model="searchList.searchName" placeholder="方案名称" style="width:300px;"></el-input>
                &nbsp;&nbsp;
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
            </div>
            <div class="entry">
                <el-button class="btn" size="mini" @click="handledeletes()">删除</el-button>
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist">
                    <el-checkbox class="checkone" @change="showname()" label="方案名称"></el-checkbox>
                    <el-checkbox class="checkone" @change="showyear()" label="年份"></el-checkbox>
                    <el-checkbox class="checkone" @change="showuser()" label="负责人"></el-checkbox>
                    <el-checkbox class="checkone" @change="showdept()" label="部门"></el-checkbox>
                    <el-checkbox class="checkone" @change="showins()" label="机构"></el-checkbox>
                    <el-checkbox class="checkone" @change="showtime()" label="创建时间"></el-checkbox>
                    <el-checkbox class="checkone" @change="showstate()" label="状态"></el-checkbox>
                </el-checkbox-group>
                <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
                </el-popover>
            </div>
            <el-table
                :data="tableData"
                :default-sort = "{prop:'private_id',order: 'descending'}"
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
                    scope.row.private_id
                    prop="private_id"
                    @selection-change="selectInfo"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_number"
                    fixed
                    v-if="showmingcheng"
                    header-align="left"
                    align="left"
                    min-width="150"
                    label="方案名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_employee"
                    fixed
                    v-if="shownianfen"
                    header-align="left"
                    align="left"
                    min-width="90"
                    label="年份"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="name"
                    v-if="showfuzeren"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="负责人"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_phone"
                    v-if="showbumen"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="部门"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_email"
                    v-if="showjigou"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="机构"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="deptname"
                    show-overflow-tooltip
                    v-if="showshijian"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="创建时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="parentname"
                    v-if="showzhuangtai"
                    header-align="left"
                    align="left"
                    min-width="180"
                    label="状态"
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
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handledelete(scope.$index, scope.row)">删除</el-button>
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
            title="添加方案"
            :visible.sync="dialogVisible"
            width="40%">
                <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                    <el-form-item prop="second_id" label="所属部门">
                        <el-input v-model="newform.secondname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="private_phone" label="手机号码">
                        <el-input type="number" v-model="newform.private_phone" placeholder="请输入方案手机号码"></el-input>
                    </el-form-item>
                    <el-form-item prop="private_password" label="密码">
                        <el-input type="password" v-model="newform.private_password" placeholder="请输入方案密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="private_passwords" label="确认密码">
                        <el-input type="password" v-model="newform.private_passwords" placeholder="请再次输入方案密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="role_id" label="角色">
                        <el-select v-model="newform.role_id" placeholder="请选择方案角色">
                            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="private_employee" label="方案名称">
                        <el-input v-model="newform.private_employee" placeholder="请输入方案名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="private_state" label="方案状态">
                        <el-radio v-model="newform.private_state" label="启用">启用</el-radio>
                        <el-radio v-model="newform.private_state" label="禁止">禁止</el-radio>
                    </el-form-item>
                    <el-form-item prop="private_email" label="邮箱">
                        <el-input type="email" v-model="newform.private_email" placeholder="请输入方案邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="private_QQ" label="QQ">
                        <el-input type="number" v-model="newform.private_QQ" placeholder="请输入方案QQ"></el-input>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addprogramme()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改方案"
            :visible.sync="dialogVisible2"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="second_id" label="所属部门">
                    <el-input v-model="newform.secondname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="private_phone" label="手机号码">
                    <el-input type="number" v-model="newform.private_phone" :disabled="true" placeholder="请输入方案手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="private_password" label="密码">
                    <el-input type="password" v-model="newform.private_password" placeholder="请输入方案密码"></el-input>
                </el-form-item>
                <el-form-item prop="private_passwords" label="确认密码">
                    <el-input type="password" v-model="newform.private_passwords" placeholder="请再次输入方案密码"></el-input>
                </el-form-item>
                <el-form-item prop="role_id" label="角色">
                    <el-select v-model="newform.role_id" placeholder="请选择方案角色">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="private_employee" label="方案名称">
                    <el-input v-model="newform.private_employee" placeholder="请输入方案名称"></el-input>
                </el-form-item>
                <el-form-item prop="private_state" label="方案状态">
                    <el-radio v-model="newform.private_state" label="启用">启用</el-radio>
                    <el-radio v-model="newform.private_state" label="禁止">禁止</el-radio>
                </el-form-item>
                <el-form-item prop="private_email" label="邮箱">
                    <el-input type="email" v-model="newform.private_email" placeholder="请输入方案邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="private_QQ" label="QQ">
                    <el-input type="number" v-model="newform.private_QQ" placeholder="请输入方案QQ"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updateprogramme()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'programme',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.programmeList;
            },
            tableNumber(){
               return store.state.programmeListnumber;     
            },
        },
        data(){
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.newform.private_password) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return {
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },
                newform:{
                    second_id:null,
                    secondname:null,
                    private_id:null,
                    role_id:null,
                    private_phone:null,
                    private_password:null,
                    private_passwords:null,
                    private_employee:null,
                    private_state:'启用',
                    private_email:null,
                    private_QQ:null,
                },
                searchList:{
                    searchName:null,
                    deptid:null,
                },
                checklist:['方案名称','年份','负责人','部门','机构','创建时间','状态'],
                idArr:{
                    private_id:null,
                },
                roleList:null,
                clickdata:null,
                showmingcheng:true,
                shownianfen:true,
                showfuzeren:true,
                showbumen:true,
                showjigou:true,
                showshijian:true,
                showzhuangtai:true,
                showfuze:true,
                showzhuangtai:true,
                showlaiyuan:true,
                page:1,
                limit:20,
                dialogVisible:false,
                dialogVisible2:false,
                rules: {
                    role_id : [{ required: true, message: '方案角色不能为空', trigger: 'blur' },],
                    private_employee : [{ required: true, message: '方案名称不能为空', trigger: 'blur' },],
                    private_phone : [{ required: true, max: 11, min: 11, message: '请输入11位手机号码', trigger: 'blur' }],
                    private_password : [{ required: true, message: '密码不能为空', trigger: 'blur' },],
                    private_passwords : [{ required: true, validator: validatePass, trigger: 'blur' },],
                    private_state : [{ required: true, message: '请选择方案状态', trigger: 'blur' },],
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
                pageInfo.deptid = this.searchList.deptid
                let data = {}
                data.deptid = this.searchList.deptid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPrivateUserAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    console.log(res.data.map.success)
                    _this.$store.state.programmeList = res.data.map.success
                    _this.$store.state.programmeListnumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'role/selectRole.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.roleList = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleNodeClick(data){
                // console.log(data)
                this.searchList.deptid = data.deptid
                // console.log(this.searchList)
                this.clickdata = data
                // console.log(this.clickdata)
                this.newform.second_id = data.deptid
                this.newform.secondname = data.deptname
                this.$options.methods.reloadTable.bind(this)(true);
            },
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.private_id != 0){
                        newArr.push(item.private_id)
                    }
                });
                // console.log(newArr)
                // var value = newArr.shift()
                this.idArr.private_id = newArr;
                console.log(this.idArr.private_id)
                
            },
            //方案添加
            handleAdd(){
                let _this = this
                // console.log(this.clickdata.next)
                this.newform.role_id = null
                this.newform.private_phone = null
                this.newform.private_password = null
                this.newform.private_passwords = null
                this.newform.private_employee = null
                this.newform.private_state = null
                this.newform.private_email = null
                this.newform.private_QQ = null

                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再添加方案',
                        type:'info'
                    })
                }else if(this.clickdata.next == ''){
                    this.dialogVisible = true
                }else{
                    _this.$message({
                        message:'该部门下还有子部门，请选择子部门',
                        type:'error'
                    })
                }
            },
            //方案添加提交按钮
            addprogramme(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.second_id = this.newform.second_id
                data.role_id = this.newform.role_id
                data.private_phone = this.newform.private_phone
                data.private_password = this.newform.private_password
                data.private_employee = this.newform.private_employee
                data.private_state = this.newform.private_state
                data.private_email = this.newform.private_email
                data.private_QQ = this.newform.private_QQ
                console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.private_state){
                        _this.$message({
                            message: "请选择方案状态",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_employee){
                        _this.$message({
                            message: "方案姓名不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.role_id){
                        _this.$message({
                            message: "方案角色不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.private_passwords !== item.private_password){
                        _this.$message({
                            message: "两次输入的密码不一致",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_passwords){
                        _this.$message({
                            message: "确认密码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_password){
                        _this.$message({
                            message: "方案密码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_phone){
                        _this.$message({
                            message: "方案手机号码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'insertPrivateUser.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加方案成功',
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
            //方案修改
            handleEdit(index,row){
                let _this = this
                console.log(row)
                let data = {}
                data.deptid = row.second_id
                this.newform.private_id = row.private_id
                this.newform.second_id = row.second_id
                this.newform.secondname = row.deptname
                this.newform.role_id = row.role_id
                this.newform.private_phone = row.private_phone
                this.newform.private_password = row.private_password
                this.newform.private_passwords = row.private_password
                this.newform.private_employee = row.private_employee
                this.newform.private_state = row.private_state
                this.newform.private_email = row.private_email
                this.newform.private_QQ = row.private_QQ
                this.dialogVisible2 = true
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'role/selectRole.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.roleList = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            //方案修改提交按钮
            updateprogramme(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.second_id = this.newform.second_id
                data.private_id = this.newform.private_id
                data.role_id = this.newform.role_id
                data.private_phone = this.newform.private_phone
                data.private_password = this.newform.private_password
                data.private_employee = this.newform.private_employee
                data.private_state = this.newform.private_state
                data.private_email = this.newform.private_email
                data.private_QQ = this.newform.private_QQ
                console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.private_state){
                        _this.$message({
                            message: "请选择方案状态",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_employee){
                        _this.$message({
                            message: "方案姓名不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.role_id){
                        _this.$message({
                            message: "方案角色不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.private_passwords !== item.private_password){
                        _this.$message({
                            message: "两次输入的密码不一致",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_passwords){
                        _this.$message({
                            message: "确认密码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_password){
                        _this.$message({
                            message: "方案密码不能为空",
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
                            message:'修改方案成功',
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
            handledeletes(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.privateId = this.idArr.private_id
                console.log(idArr)
                _this.$confirm('确认删除到云服务器吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'tbPrivateToPublicUser.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        console.log(res.data)
                        if(res.data.code && res.data.code == 200) {
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
            handledelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.privateId = row.private_id
                console.log(idArr)
                _this.$confirm('确认删除 ['+ row.private_employee +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'tbPrivateToPublicUser.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        console.log(res)
                        if(res.data.code && res.data.code == 200) {
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
            showname(){
                this.showmingcheng = !this.showmingcheng
            },
            showyear(){
                this.shownianfen = !this.shownianfen
            },
            showuser(){
                this.showfuzeren = !this.showfuzeren
            },
            showdept(){
                this.showbumen = !this.showbumen
            },
            showins(){
                this.showjigou = !this.showjigou
            },
            showtime(){
                this.showshijian = !this.showshijian
            },
            showstate(){
                this.showzhuangtai = !this.showzhuangtai
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
