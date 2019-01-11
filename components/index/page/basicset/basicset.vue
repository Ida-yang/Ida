<template>
    <div class="contentall">
        <div class="leftcontent">
        </div>
        <div class="centercontent"></div>
        <div class="rightcontent">
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist">
                    <el-checkbox class="checkone" @change="showsort()" label="顺序"></el-checkbox>
                    <el-checkbox class="checkone" @change="showname()" label="名称"></el-checkbox>
                    <el-checkbox class="checkone" @change="showremark()" label="备注"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
                </el-popover>
            </div>
            <el-table
                :data="tableData"
                :default-sort = "{order: 'descending'}"
                ref="multipleTable"
                border
                stripe
                style="width:100%;text-align:center"
                >
                <el-table-column
                    header-align="center"
                    align="center"
                    type="selection"
                    width="45"
                    scope.row.id
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="sort"
                    v-if="showshunxu"
                    header-align="center"
                    align="left"
                    min-width="150"
                    label="顺序"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    v-if="showmingcheng"
                    header-align="center"
                    align="left"
                    min-width="90"
                    label="名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="notes"
                    v-if="showbeizhu"
                    header-align="center"
                    align="left"
                    min-width="120"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="添加状态"
            :visible.sync="dialogVisible"
            width="40%">
                <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                    <el-form-item prop="typeName" label="状态名称">
                        <el-input v-model="newform.typeName" placeholder="请输入状态名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="notes" label="备注">
                        <el-input type="number" v-model="newform.notes" placeholder="请输入状态备注"></el-input>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="adduser()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改状态"
            :visible.sync="dialogVisible2"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="typeName" label="状态名称">
                    <el-input v-model="newform.typeName" placeholder="请输入状态名称"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input type="number" v-model="newform.notes" placeholder="请输入状态备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
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
        name:'user',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.stateList;
            },
        },
        data(){
            return {
                newform:{
                    typrName:null,
                    notes:null,
                },
                checklist:['顺序','名称','备注'],
                idArr:{
                    id:null,
                },
                showshunxu:true,
                showmingcheng:true,
                showbeizhu:true,
                dialogVisible:false,
                dialogVisible2:false,
                rules: {
                    typeName : [{ required: true, message: '状态名称不能为空', trigger: 'blur' },],
                },
            }
        },
        mounted(){
            this.reloadTable()
        },
        methods:{
            reloadTable(){
                let _this = this
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoByType?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.stateList = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
            },
            //状态添加
            handleAdd(){
                let _this = this
                this.newform.typeName = null
                this.newform.notes = null
            },
            //状态添加提交按钮
            adduser(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.typeName = this.newform.typeName
                data.notes = this.newform.notes
                console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.typeName){
                        _this.$message({
                            message: "状态姓名不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'insertPrivateUser.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加状态成功',
                            type:'success'
                        })
                        _this.dialogVisible = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                });
                // alert('添加成功')
            },
            //状态修改
            handleEdit(index,row){
                let _this = this
                console.log(row)
                this.newform.id = row.id
                this.newform.typeName = row.typeName
                this.newform.notes = row.notes
                this.dialogVisible2 = true
            },
            //状态修改提交按钮
            updateuser(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.typeName = this.newform.typeName
                data.notes = this.newform.notes
                console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.typeName){
                        _this.$message({
                            message: "状态姓名不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'updatePrivate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改状态成功',
                            type:'success'
                        })
                        _this.dialogVisible2 = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            handledelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.privateId = row.id
                console.log(idArr)
                _this.$confirm('确认删除 ['+ row.typeName +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'tbPrivateToPublicUser.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        console.log(res)
                        if(res.data.code && res.data.code == 200) {
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
            showsort(){
                this.showshunxu = !this.showshunxu
            },
            showname(){
                this.showmingcheng = !this.showmingcheng
            },
            showremark(){
                this.showbeizhu = !this.showbeizhu
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
        }
    }
</script>
<style>
    .contentall{
        background-color: #ffffff;
        height: 100%;
    }
    .leftcontent{
        width: 30%;
        height: auto;
        margin-top:30px;
        float: left;
        box-sizing: border-box;
    }
    .centercontent{
        display: block;
        width: 1%;
        height: 100%;
        float: left;
        background-color: #f0f0f0;
    }
    .rightcontent{
        width: 69%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        margin: 0;
    }
</style>
