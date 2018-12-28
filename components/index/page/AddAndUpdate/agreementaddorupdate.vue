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
                <el-select 
                    v-else-if="item.type && item.type == 'select' && item.inputModel == 'customerpool_id'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @change="handleChange($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option
                        v-for="item in cusoptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-select 
                    v-else-if="item.type && item.type == 'select' && item.inputModel == 'opportunity_id'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option
                        v-for="item in oppoptions"
                        :key="item.opportunity_id"
                        :label="item.opportunity_name"
                        :value="item.opportunity_id">
                    </el-option>
                </el-select>
                <el-select 
                    v-else-if="item.type && item.type == 'select'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option
                        v-for="o in item.options"
                        :key="o.okey"
                        :label="o.olabel"
                        :value="o.ovalue">
                    </el-option>
                </el-select>
                <el-date-picker
                    v-else-if="item.type && item.type == 'date'"
                    v-model="myForm[item.inputModel]"
                    type="date"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    style="width:90%;" 
                    auto-complete="off">
                </el-date-picker>
                <div v-else-if="item.type && item.type == 'radio' && item.inputModel == 'sex'">
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="男">男</el-radio>
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="女">女</el-radio>
                </div>
                <div v-else-if="item.type && item.type == 'radio'">
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="是">是</el-radio>
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="否">否</el-radio>
                </div>
                <el-input 
                    v-else-if="item.prop"
                    prop="item.prop"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
            </el-form-item>
            <div style="margin-left:60px;">
                <el-button class="searchbutton" @click="submit">立即提交</el-button>
                &nbsp;&nbsp;
                <el-button @click="closeTag">取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<style>
    .content {
        width: 98%;
    }
    .myForm {
        width: 41%;;
        float: left;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        margin: 0;
    }
</style>

<script>
    import store from '../../../../store/store'
    import {pca,pcaa} from 'area-data'
    import {mapState} from 'vuex'
    import axios from 'axios'
    import bus from '../../bus';
    export default {
        name:'agreementaddOrUpdate',
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
                addOrUpdateData: {},
                myForm: {
                    contract_type:null,
                    contract_number:null,
                    contract_name:null,
                    customerpool_id:null,
                    opportunity_id:null,
                    amount:null,
                    start_date:null,
                    end_date:null,
                    signatories:null,
                    our_signatories:null,
                    remarks:null,
                },
                subData: {
                    contract_type:null,
                    contract_number:null,
                    contract_name:null,
                    customerpool_id:null,
                    opportunity_id:null,
                    amount:null,
                    start_date:null,
                    end_date:null,
                    signatories:null,
                    our_signatories:null,
                    remarks:null,
                },
                cusoptions:null,
                oppoptions:null,
                page: 1,//默认第一页
                limit: 15,//默认10条
                selectData: null,
                customerId:null,
                rules: {
                    our_signatories : [{ required: true, message: '我方签约人不能为空', trigger: 'blur' },],
                    signatories : [{ required: true, message: '客户签约人不能为空', trigger: 'blur' },],
                    end_date : [{ required: true, message: '合同结束时间不能为空', trigger: 'blur' },],
                    start_date : [{ required: true, message: '合同开始时间不能为空', trigger: 'blur' },],
                    amount : [{ required: true, message: '合同金额不能为空', trigger: 'blur' },],
                    customerpool_id : [{ required: true, message: '客户不能为空', trigger: 'blur' },],
                    contract_type : [{ required: true, message: '合同类型不能为空', trigger: 'blur' },],
                    contract_number : [{ required: true, message: '合同编号不能为空', trigger: 'blur' },],
                    contract_name : [{ required: true, message: '合同名称不能为空', trigger: 'blur' },],
                },
            }
        },
        beforeCreate(){
            let _this = this
            axios({
                method:'get',
                url: _this.$store.state.defaultHttp+'customerpool/getPool.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
            }).then(function(res){
                console.log(res.data)
                _this.cusoptions = res.data
            }).catch(function(err){
                console.log(err)
            });
        },
        mounted() {
            this.loadData();
            // this.restaurants = this.loadData();
        },
        methods:{
            //加载或重载页面
            loadData() {
                this.addOrUpdateData = this.$store.state.addOrUpdateData;
                this.oppoptions = this.$store.state.addOrUpdateData.customerpool_id
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
            handleInput(val, key) {
                this.myForm[key] = val;
                // console.log(val)
                // this.$emit('input', { ...this.myForm });
            },
            handleChange(val, key){
                console.log(val)
                this.myForm[key] = val
                this.customerId = val
                this.loadOpp()
            },
            loadOpp(){
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.customerpool_id = this.customerId
                axios({
                    method:'post',
                    url: _this.$store.state.defaultHttp+'opportunity/getOpportunityAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res.data)
                    _this.oppoptions = res.data
                }).catch(function(err){
                    console.log(err)
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
                    if(item.inputModel == "our_signatories" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "我方签约人不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "signatories" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "客户签约人不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "end_date" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "合同结束日期不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "start_date" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "合同开始日期不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "amount" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "合同金额不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "customerpool_id" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "客户不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contract_number" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "合同编号不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contract_type" && !subData[item.inputModel]) {//联系人名称不能为空
                        _this.$message({
                            message: "合同类型不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contract_name" && !subData[item.inputModel]) {//公司名称不能为空
                        _this.$message({
                            message: "合同名称不能为空",
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
                    if(res.status && res.status == "200") {
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
                    delItem.path === this.$route.fullPath && this.$router.push('/agreement');
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
        }
        
    }
</script>
