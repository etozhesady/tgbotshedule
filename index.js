const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')
const url = 'https://avn.kstu.kg/AVN_search_st.html'

function tobot(txt){
    nightmare
        .goto(url)
        .wait('body')
        .click('.submit[type="submit"]')
        .wait('div#ReportViewerControl_ctl04_ctl03')
        .type('#ReportViewerControl_ctl04_ctl03_txtValue', txt)
        .click('#ReportViewerControl_ctl04_ctl00')
        .wait(1000)
        .evaluate(() => document.querySelector('body').innerHTML)
        .end()
        .then(response => {
            const promise = new Promise(function(resolve, reject) {
                const pdata = getData(response)
                resolve(pdata)
            })
            promise.then(pdata => {
                console.log('parser prom then data => ', pdata)
                
            })
        }).catch(err => {
            console.log('ERROR HANDLER ', err)
        })
    
}

let getData = html => {
    data = [];
    const $ = cheerio.load(html)
    $('table tbody tr td table tbody tr:nth-child(4) td:nth-child(3) table tbody td:nth-child(2)').each((i, elem) => {
        data.push({
            name : $(elem).text(),
            link : $(elem).find('a').attr('href')
        })
    })
    return data
}

let p = new Promise(function(resolve, reject) {
    let shit = tobot('Азат')
    resolve(shit)
})

p.then(data => {
    console.log('SHIT => ', data)
})


module.exports.tobot = tobot