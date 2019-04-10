<template>
	<div class="slideShow">
	  <div class="block">
	    <el-carousel height="170px">
	      <el-carousel-item v-for="i in slideShows">
	        <a :href="i.bannerSkipUrl"><img :src="i.bannerPictureUrl"></a>
	        	<span>{{i.bannerDesc}}</span>
	      </el-carousel-item>
	    </el-carousel>
	  </div>
  	</div>
</template>

<script>
//	{
//		"code": 100001,
//		"data": [{
//			"bannerDesc": "banner图首页1",
//			"bannerLocation": 1,
//			"bannerOrder": 1,
//			"bannerPictureUrl": "http://avatarimg.lengren.com.cn/1536069440702",
//			"bannerSkipUrl": "http://www.baidu.com"
//		}, {
//			"bannerDesc": "banner图首页2",
//			"bannerLocation": 1,
//			"bannerOrder": 2,
//			"bannerPictureUrl": "http://avatarimg.lengren.com.cn/1536069440702",
//			"bannerSkipUrl": "http://www.baidu.com"
//		}, {
//			"bannerDesc": "",
//			"bannerLocation": 1,
//			"bannerOrder": 3,
//			"bannerPictureUrl": "http://avatarimg.lengren.com.cn/1536069440702",
//			"bannerSkipUrl": "http://www.baidu.com"
//		}],
//		"msg": "请求成功",
//		"result": true
//	}
	import Element from 'element-ui'
	import axios from 'axios'
	export default {
		name: 'slideShow',
		data() {
			return {
				slideShows: []
			}
		},
		created() {
			axios.get(this.GLOBAL.urlHead+'/banner/getBannerList',{
				params:{
					bannerLocation:1
				}
			})
				.then(res => {
					this.slideShows = res.data.data;
				})
		},
	}
</script>
<style>
	.slideShow {
		margin-top: 30px;
		margin-bottom: 30px;
		border-radius: 10px;
	}
	.slideShow img {
		width: 100%;
		height: 100%;
		/*border-radius: 10px;*/
	}
</style>