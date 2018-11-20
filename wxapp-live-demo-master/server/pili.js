/*
 * pili.js
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const PLService = require('./PLService')
const PILI = new PLService()

/**
 * 这里替换成七牛的 AK，SK
 */
PILI.setAuthorization('INFL96vP3zO08XT4I3FERymKlgWcFjFFR_ar2AZK', 'ZIHpbaQ3Q90d4DbTV96JGe2C4LZdVoOhtiid5yFN')

/**
 * 这里替换成自己直播云中的推流地址和播放地址
 */
PILI.setDomain({
  rtmpPublish: 'pili-publish.byunfu.com',
  rtmpPlay: 'pili-live-rtmp.byunfu.com'
})

/**
 * 这里替换成自己直播云中的空间名称
 */
PILI.setSpace('byun001')

module.exports = PILI
