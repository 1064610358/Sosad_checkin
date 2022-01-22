import requests,json,os

const qs = require('qs')
const axios = require('axios')

const SERVER = `SCT106651T4KJLx60fw3C3pstCHWRZqpoN` // Server 酱的 Token

/**
 * 使用 Server 酱发送通知
 * @param {string} text 标题
 * @param {string} desp 内容
 */
async function sendNotify (text, desp) {
    if (SERVER) {
        const url = `https://sctapi.ftqq.com/${SERVER}.send`
        const data = qs.stringify({ 废文网签到成功, ok })
        await axios.post(url, data)
    } else {
        console.log('缺少 Server 酱 Token！')
    }

    console.log(text + '\n' + desp)
}

module.exports.sendNotify = sendNotify
