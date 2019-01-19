<template>
    <div class="uploadBOX">
        <div class="imgbox" v-for="item in fileList" :key="item.id" @mouseenter="mouseenterdiv(item)" @mouseleave="mouseleavediv(item)">
            <img :src="item.imgURL" alt="图片" @click="showImg($event,item)">
            <i class="el-icon-circle-close-outline imgdel" v-if="imgshow" @click="delImg($event,item)"></i>
        </div>
        <div class="filebox">
            <span class="upload">
                <input type="file" name="file" @change="tirggerFile($event)"/>
            </span>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="图片">
            <!-- <img src="/upload/staticImg/bg.jpg" width="100%" alt="图片"> -->
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
export default {
    store,
    data(){
        return{
            form:{
                imgURL:null,
            },
            dataList:null,
            fileList:null,
            imgid:null,
            imgurl:null,
            dialogImageUrl:null,
            dialogVisible:false,
            imgshow:false
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        loadData(){
            let _this = this
            _this.fileList = []
            let qs = require('querystring')
            let data = {}
            data.typetid = 37
            data.type = '合同'
            data.pId = this.$store.state.ispId
            data.cId = this.$store.state.iscId
            // console.log(data)

            axios({
                method:'post',
                url:_this.$store.state.defaultHttp+'imgInfo/getImgInfoByTypeid.do',
                data:qs.stringify(data)
            }).then(function(res){
                // console.log(res.data)
                _this.dataList = res.data
                let arr = _this.dataList
                arr.forEach(el => {
                    // console.log(el.id)
                    _this.imgid = el.id
                    _this.imgurl = '/upload/'+_this.$store.state.iscId+'/'+el.name
                    _this.fileList.push({id:_this.imgid,imgURL:_this.imgurl})
                });
                // console.log(_this.fileList)
            }).catch(function(err){
                console.log(err);
            });
        },
        tirggerFile (event) {
		    let _this = this;
		    let file = event.target.files[0]
		    let param = new FormData() // 创建form对象
		    param.append('file', file, file.name) // 通过append向form对象添加数据
		    console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
		    let config = {
		        headers: {'Content-Type': 'multipart/form-data'}
		    }
		    // 添加请求头
		    axios.post('http://crm.yunzoe.com/yzcrm/contractUpload.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId+'&contractid=37', param, config)
		    .then(res => {
                console.log(res)
		        if (res.data == 'success') {
                    _this.$message({
                        message:'上传成功',
                        type:'success'
                    })
                    _this.$options.methods.loadData.bind(_this)(true);
		        }else{
                    _this.$message({
                        message: res.data,
                        type: 'error'
                    })
                }
            })
        },
        showImg(e,val){
            // console.log(val)
            // console.log(val.imgURL)
            this.dialogImageUrl = val.imgURL
            this.dialogVisible = true
            // console.log(this.dialogImageUrl)
        },
        delImg(e,val){
            // console.log(val.id)
            let _this = this;
            let qs = require('querystring')
            let idArr = [];
            idArr.id = val.id
            _this.$confirm('是否确认删除该图片？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'imgInfo/delImgInfoById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    console.log(res)
                    if(res.data.code && res.data.code == '200') {
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.$options.methods.loadData.bind(_this)(true);
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
                    message: '取消删除'
                });       
            });
        },
        mouseenterdiv(val){
            this.imgshow = true
        },
        mouseleavediv(val){
            this.imgshow = false
        }
    },
}
</script>

<style>
    .uploadBOX{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-wrap: wrap;
        align-content: flex-start;
	    margin-top: 20px;
    }
    .imgbox{
        flex: 0 0 100px;
	    margin-left: 10px;
        /* width: 100px;
        height: 100px; */
        position: relative;
    }
    .imgbox img{
        width: 100px;
        height: 100px;
    }
    .imgdel{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
    }
    .filebox{
        width: 100px;
        height: 100px;
        /* background-color: rgb(78, 121, 96); */
    }
	.upload {
	    width: 100px;;
	    height: 100px;
	    display: inline-block;
	    border-radius: 5px;
	    position: relative;
	    margin-left: 10px;
	    background: rgb(255, 255, 255) url('../../../../assets/img/plus.png') center center no-repeat;
	    background-size: 100px 100px;
        border: 1px dashed #d9d9d9;
	}
	.upload input{
	    position: relative;
	    width: 100px;
	    height: 100px;
	    top: 0;
	    left: 0;
	    opacity: 0;
	}
	.filebox img{
	    width: 100px;
	    height: 100px;
	    line-height: 100px;
	    /* display: block; */
	    float: left;
        border-radius: 4px;
	}
	.upload i {
	    position: absolute;
	    bottom: 0;
	    left: 100px;
	    color: rgb(83, 76, 76);
	    font-size: 24px;
	}
</style>