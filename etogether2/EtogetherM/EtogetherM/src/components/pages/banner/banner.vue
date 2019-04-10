<template>
    <div class="all">
        <div style="margin-bottom:30px"><el-button type="success" @click="addBanner">增加Banner</el-button></div>
        <div>
            <ul class="imgList">
                
                <li v-for="(item,index) in bannerList"><img :src="item.bannerPictureUrl">
                
                <div class="BTN">
                    <span>{{item.bannerDesc}}</span>
                    <el-button type="danger"  @click="deleteBanner(index)">删除Banner</el-button>
                </div>
                </li>
            </ul>
        </div>
        <div v-show="ifAddBanner" class="addBanner">
            <!-- <el-button><up-file  @getfileToken="showFileToken" @fileName="getFileName"></up-file></el-button> -->
            <input type="file"  id="fileField" accept="image/*"  @click="upFileGetToken" @change="changeName"/>
            <el-input placeholder="请输入banner描述信息（可不填）" style="width:400px;" v-model="bannerDec"></el-input>
            <el-input placeholder="请输入banner外网链接（可不填）" style="width:400px;" v-model="bannerAurl"></el-input>
            <el-button type="success" @click="submitAdd">确认上传</el-button>
            <el-button type="danger" @click="closeAdd">关闭</el-button>
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
var fileaa
export default {
    inject:['reload'],
    data(){
        return{
            bannerList:[],
            ifAddBanner: false,
            bannerDec: '',
            bannerAurl: ''
        }
    },
    components: {
        upFile  
    },
    mounted(){
        axios.get(this.GLOBAL.urlHead+'/manage/banner/getBannerList',{
            params:{
                bannerLocation: 1
            }
        }).then(res=>{
            this.bannerList = res.data.data;
        })
        
    },
    methods:{
        upFileGetToken(){
            axios.get(this.GLOBAL.urlHead+'/manage/file/getToken')
            .then(res=>{
                getFileToken = res.data.data.token
            })
        },
        changeName(){
            fileaa = document.getElementById('fileField').files[0]
        },
        showFileToken(fileToken){
            getFileToken = fileToken
        },
        getFileName(fileName){
            getFileName = fileName;
            
        },
        addBanner(){
            this.ifAddBanner = true
        },
        closeAdd(){
            this.ifAddBanner = false;
        },
        submitAdd(){
            this.upToQN()
        },
        upToQN(){
            filename = new Date().getTime();
            const axiosInstance = axios.create({withCredentials: false});    //withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
            var data = new FormData();
            data.append('file', fileaa);
            data.append('token', getFileToken); 
            data.append('key', filename)    //七牛需要的token，叫后台给，是七牛账号密码等组成的hash
            
            axiosInstance({
                method: 'POST',
                url: 'https://upload-z2.qiniup.com',  //上传地址
                name: 'file',
                data: data,
                headers:{'Content-Type':'multipart/form-data'},
                timeout:30000,      //超时时间，因为图片上传有可能需要很久
                onUploadProgress: (progressEvent)=> {
                    //imgLoadPercent 是上传进度，可以用来添加进度条
                    let imgLoadPercent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                },
                }).then(res =>{
                    FileToken = res.data.hash;
                }).catch(function(err) {
            });

            axios.post(this.GLOBAL.urlHead+'/manage/file/addFile',{
                fileUrl: filename,
                filename: fileaa,

            }).then(res=>{

                fileId = res.data.data.fileId;
                axios.post(this.GLOBAL.urlHead + '/manage/banner/addBanner',{
                    bannerOrder:this.bannerList[0].bannerOrder+1, 
                    bannerPictureUrl: filename,
                    bannerSkipUrl:this.bannerAurl,
                    bannerDesc: this.bannerDec,
                    bannerLocation: 1
                }).then(res=>{
                    getFileName='';
                    this.ifAddBanner = false;
                    this.reload()
                })
            })
        },
        deleteBanner(index){
            axios.post(this.GLOBAL.urlHead + '/manage/banner/deleteBanner',
                this.$qs.stringify({
                    bannerId: this.bannerList[index].bannerId
                })
                
            ).then(res=>{
                this.reload()
            })
        }
    }
}
</script>

<style scoped>
.addBanner{
    width: 1000px;
    padding: 50px 0;
    position: fixed;
    top: 300px;
    left: 25%;
    z-index: 99;
    background-color: rgb(245, 240, 240)
}
.all{
    padding: 20px 50px;
}
.imgList{
    display: flex;
    flex-direction: column;
}
.imgList li img{
    width: 500px;
}
.imgList li{
    display: flex;
    align-items: center;
    justify-content: space-around;
    -moz-box-shadow:0 0 10px #888;
    -webkit-box-shadow:0 0 10px #888;
    box-shadow:0 0 10px #888;
    margin-bottom: 20px;
    padding: 20px 0;
}
.imgList li .BTN{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
