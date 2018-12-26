<template>
    <div class="content">
        <el-form :model="myForm" ref="myForm" class="myForm" :rules="rules">
            <!-- <h3>{{addOrUpdateData.title}}</h3> -->
            <el-form-item
                label-width="100px"
                v-for="item in addOrUpdateData.createForm"
                :label="item.label"
                :key="item.inputModel"
                :prop="item.inputModel">

                <el-input 
                    v-if="!item.type || item.type == 'input'"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off"
                    @keyup.enter.native="submit">
                </el-input>
                <el-input 
                    v-else-if="item.type && item.type == 'number'"
                    type="number"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-input 
                    v-else-if="item.type && item.type == 'require' && item.inputModel == 'poolName'"
                    :value="myForm[item.inputModel]"
                    @input="handleoninput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-input 
                    v-else-if="item.prop"
                    prop="item.prop"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-select 
                    v-else-if="item.type && item.type == 'select'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:30px;">
                    <el-option
                        v-for="o in item.options"
                        :key="o[item.okey]"
                        :label="o[item.olabel]"
                        :value="o[item.ovalue]">
                    </el-option>
                </el-select>
                <!-- <div v-else-if="item.type && item.type == 'radio' && item.inputModel == 'cues'">
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="0">大数据</el-radio>
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="1">手动新增</el-radio>
                </div> -->
                <div v-else-if="item.type && item.type == 'radio' && item.inputModel == 'sex'">
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="男">男</el-radio>
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="女">女</el-radio>
                </div>
                <div v-else-if="item.type && item.type == 'radio'">
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="是">是</el-radio>
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="否">否</el-radio>
                </div>
            </el-form-item>
            <div style="margin-left:60px;">
                <el-button class="searchbutton" @click="submit">立即提交</el-button>
                &nbsp;&nbsp;
                <el-button @click="closeTag">取消</el-button>
            </div>
        </el-form>
        <div class="line"></div>
        <div class="formlist">
            <el-table
                :data="tableData"
                border
                stripe
                :default-sort = "{order: 'ascending'}"
                max-height="580"
                style="text-align:center">
                <el-table-column
                    header-align="center"
                    align="center"
                    width="35">
                    <template slot-scope="scope">
                        <el-button style="width:15px;height:15px;padding:0;border-radius:50%;" @click="getRow(scope.$index,scope.row)">&nbsp;</el-button>
                        <!-- <el-radio :label="scope.row.id" @change.native="getRow(scope.$index,scope.row)"></el-radio> -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    header-align="center"
                    align="left"
                    min-width="80"
                    label="公司名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="address"
                    header-align="center"
                    align="left"
                    min-width="130"
                    label="公司地址"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="representative"
                    header-align="center"
                    align="left"
                    min-width="40"
                    label="法人"
                    sortable>
                </el-table-column>
            </el-table>
            <div class="block numberPage">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableNumber">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style>
    .content {
        width: 98%;
    }
    h3 {
        /* text-align: center; */
        margin: 20px 60px;
    }
    .myForm {
        width: 41%;;
        /* padding: 20px; */
        float: left;
    }
    .line{
        float: left;
        height: 95%;
        border-left: 1px solid #000;
        margin-right: 5px;
    }
    .formlist{
        width: 57%;
        height: auto;
        /* background-color: pink; */
        float: left;
    }
    
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        margin: 0;
    }
    /* .require.el-input::after {
        position: absolute;
        right: -15px;
        content: "*";
        color: #ee5722;
    } */
</style>

