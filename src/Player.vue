<template>
	<Rectangle v-bind="rectParams" ref="playerRef">
		<slot />
	</Rectangle>
</template>

<script setup>
import { onMounted, nextTick, shallowReactive, watch, shallowRef } from 'vue'
import { Rectangle, refObj, onPreUpdate } from 'phavuer'
import { useMagicKeys } from '@vueuse/core'

const props = defineProps({
	controls: {
		type: Boolean,
		default: false,
	},
	width: {
		type: Number,
		default: 120,
	},
	height: {
		type: Number,
		default: 30,
	},
	x: {
		type: Number,
		default: 0,
	},
	y: {
		type: Number,
		default: 0,
	},
	fillColor: {
		type: Number,
		default: 0xcc4455,
	},
})

const rectParams = shallowReactive({
	width: props.width,
	height: props.height,
	x: props.x,
	y: props.y,
	fillColor: props.fillColor,
	origin: 0.5,
})

const direction = shallowReactive({
	left: 0,
	right: 0,
	up: 0,
	down: 0,
})

const playerRef = refObj(null)
const playerSpeed = shallowRef(1.5)

const {
	left: leftKey,
	a: aKey,
	right: rightKey,
	d: dKey,
	up: upKey,
	w: wKey,
	down: downKey,
	s: sKey,
	shift: shiftKey,
} = useMagicKeys()

onMounted(async () => {
	await nextTick()

	console.log('Player mounted')

	if (!props.controls) return
})

onPreUpdate(() => {
	if (!props.controls) return

	playerRef.value.x += (direction.right - direction.left) * playerSpeed.value
	playerRef.value.y += (direction.down - direction.up) * playerSpeed.value
})

watch([leftKey, aKey], values => {
	direction.left = values.some(value => value === true) ? 1 : 0
})

watch([rightKey, dKey], values => {
	direction.right = values.some(value => value === true) ? 1 : 0
})

watch([upKey, wKey], values => {
	direction.up = values.some(value => value === true) ? 1 : 0
})

watch([downKey, sKey], values => {
	direction.down = values.some(value => value === true) ? 1 : 0
})

watch(shiftKey, value => {
	playerSpeed.value = value ? 3 : 1.5
})
</script>
