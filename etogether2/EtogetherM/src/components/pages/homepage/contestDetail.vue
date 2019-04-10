<template>
    <div class="contestDetail">
        <div class="btnBACK">
            <router-link to="/"><el-button type="primary">返回首页</el-button></router-link>
        </div>
        <div class="detail">
            <div>
                <div class="selectMore">
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option
                        v-for="item in options1"
                        :key="item.contestId"
                        :label="item.contestName"
                        :value="item.contestId">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div class="selectMore">
                    <el-select v-model="value2" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div> -->
                <el-button type="primary" @click="checkContest">立即查看</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data(){
        return{
            options1: [],
            value1:'',
            options2: [{
                value: '选项1',
                label: '重庆市'
                }, {
                value: '选项2',
                label: '成都市'
                }],
            value2:''
        }
    },
    mounted(){
        axios.get(this.GLOBAL.urlHead+'/manage/sign/contests')
        .then(res=>{
            this.options1 = res.data.data
        })
    },
    methods:{
        checkContest(){
            this.$router.push({name:'contestDetailList', params:{contestId: this.value1}})
        }
    }
}
</script>
<style scoped>
.btnBACK{
    position: absolute;
    top: 80px;
    left: 120px;
}
.detail{
    height:400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.selectMore{
    margin-bottom: 30px;
}
</style>
