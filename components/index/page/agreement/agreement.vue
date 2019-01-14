<template>
    <!-- 客户搜索 -->
    <div>
        <div class="searchList" style="width:100%;">
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn" size="mini" @click="handleDeletes()">删除</el-button>
            <el-button class="btn info-btn" size="mini" @click="Receivables()">收款</el-button>
            <el-popover
            placement="bottom"
            width="100"
            trigger="click">
            <el-checkbox-group class="checklist" v-model="checklist">
                <el-checkbox class="checkone" @change="shownumber()" label="合同编号"></el-checkbox>
                <el-checkbox class="checkone" @change="showname()" label="合同名称"></el-checkbox>
                <el-checkbox class="checkone" @change="showtype()" label="合同类型"></el-checkbox>
                <el-checkbox class="checkone" @change="showcustomer()" label="对应客户"></el-checkbox>
                <el-checkbox class="checkone" @change="showopportunity()" label="商机"></el-checkbox>
                <el-checkbox class="checkone" @change="showmoney()" label="合同金额"></el-checkbox>
                <el-checkbox class="checkone" @change="showstart()" label="合同开始日期"></el-checkbox>
                <el-checkbox class="checkone" @change="showExpire()" label="合同到期日期"></el-checkbox>
                <el-checkbox class="checkone" @change="showcusSigning()" label="客户签约人"></el-checkbox>
                <el-checkbox class="checkone" @change="showwoSigning()" label="我方签约人"></el-checkbox>
                <el-checkbox class="checkone" @change="showremark()" label="备注"></el-checkbox>
                <el-checkbox class="checkone" @change="showAlready()" label="已回款金额"></el-checkbox>
                <el-checkbox class="checkone" @change="showSurplus()" label="剩余款项金额"></el-checkbox>
            </el-checkbox-group>
            <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
            <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            :default-sort = "{prop:'contract_number',order: 'descending'}"
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
            scope.row.contract_id
            @selection-change="selectInfo">
            </el-table-column>
            <el-table-column
                prop="contract_number"
                fixed
                v-if="showbianhao"
                header-align="center"
                align="left"
                min-width="110"
                label="合同编号"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contract_name"
                fixed
                v-if="showmingcheng"
                header-align="center"
                align="left"
                min-width="150"
                label="合同名称"
                sortable>
                <template slot-scope="scope">
                    <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                        {{scope.row.contract_name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="contract_type"
                v-if="showleixing"
                header-align="center"
                align="left"
                min-width="110"
                label="合同类型"
                sortable>
            </el-table-column>
            <el-table-column
                prop="poolName"
                v-if="showkehu"
                header-align="center"
                align="left"
                min-width="180"
                label="对应客户"
                sortable>
            </el-table-column>
            <el-table-column
                prop="opportunity_id"
                v-if="showshangji"
                header-align="center"
                align="left"
                label="商机"
                sortable>
            </el-table-column>
            <el-table-column
                prop="amount"
                v-if="showjine"
                header-align="center"
                align="left"
                min-width="110"
                label="合同金额"
                sortable>
                <template slot-scope="scope">
                    <div>
                        {{scope.row.amount | rounding}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="start_date"
                v-if="showkaishi"
                header-align="center"
                align="left"
                min-width="130"
                label="合同开始日期"
                sortable>
            </el-table-column>
            <el-table-column
                prop="end_date"
                show-overflow-tooltip
                v-if="showdaoqi"
                header-align="center"
                align="left"
                min-width="130"
                label="合同到期日期"
                sortable>
            </el-table-column>
            <el-table-column
                prop="signatories"
                v-if="showkeqian"
                header-align="center"
                align="left"
                min-width="130"
                label="客户签约人"
                sortable>
            </el-table-column>
            <el-table-column
                prop="our_signatories"
                v-if="showwoqian"
                header-align="center"
                align="left"
                min-width="130"
                label="我方签约人"
                sortable>
            </el-table-column>
            <el-table-column
                prop="remarks"
                v-if="showbeizhu"
                header-align="center"
                align="left"
                label="备注"
                sortable>
            </el-table-column>
            <el-table-column
                prop="already"
                v-if="showyihui"
                header-align="center"
                align="left"
                min-width="130"
                label="已回款金额"
                sortable>
                <template slot-scope="scope">
                    <div>
                        {{scope.row.already | rounding}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="surplus"
                v-if="showshengyu"
                header-align="center"
                align="left"
                min-width="130"
                label="剩余款项金额"
                sortable>
                <template slot-scope="scope">
                    <div>
                        {{scope.row.surplus | rounding}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作"
                fixed="right"
                width="150"
                header-align="center"
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
        name:'agreement',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.agreementList;
            },
            tableNumber(){
               return store.state.agreementListnumber;     
            },
        },
        filters: {
            rounding (value) {
                return value.toFixed(2)
            }
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    pId:null,
                },
                searchListNew:{
                    searchName:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    ids:null,
                },
                checklist:['合同编号','合同名称','合同类型','对应客户','商机','合同金额','合同开始日期','合同到期日期','客户签约人','我方签约人','备注','已回款金额','剩余款项金额'],
                showbianhao:true,
                showmingcheng:true,
                showleixing:true,
                showkehu:true,
                showshangji:true,
                showjine:true,
                showkaishi:true,
                showdaoqi:true,
                showkeqian:true,
                showwoqian:true,
                showbeizhu:true,
                showyihui:true,
                showshengyu:true,
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
                searchList.searchName = this.searchList.searchName
                // searchList.pId = this.$store.state.ispId
                searchList.page = this.page
                searchList.limit = this.limit
                console.log(searchList)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractAll.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    console.log(res)
                    _this.$store.state.agreementList = res.data.map.success
                    _this.$store.state.agreementListnumber = res.data.count;
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
                    if(item.contract_id != 0){
                        // console.log(item.contract_id)
                        newArr.push(item.contract_id)
                    }
                });
                this.idArr.ids = newArr;
                
            },
            openDetails(index,row){
                let detailsData = {};
                detailsData.submitData = {"id": row.contract_id};
                this.$store.state.detailsData = detailsData;
                this.$router.push({ path: '/agreementDetails' });
            },
            handleDeletes(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = this.idArr.ids
                _this.$confirm('是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'delContract.do?cId='+_this.$store.state.iscId,
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
                                message: res.data,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                })
            },
            handleAdd(){
                let addOrUpdateData = {};
                // addOrUpdateData.title = "添加线索";
                addOrUpdateData.createForm = [
                    {"label":"合同类型","inputModel":"contract_type","type":"select","options":[
                        {"okey":'0',"olabel":"销售合同","ovalue":"销售合同"},
                        {"okey":'1',"olabel":"采购合同","ovalue":"采购合同"},
                        {"okey":'2',"olabel":"服务合同","ovalue":"服务合同"},
                        {"okey":'3',"olabel":"代理合同","ovalue":"代理合同"},
                        {"okey":'4',"olabel":"其他","ovalue":"其他"},
                    ]},
                    {"label":"合同编号","inputModel":"contract_number",},
                    {"label":"合同名称","inputModel":"contract_name",},
                    {"label":"客户","inputModel":"customerpool_id","type":"select"},
                    {"label":"对应商机","inputModel":"opportunity_id","type":"select"},
                    {"label":"合同金额","inputModel":"amount","type":"number"},
                    {"label":"开始时间","inputModel":"start_date","type":"date"},
                    {"label":"结束时间","inputModel":"end_date","type":"date"},
                    {"label":"客户签约人","inputModel":"signatories",},
                    {"label":"我方签约人","inputModel":"our_signatories",},
                    {"label":"备注","inputModel":"remarks"}];
                addOrUpdateData.setForm = {
                    "contract_type": '',
                    "contract_number": '',
                    "contract_name": '',
                    "customerpool_id": '',
                    "opportunity_id": '',
                    "amount": '',
                    "start_date": '',
                    "end_date": '',
                    "signatories": '',
                    "our_signatories": '',
                    "remarks": ''};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'insertContract.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/agreementaddorupdate' });
            },
            handleEdit(index,row){
                console.log(row)
                let addOrUpdateData = {};
                // addOrUpdateData.title = "修改线索";
                addOrUpdateData.createForm = [
                    {"label":"合同类型","inputModel":"contract_type","type":"select",},
                    {"label":"合同编号","inputModel":"contract_number","prop":"contract_number",},
                    {"label":"合同名称","inputModel":"contract_name",},
                    {"label":"客户","inputModel":"customerpool_id","type":"select"},
                    {"label":"对应商机","inputModel":"opportunity_id","type":"select"},
                    {"label":"合同金额","inputModel":"amount","type":"number"},
                    {"label":"开始时间","inputModel":"start_date","type":"date"},
                    {"label":"结束时间","inputModel":"end_date","type":"date"},
                    {"label":"客户签约人","inputModel":"signatories",},
                    {"label":"我方签约人","inputModel":"our_signatories",},
                    {"label":"备注","inputModel":"remarks"}];
                addOrUpdateData.setForm = {
                    "contract_type": row.contract_type,
                    "contract_number": row.contract_number,
                    "contract_name": row.contract_name,
                    "customerpool_id": row.poolName,
                    "opportunity_id": row.opportunity_id,
                    "amount": row.amount,
                    "start_date": row.start_date,
                    "end_date": row.end_date,
                    "signatories": row.signatories,
                    "our_signatories": row.our_signatories,
                    "remarks": row.remarks};
                addOrUpdateData.submitData = {"id": row.contract_id};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'updateContract.do?cId='+this.$store.state.iscId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/agreementaddorupdate' });
            },
            handleDelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = row.contract_id
                _this.$confirm('是否确认删除[' + row.contract_name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'delContract.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.status && res.status == 200) {
                            _this.$message({
                                message: '删除成功',
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
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.contract_name + ']'
                    });       
                });
            },
            Receivables(){
                // let _this = this;
                // let qs =require('querystring')
                // let idArr = [];
                // idArr.ids = this.idArr.ids
                // axios({
                //     method: 'post',
                //     url:  _this.$store.state.defaultHttp+ 'customerTwo/updateState.do?cId='+_this.$store.state.iscId,
                //     data:qs.stringify(idArr),
                // }).then(function(res){
                //     console.log(res)
                //     if(res.status && res.status == 200) {
                //         _this.$message({
                //             message: '转移成功',
                //             type: 'success'
                //         });
                //         _this.$options.methods.reloadTable.bind(_this)(true);
                //     } else {
                //         _this.$message({
                //             message: res.data,
                //             type: 'error'
                //         });
                //     }
                // }).catch(function(err){
                //     console.log(err);
                // });
            },
            shownumber(){
                this.showbianhao = !this.showbianhao
            },
            showname(){
                this.showmingcheng = !this.showmingcheng
            },
            showtype(){
                this.showleixing = !this.showleixing
            },
            showcustomer(){
                this.showkehu = !this.showkehu
            },
            showopportunity(){
                this.showshangji = !this.showshangji
            },
            showmoney(){
                this.showjine = !this.showjine
            },
            showstart(){
                this.showkaishi = !this.showkaishi
            },
            showExpire(){
                this.showdaoqi = !this.showdaoqi
            },
            showcusSigning(){
                this.showkeqian = !this.showkeqian
            },
            showwoSigning(){
                this.showwoqian = !this.showwoqian
            },
            showremark(){
                this.showbeizhu = !this.showbeizhu
            },
            showAlready(){
                this.showyihui = !this.showyihui
            },
            showSurplus(){
                this.showshengyu = !this.showshengyu
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
