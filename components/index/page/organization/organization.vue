<template>
    <div class="content1">
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
                    <span>{{ node.label }}</span>
                    <span class="showhover">
                        <el-button type="text" size="mini" icon="el-icon-circle-plus-outline" @click="handleAppend(node,data)">
                        </el-button>
                        <el-button type="text" size="mini" icon="el-icon-edit" @click="handleUpdate(node,data)">
                        </el-button>
                        <el-button type="text" size="mini" icon="el-icon-remove-outline" @click="deletedept(node,data)">
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <div class="rightcontent">
            <div class="entry">
                <!-- <el-button class="btn" size="mini" @click="handleDeletes()">删除</el-button> -->
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist">
                    <el-checkbox class="checkone" @change="shownumber()" label="编号"></el-checkbox>
                    <el-checkbox class="checkone" @change="showname()" label="员工"></el-checkbox>
                    <el-checkbox class="checkone" @change="showaccount()" label="登录账号"></el-checkbox>
                    <el-checkbox class="checkone" @change="showrole()" label="角色"></el-checkbox>
                    <el-checkbox class="checkone" @change="showphone()" label="手机号"></el-checkbox>
                    <el-checkbox class="checkone" @change="showemail()" label="邮箱"></el-checkbox>
                    <el-checkbox class="checkone" @change="showdepart()" label="部门"></el-checkbox>
                    <el-checkbox class="checkone" @change="showposition()" label="职位"></el-checkbox>
                </el-checkbox-group>
                <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
                </el-popover>
            </div>
            <el-table
                :data="tableData"
                :default-sort = "{prop:'private_number',order: 'descending'}"
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
                    @selection-change="selectInfo"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_number"
                    fixed
                    v-if="showbianhao"
                    header-align="center"
                    align="left"
                    min-width="100"
                    label="编号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_employee"
                    fixed
                    v-if="showmingcheng"
                    header-align="center"
                    align="left"
                    min-width="100"
                    label="员工"
                    sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.private_employee}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="private_username"
                    v-if="showzhanghao"
                    header-align="center"
                    align="left"
                    min-width="120"
                    label="登录账号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="name"
                    v-if="showjuese"
                    header-align="center"
                    align="left"
                    min-width="100"
                    label="角色"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_phone"
                    v-if="showshouji"
                    header-align="center"
                    align="left"
                    min-width="120"
                    label="手机号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_email"
                    v-if="showyouxiang"
                    header-align="center"
                    align="left"
                    min-width="130"
                    label="邮箱"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="deptname"
                    show-overflow-tooltip
                    v-if="showbumen"
                    header-align="center"
                    align="left"
                    min-width="100"
                    label="部门"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_name"
                    v-if="showzhiwei"
                    header-align="center"
                    align="left"
                    min-width="80"
                    label="职位"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    fixed="right"
                    width="80"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <!-- <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
            title="添加"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="newform" :model="newform" label-width="80px">
                <el-form-item label="机构部门">
                    <!-- <el-select v-model="newform.parentid" placeholder="请选择机构或部门"> -->
                        <el-cascader
                            v-model="newform.parentid"
                            :options="mechanismList"
                            change-on-select
                            :prop="props">
                        </el-cascader>
                        <!-- <el-option v-for="item in mechanismList" :key="item.deptid" :label="item.deptname" :value="item.deptid"></el-option> -->
                    <!-- </el-select> -->
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="newform.deptname"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="adddept()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改"
            :visible.sync="dialogVisible2"
            width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updatedept()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="添加用户"
            :visible.sync="dialogVisible3"
            width="30%">
            <el-form>
                <span>这是一段信息</span>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="adduser()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改用户"
            :visible.sync="dialogVisible4"
            width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
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
        name:'organization',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.userList;
            },
            tableNumber(){
               return store.state.userListnumber;     
            },
        },
        data(){
            return {
                msg:"组织机构",
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },
                checklist:['编号','员工','登录账号','角色','手机号','邮箱','部门','职位'],
                newform:{
                    parentid:null,
                    deptname:null,
                },
                mechanismList:null,
                props:{
                    value:'deptid',
                    label:'deptname',
                    children:'next',
                },
                showbianhao:true,
                showmingcheng:true,
                showzhanghao:true,
                showjuese:true,
                showshouji:true,
                showyouxiang:true,
                showbumen:true,
                showzhiwei:true,
                showfuze:true,
                showzhuangtai:true,
                showlaiyuan:true,
                page:1,
                limit:2,
                idArr:{
                    private_id:null,
                },
                dialogVisible:false,
                dialogVisible2:false,
                dialogVisible3:false,
                dialogVisible4:false,
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
                    _this.mechanismList = res.data.map.success
                    console.log(_this.mechanismList)
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPrivateUserAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data)
                    _this.$store.state.userList = res.data.map.success
                    _this.$store.state.userListnumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleNodeClick(e){
                // console.log(e)
            },
            //机构部门添加
            handleAppend(node,data){
                let _this = this;
                this.dialogVisible = true
            },
            //机构部门添加提交按钮
            adddept(){
                let _this = this;
                alert('添加成功')
            },
            //机构部门修改
            handleUpdate(node,data){
                let _this = this;
                this.dialogVisible2 = true
            },
            //机构部门修改提交按钮
            updatedept(){
                let _this = this;
                alert('修改成功')                
            },
            //机构部门删除提交按钮
            deletedept(){
                let _this = this;
                alert('删除成功')
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
                console.log(newArr)
                this.idArr.private_id = newArr;
                
            },
            //用户添加
            handleAdd(){
                let _this = this;
                this.dialogVisible3 = true
            },
            //用户添加提交按钮
            adduser(){
                let _this = this;
                alert('添加成功')
            },
            //用户修改
            handleEdit(index,row){
                let _this = this;
                this.dialogVisible4 = true
            },
            //用户修改提交按钮
            updateuser(){
                let _this = this;
                alert('修改成功')
            },
            shownumber(){
                this.showbianhao = !this.showbianhao
            },
            showname(){
                this.showmingcheng = !this.showmingcheng
            },
            showaccount(){
                this.showzhanghao = !this.showzhanghao
            },
            showrole(){
                this.showjuese = !this.showjuese
            },
            showphone(){
                this.showshouji = !this.showshouji
            },
            showemail(){
                this.showyouxiang = !this.showyouxiang
            },
            showdepart(){
                this.showbumen = !this.showbumen
            },
            showposition(){
                this.showzhiwei = !this.showzhiwei
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
    .leftcontent{
        width: 30%;
        height: auto;
        float: left;
        box-sizing: border-box;
    }
    .rightcontent{
        width: 70%;
        min-height: 700px;
        background-color: #f0f0f0;
        float: left;
        box-sizing: border-box;
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
    /* .showhover:hover{
        visibility: hidden;
    } */
</style>
