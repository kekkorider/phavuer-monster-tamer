<template>
	<Game :config="gameConfig">
		<PreloadScene />
		<GameScene :autoStart="false" />
	</Game>
</template>

<script setup>
import { Game } from 'phavuer'
import PreloadScene from './scenes/Preload.vue'
import GameScene from './scenes/Game.vue'

const gameConfig = {
	width: 960,
	height: 540,
	autoStart: true,
}
</script>
