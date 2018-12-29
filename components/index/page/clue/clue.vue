<template>
    <!-- 线索 -->
    <div>
        <div class="searchList" style="width:100%;">
            <el-radio-group v-model="searchList.pId" style="margin:5px 0;">
                <span class="nameList">分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.pId" style="width:110px;" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <br>
            <el-radio-group v-model="searchList.state" style="margin:5px 0;">
                <span class="nameList">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                <el-radio v-for="item in stateData" :key="item.label" :label="item.state" style="width:110px;" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <br>
            <el-radio-group v-model="searchList.type" style="margin:5px 0;">
                <span class="nameList">线索来源：</span>
                <el-radio v-for="item in typeData" :key="item.label" :label="item.type" style="width:110px;" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <br>
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()"></el-button>
        </div>
        <div class="entry">
            <!-- <el-button class="btn" size="mini" @click="handleDeletes()">删除</el-button> -->
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn info-btn" size="mini" @click="cluePool()">转移至线索池</el-button>
            <el-button class="btn info-btn" size="mini" @click="customerSwitching()">转移至客户</el-button>
            <el-popover
            placement="bottom"
            width="100"
            trigger="click">
            <el-checkbox-group class="checklist" v-model="checklist">
                <el-checkbox class="checkone" @change="showcontactsname()" label="联系人"></el-checkbox>
                <el-checkbox class="checkone" @change="showname()" label="公司名称"></el-checkbox>
                <el-checkbox class="checkone" @change="showtel()" label="电话"></el-checkbox>
                <el-checkbox class="checkone" @change="showphone()" label="手机"></el-checkbox>
                <el-checkbox class="checkone" @change="showtencent()" label="QQ"></el-checkbox>
                <el-checkbox class="checkone" @change="showcreatetime()" label="最新跟进时间"></el-checkbox>
                <el-checkbox class="checkone" @change="showcontent()" label="最新跟进记录"></el-checkbox>
                <el-checkbox class="checkone" @change="shownexttime()" label="下次跟进时间"></el-checkbox>
                <el-checkbox class="checkone" @change="showcharge()" label="负责人"></el-checkbox>
                <el-checkbox class="checkone" @change="showstate()" label="状态"></el-checkbox>
                <el-checkbox class="checkone" @change="showcues()" label="线索来源"></el-checkbox>
            </el-checkbox-group>
            <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
            <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            :default-sort = "{order: 'ascending'}"
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
            @selection-change="selectInfo">
            </el-table-column>
            <el-table-column
                prop="contacts[0].coName"
                fixed
                v-if="showxingming"
                header-align="center"
                align="left"
                min-width="100"
                label="联系人"
                sortable>
            </el-table-column>
            <el-table-column
                prop="name"
                fixed
                v-if="showmingcheng"
                header-align="center"
                align="left"
                min-width="150"
                label="公司名称"
                sortable>
                <template slot-scope="scope">
                    <div @click="openDetails(scope.$index, scope.row)">
                        {{scope.row.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="contacts[0].telephone"
                v-if="showdianhua"
                header-align="center"
                align="left"
                label="电话"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contacts[0].phone"
                v-if="showshouji"
                header-align="center"
                align="left"
                label="手机"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contacts[0].qq"
                v-if="showqq"
                header-align="center"
                align="left"
                label="QQ"
                sortable>
            </el-table-column>
            <el-table-column
                prop="follow[0].createTime"
                v-if="showgenshi"
                header-align="center"
                align="left"
                min-width="130"
                label="最新跟进时间"
                sortable>
            </el-table-column>
            <el-table-column
                prop="follow[0].followContent"
                show-overflow-tooltip
                v-if="showgenlu"
                header-align="center"
                align="left"
                min-width="130"
                label="最新跟进记录"
                sortable>
            </el-table-column>
            <el-table-column
                prop="follow[0].contactTime"
                v-if="showgengshi"
                header-align="center"
                align="left"
                min-width="140"
                label="下次联系时间"
                sortable>
            </el-table-column>
            <el-table-column
                prop="privateUser[0].private_employee"
                v-if="showfuze"
                header-align="center"
                align="left"
                min-width="100"
                label="负责人"
                sortable>
            </el-table-column>
            <el-table-column
                prop="state"
                v-if="showzhuangtai"
                header-align="center"
                align="left"
                label="状态"
                sortable>
            </el-table-column>
            <el-table-column
                prop="cues"
                v-if="showlaiyuan"
                header-align="center"
                align="left"
                min-width="110"
                label="线索来源"
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
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'clue',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.clueList;
            },
            tableNumber(){
               return store.state.clueListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    pId:null,
                    state:null,
                    type:null,
                },
                searchListNew:{
                    searchName:null,
                    pId:null,
                    state:null,
                    type:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                pIdData:[
                    {pId:null,label:'0',value:'全部线索'},
                    {pId:this.$store.state.ispId,label:'1',value:'我的线索'}],
                stateData:[
                    {state:'',label:'0',value:'全部状态'},
                    {state:'未联系',label:'1',value:'未联系'},
                    {state:'无效线索',label:'2',value:'无效线索'},
                    {state:'无需求线索',label:'3',value:'无需求线索'},
                    {state:'电话错误',label:'4',value:'电话错误'}],
                typeData:[
                    {type:'',label:'0',value:'全部来源'},
                    {type:'大数据转移',label:'1',value:'大数据转移'},
                    {type:'手动新增',label:'2',value:'手动新增'}],
                checklist:['联系人','公司名称','电话','手机','QQ','最新跟进时间','最新跟进记录','下次跟进时间','负责人','状态','线索来源'],
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
                showlaiyuan:true,
                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',
            }
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
                searchList.state = this.searchList.state
                searchList.type = this.searchList.type
                searchList.page = this.page;
                searchList.limit = this.limit;
                // console.log(searchList)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerTwo/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.clueList = res.data.map.success
                    _this.$store.state.clueListnumber = res.data.count;
                }).catch(function(err){
                    console.log(err);
                });
            },
            selectInfo(val){
                this.multipleSelection = val;
                // console.log(val)
                let arr = val;
                let newArr = [new Array()];
                // console.log(arr)
                arr.forEach((item) => {
                    if(item.id != 0){
                        // console.log(item.id)
                        newArr.push(item.id)
                        // console.log(newArr)
                    }
                });
                console.log(newArr)
                this.idArr.id = newArr;
                
            },
            openDetails(index,row){
                let detailsData = {};
                detailsData.submitData = {"id": row.id};
                // console.log(detailsData)
                this.$store.state.detailsData = detailsData;
                this.$router.push({ path: '/clueDetails' });
            },
            handleAdd(){
                let addOrUpdateData = {};
                // addOrUpdateData.title = "添加线索";
                addOrUpdateData.createForm = [
                    // {"label":"线索来源","inputModel":"cues","type":"radio"},
                    {"label":"公司名称","inputModel":"poolName","prop":"poolName","type":"require"},
                    {"label":"联系人","inputModel":"contactsName","prop":"contactsName"},
                    {"label":"电话","inputModel":"telphone","prop":"telphone","type":"number"},
                    {"label":"手机","inputModel":"phone","prop":"phone","type":"number"},
                    {"label":"QQ","inputModel":"qq","prop":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省","inputModel":"country","type":"select","prop":"country"},
                    {"label":"市","inputModel":"city","type":"select","prop":"city"},
                    {"label":"区","inputModel":"area","type":"select","prop":"area"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark"}];
                addOrUpdateData.setForm = {
                    // "cues": '',
                    "poolName": '',
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
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'customerTwo/saveClue.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/clueaddorupdate' });
            },
            handleEdit(index,row){
                console.log(row)
                let addOrUpdateData = {};
                // addOrUpdateData.title = "修改线索";
                addOrUpdateData.createForm = [
                    // {"label":"线索来源","inputModel":"cues","type":"radio"},
                    {"label":"客户名称","inputModel":"poolName","prop":"poolName","type":"require"},
                    {"label":"联系人","inputModel":"contactsName","prop":"contactsName"},
                    {"label":"电话","inputModel":"telphone","prop":"telphone","type":"number"},
                    {"label":"手机","inputModel":"phone","prop":"phone","type":"number"},
                    {"label":"QQ","inputModel":"qq","prop":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省","inputModel":"country","type":"select","prop":"country"},
                    {"label":"市","inputModel":"city","type":"select","prop":"city"},
                    {"label":"区","inputModel":"area","type":"select","prop":"area"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark"}];
                addOrUpdateData.setForm = {
                    // "cues": row.cues,
                    "poolName": row.name,
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
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'customerTwo/updateClue.do?cId='+this.$store.state.iscId,
                console.log(addOrUpdateData)
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/clueaddorupdate' });
            },
            cluePool(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                console.log(idArr)
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerTwo/updateState.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    // console.log(res)
                    if(res.status && res.status == 200) {
                        _this.$message({
                            message: '转入成功',
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
                idArr.id.shift()
                // console.log(idArr.id)
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerTwo/insert.do?cId='+_this.$store.state.iscId+"&pId="+_this.$store.state.ispId,
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
            showcontactsname(){
                this.showxingming = !this.showxingming
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
            showcues(){
                this.showlaiyuan = !this.showlaiyuan
            },
            showname(){
                this.showmingcheng = !this.showmingcheng
            },
            showphone(){
                this.showshouji = !this.showshouji
            },
            showtel(){
                this.showdianhua = !this.showdianhua
            },
            showopera(){
                this.showjingying = !this.showjingying
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
