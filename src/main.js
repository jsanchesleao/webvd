const ccrawler = require('ccrawler')
const {streamToFile} = require('./util')
const _ = require('lodash')

const executeCrawler = function(file, argv) {
  return function(tag) {
    let variables = _.cloneDeep(argv)
    variables.tag = tag
    return ccrawler.execFile(file, variables).then(streamToFile(tag))
  }
}

const doProcess = function(save, tags) {
  if (tags.length === 0) {
    console.log('Finished all tasks')
    return 'finish'
  }
  else {
    let head = tags[0]
    let tail = tags.slice(1)
    console.log('Tag ' + head);
    console.log('Enqueued: ' + JSON.stringify(tail))
    return save(
        parseInt(head))
          .then(() => doProcess(save, tail))
          .catch((err) => console.log('Error: ', err))
  }
}

const usage = 'Usage: webdl --config config  --tag 1-3'

const singleTag = arg => typeof arg === 'number' || arg.match(/^\d+$/)
const sequence = function(start, end) {
  let result = []
  let a = parseInt(start)
  let b = parseInt(end)
  for(let i = a; i <= b; i++) {
    result.push(i)
  }
  return result
}

const parseTagArg = arg => {
  if (singleTag(arg)){
    return [arg]
  }
  else {
    let parts = arg.match(/^(\d+)-(\d+)$/)
    if (!parts) {
      console.log(usage)
      process.exit(1)
    }
    return sequence(parts[1], parts[2])
  }
}

const main = function(argv) {
  const config = argv.config || argv.c

  if(!config) {
    console.log(usage);
    process.exit(1)
  }

  const tag = argv.tag || argv.t

  if (!tag) {
    console.log(usage);
    process.exit(1)
  }

  const tags = parseTagArg(tag)
  const save = executeCrawler(config, argv)

  doProcess(save, tags)
}

module.exports = {main, doProcess}
