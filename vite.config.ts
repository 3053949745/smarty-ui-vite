/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unocss from "./config/unocss";
const  rollupOptions = {
  external: ["vue"],
  output: {
    assetFileNames: "[name].[ext]",
    exports: "named",
    globals: {
      vue: "Vue",
    },
  },
};
export default defineConfig({
  plugins: [
    vue(),
    // 添加JSX插件
    vueJsx(),
     // 添加UnoCSS插件
    Unocss()
  ],
  // 添加库模式配置
  build: {
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    sourcemap: true, // 输出单独 source文件
    brotliSize: true,  // 生成压缩大小报告
    cssCodeSplit: true,   // 追加
    lib: {
      entry: "./src/entry.ts",
      name: "MinSmartyUI",
      fileName: "min-smarty-ui",
      // 导出模块格式
      formats: ["esm", "umd","iife"],
    },
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/]
    }
  }
});
