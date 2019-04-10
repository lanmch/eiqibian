<template>
    <div class="aDetail">
        <div class="btn"><el-button type="primary" @click="back">返回</el-button></div>
        <h2>【{{articleDetail.articleLabel}}】{{articleDetail.articleTitle}}</h2>
        <h3>发布时间：{{articleDetail.articlePublishTime}}</h3>
        <h3>浏览量：{{articleDetail.articleViewsNum}}</h3>
        <div class="articleContent" v-html="articleDetail.articleContent.replace(/\r?\n/g, '<br />')"></div>
        <div v-if="ifShowfile" class="fileZone">
            <div><strong>附件信息：</strong></div>
            <div>附件名称：{{articleDetail.file.fileName}}</div>
            <div>下载量：{{articleDetail.file.fileDownNum}}</div>
            <div>下载地址：{{articleDetail.file.fileUrl}}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import bus from '../../assets/js/busEvent.js'
export default {
    name: 'articleDetail',
    data(){
        return{
            articleDetail:{},
            ifShowfile: false
        }
    },
    mounted(){
            axios.get(this.GLOBAL.urlHead + '/manage/article/getArticleDetails',{                    
                    params:{
                        articleId: this.$route.params.articleId
                    }
                }    
            ).then(res=>{          
    
                if(res.data.data.file==null){
                    this.articleDetail = res.data.data; 
                    this.ifShowfile = false
                }else{
                    this.articleDetail = res.data.data; 
                    this.ifShowfile = true;
                }
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
.articleContent{
    text-align: left;
    margin-bottom: 50px;
}
.fileZone{
    text-align: left;
    font-size: 18px;
}
.btn{
    margin-bottom: 20px;
}
</style>
