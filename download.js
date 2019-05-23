const http = require('http')
const fs = require('fs')
const path = require('path')
const uui = require('uuid')

const downloadPage = (url='http://anmol.xyz') => {
  console.log('downloading ', url)
  const fetchPage = (urlF, callback) => {
    http.get(urlF, (response) => {
      let buff = ''
      response.on('data', (chunk) => { 
        buff += chunk
      })
      response.on('end', () => {
        callback(null, buff)
      })
    }).on('error', (error) => {
      console.error(`Got error: ${error.message}`)
      callback(error)
    })
  }

   const folderName = uui()
  fs.mkdirSync(folderName)
  fetchPage(url, (error, data)=>{
    if (error) return console.log(error)
    fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)  
    fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data)
    console.log('downloading is done in folder ', folderName)
  })
}

downloadPage(process.argv[2])