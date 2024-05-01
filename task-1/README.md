## ViewSonic Assignment task-1

### 該題目為何這麼寫？
在 task-1 的題目中，我想呈現從 0 到 1 建置 React 專案的能力、對於 webpack 的熟悉度、將功能發布成套件的能力：
- 建置 `webpack.config.js`，設定入口點為 `./src/components/ResizableEditor`，`npm run build` 後，輸出為 dist folder 底下的同名 js 檔案，可供其他專案使用。透過 `externals` 依賴外部的  React。
- 設定 `webpack.dev.js`，可透過 `npm run dev` 在 local 開發，入口點是 `preview.jsx`，使用 `ReactRefreshPlugin` 來 hot reload 更新異動。設定 devServer，並保留 source map 方便在 local 開發中下中斷點 debug。
- 建立 `environment.js` for local 開發環境的設定。
- 建立 `.prettierrc`, `eslintrc`, `editorconfig`，假設該專案有其他人共同開發有一定的 coding 規範。
- 建立 `babel.config.js`，轉換 ECMAScript 2015+ 版本為向下兼容的 JS；轉換 React 的 JSX 語法；Babel 自動判斷檔案是使用 CommonJS 還是 ES module。
- 建立 `preview.jsx`，之後若有其他新功能，可在此中引入並開發。
- 將該功能發布為一個 npm 套件：如 `resizable-editor-install` folder 中，可看到安裝 task-1 的功能並啟用，npm 套件網址：[https://www.npmjs.com/package/view-sonic-assignments-resizable-editor?activeTab=readme](https://www.npmjs.com/package/view-sonic-assignments-resizable-editor?activeTab=readme)
