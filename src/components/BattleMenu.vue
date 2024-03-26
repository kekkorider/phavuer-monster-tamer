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
		</Container>

		<Container :x="0" :y="444" :visible="monsterAttackSubmenuVisible">
			<Text text="Slash" :x="55" :y="22" :style="commandsTextStyle" />
			<Text text="Smoke" :x="240" :y="22" :style="commandsTextStyle" />
			<Text text="-" :x="55" :y="70" :style="commandsTextStyle" />
			<Text text="-" :x="240" :y="70" :style="commandsTextStyle" />
		</Container>
	</Rectangle>
</template>

<script setup>
import { shallowRef, computed, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import { useGame, Rectangle, Container, Text } from 'phavuer'

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

const MENU_OPTIONS = Object.freeze({
	FIGHT: 'FIGHT',
	SWITCH: 'SWITCH',
	ITEM: 'ITEM',
	RUN: 'RUN',
})

const commandsTextStyle = Object.freeze({
	fontSize: '30px',
	color: '#000',
})

const mainText = computed(() => {
	return `What should\n${props.monsterName} do next?`
})

const { enter: enterKey, space: spaceKey, escape: escapeKey } = useMagicKeys()

// Enter
watch([enterKey, spaceKey], value => {
	if (value.every(item => !item)) return
	if (!mainTextVisible.value) return

	mainTextVisible.value = false
	mainBattleMenuVisible.value = false
	monsterAttackSubmenuVisible.value = true
})

watch(escapeKey, value => {
	if (!value) return
	if (!monsterAttackSubmenuVisible.value) return

	mainTextVisible.value = true
	mainBattleMenuVisible.value = true
	monsterAttackSubmenuVisible.value = false
})
</script>
