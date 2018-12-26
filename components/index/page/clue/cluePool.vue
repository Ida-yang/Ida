<template>
    <!-- 客户搜索 -->
    <div>
        <div class="searchList" style="width:100%;">
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" style="background:#ff5722;color:#ffffff;" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="info-btn" size="mini" @click="handleDeletes()">删除</el-button>
            <el-button class="info-btn" size="mini" @click="handleReceives()">领取</el-button>
            <!-- <el-button class="btn" size="mini" @click="cluePool()">分配</el-button> -->
            <el-popover placement="bottom" width="100" v-model="visible2" trigger="click">
                <el-select v-model="userData.pId" placeholder="请选择用户">
                    <el-option
                        v-for="item in useroptions"
                        :key="item.private_id"
                        :label="item.private_employee"
                        :value="item.private_id">
                    </el-option>
                </el-select>
                <br><br><br>
                <div style="text-align: right; margin: 0">
                    <el-button type="text" @click="visible2 = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="handleDistribution()">确定</el-button>
                </div>
                <el-button slot="reference" class="btn" size="mini">分配</el-button>
            </el-popover>
            <el-popover placement="bottom" width="100" trigger="click">
            <el-checkbox-group class="checklist" v-model="checklist">
                <el-checkbox class="checkone" @change="showname()" label="公司名称"></el-checkbox>
                <el-checkbox class="checkone" @change="showcontactsname()" label="联系人"></el-checkbox>
                <el-checkbox class="checkone" @change="showtel()" label="电话"></el-checkbox>
                <el-checkbox class="checkone" @change="showphone()" label="手机"></el-checkbox>
                <el-checkbox class="checkone" @change="showtencent()" label="QQ"></el-checkbox>
                <el-checkbox class="checkone" @change="showcreatetime()" label="最新跟进时间"></el-checkbox>
                <el-checkbox class="checkone" @change="showcontent()" label="最新跟进记录"></el-checkbox>
                <el-checkbox class="checkone" @change="showcharge()" label="负责人"></el-checkbox>
                <el-checkbox class="checkone" @change="showstate()" label="状态"></el-checkbox>
                <el-checkbox class="checkone" @change="showcues()" label="来源"></el-checkbox>
            </el-checkbox-group>
            <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
            <el-button slot="reference" icon="el-icon-more" class="info-btn screen" size="mini"></el-button>
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
                prop="name"
                fixed
                v-if="showmingcheng"
                header-align="center"
                align="left"
                min-width="180"
                label="公司名称"
                sortable>
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column
                prop="contacts[0].coName"
                v-if="showxingming"
                header-align="center"
                align="left"
                label="联系人"
                min-width="100"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contacts[0].telephone"
                v-if="showdianhua"
                header-align="center"
                align="left"
                label="电话"
                width="100"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contacts[0].phone"
                v-if="showshouji"
                header-align="center"
                align="left"
                label="手机"
                width="100"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contacts[0].qq"
                v-if="showqq"
                header-align="center"
                align="left"
                label="QQ"
                min-width="80"
                sortable>
            </el-table-column>
            <el-table-column
                prop="follow[0].createTime"
                v-if="showgenshi"
                header-align="center"
                align="left"
                label="最新跟进时间"
                min-width="130"
                sortable>
            </el-table-column>
            <el-table-column
                prop="follow[0].followContent"
                v-if="showgenlu"
                show-overflow-tooltip
                header-align="center"
                align="left"
                label="最新跟进记录"
                min-width="130"
                sortable>
            </el-table-column>
            <el-table-column
                prop="privateUser[0].private_employee"
                v-if="showfuze"
                header-align="center"
                align="left"
                label="前负责人"
                min-width="110"
                sortable>
            </el-table-column>
            <el-table-column
                prop="state"
                v-if="showzhuangtai"
                header-align="center"
                align="left"
                min-width="80"
                label="状态"
                sortable>
            </el-table-column>
            <el-table-column
                prop="cues"
                v-if="showlaiyuan"
                header-align="center"
                align="left"
                label="线索来源"
                min-width="110"
                sortable>
            </el-table-column>
            <el-table-column 
                label="操作"
                fixed="right"
                width="150"
                header-align="center"
                align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleReceive(scope.$index, scope.row)">领取</el-button>
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
        name:'cluePool',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.cluePoolList;
            },
            tableNumber(){
               return store.state.cluePoolListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    page:null,
                    limit:null,
                },
                searchListNew:{
                    searchName:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                useroptions:null,
                userData:{
                    pId:null,
                },
                checklist:['公司名称','联系人','电话','手机','QQ','最新跟进时间','最新跟进记录','负责人','状态','来源'],
                showxingming:true,
                showmingcheng:true,
                showdianhua:true,
                showshouji:true,
                showqq:true,
                showgenshi:true,
                showgenlu:true,
                showfuze:true,
                showzhuangtai:true,
                showlaiyuan:true,
                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',
                visible2: false,
            }
        },
        mounted(){
            this.reloadTable()
        },
        beforeCreate(){
            let _this = this;
                let qs =require('querystring')
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'getNameAndId.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                // console.log(res.data)
                _this.useroptions = res.data
            }).catch(function(err){
                console.log(err);
            });
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
                    url: _this.$store.state.defaultHttp+'customerTwo/getCustomerOneByN.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res)
                    _this.$store.state.cluePoolList = res.data.map.success
                    _this.$store.state.cluePoolListnumber = res.data.count;
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
                        // newArr.shift(item.id)
                        console.log(newArr)
                    }
                });
                // console.log(newArr)
                this.idArr.id = newArr;
                // console.log(this.idArr.id)
                
            },
            handleDeletes(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                console.log(idArr)
                _this.$confirm('是否确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'customerTwo/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
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
                idArr.id = row.id
                _this.$confirm('是否确认删除[' + row.name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'customerTwo/delete.do?cId='+_this.$store.state.iscId,
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
                        message: '取消删除[' + row.name + ']'
                    });       
                });
            },
            handleReceives(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = this.idArr.id
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerTwo/receiveClue.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    // console.log(res)
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '领取成功',
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
            },
            handleReceive(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = row.id
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerTwo/receiveClue.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    // console.log(res)
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '领取成功',
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
            },
            handleDistribution(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = this.userData.pId
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerTwo/receiveClue.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    // console.log(res)
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '分配成功',
                            type: 'success'
                        });
                        _this.visible2 = false
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
