const { Telegraf } = require('telegraf')
require('dotenv').config()
const parser = require('./index.js')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Напиши ФИО студента которого ищешь'))
bot.on('text', async (ctx) => {
    try{
        console.log('My context there => ', ctx.message.text)
        ctx.reply(ctx.message.text)
        const srchdata = await parser.tobot(ctx.message.text)
    } catch(e) {
        ctx.reply('Анус')
        console.error(e)
    }
   
})
bot.launch()