<template>
  <div class="linkage">
    <el-select
      v-model="country"
      @change="choseProvince"
      placeholder="省级地区"
      style="width:100px;">
      <el-option
        v-for="item in Provinces"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      v-model="city"
      @change="choseCity"
      placeholder="市级地区"
      style="width:100px;">
      <el-option
        v-for="item in shi1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      v-model="area"
      @change="choseBlock"
      placeholder="区级地区"
      style="width:100px;">
      <el-option
        v-for="item in qu1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      mapJson:'../../../../static/map.json',
      Provinces:'',
      country: '',
      city: '',
      shi1: [],
      area: '',
      qu1: [],
      Citys:'',
      block:'',
    }
  },
  methods:{
    // 加载china地点数据，三级
      getCityData:function(){
        var that = this
        axios.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.Provinces = []
            that.Citys = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.Provinces.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.Citys.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.Provinces) {
              for (var index1 in that.Citys) {
                if (that.Provinces[index].id.slice(0, 2) === that.Citys[index1].id.slice(0, 2)) {
                  that.Provinces[index].children.push(that.Citys[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.Citys) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.Citys[item1].id.slice(0, 4)) {
                  that.Citys[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.Provinces) {
          if (e === this.Provinces[index2].id) {
            this.shi1 = this.Provinces[index2].children
            this.city = this.Provinces[index2].children[0].value
            this.qu1 =this.Provinces[index2].children[0].children
            this.area = this.Provinces[index2].children[0].children[0].value
            this.E = this.qu1[0].id
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.Citys) {
          if (e === this.Citys[index3].id) {
            this.qu1 = this.Citys[index3].children
            this.area = this.Citys[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      },
    },
    created:function(){
      this.getCityData()
    }
}
</script>

<style>
</style>