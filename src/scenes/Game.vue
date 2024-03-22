<template>
	<Scene :name="SCENES.GAME" @create="onCreate">
		<Image :texture="'img_forest_background'" :x="0" :y="0" :origin="0.5" />

		<Player
			:controls="true"
			:width="100"
			:height="100"
			:x="game.scale.width / 2"
			:y="game.scale.height / 2"
			:fillColor="0x004455"
		/>

		<Player :width="50" :height="50" :x="game.scale.width / 3" :y="30" />
	</Scene>
</template>

<script setup>
import { Scene, useGame, Image } from 'phavuer'
import Player from '../Player.vue'
import { SCENES } from '../const.js'

const game = useGame()

function onCreate() {
	console.log('Game scene created')
}
</script>
