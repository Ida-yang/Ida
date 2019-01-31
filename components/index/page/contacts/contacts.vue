<template>
    <!-- 联系人列表 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.pId">
                <span class="nameList">联系人：</span>
                <el-radio v-for="item in contactData" :key="item.label" :label="item.pId" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList">
            <span class="nameList">联系人名称：</span>
            <el-input v-model="searchList.searchName" placeholder="联系人名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn info-btn" size="mini" @click="handleDeletes()">删除</el-button>
            <el-popover
            placement="bottom"
            width="100"
            trigger="click">
            <el-checkbox-group class="checklist" v-model="checklist">
                <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
            </el-checkbox-group>
            <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
            <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            :default-sort= "{prop:'csId',order: 'descending'}"
            border
            stripe
            style="width:100%;"
            @selection-change="selectInfo">
            <el-table-column
                fixed
                header-align="center"
                align="center"
                type="selection"
                width="45"
                scope.row.csId
                prop="csId"
                @selection-change="selectInfo">
            </el-table-column>
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column label="联系人"
                    prop="name"
                    fixed
                    v-if="item.prop == 'name' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    sortable>
                </el-table-column>
                <el-table-column label="公司名称"
                    prop="poolname"
                    fixed
                    v-else-if="item.prop == 'poolname' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="150"
                    sortable>
                </el-table-column>
                <el-table-column label="电话"
                    prop="telephone"
                    v-else-if="item.prop == 'telephone' && item.state == 1"
                    header-align="left"
                    align="left"
                    sortable>
                </el-table-column>
                <el-table-column label="手机"
                    prop="phone"
                    v-else-if="item.prop == 'phone' && item.state == 1"
                    header-align="left"
                    align="left"
                    sortable>
                </el-table-column>
                <el-table-column label="QQ"
                    prop="qq"
                    v-else-if="item.prop == 'qq' && item.state == 1"
                    header-align="left"
                    align="left"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="email"
                    v-else-if="item.prop == 'email' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="邮箱"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="wechat"
                    v-else-if="item.prop == 'wechat' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="微信"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="sex"
                    v-else-if="item.prop == 'sex' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="性别"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    v-else-if="item.prop == 'remarks' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="备注"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column label="最新跟进时间"
                    prop="follow[0].createTime"
                    v-else-if="item.prop == 'follow[0].createTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    sortable>
                </el-table-column>
                <el-table-column label="最新跟进记录"
                    prop="follow[0].followContent"
                    show-overflow-tooltip
                    v-else-if="item.prop == 'follow[0].followContent' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    sortable>
                </el-table-column>
                <el-table-column label="下次联系时间"
                    prop="follow[0].contactTime"
                    v-else-if="item.prop == 'follow[0].contactTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    sortable>
                </el-table-column>
                <el-table-column label="负责人"
                    prop="private_employee"
                    v-else-if="item.prop == 'private_employee' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="deptname"
                    v-if="item.prop == 'deptname' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="部门"
                    min-width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="parentname"
                    v-if="item.prop == 'parentname' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="机构"
                    min-width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="countryid"
                    v-else-if="item.prop == 'countryid' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    label="省-市-区"
                    sortable>
                    <template slot-scope="scope">{{scope.row.country}}-{{scope.row.city}}-{{scope.row.area}}</template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    v-if="item.prop == 'createTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="创建时间"
                    min-width="140"
                    sortable>
                </el-table-column>
            </div>
            <el-table-column label="操作"
                fixed="right"
                width="150"
                header-align="left"
                align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'contacts',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.contactsList;
            },
            tableNumber(){
               return store.state.contactsListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    pId:null,
                },
                searchListNew:{
                    searchName:null,
                    pId:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                contactData:[
                    {
                        pId:'',
                        label:'0',
                        value:'全部联系人'
                    },
                    {
                        pId:this.$store.state.ispId,
                        label:'1',
                        value:'我的联系人'
                    }
                ],
                filterList:null,
                checklist:null,
                
                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',
            }
        },
        activated(){
            this.reloadTable()
        },
        mounted(){
            this.reloadTable()
        },

        methods: {
            reloadTable() {
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.searchName;
                searchList.pId = this.searchList.pId
                searchList.page = this.page;
                searchList.limit = this.limit;
                // console.log(searchList)
                let filterList = {}
                filterList.type = '联系人'
                let data = {}
                data.type = '联系人'
                data.state = 1
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContactsAll.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.contactsList = res.data.map.success
                    _this.$store.state.contactsListnumber = res.data.count;
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getAllUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(filterList)
                }).then(function(res){
                    // console.log(res.data)
                    _this.filterList = res.data
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.checklist = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.csId != 0){
                        newArr.push(item.csId)
                    }
                });
                this.idArr.id = newArr;
                
            },
            openDetails(index,row){
                let detailsData = {};
                detailsData.submitData = {"id": row.id};
                this.$store.state.detailsData = detailsData;
                this.$router.push({ path: '/clueDetails' });
            },
            handleAdd(){
                let addOrUpdateData = {};
                addOrUpdateData.createForm = [
                    {"label":"联系人","inputModel":"name"},
                    {"label":"公司名称","inputModel":"poolName","type":"require"},
                    {"label":"电话","inputModel":"telephone","type":"number"},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"生日","inputModel":"birthday","type":"date"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"countryid","type":"select","placeholder":"请选择省"},
                    {"label":"","inputModel":"cityid","type":"select","placeholder":"请选择市"},
                    {"label":"","inputModel":"areaid","type":"select","placeholder":"请选择区"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark"}];
                addOrUpdateData.setForm = {
                    "name": '',
                    "poolName": '',
                    "telephone": '',
                    "phone": '',
                    "countryid":'',
                    "cityid":'',
                    "areaid":'',
                    "qq": '',
                    "sex": '',
                    "birthday":'',
                    "identity": '',
                    "address": '',
                    "remark": ''};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'insertContacts.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/contactsaddorupdate' });
            },
            handleEdit(index,row){
                // console.log(row)
                let addOrUpdateData = {};
                addOrUpdateData.createForm = [
                    {"label":"联系人","inputModel":"name"},
                    {"label":"客户名称","inputModel":"poolName","type":"require"},
                    {"label":"电话","inputModel":"telephone","type":"number"},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"生日","inputModel":"birthday","type":"date"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"countryid","type":"select"},
                    {"label":"","inputModel":"cityid","type":"select",},
                    {"label":"","inputModel":"areaid","type":"select"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark"}];
                addOrUpdateData.setForm = {
                    "name": row.name,
                    "poolName": row.poolname,
                    "telephone": row.telephone,
                    "phone": row.phone,
                    "countryid":row.country,
                    "country":row.countryid,
                    "cityid":row.city,
                    "city":row.cityid,
                    "areaid":row.area,
                    "area":row.areaid,
                    "qq": row.qq,
                    "sex": row.sex,
                    "birthday":row.birthday,
                    "identity": row.identity,
                    "address": row.address,
                    "remark": row.remark};
                addOrUpdateData.submitData = {"id": row.csId};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'updateContacts.do?cId='+this.$store.state.iscId,
                // console.log(addOrUpdateData)
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/contactsaddorupdate' });
            },
            handleDeletes(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                // console.log(idArr.id)
                _this.$confirm('是否确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'deleteContacts.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.success && res.data.success == true) {
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
            handleDelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = row.csId
                // console.log(idArr)
                _this.$confirm('是否确认删除[' + row.name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'deleteContacts.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.success && res.data.success == true) {
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
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.name + ']'
                    });       
                });
            },
            hangleChange(e,val){
                // console.log(e)
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.pageInfoId = val.pageInfoId
                if(e == true){
                    data.state = 1
                }else{
                    data.state = 0
                }

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'userPageInfo/updateUserPageByid.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data),
                }).then(function(res){
                    // console.log(res)
                    if(res.data && res.data =="success"){
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        console.log(err)
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            search() {
                this.$options.methods.reloadTable.bind(this)(true);
            },
            reset(){
                this.searchList = Object.assign({}, this.searchListNew);
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
        },
    }
</script>

<style>
    .el-row{
        margin-bottom: 10px;
    }
    
</style>
