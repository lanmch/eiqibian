<template>
    <div class="addnotice">
        <div style="text-align:left;"><router-link to="/notice"><el-button type="primary">返回</el-button></router-link></div>
        <div class="formAll">
        <el-form ref="form"  label-width="80px">
            <div style="width:300px;">
                <el-form-item label="通知标题">
                    <el-input v-model="noticeTitle" ></el-input>
                </el-form-item>
            </div>
            <div style="width:300px;">
                <el-form-item  label="通知种类">
                    <el-select v-model="noticeType"  placeholder="请选择通知种类">
                    <el-option label="赛事通知" value=1></el-option>
                    <el-option label="培训通知" value=2></el-option>
                    <el-option label="公告通知" value=3></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="通知内容">
                    <el-input type="textarea" :rows="8" v-model="noticeContent"></el-input>
                </el-form-item>
            </div>
            <div style="width:500px;">
                <el-form-item label="附件名称">
                    <el-input v-model="noticeFileName" ></el-input>
                </el-form-item>
            </div>
            <div style="width:100px;">
                <el-form-item label="通知附件">
                    <!-- <up-file  @getfileToken="showFileToken" @fileName="getFileName"></up-file> -->
                    <input type="file"  id="fileField"   @click="upFileGetToken" @change="changeName"/>
                </el-form-item>
            </div>
            <div>
                <el-form-item>
                    <el-button type="primary"  @click="publish">发布通知</el-button>
                </el-form-item>
            </div>
        </el-form>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
import upFile from '../../common/upFile'
var getFileToken = ''
var FileToken = ''
var getFileName = ''
var filename = ''
var fileId
var lastName = ''
export default {
    inject:['reload'],
    components:{
        upFile
    },
    data(){
        return{
            noticeTitle:'',
            noticeContent:'',
            noticeType:'',
            noticeFileName: ''
        }
    },
    mounted(){
        fileId = 0;
        getFileName = '';
        lastName = '';
    },
    methods:{
        upFileGetToken(){
            axios.get(this.GLOBAL.urlHead+'/manage/file/getToken')
            .then(res=>{
                // this.$emit('getfileToken',res.data.data.token)
                getFileToken = res.data.data.token
            })
        },
        changeName(){
            getFileName = document.getElementById('fileField').files[0];
            var name = getFileName.name
            var index1 = name.lastIndexOf(".");
            var index2=name.length;
            lastName= name.substring(index1,index2);//后缀名
        },
        // showFileToken(fileToken){
        //     getFileToken = fileToken
        // },
        
        publish(){
            if(getFileName==''){
                this.pulishNotice()
            }else{
                this.pulishNoticeWithFile()
            }
        },
        pulishNoticeWithFile(){
            filename = new Date().getTime();
            const axiosInstance = axios.create({withCredentials: false});    //withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
            let data = new FormData();
             data.append('file', getFileName);
            data.append('token', getFileToken); 
            data.append('key', filename+lastName)
            axiosInstance({
                method: 'POST',
                url: 'https://upload-z2.qiniup.com',  //上传地址
                data: data,
                timeout:30000,      //超时时间，因为图片上传有可能需要很久
                onUploadProgress: (progressEvent)=> {
                    //imgLoadPercent 是上传进度，可以用来添加进度条
                    let imgLoadPercent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                },
                }).then(res =>{
                    
                }).catch(function(err) {
            });
            //上传图片
            axios.post(this.GLOBAL.urlHead+'/manage/file/addFile',{
                fileUrl: filename+lastName,
                filename: this.noticeFileName
            }).then(res=>{
                fileId = res.data.data.fileId;
                if(this.noticeTitle=='' || this.noticeContent=='' || this.noticeType == ''){
                    this.$alert('请将表单信息补充完整！','提示',{
                        callback: action=>{

                        }
                    })
                }else{
                    this.noticeContent = this.noticeContent.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
                    axios.post(this.GLOBAL.urlHead+'/manage/article/addNoticeArticle',{
                        articleLabel: this.noticeType,
                        articleTitle: this.noticeTitle,
                        articleContent: this.noticeContent,
                        articleFileId: fileId
                    }).then(res=>{
                        if(res.data.code == 100001){
                            this.$alert('发布通知成功！','提示',{
                                callback: action=>{
                                    this.$router.go(-1)
                                }
                            })
                        }
                    })
                }
            })
        },
        pulishNotice(){
            if(this.noticeTitle=='' || this.noticeContent=='' || this.noticeType == ''){
                this.$alert('请将表单信息补充完整','提示',{
                    callback: action=>{

                    }
                })
            }else{
                this.noticeContent = this.noticeContent.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
                axios.post(this.GLOBAL.urlHead+'/manage/file/addFile',{
                     
                })
                axios.post(this.GLOBAL.urlHead+'/manage/article/addNoticeArticle',{
                    articleLabel: this.noticeType,
                    articleTitle: this.noticeTitle,
                    articleContent: this.noticeContent,
                    articleFileId: fileId
                }).then(res=>{
                    if(res.data.code == 100001){
                        this.$alert('通知发布成功！','提示',{
                            callback: action=>{
                                this.$router.go(-1)
                            }
                        })
                    }
                })
            }
            
        }
    }
}
</script>

<style scoped>
.addnotice{
    padding: 20px 80px;
}
.formAll{
    margin-top: 20px;
}
.el-input__inner{
    width: 100px;
}
</style>
