<template>
	<Scene :name="SCENES.BATTLE" @create="onCreate">
		<Image :texture="'battle_bg_forest'" :x="0" :y="0" :origin="0" />
		<Image :texture="'monster_carnodusk'" :x="768" :y="144" :origin="0.5" />
		<Image
			:texture="'monster_iguanignite'"
			:x="256"
			:y="316"
			:origin="0.5"
			:flipX="true"
		/>

		<MonsterPanel :monster-name="'CARNODUSK'" :x="0" :y="0" />
		<MonsterPanel :monster-name="'IGUANIGNITE'" :x="556" :y="318" />
	</Scene>
</template>

<script setup>
import { Scene, Image } from 'phavuer'
import { SCENES } from '../const.js'
import MonsterPanel from '../components/MonsterPanel.vue'

function onCreate(scene) {
	console.log(`${scene.scene.key}:create invoked`)
}
</script>
