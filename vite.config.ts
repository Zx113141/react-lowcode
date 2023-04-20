import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:[
      {
        find:'@',replacement:path.resolve(__dirname, './src')
      },
      { find: /^~antd/, replacement: path.resolve('./', 'node_modules/antd/') },
    ]
  },
  css:{
    modules:{
      localsConvention:'camelCase'
    },
    preprocessorOptions:{
      less:{
        charset:false,
        javascriptEnabled: true,
        additionalData: '@import "./src/assets/default/style.less";',
      }
    }
  }
})
