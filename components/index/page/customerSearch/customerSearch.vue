<template>
    <!-- 客户搜索 -->
    <div>
        <div class="searchcontent" v-if="show">
        <div class="searchList" style="width:100%;">
            <span class="title">公司名称：</span>
            <el-input v-model="searchList.keyword" placeholder="公司名称" style="width:500px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
        </div>
        <!-- <br> -->
        <div class="searchList" style="width:100%;">
            <span class="title">成立时间：</span>
            <el-date-picker
                v-model="searchList.MinDate"
                align="right"
                type="date"
                style="width:250px;"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                placeholder="开始日期">
            </el-date-picker>
            <span class="title">至</span>
            <el-date-picker
                v-model="searchList.MaxDate"
                align="right"
                type="date"
                style="width:250px;"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                placeholder="结束日期">
            </el-date-picker>
        </div>
        <div class="searchList">
            <span class="title">行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</span>
            <el-select v-model="searchList.industryType" placeholder="行业" clearable class="filter-item">
                <el-option v-for="item in industryTypeList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">注册资金：</span>
            <el-select v-model="searchList.capital" placeholder="注册资金" clearable class="filter-item">
                <el-option v-for="item in capitalList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">企业规模：</span>
            <el-select v-model="searchList.enterpriseScale" placeholder="企业规模" clearable class="filter-item">
                <el-option v-for="item in enterpriseScaleList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">企业类型：</span>
            <el-select v-model="searchList.companyType" placeholder="企业类型" clearable class="filter-item">
                <el-option v-for="item in companyTypeList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">经营状态：</span>
            <el-select v-model="searchList.operatingState" placeholder="经营状态" clearable class="filter-item">
                <el-option v-for="item in operatingStateList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">融资状态：</span>
            <el-select v-model="searchList.financingState" placeholder="融资状态" clearable class="filter-item">
                <el-option v-for="item in financingStateList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">上市信息：</span>
            <el-select v-model="searchList.listed" placeholder="上市信息" clearable class="filter-item">
                <el-option v-for="item in listedList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">手机号码：</span>
            <el-select v-model="searchList.phone" placeholder="手机号码" clearable class="filter-item">
                <el-option v-for="item in phoneList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">固定电话：</span>
            <el-select v-model="searchList.telephone" placeholder="固定电话" clearable class="filter-item">
                <el-option v-for="item in telephoneList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">公司邮箱：</span>
            <el-select v-model="searchList.email" placeholder="公司邮箱" clearable class="filter-item">
                <el-option v-for="item in emailList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">公司网站：</span>
            <el-select v-model="searchList.website" placeholder="公司网站" clearable class="filter-item">
                <el-option v-for="item in websiteList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
        </div>
        <div class="searchList">
            <span class="title">关&nbsp;&nbsp;键&nbsp;&nbsp;字：</span>
            <el-input v-model="searchList.AddressKeyword" placeholder="地址" style="width:223px;"></el-input>
        </div>
        <div class="searchList">
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
            &nbsp;&nbsp;
            <el-button icon="el-icon-circle-close-outline" style="background:#20222a;color:#ffffff;" size="mini" @click="reset()">清空</el-button>
        </div>
        </div>
        <div class="dropdown" @click="showSearchList">
            <el-button class="icon" icon="el-icon-caret-top" size="mini" v-show="text">隐藏搜索列表</el-button>
            <el-button class="icon" icon="el-icon-caret-bottom" size="mini" v-show="!text">显示搜索列表</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="transfer()">转移至线索</el-button>
            <el-popover
            placement="bottom"
            width="100"
            trigger="click">
            <el-checkbox-group class="checklist" v-model="checklist">
                <!-- <el-checkbox class="checkone" @change="showList()" v-for="item in showcheck" :label="item.label" :key="item.index"></el-checkbox> -->
                <el-checkbox class="checkone" @change="showname()" label="公司名称"></el-checkbox>
                <el-checkbox class="checkone" @change="showaddr()" label="公司地址"></el-checkbox>
                <el-checkbox class="checkone" @change="showcap()" label="注册资金"></el-checkbox>
                <el-checkbox class="checkone" @change="showrepresent()" label="法人"></el-checkbox>
                <el-checkbox class="checkone" @change="showdate()" label="成立日期"></el-checkbox>
                <el-checkbox class="checkone" @change="showphone()" label="手机"></el-checkbox>
                <el-checkbox class="checkone" @change="showtel()" label="电话"></el-checkbox>
                <el-checkbox class="checkone" @change="showemile()" label="邮箱"></el-checkbox>
                <el-checkbox class="checkone" @change="showweb()" label="网站"></el-checkbox>
                <el-checkbox class="checkone" @change="showindustry()" label="行业"></el-checkbox>
                <el-checkbox class="checkone" @change="showScale()" label="企业规模"></el-checkbox>
            </el-checkbox-group>
            <!-- <el-button slot="reference" class="info-btn" type="mini">筛选列表</el-button> -->
            <el-button slot="reference" class="info-btn screen" icon="el-icon-more-outline" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            :default-sort = "{order: 'ascending'}"
            style="text-align:center"
            @selection-change="selectInfo">
            <el-table-column
            header-align="center"
            align="center"
            type="selection"
            width="45"
            scope.row.id
            @selection-change="selectInfo">
            </el-table-column>
            <el-table-column
                prop="name"
                v-if="showmingcheng"
                header-align="center"
                align="left"
                min-width="120"
                label="公司名称"
                sortable>
                <template slot-scope="scope">
                    <div class="hovercol" style="color:#0000FF;">
                        {{scope.row.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                v-if="showdizhi"
                header-align="center"
                align="left"
                label="公司地址"
                min-width="180"
                sortable>
            </el-table-column>
            <el-table-column
                prop="capital"
                v-if="showzijin"
                header-align="center"
                align="left"
                label="注册资金"
                width="110"
                sortable>
                <template slot-scope="scope">{{scope.row.capital}} 万元</template>
            </el-table-column>
            <el-table-column
                prop="representative"
                v-if="showfaren"
                header-align="center"
                align="left"
                label="法人" 
                width="80"               
                sortable>
            </el-table-column>
            <el-table-column
                prop="date"
                v-if="showriqi"
                header-align="center"
                align="left"
                label="成立日期"
                sortable
                width="120">
            </el-table-column>
            <el-table-column
                prop="coPhone"
                v-if="showshouji"
                header-align="center"
                align="left"
                label="手机"
                width="100"
                sortable>
            </el-table-column>
            <el-table-column
                prop="coTelephone"
                v-if="showdianhua"
                header-align="center"
                align="left"
                label="固话"
                width="90"
                sortable>
            </el-table-column>
            <el-table-column
                prop="coEmail"
                v-if="showyouxiang"
                header-align="center"
                align="left"
                label="邮箱"
                sortable>
            </el-table-column>
            <el-table-column
                prop="coWebsite"
                v-if="showwangzhan"
                header-align="center"
                align="left"
                label="网站"
                sortable>
            </el-table-column>
            <el-table-column
                prop="industryName"
                v-if="showhangye"
                header-align="center"
                align="left"
                label="行业"
                sortable>
            </el-table-column>
            <el-table-column
                prop="enterpriseScaleName"
                v-if="showguimo"
                header-align="center"
                align="left"
                label="企业规模"
                width="110"
                sortable>
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
        name:'customerSearch',
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
                industryTypeList:[{
                    id:null,
                    name:null
                }],
                capitalList:[{id:1,name:'100以内'},{id:2,name:'100-500万'},{id:3,name:'500-1000万'},{id:4,name:'1000-3000万'},{id:5,name:'3000-5000万'},{id:6,name:'5000万以上'}],
                enterpriseScaleList:[{
                    id:null,
                    name:null
                }],
                companyTypeList:[{
                    id:null,
                    name:null
                }],
                operatingStateList:[{
                    id:null,
                    name:null
                }],
                financingStateList:[{
                    id:null,
                    name:null
                }],
                listedList:[{
                    id:null,
                    name:null
                }],
                phoneList:[{id:'0',name:'全部'},{id:'1',name:'有'},{id:'2',name:'无'}],
                telephoneList:[{id:'0',name:'全部'},{id:'1',name:'有'},{id:'2',name:'无'}],
                emailList:[{id:'0',name:'全部'},{id:'1',name:'有'},{id:'2',name:'无'}],
                websiteList:[{id:'0',name:'全部'},{id:'1',name:'有'},{id:'2',name:'无'}],
                searchList:{
                    keyword:null,
                    industryType:null,
                    MinDate:null,
                    MaxDate:null,
                    capital:null,
                    enterpriseScale:null,
                    companyType:null,
                    operatingState:null,
                    financingState:null,
                    listed:null,
                    phone:null,
                    telephone:null,
                    email:null,
                    website:null,
                    AddressKeyword:null,
                    page:null,
                    limit:null,
                },
                searchListNew:{
                    keyword:null,
                    industryType:null,
                    MinDate:null,
                    MaxDate:null,
                    capital:null,
                    enterpriseScale:null,
                    companyType:null,
                    operatingState:null,
                    financingState:null,
                    listed:null,
                    phone:null,
                    telephone:null,
                    email:null,
                    website:null,
                    AddressKeyword:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },

                // showcheck:[{index:0,label:'公司名称'},{index:1,label:'公司地址'},{index:2,label:'注册资金'},{index:3,label:'法人'},{index:4,label:'成立日期'},{index:5,label:'手机'},{index:6,label:'固话'},{index:7,label:'邮箱'},{index:8,label:'网站'},{index:9,label:'行业'},{index:10,label:'企业规模'},],
                checklist:['公司名称','公司地址','注册资金','法人','成立日期','手机','电话','邮箱','网站','行业','企业规模',],
                // checklist:[],
                showmingcheng:true,
                showdizhi:true,
                showzijin:true,
                showfaren:true,
                showriqi:true,
                showshouji:true,
                showdianhua:true,
                showyouxiang:true,
                showwangzhan:true,
                showhangye:true,
                showguimo:true,
                show:true,
                text:true,
            }
        },
        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                let _this = this
            let qs =require('querystring')
            let pageInfo = {}
            pageInfo.page = this.page;
            pageInfo.limit = this.limit;
            // console.log(pageInfo)
            let industryTypeList = {} 
            industryTypeList.comboType = 'IndustryType'
            let enterpriseScaleList = {}   
            enterpriseScaleList.comboType = 'EnterpriseScale'
            let companyTypeList = {} 
            companyTypeList.comboType = 'CompanyType'
            let operatingStateList = {} 
            operatingStateList.comboType = 'OperatingState'
            let financingStateList = {} 
            financingStateList.comboType = 'FinancingState'
            let listedList = {} 
            listedList.comboType = 'Listed'
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    console.log(res.data)
                    _this.$store.state.customerList = res.data.rows
                    _this.$store.state.customerListnumber = res.data.total;
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(industryTypeList,),
                }).then(function(res){
                    // console.log(res.data)
                    _this.industryTypeList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(enterpriseScaleList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.enterpriseScaleList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(companyTypeList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.companyTypeList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(operatingStateList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.operatingStateList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(financingStateList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.financingStateList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(listedList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.listedList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
            },
            reloadTable() {
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.keyword = this.searchList.keyword;
                searchList.industryType = this.searchList.industryType;
                searchList.MinDate = this.searchList.MinDate;
                searchList.MaxDate = this.searchList.MaxDate;
                searchList.capital = this.searchList.capital;
                searchList.EnterpriseScale = this.searchList.enterpriseScale;
                searchList.companyType = this.searchList.companyType;
                searchList.operatingState = this.searchList.operatingState;
                searchList.financingState = this.searchList.financingState;
                searchList.listed = this.searchList.listed;
                searchList.phone = this.searchList.phone;
                searchList.telephone = this.searchList.telephone;
                searchList.email = this.searchList.email;
                searchList.website = this.searchList.website;
                searchList.AddressKeyword = this.searchList.AddressKeyword;
                searchList.page = this.page;
                searchList.limit = this.limit;
                console.log(searchList)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res)
                    _this.$store.state.customerList = res.data.rows
                    _this.$store.state.customerListnumber = res.data.total;
                }).catch(function(err){
                    console.log(err);
                });
            },
            selectInfo(val){
                this.multipleSelection = val;
                // console.log(val)
                let arr = val;
                let newArr = new Array()
                // console.log(arr)
                arr.forEach((item) => {
                    if(item.id != 0){
                        // console.log(item.id)
                        newArr.push(item.id)
                        // console.log(newArr)
                    }
                });
                // console.log(newArr)
                this.idArr.id = newArr;
                // console.log(this.idArr.id)
                
            },
            showSearchList(){
                this.show = !this.show;
                this.text = !this.text;
            },
            transfer(){
                let _this = this;
                let qs =require('querystring')
                // console.log(this.idArr)
                let idArr = [];
                idArr.id = this.idArr.id
                console.log(idArr.id)
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerOne/insert.do?cId='+_this.$store.state.iscId+"&pId="+_this.$store.state.ispId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    console.log(res)
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
            showList(){
                
            },
            showname(){
                this.showmingcheng = !this.showmingcheng
            },
            showaddr(){
                this.showdizhi = !this.showdizhi
            },
            showcap(){
                this.showzijin = !this.showzijin
            },
            showrepresent(){
                this.showfaren = !this.showfaren
            },
            showdate(){
                this.showriqi = !this.showriqi
            },
            showphone(){
                this.showshouji = !this.showshouji
            },
            showtel(){
                this.showdianhua = !this.showdianhua
            },
            showemile(){
                this.showyouxiang = !this.showyouxiang
            },
            showweb(){
                this.showwangzhan = !this.showwangzhan
            },
            showindustry(){
                this.showhangye = !this.showhangye
            },
            showScale(){
                this.showguimo = !this.showguimo
            },
            search() {
                this.$options.methods.reloadTable.bind(this)(true);
                // this.searchList.code = null;
                // this.searchList.name = null;
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
    .el-input {
        /* width: 260px; */
        width: 100%;
    }
    .hovercol:hover{
        color: #000;
    }
    .el-row{
        margin-bottom: 10px;
    }
    .searchList{
        /* width: 240px; */
        width: 31%;
        margin: 8px;
        /* float: left; */
    }
    .dropdown{
        width: 100%;
        height: 30px;
        /* font-size: 14px; */
        text-align: center;
        padding: 0;
        margin: 0 0 10px 0;
    }
    .icon{
        width: 100%;
        font-size: 14px;
        height: 30px;
        /* line-height: 20px; */
        /* color: #000; */
        border-left: 0;
        border-right: 0;
    }
    .title{
        font-size: 14px;
        color: #595959;
    }
    .searchcontent{
        width: 100%;
        height: 350px;
        padding-left: 20px;
        overflow-x: hidden; 
        overflow-y: auto;
    }
</style>
