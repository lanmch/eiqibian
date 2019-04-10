<template>
    <div class="courseDetail">
        <div class="courseDeTitle">
            <div>{{videoTitle}}</div>
            <img v-if="!ifCollect" @click="changeCollect" src="../../../../static/logoAll/courseCenter/notcollect.png"/>
            <img v-else @click="changeCollect" src="../../../../static/logoAll/courseCenter/collect.png"/> 
        </div>
        <div class="courseVideo">
            <!-- <video width="800" height="455" controls src="http://www.w3school.com.cn/i/movie.ogg">

                	<source  src="../../common/intro.wmv">
     
						
            </video> -->
			<video-player  class="video-player vjs-custom-skin"
				ref="videoPlayer"
				:playsinline="true"
				:options="playerOptions"
				></video-player>
			<!--<video width="800" height="455" :src="videoSrc"
			preload="" controls="controls"></video>-->
        </div>
        <div class="userInfo">
            <div>
                <img src="../../../../static/logoAll/courseCenter/identity.png"/>{{author}}
            </div>
            <div>
                <img src="../../../../static/logoAll/courseCenter/collectNum.png"/><span>{{collectNum}}</span>
                <img src="../../../../static/logoAll/courseCenter/play.png"/><span>{{playNum}}</span>
            </div>
        </div>
        <!-- <div class="moreVideo">
            <div><img src="../../../../static/logoAll/courseCenter/up.png"/>{{downTitle}}</div>
            <div><img src="../../../../static/logoAll/courseCenter/down.png"/>{{nextTitle}}</div>
        </div> -->
    </div>
</template>

<script>
	import axios from 'axios'
	import bus from '../../../assets/js/eventBus.js'
	var indexNew = 0;
	export default {
		name: 'courseDetail',
		data() {
			return {
				videoSrc: '',
				videoTitle: '',
				videoURL: '',
				author: '',
				collectNum: 0,
				playNum: 0,
				downTitle: '',
				nextTitle: '',
				ifCollect: true,
				articleThisId: '',
				playerOptions: {
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					autoplay: false, //如果true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 导致视频一结束就重新开始。
					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [{
						type: "",
						src: "" //url地址
					}],
					poster: "", //你的封面地址
					// width: document.documentElement.clientWidth,
					notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true //全屏按钮
					}
				}
			}
		},
		mounted() {
			const loading = this.$loading({
				lock: true,
				text: '加载中.......',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			loading.close();
			if (!this.$route.params.courseId) {
				this.articleThisId = this.$route.params.courseId
			} else {
				localStorage.setItem('articleThisIdee', this.$route.params.courseId);
			}
			this.articleThisId = localStorage.getItem('articleThisIdee')
			axios.get(this.GLOBAL.urlHead + '/course/courseDetail', {
				params: {
					courseId: Number(this.articleThisId),
					userId: Number(localStorage.getItem('userId'))
				}
			}).then(res => {
				this.collectNum = res.data.data.courseCollectionNum
				this.playerOptions.poster = res.data.data.courseImg
				this.playerOptions.sources[0].src = res.data.data.courseUrl
//				this.videoSrc = res.data.data.courseUrl
				this.author = res.data.data.userNickname
				this.playNum = res.data.data.courseViewsNum
				this.ifCollect = res.data.data.isCollected
				if (this.ifCollect == 1) {
					this.ifCollect = true
				} else {
					this.ifCollect = false
				}
				this.videoTitle = res.data.data.courseTitle
			})
		},
		methods: {
			changeCollect() {
				if (this.ifCollect) {
					this.collectNum--;
					axios.post(this.GLOBAL.urlHead + '/course/cancel', {
						courseId: this.$route.params.courseId,
						userId: this.GLOBAL.userId
					}).then(res => {})
				} else {
					this.collectNum++;
					axios.post(this.GLOBAL.urlHead + '/course/addCollection', {
						courseId: this.$route.params.courseId,
						userId: localStorage.getItem('userId')
					}).then(res => {})
				}
				this.ifCollect = !this.ifCollect;
			}
		}
	}
</script>

<style scoped>
	.courseDetail {
		width: 800px;
		margin: 0 auto;
		margin-top: 15px;
		margin-bottom: 20px;
	}
	
	.courseDeTitle {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		height: 50px;
		font-size: 22px;
		align-items: center;
	}
	
	.courseDeTitle img {
		height: 24px;
	}
	
	.courseVideo {
		height: 455px;
	}
	
	.userInfo {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		color: #666;
		padding: 5px 0;
	}
	
	.userInfo img {
		height: 32px;
		vertical-align: middle;
		margin-right: 5px;
	}
	
	.moreVideo {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.moreVideo img {
		height: 32px;
		vertical-align: middle;
	}
</style>