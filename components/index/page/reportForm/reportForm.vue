<template>
    <div class="innerspace">
        <div class="middle">
            <div class="middlebody">
                <div id="chart1" :style="{width: '400px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    :default-sort = "{order: 'descending'}"
                    style="width:100%;text-align:center">
                    <el-table-column
                        fixed
                        header-align="center"
                        align="center"
                        type="index"
                        width="45">
                    </el-table-column>
                    <el-table-column
                        prop="opportunity_name"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="项目名"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="opportunity_number"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="状态"
                        sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="middle">
            <div class="middlebody">
                <div id="chart2" :style="{width: '400px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    :default-sort = "{order: 'descending'}"
                    style="width:100%;text-align:center">
                    <el-table-column
                        fixed
                        header-align="center"
                        align="center"
                        type="index"
                        width="45">
                    </el-table-column>
                    <el-table-column
                        prop="opportunity_name"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="项目名"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="opportunity_number"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="状态"
                        sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="middle">
            <div class="middlebody">
                <div id="chart3" :style="{width: '400px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    :default-sort = "{order: 'descending'}"
                    style="width:100%;text-align:center">
                    <el-table-column
                        fixed
                        header-align="center"
                        align="center"
                        type="index"
                        width="45">
                    </el-table-column>
                    <el-table-column
                        prop="opportunity_name"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="项目名"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="opportunity_number"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="状态"
                        sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="middle">
            <div class="middlebody">
                <div id="chart4" :style="{width: '400px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="tableData"
                    ref="multipleTable"
                    border
                    stripe
                    :default-sort = "{order: 'descending'}"
                    style="width:100%;text-align:center">
                    <el-table-column
                        fixed
                        header-align="center"
                        align="center"
                        type="index"
                        width="45">
                    </el-table-column>
                    <el-table-column
                        prop="opportunity_name"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="项目名"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="opportunity_number"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="状态"
                        sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="head">
            <el-table
                :data="tableData"
                ref="multipleTable"
                border
                stripe
                :default-sort = "{order: 'descending'}"
                style="width:100%;text-align:center">
                <el-table-column
                    fixed
                    header-align="center"
                    align="center"
                    type="index"
                    width="45">
                </el-table-column>
                <el-table-column
                    prop="opportunity_name"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="项目名"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="opportunity_number"
                    header-align="left"
                    align="left"
                    min-width="90"
                    label="状态"
                    sortable>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import 'echarts/map/js/china.js';
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/bar')
    require('echarts/lib/chart/pie')
    require('echarts/lib/chart/funnel')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name:'reportForm',
        store,
        computed:{
            tableData(){
                return store.state.reportFormList
            }
        },
        data(){
            return {
                msg:"报表"
            }
        },
        activated(){
            this.loadData()
            this.drawLine();
        },
        mounted(){
            this.loadData()
            this.drawLine();
        },
        methods:{
            loadData(){
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.limit = 10;
                // console.log(searchList)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    console.log(res.data.map.success)
                    _this.$store.state.reportFormList = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let chart1 = echarts.init(document.getElementById('chart1'))
                let chart2 = echarts.init(document.getElementById('chart2'))
                let chart3 = echarts.init(document.getElementById('chart3'))
                let chart4 = echarts.init(document.getElementById('chart4'))
                // 绘制图表
                chart1.setOption({
                    title : { text: '销售漏斗',left: 'center' },
                    tooltip : {},
                    legend: {
                        bottom: 20,
                        data : ['展现','点击','访问','咨询','订单']
                    },
                    calculable : true,
                    series : [
                        {
                            name:'销售漏斗',
                            type:'funnel',
                            // width: '40%',
                            data:[
                                {value:60, name:'访问'},
                                {value:40, name:'咨询'},
                                {value:20, name:'订单'},
                                {value:80, name:'点击'},
                                {value:100, name:'展现'}
                            ]
                        }
                    ]
                });
                chart2.setOption({
                    title: { text: '销售排行',left: 'center' },
                    tooltip: {},
                    xAxis: {
                        bottom: 20,
                        data: ["张三", "李四", "王五", "赵六"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销售排行',
                        type: 'bar',
                        data: [5, 20, 36, 10]
                    }]
                });
                chart3.setOption({
                    title: {
                        text: '水果销售统计', // 标题文本
                        left: 'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/> " + '销售数量' + ":{c}"
                    },
                    legend: {
                        bottom: 20,
                        left: 'center',
                        data: ['香蕉','苹果','西瓜','葡萄','橘子'] // 扇形区域名称
                    },
                    series : [{
                        name:'销售统计',  // 提示框标题
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                                {value:3, name:'香蕉'},
                                {value:10, name:'苹果'},
                                {value:5, name:'西瓜'},
                                {value:6, name:'葡萄'},
                                {value:7, name:'橘子'}], // 扇形区域数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
                chart4.setOption({
                    title: {
                        text: '城市分布分析', // 标题文本
                        left: 'center'
                    },
                    //  backgroundColor: "#02AFDB",
                    tooltip: {}, // 鼠标移到图里面的浮动提示框
                    dataRange: {
                        show: false,
                        min: 0,
                        max: 1000,
                        text: ['High', 'Low'],
                        realtime: true,
                        calculable: true,
                        color: ['#00ace0', '#68cceb', '#c2dce4']
                    },
                    geo: { // 这个是重点配置区
                        map: 'china', // 表示中国地图
                        roam: true,
                        label: {
                        normal: {
                            // show: true, // 是否显示对应地名
                            textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                            }
                        }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            emphasis: {
                                areaColor: null,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    series: [{
                        type: 'scatter',
                        coordinateSystem: 'geo' // 对应上方配置
                        },
                        {
                        name: '浏览量', // 浮动框的标题
                        type: 'map',
                        geoIndex: 0,
                        data: [{
                            "name": "北京",
                            "value": 599
                            }, {
                                "name": "上海",
                                "value": 142
                            }, {
                                "name": "黑龙江",
                                "value": 44
                            }, {
                                "name": "深圳",
                                "value": 92
                            }, {
                                "name": "湖北",
                                "value": 810
                            }, {
                                "name": "广东",
                                "value": 19450
                            }]
                        }
                    ]
                });
            }
        },
    }
</script>
<style>
    .innerspace{
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
    }
    .head{
        width: 100%;
        height: auto;
        background-color: #ffffff;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
    }
    .head ul{
        height: 100%;
        flex: 1;
        text-align: center;
        list-style: none;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
    }
    .head ul:not(:last-child){
        border-right: 10px solid #f0f0f0;
    }
    .head ul li{
        /* width: 50%;
        height: 50px;
        float: left; */
        font-size: 14px;
        flex: 1;
        text-align: center;
        line-height: 24px;
    }
    .middle{
        width: 100%;
        height: 400px;
        background-color: #ffffff;
        margin: 10px 0;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
    }
    .middle .middlebody{
        flex: 1;
        padding: 10px;
    }
    .middle .middlebody:first-child{
        border-right: 10px solid #f0f0f0;
    }
    .foot{
        width: 100%;
        height: auto;
        background-color: #ffffff;
    }
</style>
