<template>
	<Scene :name="SCENES.PRELOAD" @preload="onPreload" @create="onCreate" />
</template>

<script setup>
import { Scene, useGame } from 'phavuer'
import { SCENES } from '../const.js'
import assets from '../assets.json'

const game = useGame()

function onPreload(scene) {
	assets.image.forEach(item => scene.load.image(...item))
}

function onCreate(scene) {
	game.scene.stop(SCENES.PRELOAD)
	game.scene.start(SCENES.GAME)
}
</script>
