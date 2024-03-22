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

		<Player
			v-if="false"
			:controls="true"
			:width="100"
			:height="100"
			:x="game.scale.width / 2"
			:y="game.scale.height / 2"
			:fillColor="0x004455"
		/>

		<Player
			v-if="false"
			:width="50"
			:height="50"
			:x="game.scale.width / 3"
			:y="30"
		/>
	</Scene>
</template>

<script setup>
import { Scene, useGame, Image } from 'phavuer'
import Player from '../Player.vue'
import { SCENES } from '../const.js'

const game = useGame()

function onCreate(scene) {
	console.log(`${scene.scene.key}:create invoked`)
}
</script>
