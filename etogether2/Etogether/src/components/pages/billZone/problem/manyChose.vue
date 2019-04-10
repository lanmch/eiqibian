<template>
    <div>
        <div class="oneDetail">
                <!-- <div class="oneType">多选</div> -->
                <div class="onePro">
                	<div class="oneProdiv">
                		<h4>{{index+length+1}}.</h4>{{twoPro.questionTitle}}
                		 <span>({{twoPro.questionScore}}分)</span>
                	</div>
                    <div class="oneProdiv">
	                    	<div class="oneProdivOp">
	                    		<div class="BTN" 
	                    		:class="{BTNchoose:arrTwo.includes('A')}" 
	                    		@click="chooseOneAnswerA">
	                    		A
	                    	</div>
                    	<!--<span>{{twoPro.questionOption.optionA}}</span>-->
                    	<span v-html='twoPro.questionOption.optionA'></span>
                    	</div>
                    	
                    	<div class="oneProdivOp">
	                    	<div class="BTN" 
	                    		:class="{BTNchoose:arrTwo.includes('B')}" 
	                    		@click="chooseOneAnswerB">
	                    		B
	                    	</div>
	                    	<!--<span>{{twoPro.questionOption.optionB}}</span>-->
	                    	<span v-html='twoPro.questionOption.optionB'></span>
                    	</div>
                    	
                    	<div class="oneProdivOp">
	                    	<div class="BTN" 
	                    		:class="{BTNchoose:arrTwo.includes('C')}" 
	                    		@click="chooseOneAnswerC">
	                    		C
	                    	</div>
	                    	<!--<span>{{twoPro.questionOption.optionC}}</span>-->
	                    	<span v-html='twoPro.questionOption.optionC'></span>
                    	</div>
                    	
                    	<div class="oneProdivOp">
	                    	<div class="BTN" 
	                    		:class="{BTNchoose:arrTwo.includes('D')}" 
	                    		@click="chooseOneAnswerD">
	                    		D
	                    	</div>
	                    	<!--<span>{{twoPro.questionOption.optionD}}</span>-->
	                    	<span v-html='twoPro.questionOption.optionD'></span>
                    	</div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'manyChose',
    data() {
			return {
				arrTwo: []
			}
        },
        props:{
            twoPro:{
                type:Object,
                required:true
            },
            index:{
                type:Number,
                required:true
            },
            length:{
            	type:Number,
            	required:true
            }
        },
        methods:{
            chooseOneAnswerA() {
				if (this.arrTwo.includes('A')) {
					this.arrTwo = this.arrTwo.filter(function(ele) {
						return ele != 'A';
					});
				} else {
					this.arrTwo.push('A');
				}
				let chooseData = {
					answer: this.arrTwo,
					index: this.index
				}
				this.$emit('chooseMulti',chooseData)
			},
			chooseOneAnswerB() {
				if (this.arrTwo.includes('B')) {
					this.arrTwo = this.arrTwo.filter(function(ele) {
						return ele != 'B';
					});
				} else {
					this.arrTwo.push('B');
				}
				let chooseData = {
					answer: this.arrTwo,
					index: this.index
				}
				this.$emit('chooseMulti',chooseData)
			},
			chooseOneAnswerC() {
				if (this.arrTwo.includes('C')) {
					this.arrTwo = this.arrTwo.filter(function(ele) {
						return ele != 'C';
					});
				} else {
					this.arrTwo.push('C');
				}
				let chooseData = {
					answer: this.arrTwo,
					index: this.index
				}
				this.$emit('chooseMulti',chooseData)
			},
			chooseOneAnswerD() {
				if (this.arrTwo.includes('D')) {
					this.arrTwo = this.arrTwo.filter(function(ele) {
						return ele != 'D';
					});
				} else {
					this.arrTwo.push('D');
				}
				let chooseData = {
					answer: this.arrTwo,
					index: this.index
				}
				this.$emit('chooseMulti',chooseData)
			},
        }
}
</script>

<style scoped>
.BTN {
		display: inline-block;
		width: 28px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		border: 2px solid #99ccff;
		border-radius: 50%;
		color: #99ccff;
		cursor: pointer;
		margin-right: 8px;
	}
	
	.BTNchoose {
		display: inline-block;
		width: 28px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		background-color: #99ccff;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
    }
    .oneType {
		height: 22px;
		line-height: 22px;
		text-align: center;
		width: 40px;
		border: 2px solid #ff99cc;
		color: #ff99cc;
		font-size: 12px;
        margin-right: 15px;
        float: left;
	}
	
	.onePro {
		display: flex;
		flex-direction: column;
		margin-left: 55px;
	}
	
	.onePro .oneProdivOp {
		margin-bottom: 8px;
		display: flex;
		align-items: baseline;
	}
	.oneProdiv span{
		display: inline-block;
		margin-left: 8px;
	}
	.onePro h4 {
		display: inline-block;
	}
	
	.oneProdiv {
		margin-bottom: 20px;
		display: inline-block;
	}
	
	.onePro span {
		display: inline-block;
		margin-left: 8px;
	}
		.onePro .oneProdivOp {
		margin-bottom: 8px;
	}
	
</style>
