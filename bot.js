const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const parser = require('./index.js')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Напиши ФИО студента которого ищешь'))
bot.on('text', (ctx) => {
    try{
        console.log('My context there => ', ctx.message.text)
        ctx.reply(ctx.message.text)
  

        parser.tobot(ctx.message.text).then(data => {
            for(let i = 1; i < data.length; i++){
              ctx.reply(
                Markup.inlineKeyboard([
                  Markup.button.callback(data[i].name, data[i].id)
                ])
              )
            }

         })
 
    } catch(e) {
        ctx.reply('Анус')
        console.error('catch error => ', e)
    }
})
bot.launch()