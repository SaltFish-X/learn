
### [[ERR_ASSERTION]: Chromium revision is not downloaded 解决方案](https://segmentfault.com/a/1190000012606616)

因为中国国情需要单独安装 `Chromium`

```
npm i --save puppeteer --ignore-scripts

PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install --save puppeteer 跳过
```
