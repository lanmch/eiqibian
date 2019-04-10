<template>
    <div class="dList">
        <div class="head">
            <router-link to="/contestDetail"><el-button type="primary">返回</el-button></router-link>
            <h2>共报名{{totalStu}}人</h2>
            <div>搜索</div>
        </div>
        <!-- <div class="choseSch">
            选择学校
            <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
        </div> -->
        <div style="margin-bottom:20px;">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="userName"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userSchool"
                label="学校"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userPhone"
                label="电话">
            </el-table-column>
            <el-table-column
                prop="userIdentity"
                label="身份证">
            </el-table-column>
            <el-table-column
                prop="userJoinTime"
                label="日期">
            </el-table-column>
            </el-table>
            
        </div>
        <el-pagination
            background
            @current-change='currentChange'
            :current-page='currentPage'
            layout="prev, pager, next"
            :total="pageAll">
            </el-pagination>
    </div>
</template>
<script>
var pageNow = 1
import axios from 'axios'
axios.defaults.withCredentials = true
var contestId = 0
export default {
    name:'contestDetailList',
    data(){
        return{
            tableData: [],
            options: [{
                value: '选项1',
                label: '重庆邮电大学'
                }, {
                value: '选项2',
                label: '重庆大学'
                }],
            value:'',
            pageAll: 10,
            currentPage: 0,
            totalStu: 0
        }
    },
    mounted(){
        contestId = this.$route.params.contestId
        axios.post(this.GLOBAL.urlHead + '/manage/sign/signSolution',{
            currentPage:pageNow,
            pageSize:7,
            contestId:this.$route.params.contestId,
        }).then(res=>{
            console.log(res)
            this.totalStu = res.data.data.total
            this.currentPage = pageNow;
            this.pageAll = res.data.data.pages * 10
            this.tableData = res.data.data.signVOList
            for(var i in this.tableData){
						this.tableData[i].userJoinTime = this.formatTime(this.tableData[i].userJoinTime)
					}
        })
    },
    methods:{
        //时间戳转化
			add0(m){
				return m<10?'0'+ m : m
			},
			formatTime(timePoint){
				var time = new Date(timePoint);
					var y = time.getFullYear();
					var m = time.getMonth()+1;
					var d = time.getDate();
					return y+'.'+this.add0(m)+'.'+this.add0(d);
            },
            currentChange(index){
                pageNow = index
                axios.post(this.GLOBAL.urlHead + '/manage/sign/signSolution',{
                    currentPage:pageNow,
                    pageSize:7,
                    contestId:contestId,
                }).then(res=>{
                    this.currentPage = pageNow;
                    this.pageAll = res.data.data.pages * 10
                    this.tableData = res.data.data.signVOList
                    for(var i in this.tableData){
                                this.tableData[i].userJoinTime = this.formatTime(this.tableData[i].userJoinTime)
                            }
                })
            }
    }
}
</script>
<style scoped>
.dList{
    padding: 20px 150px;
}
.head{
    display: flex;
    justify-content: space-between;
}
.choseSch{
    margin: 20px 0;
}
</style>
