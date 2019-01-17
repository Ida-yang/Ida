<template>
    <!-- 客户搜索 -->
    <div>
        <div class="searchList" style="width:100%;">
            <el-radio-group v-model="searchList.label" style="margin-bottom:10px;">
                <span class="nameList">客户分类：</span>
                <el-radio :label="nullvalue" style="width:110px;" @change="search()">全部客户</el-radio>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" style="width:110px;" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <br>
            <el-radio-group v-model="searchList.keyType" style="margin-bottom:10px;">
                <span class="nameList">客户级别：</span>
                <el-radio :label="nullvalue" style="width:110px;" @change="search()">全部级别</el-radio>
                <el-radio v-for="item in labelData" :key="item.id" :label="item.id" style="width:110px;" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
            <br>
            <el-radio-group v-model="searchList.keyWord" style="margin-bottom:10px;">
                <span class="nameList">客户来源：</span>
                <el-radio :label="nullvalue" style="width:110px;" @change="search()">全部来源</el-radio>
                <el-radio v-for="item in typeData" :key="item.id" :label="item.id" style="width:110px;" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
            <br>
            <el-radio-group v-model="searchList.state" style="margin-bottom:10px;">
                <span class="nameList">客户状态：</span>
                <el-radio :label="nullvalue" style="width:110px;" @change="search()">全部状态</el-radio>
                <el-radio v-for="item in stateData" :key="item.id" :label="item.id" style="width:110px;" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
            <br>
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn info-btn" size="mini" @click="TocustomerPool()">转移至客户池</el-button>
            <el-popover
            placement="bottom"
            width="100"
            trigger="click">
            <el-checkbox-group class="checklist" v-model="checklist">
                <el-checkbox class="checkone" @change="showname()" label="公司名称"></el-checkbox>
                <el-checkbox class="checkone" @change="showcontactsname()" label="联系人"></el-checkbox>
                <el-checkbox class="checkone" @change="showtel()" label="电话"></el-checkbox>
                <el-checkbox class="checkone" @change="showphone()" label="手机"></el-checkbox>
                <el-checkbox class="checkone" @change="showtencent()" label="QQ"></el-checkbox>
                <el-checkbox class="checkone" @change="showcreatetime()" label="最新跟进时间"></el-checkbox>
                <el-checkbox class="checkone" @change="showcontent()" label="最新跟进记录"></el-checkbox>
                <el-checkbox class="checkone" @change="shownexttime()" label="下次跟进时间"></el-checkbox>
                <el-checkbox class="checkone" @change="showcharge()" label="负责人"></el-checkbox>
                <el-checkbox class="checkone" @change="showstate()" label="状态"></el-checkbox>
                <el-checkbox class="checkone" @change="showleval()" label="级别"></el-checkbox>
                <el-checkbox class="checkone" @change="showcues()" label="客户来源"></el-checkbox>
            </el-checkbox-group>
            <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            :default-sort = "{prop:'id',order: 'descending'}"
            style="width:100%;"
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
            @selection-change="selectInfo">
            </el-table-column>
            <el-table-column
                prop="pName"
                fixed
                v-if="showmingcheng"
                header-align="left"
                align="left"
                min-width="150"
                label="公司名称"
                sortable>
                <template slot-scope="scope">
                    <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                        {{scope.row.pName}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="contacts[0].coName"
                fixed
                v-if="showxingming"
                header-align="left"
                align="left"
                min-width="100"
                label="联系人"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contacts[0].telephone"
                v-if="showdianhua"
                header-align="left"
                align="left"
                label="电话"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contacts[0].phone"
                v-if="showshouji"
                header-align="left"
                align="left"
                label="手机"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contacts[0].qq"
                v-if="showqq"
                header-align="left"
                align="left"
                label="QQ"
                sortable>
            </el-table-column>
            <el-table-column
                prop="follow[0].createTime"
                v-if="showgenshi"
                header-align="left"
                align="left"
                min-width="130"
                label="最新跟进时间"
                sortable>
            </el-table-column>
            <el-table-column
                prop="follow[0].followContent"
                show-overflow-tooltip
                v-if="showgenlu"
                header-align="left"
                align="left"
                min-width="130"
                label="最新跟进记录"
                sortable>
            </el-table-column>
            <el-table-column
                prop="follow[0].contactTime"
                v-if="showgengshi"
                header-align="left"
                align="left"
                min-width="140"
                label="下次联系时间"
                sortable>
            </el-table-column>
            <el-table-column
                prop="privateUser[0].private_employee"
                v-if="showfuze"
                header-align="left"
                align="left"
                min-width="100"
                label="负责人"
                sortable>
            </el-table-column>
            <el-table-column
                prop="status"
                v-if="showzhuangtai"
                header-align="left"
                align="left"
                min-width="100"
                label="状态"
                sortable>
            </el-table-column>
            <el-table-column
                prop="levels"
                v-if="showjibie"
                header-align="left"
                align="left"
                min-width="100"
                label="级别"
                sortable>
            </el-table-column>
            <el-table-column
                prop="source"
                v-if="showlaiyuan"
                header-align="left"
                align="left"
                min-width="110"
                label="客户来源"
                sortable>
            </el-table-column>
            <el-table-column label="操作"
                fixed="right"
                width="80"
                header-align="left"
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
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'customer',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.customerList;
            },
            tableNumber(){
               return store.state.customerListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    label:null,
                    keyType:null,
                    state:null,
                    keyWord:null,
                },
                searchListNew:{
                    searchName:null,
                    label:null,
                    keyType:null,
                    state:null,
                    keyWord:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                pIdData:[
                    {label:'1',value:'我的客户'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'},],
                stateData:null,
                labelData:null,
                typeData:null,
                nullvalue:null,
                checklist:['公司名称','联系人','电话','手机','QQ','最新跟进时间','最新跟进记录','下次跟进时间','负责人','状态','级别','客户来源'],
                showxingming:true,
                showmingcheng:true,
                showdianhua:true,
                showshouji:true,
                showqq:true,
                showgenshi:true,
                showgenlu:true,
                showgengshi:true,
                showfuze:true,
                showzhuangtai:true,
                showjibie:true,
                showlaiyuan:true,
                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',
            }
        },
        beforeCreate(){
            let _this = this
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoByType.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                // console.log(res.data)
                _this.stateData = res.data.name2001
                _this.typeData = res.data.name3001
                _this.labelData = res.data.name4001
            }).catch(function(err){
                console.log(err);
            });
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
                if(this.searchList.label == 1 ){
                    searchList.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    searchList.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    searchList.deptid = _this.$store.state.insid
                }
                searchList.stateid = this.searchList.state //客户状态
                searchList.levelsid = this.searchList.keyType //客户级别
                searchList.customerStateid = this.searchList.keyWord //客户来源
                searchList.page = this.page;
                searchList.limit = this.limit;
                console.log(searchList)

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    console.log(res.data.map.success)
                    _this.$store.state.customerList = res.data.map.success
                    _this.$store.state.customerListnumber = res.data.count;
                }).catch(function(err){
                    console.log(err);
                });
            },
            selectInfo(val){
                this.multipleSelection = val;
                console.log(val)
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                });
                this.idArr.id = newArr;
                
            },
            openDetails(index,row){
                let detailsData = {};
                detailsData.submitData = {"id": row.id};
                this.$store.state.detailsData = detailsData;
                this.$router.push({ path: '/customerDetails' });
            },
            handleAdd(){
                let addOrUpdateData = {};
                // addOrUpdateData.title = "添加客户";
                addOrUpdateData.createForm = [
                    {"label":"客户来源","inputModel":"customerStateid","type":"select"},
                    {"label":"客户名称","inputModel":"poolName","type":"require"},
                    {"label":"客户级别","inputModel":"levelsid","type":"select"},
                    {"label":"联系人","inputModel":"contactsName"},
                    {"label":"电话","inputModel":"telphone","type":"number"},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"country","type":"select","placeholder":"请选择省"},
                    {"label":"","inputModel":"city","type":"select","placeholder":"请选择市"},
                    {"label":"","inputModel":"area","type":"select","placeholder":"请选择区"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark"}];
                addOrUpdateData.setForm = {
                    "customerStateid": '',
                    "poolName": '',
                    "levelsid": '',
                    "contactsName": '',
                    "telphone": '',
                    "phone": '',
                    "country":'',
                    "city":'',
                    "area":'',
                    "qq": '',
                    "sex": '',
                    "identity": '',
                    "address": '',
                    "remark": ''};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'customerpool/savePool.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/customeraddorupdate' });
            },
            handleEdit(index,row){
                console.log(row)
                let addOrUpdateData = {};
                // addOrUpdateData.title = "修改客户";
                addOrUpdateData.createForm = [
                    {"label":"客户来源","inputModel":"customerStateid","type":"select"},
                    {"label":"客户名称","inputModel":"poolName","type":"require"},
                    {"label":"客户级别","inputModel":"levelsid","type":"select"},
                    {"label":"联系人","inputModel":"contactsName"},
                    {"label":"电话","inputModel":"telphone","type":"number"},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"country","type":"select","placeholder":"请选择省"},
                    {"label":"","inputModel":"city","type":"select","placeholder":"请选择市"},
                    {"label":"","inputModel":"area","type":"select","placeholder":"请选择区"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark"}];
                addOrUpdateData.setForm = {
                    "customerStateid": row.source,
                    "customerState":row.sourceid,
                    "poolName": row.pName,
                    "levelsid": row.levels,
                    "levels": row.levelsid,
                    "contactsName": row.contacts[0].coName,
                    "telphone": row.contacts[0].telephone,
                    "phone": row.contacts[0].phone,
                    "country":row.country,
                    "city":row.city,
                    "area":row.area,
                    "qq": row.contacts[0].qq,
                    "sex": row.contacts[0].sex,
                    "identity": row.contacts[0].identity,
                    "address": row.address,
                    "remark": row.remark};
                addOrUpdateData.submitData = {"id": row.id,'csId':row.contacts[0].csId};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'customerpool/updatepool.do?cId='+this.$store.state.iscId,
                console.log(addOrUpdateData)
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/customeraddorupdate' });
            },
            TocustomerPool(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerpool/updateTo.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    // console.log(res)
                    if(res.status && res.status == 200) {
                        _this.$message({
                            message: '转移成功',
                            type: 'success'
                        });
                        _this.$options.methods.reloadTable.bind(_this)(true);
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
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerTwo/insert.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    // console.log(res)
                    if(res.status && res.status == 200) {
                        _this.$message({
                            message: '转换成功',
                            type: 'success'
                        });
                        _this.$options.methods.reloadTable.bind(_this)(true);
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
            showname(){
                this.showmingcheng = !this.showmingcheng
            },
            showcontactsname(){
                this.showxingming = !this.showxingming
            },
            showtel(){
                this.showdianhua = !this.showdianhua
            },
            showphone(){
                this.showshouji = !this.showshouji
            },
            showtencent(){
                this.showqq = !this.showqq
            },
            showcreatetime(){
                this.showgenshi = !this.showgenshi
            },
            showcontent(){
                this.showgenlu = !this.showgenlu
            },
            shownexttime(){
                this.showgengshi = !this.showgengshi
            },
            showcharge(){
                this.showfuze = !this.showfuze
            },
            showstate(){
                this.showzhuangtai = !this.showzhuangtai
            },
            showleval(){
                this.showjibie = !this.showjibie
            },
            showcues(){
                this.showlaiyuan = !this.showlaiyuan
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
    .el-table td, .el-table th {
        padding: 6px 0 !important;
        line-height: 30px;
    }
    .el-row{
        margin-bottom: 10px;
    }
</style>
