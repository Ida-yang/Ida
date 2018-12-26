<template>
    <!-- 登录页 -->
        <!-- <el-row style="width:100%;height:70%;position:absolute;top:10%;"> -->
    <el-row class="logincontent">
        <el-col :span="16" class="content-l">
            <div></div>
        </el-col>
        <!-- <el-col :span="10" :offset="8" class="grid-content content-r systemLogin"> -->
        <el-col :span="8" class="content-r">
            <div class="login">
                <div style="color:#fff;font-size:30px;margin-top:10%;text-align:center">用户登录</div> 
                <div class="grid-content bg-purple-dark">
                    <el-form  :model="loginFrom" status-icon :rules="rules" ref="loginFrom" 
                    class="demo-ruleForm"
                    style="color:#fff" >
                        <!-- <i class="el-icon-new-zuzhiguanli selecticonSet"></i> -->
                        <el-form-item prop="public_username" style="width:100%;margin-top:30px;">
                            <i class="el-icon-new-people_fill iconSet"></i>
                            <el-input 
                            type="text"
                            style="width:90%;" 
                            v-model="loginFrom.public_username"
                            auto-complete="off"
                            placeholder="请输入登录账号" >
                            </el-input>
                        </el-form-item>
                        <el-form-item  prop="public_password" style="width:100%;margin-top:30px;">
                            <i class="el-icon-new-lock_fill iconSet"></i>
                            <el-input 
                            type="password" 
                            v-model="loginFrom.public_password"
                            placeholder="请输入登录密码" 
                            @keyup.enter.native="submitForm('loginFrom')"
                            auto-complete="off" 
                            style="width:90%;">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm" style="width:80%;margin:10px 0 0 10%;">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </el-row> 
</template>

<script>
import store from '../store/store'
import '../assets/iconfont/iconfont.css'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/display.css'
import $ from 'jquery'
import qs from 'qs'

export default { 
    name: 'login',
    store,
    data () {
    return {
        loginFrom:{
            public_username :'',
            public_password :''
        },
        rules: {
            public_username : [
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            public_password : [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
        }
    }
    },
    mounted() {
        // var backgroundImage = $("body").css("background-image");
        // $("body").css("background-image", "none");
        // $("body").css("background", "#fff");
        // $("body").css("opacity", "0");
        // // setTimeout(function(){
        //     $("body").animate({opacity: "1"}, 300, "linear",function(){
        //         $("body").css("background", "");
        //         $("body").css("background-image", backgroundImage);
        //         $(".systemTitle").show(500);
        //         $(".systemLogin").show(500);
        //     });
        },
    methods: {
        submitForm(){
            let _this = this;
            let loginInfo={};
            loginInfo.public_username = this.loginFrom.public_username;
            loginInfo.public_password = this.loginFrom.public_password;
            let data = [loginInfo,this]
            let qs =require('querystring')
            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'tologin.do',
                data:qs.stringify(loginInfo),
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                if(res.data.msg && res.data.code == 200) {
                    _this.$message({
                      message: '登录成功',
                      type: 'success'
                    })
                _this.$store.commit('iscId',res.data.map.success.cId)
                _this.$store.commit('ispId',res.data.map.success.pId)
                _this.$router.push({path:'/index'})
                console.log(res)
                }else {
                    _this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function(err){
                console.log(err)
            })
        },
    }
}
</script>

<style>
    .logincontent{
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        background-color: #ffffff;
    }
   .content-l{
       height: 100%;
       background-image: url(../assets/image/index.jpg);
       background-repeat: no-repeat;
       background-size: 100% 100%;
   }
   .content-r{
       height: 100%;
       padding: 20px;
       position: relative;
   }
   .login{
       width: 300px;
       height: 400px;
       background-color: rgba(0, 0, 0, 1);
       padding: 20px 30px;
       border-radius: 50px;
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%,-50%);
   }
    /* .el-form-item__error{
        left: 20% !important;
    } */
</style>
