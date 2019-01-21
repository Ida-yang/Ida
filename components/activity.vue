<template>
    <div class="htmlbody">
        <el-form class="myform" ref="newform" :model="newform" label-width="80px" :rules="rules">
            <el-form-item prop="pname" label="公司名称">
                <el-input v-model="newform.pname" placeholder="请输入公司名称" style="width:90%;"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="姓名">
                <el-input v-model="newform.name" placeholder="请输入活动名称" style="width:90%;"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机">
                <el-input v-model="newform.phone" placeholder="请输入活动备注" style="width:90%;"></el-input>
            </el-form-item>
            <el-form-item prop="QQ" label="QQ">
                <el-input v-model="newform.QQ" placeholder="请输入活动备注" style="width:90%;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="activitybtn" size="mini" type="primary" @click="addactivity()">确 定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import store from '../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'activity',
        store,
        data(){
            return{
                newform:{
                    pname:null,
                    name:null,
                    phone:null,
                    QQ:null,
                },
                rules:{}
            }
        },
        methods:{
            addactivity(){},
        },
    }
</script>

<style>
    @media screen and (max-width: 500px) {
        .myform{
            width: 80% !important;
        }
    }
    .htmlbody{
        width: 100%;
        background-color: rgb(229, 235, 196)
    }
    .myform{
        width: 50%;
        height: 350px;
        margin: 10px auto;
        padding: 20px 10px;
        /* border: 1px solid #b4b4b4; */
        border-radius: 5px;
    }
    .activitybtn{
        position: absolute;
        right: 20%;
    }
</style>