<script>
    import store from '../../../../store/store'
    import {pca,pcaa} from 'area-data'
    import {mapState} from 'vuex'
    import axios from 'axios'
    import bus from '../../bus';
    export default {
        name:'customeraddOrUpdate',
        computed:{  
        },
        props: {
            // addOrUpdateData: {
            //     title: "什么"
            // },
            // myForm: {
            //     type: Object,
            // }
        },
        data(){
            return {
                tableData:null,
                addOrUpdateData: {},
                myForm: {
                    poolName:null,
                    address:null,
                    contactsName:null,
                    telphone:null,
                    phone:null,
                    qq:null,
                    sex:null,
                    identity:null,
                    remark:null,
                },
                subData: {
                    poolName:null,
                    address:null,
                    contactsName:null,
                    telphone:null,
                    phone:null,
                    qq:null,
                    sex:null,
                    identity:null,
                    remark:null,
                },
                page: 1,//默认第一页
                limit: 15,//默认10条
                selectData: null,
                tableNumber: null,
                rules: {
                    poolName : [{ required: true, message: '公司名称不能为空', trigger: 'blur' },],
                    contactsName : [{ required: true, message: '联系人名称不能为空', trigger: 'blur' },],
                    // telphone : [{ required: true, message: '电话不能为空', trigger: 'blur' },{ type: 'number', message: '电话仅能输入数字', trigger: 'blur' },],
                    telphone : [{ required: true, message: '电话不能为空', trigger: 'blur' },],
                    // phone : [{ type: 'number', message: '手机仅能输入数字', trigger: 'blur' },],
                    // qq : [{ type: 'number', message: 'QQ仅能输入数字', trigger: 'blur' },],
                },
            }
        },
        mounted() {
            this.loadData();
            this.loadTable();
            // this.restaurants = this.loadData();
        },
        methods:{
            loadTable(){
                let _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page;
                pageInfo.limit = this.limit;
                // console.log(pageInfo)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    // console.log(res.data.rows)
                    _this.tableData = res.data.rows
                    _this.tableNumber = res.data.total;
                }).catch(function(err){
                    console.log(err);
                });
            },
            //加载或重载页面
            loadData() {
                this.addOrUpdateData = this.$store.state.addOrUpdateData;
                // console.log(this.addOrUpdateData)

                // 设置默认值
                let createForm = this.addOrUpdateData.createForm;
                let setForm = this.addOrUpdateData.setForm;
                if(setForm) {
                    createForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                            // let selectList = item.selectList;
                            // this.addOrUpdateData.createForm[index].options = selectList;
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    // console.log(this.myForm);
                    this.$emit('input', this.myForm);
                }
            },
            handleSelect(item) {
                console.log(item);
            },
            handleInput(val, key) {
                this.myForm[key] = val;
                // console.log(val)
                // this.$emit('input', { ...this.myForm });
            },
            handleoninput(val,key){
                let _this = this
                this.myForm[key] = val
                console.log(this.myForm[key])
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page;
                pageInfo.limit = this.limit;
                pageInfo.keyword = val;
                // console.log(pageInfo)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    // console.log(res.data.rows)
                    _this.tableData = res.data.rows
                    _this.tableNumber = res.data.total;
                }).catch(function(err){
                    console.log(err);
                });
            },
            //提交或修改
            submit() {
                let _this = this;
                let qs =require('querystring')
                let subData = {};
                if(_this.addOrUpdateData.submitData) {
                    subData.id = _this.addOrUpdateData.submitData.id;
                    subData.csId = _this.addOrUpdateData.submitData.csId;
                }
                let createForm = _this.addOrUpdateData.createForm;
                let flag = false;
                createForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel];
                    // console.log(_this.myForm)
                    if(item.inputModel == "contactsName" && !subData[item.inputModel]) {//联系人名称不能为空
                        _this.$message({
                            message: "联系人名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "poolName" && !subData[item.inputModel]) {//公司名称不能为空
                        _this.$message({
                            message: "公司名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "telphone" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "电话号码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return;
                // console.log(_this.myForm)
                console.log(subData)

                axios({
                    method: 'post',
                    url: _this.addOrUpdateData.submitURL,
                    data: qs.stringify(subData)
                }).then(function(res){
                    console.log(res)
                    if(res.data.code && res.data.code == "200") {
                        _this.$message({
                            message: '成功',
                            type: 'success'
                        });
                        _this.closeTag();
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
            //取消时返回上一个页面，若只有一个页面，则返回首页
            closeTag() {
                let tagsList = this.$store.state.tagsList;
                let index;
                tagsList.forEach((element, i) => {
                    if(element.name == this.$options.name) {
                        index = i;
                    }
                });
                const delItem = this.$store.state.tagsList.splice(index, 1)[0];
                const item = this.$store.state.tagsList[index] ? this.$store.state.tagsList[index] : this.$store.state.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push('/customer');
                }else{
                    this.$router.push('/welcome');
                }
            },
            //获取table的索引和行数据，当该行被点击时，将公司名称地址填充到表单（会刷新当前页面，之前填写的信息会被覆盖）
            getRow(index,row){
                // console.log(row.address)
                this.myForm.poolName = row.name
                this.myForm.address = row.address
                // this.addOrUpdateData.setForm.name = row.name
                // this.addOrUpdateData.setForm.address = row.address
                // this.$store.state.addOrUpdateData.setForm.poolName = row.name
                // this.$store.state.addOrUpdateData.setForm.address = row.address
                // this.$options.methods.loadData.bind(this)(true);
                // console.log(this.myForm);
            },
            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.loadTable.bind(_this)(true);
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.loadTable.bind(_this)(true);
            },
        }
        
    }
</script>
