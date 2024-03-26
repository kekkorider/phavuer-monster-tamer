import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import phaserAssetsRollupPlugin from 'phaser-assets-loader/plugins/rollupPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    phaserAssetsRollupPlugin({
      patterns: [
        { type: 'image', prefix: 'monster_', dir: '/images/monsters', rule: /^\w+\.(png|svg)$/ },
        { type: 'image', prefix: 'battle_bg_', dir: '/images/battle_backgrounds', rule: /^\w+\.(png|svg)$/ },
        { type: 'image', prefix: 'health_bar_', dir: '/images/health_bar', rule: /^\w+\.(png|svg)$/ },
        { type: 'image', prefix: 'ui_', dir: '/images/ui', rule: /^\w+\.(png|svg)$/ }
      ],
      output: 'src/assets.json'
    }),
  ],
})
