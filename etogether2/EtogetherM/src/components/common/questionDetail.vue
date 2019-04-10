<template>
    <div class="aDetail">
        <div class="btn"><el-button type="primary" @click="back">返回</el-button></div>
        <h2>【{{questionDetail.questionLabel}}】【{{questionDetail.questionLanguage}}】{{questionDetail.questionTitle}}</h2>
        <div class="questionContent">{{questionDetail.questionOption}}</div>
    </div>
</template>

<script>
import axios from 'axios'
import bus from '../../assets/js/busEvent.js'
export default {
    name: 'questionDetail',
    data(){
        return{
            questionDetail:{}
        }
    },
    mounted(){
            axios.get(this.GLOBAL.urlHead + '/manage/question/getQuestion',{                    
                    params:{
                        questionId: this.$route.params.questionId
                    }
                }    
            ).then(res=>{
                this.questionDetail = res.data.data;    
            })
    },
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.aDetail{
    padding: 20px 100px;
}
.btn{
    margin-bottom: 20px;
}
.questionContent{
    text-align: left;
    margin-top: 20px;
}
</style>
