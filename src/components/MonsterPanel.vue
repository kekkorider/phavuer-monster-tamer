<template>
	<Container>
		<Image
			:texture="'health_bar_background'"
			:x="0"
			:y="0"
			:origin="0"
			:scaleY="0.9"
		/>

		<Text
			:text="monsterName"
			:x="30"
			:y="20"
			:style="{
				color: '#7e3d3f',
				fontSize: '32px',
			}"
			ref="monsterNameRef"
		/>

		<Text
			v-if="monsterNameRef"
			:text="'L5'"
			:x="monsterNameRef.displayWidth + 40"
			:y="23"
			:style="{
				color: '#ed474b',
				fontSize: '28px',
			}"
		/>

		<Text
			:text="'HP'"
			:x="30"
			:y="55"
			:style="{
				color: '#ff6505',
				fontSize: '24px',
				fontStyle: 'italic',
			}"
		/>

		<Container :x="68" :y="68">
			<Image
				:texture="'health_bar_left'"
				:x="0"
				:y="0"
				:originX="0"
				:originY="0.5"
				:scaleY="0.7"
				ref="healthBarLeftRef"
			/>

			<Image
				v-if="healthBarLeftRef"
				:texture="'health_bar_mid'"
				:x="healthBarLeftRef.displayWidth"
				:y="0"
				:displayWidth="360"
				:originX="0"
				:originY="0.5"
				:scaleY="0.7"
				ref="healthBarMidRef"
			/>

			<Image
				v-if="healthBarMidRef"
				:texture="'health_bar_right'"
				:x="healthBarMidRef.x + healthBarMidRef.displayWidth"
				:y="0"
				:originX="0"
				:originY="0.5"
				:scaleY="0.7"
			/>
		</Container>

		<Text
			:text="'25/25'"
			:x="443"
			:y="80"
			:originX="1"
			:originY="0"
			:style="{
				color: '#7e3d3f',
				fontSize: '16px',
			}"
		/>
	</Container>
</template>

<script setup>
import { Container, Text, Image, refObj } from 'phavuer'

defineProps({
	monsterName: {
		type: String,
		required: true,
	},
})

const monsterNameRef = refObj(null)
const healthBarLeftRef = refObj(null)
const healthBarMidRef = refObj(null)
</script>
