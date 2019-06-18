var x = process.argv;
var input = process.argv.filter(x => x.startsWith('--data'));
console.log('Input: ', input);

/*
const mainPackageJson = require('../package.json');
const glob = require('glob');
const fs = require('fs');

glob.sync('./projects/common/package.json')
   .forEach(location =>
      fs.writeFileSync(location, JSON.stringify({
         ...JSON.parse(fs.readFileSync(location)),
         version: mainPackageJson.version
      }, null, 3))
);*/