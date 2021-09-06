const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')
const url = 'https://avn.kstu.kg/AVN_search_st.html'



function tobot(txt){
    return new Promise(function(resolve, reject) {
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
            const data = getData(response)
            console.log('tobot =>', data)
            return resolve(data)
  
        }).catch(err => {
            console.log('ERROR HANDLER ', err)
        })

    })

}

// table tbody tr td table tbody tr:nth-child(4) td:nth-child(3) table tbody td:nth-child(2)

let getData = html => {
    let data = [];
    const $ = cheerio.load(html)
    $('table tbody tr td table tbody tr:nth-child(4) td:nth-child(3) table tbody tr').each((i, elem) => {
        const tds = $(elem).find('td')
        const id = $(tds[0]).text()
        const name = $(tds[1]).text()
        const group = $(tds[3]).text()
        const tableRow = {id, name, group}
        data.push(tableRow)
      
    })
    console.log('data ', data)
    return data
}

// tobot('азат').then(data => {
//     console.log('shit ', data)
// })

module.exports.tobot = tobot