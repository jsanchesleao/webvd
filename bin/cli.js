#!/usr/bin/env node

const minimist = require('minimist')
const {main} = require('../src/main')

const argv = minimist(process.argv.slice(2), {boolean: 'unsafe'})

if (argv.unsafe) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

main(argv);

