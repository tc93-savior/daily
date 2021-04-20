const fs = require('fs')
const minimist = require('minimist')
const spawn = require('child_process').spawn
const args = minimist(process.argv.slice(2))

let configFile = '../deploy/dev.conf'
let refreshPrefix = 'bamboo_dev/'

switch (args.env) {
  case 'dev':
    // default
    break;
  case 'pre':
    configFile = '../deploy/pre.conf'
    refreshPrefix = 'bamboo_pre/'
    break;
  case 'prod':
    configFile = '../deploy/prod.conf'
    refreshPrefix = 'bamboo/'
    break;
}

fs.readFile(configFile, (error, data) => {
  if (error) {
    console.log('读取配置上传文件失败')
  }

  let config = JSON.parse(data)

  // console.log(args)
  config.src_dir = config[`src_dir`] + args.page
  config.key_prefix = config[`key_prefix`] + args.page

  config = JSON.stringify(config)

  fs.writeFile('tmp.conf', config, (error) => {
    if (error) {
      console.log('写入配置上传文件失败')
    }
  })
})

fs.readFile('refresh.txt', (error, data) => {
  if (error) {
    console.log('读取刷新文件失败')
  }
  data = data + refreshPrefix + args.page

  fs.writeFile('tmp.txt', data, (error) => {
    if (error) {
      console.log('刷新文件写入失败')
    }
  })
})

let upload = spawn('sh', ['upload.sh', 'tmp.conf']);

upload.stdout.on('data', (thunk) => {
  console.log(thunk.toString())
})

upload.stderr.on('data', (thunk) => {
  console.log(thunk.toString())
})

upload.on('exit', (code) => {
  let refresh = spawn('qshell', ['cdnrefresh', '--dirs', '-i', 'tmp.txt']);

  refresh.stdout.on('data', (thunk) => {
    console.log(thunk.toString())
  })

  refresh.stderr.on('data', (thunk) => {
    console.log(thunk.toString())
  })
})



// exec(`sh upload.sh tmp.conf`, function (err, stdout, stderr) {
//   // callback()
//   console.log(stdout)

//   exec('qshell cdnrefresh --dirs -i tmp.txt', (err, stdout, stderr) => {
//     console.log(stdout)
//   })
// })
