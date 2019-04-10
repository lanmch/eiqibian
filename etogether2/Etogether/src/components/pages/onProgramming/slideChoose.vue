<template>
	<div class="slideShow2">
	  <div class="block">
	    <el-carousel trigger="click" height="100px"  :autoplay = 'false' @change="changePage">
	      <el-carousel-item v-for='(items,index) in proTotal'>
	      	<ul class="slideShow2Ul">
	      		<li v-for="(item,index) in slideShows"> 
	      			{{item.questionLabel}}：{{item.questionId}}
	      		</li>
	      	</ul>
	      </el-carousel-item>
	    </el-carousel>
	  </div>
  	</div>
</template>

<script>
	import Element from 'element-ui'
	import axios from 'axios'
	export default {
		name: 'slideShow',
		data() {
			return {
				slideShows: [],
				proTotal: 1,
				filterByLanguage: '',
				filterByLabel: ''
			}
		},
		created() {
			axios.post(this.GLOBAL.urlHead + '/program/getQuestionList', {
				"pageNum": 1, //最小为1
				"filterByLanguage": 1, //0：全部 1：Python(非空)
				"filterByLabel": 2 //0: 全部 1：初级 2：中级 3：高级(非空)
			}).then(res => {
				this.slideShows = res.data.data.programList
				this.proTotal = res.data.data.totalPages
			})
		},
		methods: {
			changePage(index) {

			}
		},
	}
</script>
<style scoped>
.el-carousel__indicators{
	display: none;
}
	.slideShow2 img {
		width: 100%;
		height: 100%;
	}
	
	.slideShow2 ul {
		width: 80%;
		height: 80%;
		margin: 10px auto;
	}
	
	.slideShow2 ul li {
		height: 30px;
		width: 94%;
		border: 1px solid #99CCFF;
		background-color: #FFFFFF;
		line-height: 30px;
		padding: 0 20px;
		font-size: 15px;
	}
	
	.slideShow2Ul li:hover {
		color: white;
		cursor: pointer;
	}
	
	.slideShow2 ul li:nth-child(2n+1) {
		margin-bottom: 10px;
	}
	
	.el-carousel {
		border-radius: 5px;
	}
	
	.el-carousel__arrow {
		border-radius: 0;
		height: 66px;
	}
	
	.el-carousel__arrow:hover {
		background-color: rgba(0, 0, 0, 0.4);
	}
	
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}
	
	.el-carousel__indicator {
		display: none;
	}
</style>