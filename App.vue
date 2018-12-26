<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
      return{
          reload:this.reload
      }
  },
  data(){
      return{
          isRouterAlive:true
      }
  },
  methods:{
      reload(){
          this.isRouterAlive = false
          this.$nextTick(function(){
              this.isRouterAlive = true
          })
      },
      
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

html,
body,
#app,
.wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-x: hidden; overflow-y: auto; 
}
.searchList{
    width: 240px;
    margin: 5px 5px 5px 0px;
    float: left;
}
.searchList .el-radio__inner{
    border:none !important;
    width: 0;
}
.nameList{
    display: inline-block;
    width: 90px;
    text-align: right;
    padding-right: 30px;
    font-size: 14px;
    color: #242424;
    line-height: 14px;
}
.el-table th {
        background: #eef1f6 
}
.numberPage {
    margin-bottom: 10px;
    text-align: left !important;
    padding-left: 10px;
    background-color: #fff;
    width: 90%;
}
body {
    font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
}

a {
    text-decoration: none
}

.content-box {
    position: absolute;
    left: 150px;
    right: 0;
    top: 40px;
    bottom: 0;
    overflow-y: auto;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
}

.content-collapse {
    left: 65px;
}

.container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.BarCodeBox{
    width: 20%;
    display: inline-block;
}
.crumbs {
    margin-bottom: 20px;
}

.pagination {
    margin: 20px 0;
    text-align: right;
}

.plugins-tips {
    padding: 20px 10px;
    margin-bottom: 20px;
}

.el-button+.el-tooltip {
    margin-left: 10px;
}

.el-table tr:hover {
    background: #f6faff;
}
.el-table {
    font-size: 12px;
    padding-bottom: 15px;
    color: #000;
}
.el-table thead {
    color: #000;
}

.el-table th{
    font-size: 14px
}
.el-table td, .el-table th {
    padding: 8px 0;
    line-height:30px; 
}
.el-table--border::after, .el-table--border::before{
    background-color: #ebeef5;
}
.el-table__header th,.el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background-color: #f7f7f7;
    color: #1f2d3d;
}

.el-button+.el-button{
    margin: 0 !important;
}

.entry{
    width: 100%;
    height: 35px;
    background: #f7f7f7;
    border-bottom: 1px solid #ebeef5;
    clear: both;
    position: relative;
}

.screen{
    position: absolute;
    right: 10px;
    top: 4px;
}
.btn{
    margin-top:4px;
}
.info-btn{
    background: #ffffff;
    /* margin: 4px 0 0 10px; */
    color: #222222;
}
.info-btn:hover,.info-btn:focus{
    background: #009688;
    color: #ffffff;
}
.checklist .checkone{
    width: 100%;
    margin: 5px 0 0 20px;;
}

.mgb20 {
    margin-bottom: 20px;
}

.move-enter-active,
.move-leave-active {
    transition: opacity .5s;
}

.move-enter,
.move-leave {
    opacity: 0;
}

/*BaseForm*/

.form-box {
    width: 600px;
}

.form-box .line {
    text-align: center;
}

.el-time-panel__content::after,
.el-time-panel__content::before {
    margin-top: -7px;
}

.el-time-spinner__wrapper .el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default) {
    padding-bottom: 0;
}

/*Upload*/

.pure-button {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 3px;
}

.g-core-image-corp-container .info-aside {
    height: 45px;
}


.el-upload--text {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.el-upload--text .el-icon-upload {
    font-size: 67px;
    color: #97a8be;
    margin: 40px 0 16px;
    line-height: 50px;
}

.el-upload--text {
    color: #97a8be;
    font-size: 14px;
    text-align: center;
}
.el-input__icon {
    line-height: 17px !important;
}
.el-upload--text em {
    font-style: normal;
}
.el-pager li.active {
    color: #ff5722 !important;
    cursor: default;
}
.el-pager li:hover {
    color: #5281c7 !important;
    cursor: default;
}

.searchbutton{
    background-color: #ff5722;
    color: #ffffff;
}

.el-table__expand-icon:after {
    content: "查看";
    color: rgb(60, 141, 188);
    cursor: pointer;
}
.el-table__expand-icon {
    transform: rotate(0deg) !important;
}
.el-table__expand-icon>i {
    display: none !important;
}

/*隐藏table表头右边凸出的一块*/
.gutter {
    display: none !important;
}

.el-table--border {
    border-top: none !important;
    border-right: none !important;
    border-bottom: none !important;
}
.el-table--border::after {
    background-color: #fff;
}
.el-table--border::before {
    background-color: #fff;
}

/*VueEditor*/
/* .el-table td div {
    box-sizing: border-box;
    height: 40px !important;
    line-height: 40px !important;
} */
.ql-container {
    min-height: 400px;
}
.el-select .el-input .el-select__caret {
    color: #c0c4cc;
    font-size: 14px;
    height: 35px !important;
    transition: transform .3s;
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    line-height: 16px;
    cursor: pointer;
}
.ql-snow .ql-tooltip {
    transform: translateX(117.5px) translateY(10px) !important;
}

.editor-btn {
    margin-top: 20px;
}
.el-select .el-input__inner {
    cursor: pointer;
    padding-right: 35px;
}

.el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
}
/*markdown*/

.v-note-wrapper .v-note-panel {
    min-height: 500px;
}
</style>
