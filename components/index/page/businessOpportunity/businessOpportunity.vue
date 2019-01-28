<template>
    <!-- 商机 -->
    <div>
        <div class="searchList" style="width:100%;">
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn" size="mini" @click="handleDeletes()">删除</el-button>
            <el-popover
            placement="bottom"
            width="100"
            trigger="click">
            <el-checkbox-group class="checklist" v-model="checklist">
                <el-checkbox class="checkone" @change="shownum()" label="商机编号"></el-checkbox>
                <el-checkbox class="checkone" @change="showname()" label="商机名称"></el-checkbox>
                <el-checkbox class="checkone" @change="showdate()" label="日期"></el-checkbox>
                <el-checkbox class="checkone" @change="showcustomer()" label="公司名称"></el-checkbox>
                <el-checkbox class="checkone" @change="showpeople()" label="客户决策人"></el-checkbox>
                <el-checkbox class="checkone" @change="showprogress()" label="商机进度"></el-checkbox>
                <el-checkbox class="checkone" @change="showprobability()" label="成功几率"></el-checkbox>
                <el-checkbox class="checkone" @change="showmoney()" label="预计成绩金额"></el-checkbox>
                <el-checkbox class="checkone" @change="showtime()" label="预计成交时间"></el-checkbox>
                <el-checkbox class="checkone" @change="showuser()" label="负责人"></el-checkbox>
                <el-checkbox class="checkone" @change="showdepartment()" label="部门"></el-checkbox>
                <el-checkbox class="checkone" @change="showmechanism()" label="机构"></el-checkbox>
                <el-checkbox class="checkone" @change="showremark()" label="备注"></el-checkbox>
            </el-checkbox-group>
            <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            :default-sort = "{prop:'opportunity_id',order: 'descending'}"
            style="width:100%;text-align:center"
            @selection-change="selectInfo"
            >
            <el-table-column
            fixed
            header-align="center"
            align="center"
            type="selection"
            width="45"
            scope.row.opportunity_id
            prop="opportunity_id"
            @selection-change="selectInfo">
            </el-table-column>
            <el-table-column
                prop="opportunity_number"
                fixed
                v-if="showbianhao"
                header-align="left"
                align="left"
                min-width="110"
                label="商机编号"
                sortable>
            </el-table-column>
            <el-table-column
                prop="opportunity_name"
                fixed
                v-if="showmingcheng"
                header-align="left"
                align="left"
                min-width="120"
                label="商机名称"
                sortable>
                <template slot-scope="scope">
                    <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                        {{scope.row.opportunity_name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="opportunity_time"
                v-if="showriqi"
                header-align="left"
                align="left"
                min-width="120"
                label="日期"
                sortable>
            </el-table-column>
            <el-table-column
                prop="customerpool[0].name"
                v-if="showkehu"
                header-align="left"
                align="left"
                min-width="180"
                label="公司名称"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contacts[0].coName"
                v-if="showren"
                header-align="left"
                align="left"
                min-width="115"
                label="客户决策人"
                sortable>
            </el-table-column>
            <el-table-column
                prop="opportunityProgress[0].progress_name"
                v-if="showjindu"
                header-align="left"
                align="left"
                min-width="110"
                label="商机进度"
                sortable>
            </el-table-column>
            <el-table-column
                prop="opportunityProgress[0].progress_probability"
                show-overflow-tooltip
                v-if="showjilv"
                header-align="left"
                align="left"
                min-width="110"
                label="成功几率"
                sortable>
            </el-table-column>
            <el-table-column
                prop="opportunity_achievement"
                v-if="showjine"
                header-align="left"
                align="left"
                min-width="140"
                label="预计成绩金额"
                sortable>
                <template slot-scope="scope">
                    <div>
                        {{scope.row.opportunity_achievement | rounding}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="opportunity_deal"
                v-if="showshijian"
                header-align="left"
                align="left"
                min-width="140"
                label="预计成交时间"
                sortable>
            </el-table-column>
            <el-table-column
                prop="private_employee"
                v-if="showyonghu"
                header-align="left"
                align="left"
                min-width="90"
                label="负责人"
                sortable>
            </el-table-column>
            <el-table-column
                prop="deptname"
                v-if="showbumen"
                header-align="left"
                align="left"
                min-width="80"
                label="部门"
                sortable>
            </el-table-column>
            <el-table-column
                prop="parentname"
                v-if="showjigou"
                header-align="left"
                align="left"
                min-width="200"
                label="机构"
                sortable>
            </el-table-column>
            <el-table-column
                prop="opportunity_remarks"
                v-if="showbeizhu"
                header-align="left"
                align="left"
                min-width="80"
                label="备注"
                sortable>
            </el-table-column>
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
        name:'businessOpportunity',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.businessOpportunityList;
            },
            tableNumber(){
               return store.state.businessOpportunityListnumber;     
            },
        },
        filters: {
            rounding (value) {
                // console.log(value)
                return value
            }
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                },
                searchListNew:{
                    searchName:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                checklist:['商机编号','商机名称','日期','公司名称','客户决策人','商机进度','成功几率','预计成绩金额','预计成交时间','负责人','部门','机构','备注'],
                showbianhao:true,
                showmingcheng:true,
                showriqi:true,
                showkehu:true,
                showren:true,
                showjindu:true,
                showjilv:true,
                showjine:true,
                showshijian:true,
                showyonghu:true,
                showbumen:true,
                showjigou:true,
                showbeizhu:true,
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
                searchList.page = this.page;
                searchList.limit = this.limit;
                // console.log(searchList)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    console.log(res.data.map.success)
                    _this.$store.state.businessOpportunityList = res.data.map.success
                    _this.$store.state.businessOpportunityListnumber = res.data.count;
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
                    if(item.opportunity_id != 0){
                        // console.log(item.id)
                        newArr.push(item.opportunity_id)
                        // console.log(newArr)
                    }
                });
                console.log(newArr)
                this.idArr.id = newArr;
                
            },
            openDetails(index,row){
                let detailsData = {};
                detailsData.submitData = {"id": row.opportunity_id};
                // console.log(detailsData)
                this.$store.state.detailsData = detailsData;
                this.$router.push({ path: '/businessOpportunityDetails' });
            },
            handleAdd(){
                let addOrUpdateData = {};
                // addOrUpdateData.title = "添加商机";
                addOrUpdateData.createForm = [
                    {"label":"商机编号","inputModel":"opportunity_number",},
                    {"label":"商机名称","inputModel":"opportunity_name"},
                    {"label":"公司名称","inputModel":"customerpool_id","type":"select"},
                    {"label":"客户决策人","inputModel":"contacts_id","type":"select"},
                    {"label":"预计成绩金额","inputModel":"opportunity_achievement","type":"number"},
                    {"label":"预计成交时间","inputModel":"opportunity_deal","type":"date"},
                    {"label":"负责人","inputModel":"user_id","disabled":true},
                    {"label":"备注","inputModel":"opportunity_remarks"}];
                addOrUpdateData.setForm = {
                    "opportunity_number": '',
                    "opportunity_name": '',
                    "customerpool_id": '',
                    "customerpool_name": '',
                    "contacts_id": '',
                    "contacts_name": '',
                    "opportunity_achievement":'',
                    "opportunity_deal":'',
                    "user_id":this.$store.state.user,
                    "opportunity_remarks": ''};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'opportunity/saveOrUpdate.do?cId='+this.$store.state.iscId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/Opportunityaddorupdate' });
            },
            handleEdit(index,row){
                console.log(row)
                let addOrUpdateData = {};
                // addOrUpdateData.title = "修改商机";
                addOrUpdateData.createForm = [
                    {"label":"商机编号","inputModel":"opportunity_number",},
                    {"label":"商机名称","inputModel":"opportunity_name"},
                    {"label":"公司名称","inputModel":"customerpool_id",},
                    {"label":"客户决策人","inputModel":"contacts_id",},
                    {"label":"预计成绩金额","inputModel":"opportunity_achievement","type":"number"},
                    {"label":"预计成交时间","inputModel":"opportunity_deal","type":"date"},
                    {"label":"负责人","inputModel":"user_id","disabled":true},
                    {"label":"备注","inputModel":"opportunity_remarks"}];
                addOrUpdateData.setForm = {
                    "opportunity_number": row.opportunity_number,
                    "opportunity_name": row.opportunity_name,
                    "customerpool_id": row.customerpool[0].name,
                    "customerpool_name": row.customerpool[0].id,
                    "contacts_id": row.contacts[0].coName,
                    "contacts_name": row.contacts[0].id,
                    "opportunity_achievement":row.opportunity_achievement,
                    "opportunity_deal":row.opportunity_deal,
                    "user_id":this.$store.state.user,
                    "opportunity_remarks": row.opportunity_remarks};
                addOrUpdateData.submitData = {"id":row.opportunity_id};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'opportunity/saveOrUpdate.do?cId='+this.$store.state.iscId,
                console.log(addOrUpdateData)
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/Opportunityaddorupdate' });
            },
            handleDeletes(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                console.log(idArr.id)
                _this.$confirm('是否确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'opportunity/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        console.log(res)
                        if(res.status && res.status == 200) {
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
                idArr.id = row.opportunity_id
                console.log(idArr)
                _this.$confirm('是否确认删除[' + row.opportunity_name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'opportunity/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        console.log(res)
                        if(res.status && res.status == 200) {
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
                        message: '取消删除[' + row.opportunity_name + ']'
                    });       
                });
            },
            shownum(){
                this.showbianhao = !this.showbianhao
            },
            showpeople(){
                this.showren = !this.showren
            },
            showprogress(){
                this.showjindu = !this.showjindu
            },
            showprobability(){
                this.showjilv = !this.showjilv
            },
            showmoney(){
                this.showjine = !this.showjine
            },
            showtime(){
                this.showshijian = !this.showshijian
            },
            showdepartment(){
                this.showbumen = !this.showbumen
            },
            showmechanism(){
                this.showjigou = !this.showjigou
            },
            showname(){
                this.showmingcheng = !this.showmingcheng
            },
            showcustomer(){
                this.showkehu = !this.showkehu
            },
            showdate(){
                this.showriqi = !this.showriqi
            },
            showremark(){
                this.showbeizhu = !this.showbeizhu
            },
            showuser(){
                this.showyonghu = !this.showyonghu
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
