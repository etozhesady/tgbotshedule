const { Telegraf } = require('telegraf')
require('dotenv').config()
const parser = require('./index.js')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Напиши ФИО студента которого ищешь'))
bot.on('text', (ctx) => {
    try{
        console.log('My context there => ', ctx.message.text)
        ctx.reply(ctx.message.text)

        // let promise = new Promise((resolve, reject) => {
        //     resolve(parser.tobot(ctx.message.text))
        // })

        let promise = new Promise(function(resolve, reject) {
            let res = parser.tobot(ctx.message.text)
            resolve(res)
            
        })
        promise.then(data => {
            console.log('promise data => ', data)
        })


        // promise.then((res) => {
        //     console.log('There promise =>', res)
        //     ctx.reply(res)
        // })
    } catch(e) {
        ctx.reply('Анус')
        console.error('catch error => ', e)
    }
   
})
bot.launch()