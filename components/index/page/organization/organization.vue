<template>
    <div class="content1">
        <div class="leftcontent">
            <el-tree
                node-key="deptid"
                highlight-current
                default-expand-all
                :data="datalist"
                :props="defaultProps"
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }" @mouseover="showbtn(data)" @mouseout="hidebtn(data)">
                    <span>{{ data.deptname }}</span>
                    <span v-show="btnshow">
                        <el-button type="text" size="mini" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">
                        </el-button>
                        <el-button type="text" size="mini" icon="el-icon-edit" @click="dialogVisible2 = true">
                        </el-button>
                        <el-button type="text" size="mini" icon="el-icon-remove-outline" @click="deletedept()">
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <div class="rightcontent"></div>
        <el-dialog
            title="添加"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form>
                <span>这是一段信息</span>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="adddept()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改"
            :visible.sync="dialogVisible2"
            width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updatedept()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'organization',
        data(){
            return {
                msg:"组织机构",
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },
                btnshow:true,
                dialogVisible:false,
                dialogVisible2:false,
            }
        },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                let _this = this
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.datalist = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
            },
            adddept(){
                alert('添加成功')
            },
            updatedept(){
                alert('修改成功')                
            },
            deletedept(){
                alert('删除成功')
            },
            showbtn(data){
                let id = data.deptid
                // console.log(id)
                // console.log(data.deptid)
                // this.$set(data,'btnshow',false);
                // this.btnshow = false
            },
            hidebtn(data){
                let id = data.deptid
                // console.log(data.deptid)
                // this.$set(data,'btnshow',true);
                // this.btnshow = true
            },
        }
    }
</script>

<style>
    .leftcontent{
        width: 30%;
        height: auto;
        float: left;
        box-sizing: border-box;
    }
    .rightcontent{
        width: 70%;
        min-height: 700px;
        background-color: #f0f0f0;
        float: left;
        box-sizing: border-box;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
