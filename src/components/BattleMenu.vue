<template>
	<Rectangle
		:x="4"
		:y="game.scale.height - rectHeight"
		:width="game.scale.width - 8"
		:height="rectHeight - 4"
		:fillColor="0xede4f3"
		:origin="0"
		:lineWidth="8"
		:strokeColor="0x34434a"
	>
		<Text
			:text="mainText"
			:x="20"
			:y="468"
			:style="commandsTextStyle"
			:visible="mainTextVisible"
		/>

		<Container
			:x="520"
			:y="game.scale.height - rectHeight"
			:visible="mainBattleMenuVisible"
		>
			<Rectangle
				:x="0"
				:y="0"
				:width="500"
				:height="rectHeight - 4"
				:origin="0"
				:lineWidth="8"
				:strokeColor="0x905ac2"
			></Rectangle>

			<Text
				:text="MENU_OPTIONS.FIGHT"
				:x="55"
				:y="22"
				:style="commandsTextStyle"
			/>

			<Text
				:text="MENU_OPTIONS.SWITCH"
				:x="240"
				:y="22"
				:style="commandsTextStyle"
			/>

			<Text
				:text="MENU_OPTIONS.ITEM"
				:x="55"
				:y="70"
				:style="commandsTextStyle"
			/>

			<Text
				:text="MENU_OPTIONS.RUN"
				:x="240"
				:y="70"
				:style="commandsTextStyle"
			/>

			<Image
				:texture="'ui_cursor'"
				v-bind="mainBattlePanelCursorPos[cursorPositionIndex]"
				:scale="2"
			/>
		</Container>

		<Container :x="0" :y="444" :visible="monsterAttackSubmenuVisible">
			<Text :text="MOVES[0].name" :x="55" :y="22" :style="commandsTextStyle" />
			<Text :text="MOVES[1].name" :x="240" :y="22" :style="commandsTextStyle" />
			<Text :text="MOVES[2].name" :x="55" :y="70" :style="commandsTextStyle" />
			<Text :text="MOVES[3].name" :x="240" :y="70" :style="commandsTextStyle" />

			<Image
				:texture="'ui_cursor'"
				v-bind="mainBattlePanelCursorPos[cursorPositionIndex]"
				:scale="2"
			/>
		</Container>
	</Rectangle>
</template>

<script setup>
import { shallowRef, computed, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import { useGame, Rectangle, Container, Text, Image } from 'phavuer'
import { gsap } from 'gsap'

const props = defineProps({
	monsterName: {
		type: String,
		required: true,
	},
})

const game = useGame()

const mainTextVisible = shallowRef(true)
const mainBattleMenuVisible = shallowRef(true)
const monsterAttackSubmenuVisible = shallowRef(false)

const rectHeight = shallowRef(132)
const cursorPositionIndex = shallowRef(0)

const MENU_OPTIONS = Object.freeze({
	FIGHT: 'FIGHT',
	SWITCH: 'SWITCH',
	ITEM: 'ITEM',
	RUN: 'RUN',
})

const MOVES = Object.freeze([
	{ name: 'Slash', power: 40 },
	{ name: 'Smoke', power: 30 },
	{ name: '-', power: 0 },
	{ name: '-', power: 0 },
])

const mainBattlePanelCursorPos = [
	{ x: 42, y: 38 },
	{ x: 227, y: 38 },
	{ x: 42, y: 86 },
	{ x: 227, y: 86 },
]

const commandsTextStyle = Object.freeze({
	fontSize: '30px',
	color: '#000',
})

const mainText = computed(() => {
	return `What should\n${props.monsterName} do next?`
})

const {
	enter: enterKey,
	space: spaceKey,
	escape: escapeKey,
	left: leftKey,
	a: aKey,
	up: upKey,
	w: wKey,
	right: rightKey,
	d: dKey,
	down: downKey,
	s: sKey,
} = useMagicKeys()

// Enter
watch([enterKey, spaceKey], value => {
	if (value.every(item => !item)) return

	if (mainTextVisible.value) {
		switch (cursorPositionIndex.value) {
			case 0:
				mainTextVisible.value = false
				mainBattleMenuVisible.value = false
				monsterAttackSubmenuVisible.value = true
				break
			case 1:
				console.warn('Switching monster')
				break
			case 2:
				console.warn('Using item')
				break
			case 3:
				console.warn('Running away')
				break
		}
	} else {
		console.warn(`Using move: ${MOVES[cursorPositionIndex.value].name}`)
	}
})

// Arrow keys
watch([leftKey, aKey], value => {
	if (value.every(item => !item)) return

	cursorPositionIndex.value = gsap.utils.wrap(
		0,
		4,
		cursorPositionIndex.value - 1
	)
})

watch([upKey, wKey], value => {
	if (value.every(item => !item)) return

	cursorPositionIndex.value = gsap.utils.wrap(
		0,
		4,
		cursorPositionIndex.value - 2
	)
})

watch([rightKey, dKey], value => {
	if (value.every(item => !item)) return

	cursorPositionIndex.value = gsap.utils.wrap(
		0,
		4,
		cursorPositionIndex.value + 1
	)
})

watch([downKey, sKey], value => {
	if (value.every(item => !item)) return

	cursorPositionIndex.value = gsap.utils.wrap(
		0,
		4,
		cursorPositionIndex.value + 2
	)
})

// Escape
watch(escapeKey, value => {
	if (!value) return
	if (!monsterAttackSubmenuVisible.value) return

	cursorPositionIndex.value = 0

	mainTextVisible.value = true
	mainBattleMenuVisible.value = true
	monsterAttackSubmenuVisible.value = false
})
</script>
