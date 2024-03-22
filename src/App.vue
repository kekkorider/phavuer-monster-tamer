<template>
	<Game :config="gameConfig">
		<PreloadScene />
		<BattleScene :autoStart="false" />
	</Game>
</template>

<script setup>
import { Game } from 'phavuer'
import PreloadScene from './scenes/Preload.vue'
import BattleScene from './scenes/Battle.vue'

const gameConfig = {
	autoStart: true,
	pixelArt: true,
	backgroundColor: 0xdd0000,
	scale: {
		width: 1024,
		height: 576,
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
	},
}
</script>
