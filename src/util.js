const request = require('request')
const fs = require('fs')
const mkdirp = require('mkdirp')
const minimist = require('minimist')
const path = require('path')

const args = minimist(process.argv.slice(2))

const folder = function() {
  return (args.dir || args.d || './download') + '/'
}

const basename = function(name) {
  if (!name) {
    return name
  }
  return path.parse(name).name
}

const prefix = function() {
  return args.prefix || args.p || basename(args.config) || basename(args.c) || ''
}

const formatTag = tag => {
  const nTag = parseInt(tag);
  if (isNaN(nTag)) {
    return nTag
  }
  else {
    return (nTag < 100 ? '0' : '') + (nTag < 10 ? '0' : '') + nTag;
  }
}

const streamToFile = tag => url => {
  console.log('Downloading from: ' + url)

  const fileName = folder() + prefix() + formatTag(tag) + '.mp4'

  return new Promise(function(resolve, reject) {

    mkdirp(folder(), function(err) {

      if (err) {
        return reject(err)
      }

      const reqStream = request(url)
      const fileStream = fs.createWriteStream(fileName)
      reqStream.pipe(fileStream)

      let acc = 0;
      reqStream.on('data', function(data) {
        acc += data.length
        process.stdout.write("Progress " + (acc/(1024*1024)).toFixed(2) + " MB \r")
      })

      fileStream.on('finish', () => {
        console.log('\nFinished tag ' + tag + "\n")
        resolve(fileName)
      })
    })
  })
}

module.exports = {streamToFile}
