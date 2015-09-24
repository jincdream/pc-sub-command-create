'use strict'
var child = require('child_process')
var spawn = child.spawn
var shell = child.execSync
var path  = require('path')
var createTime = new Date
var YEAR  = +createTime.getFullYear()
var MONTH = +createTime.getMonth()+ 1
var DAY   = +createTime.getDate()
    YEAR  = YEAR < 10 ? '0' + YEAR : YEAR
    MONTH = MONTH < 10 ? '0' + MONTH : MONTH
    DAY   = DAY < 10 ? '0' + DAY : DAY
var _MOBILE = !1
var GLOABAL_CONFIG = {
  'a':'zzs',
  'b':'ca',
  'c':'vn.p',
  'f' : 'uto',
  'd' :'.co',
  'e':'m.c',
  'g' :'n',
  'h' : 'on',
  'y':'lin',
  'o': (169687 - 12 + 5)/7/3,
  'p':'1',
  'x' : '.',
  'q':'9',
  'r':'2',
  's':'6',
  't':'5',
  'u':'4'
}

// try{
//   GLOABAL_CONFIG = require('pc-sub-conf.js')
// }
// https://github.com/fex-team/fis3-command-release/blob/master/lib/watch.js#L60-L80

var respawn = function(argv) {
  var child = spawn(argv[0], argv.slice(1).concat('--child-flag'));
  console.log()
  shell('node ' + argv.slice(1).join(' '))
  child.stderr.pipe(process.stderr);
  child.stdout.on('data', function(data) {
    if (~data.toString('utf-8').indexOf('Currently running fis3')) {
      return;
    }
    process.stdout.write(data);
  });
  child.on('exit', function(code, signal) {
    process.on('exit', function() {
      if (signal) {
        process.kill(process.pid, signal);
      } else {
        process.exit(code);
      }
    });
  });
  process.on('exit',function(){
    console.log('exit')
  })
  process.kill(process.pid)
  return child;
}
var geth = function(o){
  return o.a + o.c + o.b + o.f + o.d + o.e + o.g
}
var getReleaseArg = function(){
  var argv = []
  process.argv.forEach(function(arg,i,all){
    i <= 1 && (argv[i] = arg)
  })
  ;[].push.apply(argv,['release','-L','--child-flag'])
  return argv
}
var oo = GLOABAL_CONFIG
var watch = function() {
  var child = respawn(getReleaseArg());

  child.on('exit', function(code) {
    code || watch();
  });
}
var init = function(_TYPE, _DIR , cli ,env) {
  var _ZT_WAP = ''
    // var _ZT_WAP = '_wap'
  var _ZT_SRC    = 'http://'+ geth(oo) + '/svn/other/doc/documents/pc-sub-zt-module-work/output/ztmodule/'
  var _EDITER_DIR= 'http://'+ geth(oo) + '/svn/other/doc/documents/pc-sub-zt-module-work/output/edit/'
  var _ZT_CONFIG = {
    pconline: {
      source: _ZT_SRC + '/pconline.html',
      count: 'http://count5.pconline.com.cn/newcount/count.php?channel=3936',
      site: "pconline"
    },
    pcauto: {
      source: _ZT_SRC + '/pcauto.html',
      count: 'http://count.pcauto.com.cn/count.php?channel=5909',
      site: "pcauto"
    },
    pcgames: {
      source: _ZT_SRC + '/pcgames.html',
      count: 'http://count.pcgames.com.cn/count.php?channel=1065',
      site: "pcgames"
    },
    youxiB: {
      source: 'http://www.pcgames.com.cn/global/zt_noad/index.html',
      site: "youxiB"
    },
    pclady: {
      source: _ZT_SRC + '/pclady.html',
      count: 'http://count.pclady.com.cn/count.php?channel=1598',
      site: "pclady"
    },
    pcbaby: {
      source: _ZT_SRC + '/pcbaby.html',
      count: 'http://count.pcbaby.com.cn/count.php?channel=11',
      site: "pcbaby"
    },
    pchouse: {
      source: _ZT_SRC + '/pchouse.html',
      count: 'http://count.pchouse.com.cn/count.php?channel=2166',
      site: "pchouse"
    },
    //mobile
    mobilepconline: {
      source: _ZT_SRC + '/pconline-m.html',
      count: 'hhttp://count5.pconline.com.cn/newcount/count.php?channel=9522',
      site: "pconline"
    },
    mobilepcauto: {
      source: _ZT_SRC + '/pcauto-m.html',
      count: 'http://count.pcauto.com.cn/count.php?channel=8169',
      site: "pcauto"
    },
    mobilepcgames: {
      source: _ZT_SRC + '/pcgames-m.html',
      count: 'http://count.pcbaby.com.cn/count.php?channel=3614',
      site: "pcgames"
    },
    mobilepclady: {
      source: _ZT_SRC + '/pclady-m.html',
      count: 'http://count.pcgames.com.cn/count.php?channel=5177',
      site: "pclady"
    },
    mobilepcbaby: {
      source: _ZT_SRC + '/pcbaby-m.html',
      count: 'http://count.pchouse.com.cn/count.php?channel=2627',
      site: "pcbaby"
    },
    mobilepchouse: {
      source: _ZT_SRC + '/pchouse-m.html',
      count: 'http://count.pclady.com.cn/count.php?channel=5536',
      site: "pchouse"
    }
  }
  _ZT_CONFIG.o   = _ZT_CONFIG.pconline
  _ZT_CONFIG.a   = _ZT_CONFIG.pcauto
  _ZT_CONFIG.g   = _ZT_CONFIG.pcgames
  _ZT_CONFIG.l   = _ZT_CONFIG.pclady
  _ZT_CONFIG.b   = _ZT_CONFIG.pcbaby
  _ZT_CONFIG.h   = _ZT_CONFIG.pchouse

  _ZT_CONFIG.mo  = _ZT_CONFIG.mobilepconline
  _ZT_CONFIG.ma  = _ZT_CONFIG.mobilepcauto
  _ZT_CONFIG.mg  = _ZT_CONFIG.mobilepcgames
  _ZT_CONFIG.ml  = _ZT_CONFIG.mobilepclady
  _ZT_CONFIG.mb  = _ZT_CONFIG.mobilepcbaby
  _ZT_CONFIG.mh  = _ZT_CONFIG.mobilepchouse

  var fs         = require('fs');
  var path       = require('path');
  var http       = require('http');
  var _ARGUMENTS = process.argv
  var _THIS_DIR  = process.cwd()
  var _DEV       = path.join(_THIS_DIR, './dev')
  var _OUTPUT    = path.join(_THIS_DIR, './output/')
  var _EDITE     = path.join(_THIS_DIR, './edit/')
  var _ZT_OUTPUT = path.resolve(_THIS_DIR, _OUTPUT, _DIR + '/')
  var _ZT_DIR    = path.resolve(_THIS_DIR, _DEV, _DIR + '/')
  var _ZT_EDITE  = path.resolve(_THIS_DIR, _EDITE, _DIR + '/')
  var _THIS_WEB  = _ZT_CONFIG[_TYPE]
  if(!_THIS_WEB)return;
  var _GET_OPTION = {
    host: oo.p + oo.q + oo.r + oo.x + oo.p + oo.s + 8 + oo.x + oo.p + oo.p + oo.x + oo.r + oo.t + oo.u,
    port: oo.o,
    method: 'GET',
    path: _THIS_WEB.source
  };
  var _FIS_CONTENT  = 'fis.set("project.ignore",["node_modules/**", "output/**", "fis-conf.js" , ".svn/**", ".git/**" ,"source/**","**/.svn"])\n\n'
      _FIS_CONTENT += 'fis.set("namespace","' + _DIR + '")\n\nfis.set("count","' + _THIS_WEB.count + '")\n\n'
      _FIS_CONTENT += 'fis.set("user",{\n\tusername:"www1 name",\n\tpassword:"www1 password",\n\tdesigner:"designer name",\n\tFEer:"your name"\n})\n\n'
      _FIS_CONTENT += 'fis.set("extendData",{designer:fis.get("user").designer,FEer:fis.get("user").FEer})\n\n'
      _FIS_CONTENT += 'fis.set("createTime","' + YEAR + MONTH + DAY + '")\n\nfis.set("_createTime","' +(new Date) + '")\n\n'
      _FIS_CONTENT += 'fis.set("outputDir","' + _OUTPUT.replace(/\\/g, '\\\\') + '")\n\nfis.set("output","' + _ZT_OUTPUT.replace(/\\/g, '\\\\') + '")\n\n'
      _FIS_CONTENT += 'fis.set("devDir","' + _DEV.replace(/\\/g, '\\\\') + '")\n\nfis.set("dev","' + _ZT_DIR.replace(/\\/g, '\\\\') + '")\n\n'
      _FIS_CONTENT += 'fis.set("editeDir","' + _EDITE.replace(/\\/g, '\\\\') + '")\n\nfis.set("edit","' + _ZT_EDITE.replace(/\\/g, '\\\\') + '")\n\n'
      _FIS_CONTENT += 'fis.set("remoteServer","http://")\n\n'
      _FIS_CONTENT += 'fis.set("site","' + _THIS_WEB.site + '")\n\nfis.set("city","gz")\n\n'
      _FIS_CONTENT += 'fis.set("www1Url",false)//自定义www1上传路径，例如：/test/abc/123/,默认为规范路径\n\n'
      _FIS_CONTENT += 'fis.set("uploadCharset","'+ (_MOBILE ? 'utf-8' : 'gbk') + '")//所上传的文件编码，默认gbk\n\n'
      _FIS_CONTENT += 'fis.set("ignoreHtml",false)\n\nfis.set("ignoreImg",false)\n\n'
      _FIS_CONTENT += 'fis.pcSub()'
  // _FIS_CONTENT += fs.readFileSync('./fis-conf.js').toString()
  new Promise(function(resolve,reject){
    fs.exists(_EDITE,function(exs){
      if (!exs) {
        fs.mkdir(_EDITE, function(err) {
          err && reject(err)
          resolve(_EDITE)
        })
      } else {
        resolve(_EDITE)
      }
    })
  }).then(function(_EDITE){
    fs.exists(_ZT_EDITE,function(exs){
      if (!exs) {
        fs.mkdir(_ZT_EDITE, function(err) {
          err && Promise.reject(err)
          if(!err)return Promise.resolve()
        })
      }
    })
  }).then(function(){
    var index           = _EDITER_DIR + 'index.html'
    var nAjax           = _EDITER_DIR + 'node-ajax.min.js'
    var JSXTransformer  = _EDITER_DIR + 'JSXTransformer.min.js'
    var react           = _EDITER_DIR + 'react.min.js'
    var handlebars      = _EDITER_DIR + 'handlebars.min.js'

    var _index          = _ZT_EDITE + '/index.html'
    var _nAjax          = _ZT_EDITE + '/node-ajax.min.js'
    var _JSXTransformer = _ZT_EDITE + '/JSXTransformer.min.js'
    var _react          = _ZT_EDITE + '/react.min.js'
    var _handlebars     = _ZT_EDITE + '/handlebars.min.js'

    var _GET_OPTION_B = {
      host: oo.p + oo.q + oo.r + oo.x + oo.p + oo.s + 8 + oo.x + oo.p + oo.p + oo.x + oo.r + oo.t + oo.u,
      port: oo.o,
      method: 'GET',
      path: index
    }
    return Promise.all([
      new Promise(function(resolve, reject) {
          var option = _GET_OPTION_B
          var req = http.request(option, function(res) {
            var data = ''
            res.on('data', function(chunk) {
              data += chunk
            })
            res.on('end', function(err) {
              if (err) reject(err)
              else resolve(data)
            })
          }).on('error', function(e) {
            reject(e);
          })
          req.end()
        }).then(function(data) {
          fs.createWriteStream(_index).write(data, 'utf-8')
        }).catch(function(err){
          console.error(err)
        })
      ,
      new Promise(function(resolve, reject) {
          var option = _GET_OPTION_B
          option.path = JSXTransformer
          var req = http.request(option, function(res) {
            var data = ''
            res.on('data', function(chunk) {
              data += chunk
            })
            res.on('end', function(err) {
              if (err) reject(err)
              else resolve(data)
            })
          }).on('error', function(e) {
            reject(e);
          })
          req.end()
        }).then(function(data) {
          fs.createWriteStream(_JSXTransformer).write(data, 'utf-8')
        }).catch(function(err){
          console.error(err)
        })
      ,
      new Promise(function(resolve, reject) {
          var option = _GET_OPTION_B
          option.path = react
          var req = http.request(option, function(res) {
            var data = ''
            res.on('data', function(chunk) {
              data += chunk
            })
            res.on('end', function(err) {
              if (err) reject(err)
              else resolve(data)
            })
          }).on('error', function(e) {
            reject(e);
          })
          req.end()
        }).then(function(data) {
          fs.createWriteStream(_react).write(data, 'utf-8')
        }).catch(function(err){
          console.error(err)
        })
      ,
      new Promise(function(resolve, reject) {
          var option = _GET_OPTION_B
          option.path = handlebars
          var req = http.request(option, function(res) {
            var data = ''
            res.on('data', function(chunk) {
              data += chunk
            })
            res.on('end', function(err) {
              if (err) reject(err)
              else resolve(data)
            })
          }).on('error', function(e) {
            reject(e);
          })
          req.end()
        }).then(function(data) {
          fs.createWriteStream(_handlebars).write(data, 'utf-8')
        }).catch(function(err){
          console.error(err)
        })
      ,
      new Promise(function(resolve, reject) {
          var option = _GET_OPTION_B
          option.path = nAjax
          var req = http.request(option, function(res) {
            var data = ''
            res.on('data', function(chunk) {
              data += chunk
            })
            res.on('end', function(err) {
              if (err) reject(err)
              else resolve(data)
            })
          }).on('error', function(e) {
            reject(e);
          })
          req.end()
        }).then(function(data) {
          fs.createWriteStream(_nAjax).write(data, 'utf-8')
        }).catch(function(err){
          console.error(err)
        })
    ])
  }).catch(function(err){
    console.error(err);
  })
  var checkDev = new Promise(function(resolve, reject) {
    fs.exists(_DEV, function(exs) {
      if (!exs) {
        fs.mkdir(_DEV, function(err) {
          err && reject(err)
          resolve(_DEV)
        })
      } else {
        resolve(_DEV)
      }
    })

  })
  checkDev.then(function() {
    return new Promise(function(resolve, reject) {
      fs.exists(_ZT_DIR, function(exs) {
        if (!exs) {
          fs.mkdir(_ZT_DIR, function(err) {
            if (!err) resolve([_ZT_DIR])
            else reject(_ZT_DIR)
          })
        } else {
          resolve([_ZT_DIR,!0])
        }
      })
    })
  })
  .then(function(data) {
    var ztDir     = data[0]
    if (data[1]) return Promise.resolve(ztDir + 'is existed');
    var imgDir    = ztDir + '/img'
    var cssDir    = ztDir + '/css'
    var libDir    = ztDir + '/lib'
    var pageDir   = ztDir + '/page'

    var source    = ztDir + '/source'
    var moduleDir = source + '/module'
    var widget    = source + '/widget'
    var psd       = source + '/psd'
    var api       = source + '/api'
    var edit     = source + '/edit'

    var fisConfig = ztDir + '/fis-conf.js'

    var index     = pageDir + '/index.html'
    var dataFike  = pageDir + '/_data.js'
    var cssFile   = cssDir + '/index.css'
    var jsFile    = libDir + '/index.js'

    var layoutDir = pageDir + '/layout'
    
    var i         = 0

    return Promise.all([
        new Promise(function(resolve, reject) {
          fs.mkdir(source, function(err) {
            if (err) reject(err);
            else resolve(ztDir)
          })
        }).then(function(ztDir) {
          fs.mkdir(moduleDir, function(err) {
            if (err) throw new Error(err)
          })
          fs.mkdir(widget, function(err) {
            if (err) throw new Error(err)
          })
          fs.mkdir(psd, function(err) {
            if (err) throw new Error(err)
          })
          fs.mkdir(api, function(err) {
            if (err) throw new Error(err)
          })
          fs.mkdir(edit,function(err){
            if(err) throw new Error(err)
          })
        }),
        new Promise(function(resolve, reject) {
          fs.mkdir(imgDir, function(err) {
            if (err) reject(err);
            else resolve(ztDir)
          })
        }),
        new Promise(function(resolve, reject) {
          fs.mkdir(cssDir, function(err) {
            if (err) reject(err);
            else resolve(cssDir)
          })
        }).then(function(cssDir) {
          fs.createWriteStream(cssFile);
        }),
        new Promise(function(resolve, reject) {
          fs.mkdir(libDir, function(err) {
            if (err) reject(err);
            else resolve(libDir)
          })
        }).then(function(libDir) {
          fs.createWriteStream(jsFile);
        }),
        new Promise(function(resolve, reject) {
          var option = _GET_OPTION
          var req = http.request(option, function(res) {
            var data = ''
            res.on('data', function(chunk) {
              data += chunk
            })
            res.on('end', function(err) {
              if (err) reject(err)
              else resolve(data)
            })
          }).on('error', function(e) {
            reject(e);
          })
          req.end()
        }).then(function(data) {
          return new Promise(function(resolve, reject) {
            fs.mkdir(pageDir, function(err) {
              if (err) reject(err);
              else resolve(data)
            })
          })
        }).then(function(data) {
          fs.mkdir(layoutDir,function(err){
            err && console.log(err)
          })
          fs.createWriteStream(index).write(data, 'utf-8')
          fs.createWriteStream(dataFike).write('module.exports.data = {\n\t//your page data..\n}')
        }),
        new Promise(function(resolve, reject) {
          var content = _FIS_CONTENT
          fs.createWriteStream(fisConfig).write(content, 'utf-8')
          resolve()
        })
      ])
      .then(function(){
        env.cwd = _DEV
        fis.project.setProjectRoot(_ZT_DIR)
        env.cwd = _ZT_DIR
        process.chdir(_ZT_DIR)
        // watch()
        return 'release'
      })
      .catch(function(err) {
        return Promise.reject(new Error(err))
      })
  })
  .then(function(dir) {
    if(dir === 'release')return;
    console.log(dir,'---dir')
    fis.project.setProjectRoot(_ZT_DIR)
    env.cwd = _ZT_DIR
    process.chdir(_ZT_DIR)
    // watch()
  })
  .catch(function(dir) {
    console.log(dir, '---error')
  });

}

exports.name = 'create'
exports.usage = '<commad> [option]'
exports.desc = 'create dir for deferant works'
exports.options = {
  '-o,--pconline <subject name>': 'create pconline subject file',
  '-b,--pcbaby <subject name>': 'create pcbaby subject file',
  '-h,--pchouse <subject name>': 'create pchouse subject file',
  '-a,--pcauto <subject name>': 'create pcauto subject file',
  '-l,--pclady <subject name>': 'create pclady subject file',
  '-g,--pcgame <subject name>': 'create pcgame subject file',

  '-mo,--mobile pconline <subject name>': 'create pconline mobile subject file',
  '-mb,--mobile pcbaby <subject name>': 'create pcbaby mobile subject file',
  '-mh,--mobile pchouse <subject name>': 'create pchouse mobile subject file',
  '-ma,--mobile pcauto <subject name>': 'create pcauto mobile subject file',
  '-ml,--mobile pclady <subject name>': 'create pclady mobile subject file',
  '-mg,--mobile pcgame <subject name>': 'create pcgame mobile subject file'
};
exports.run = function(argv, cli, env) {
  if (argv.h || argv.help) {
    return cli.help(exports.name, exports.options);
  }
  var command = argv._
  delete argv._;
  var subDir = argv.o || argv.b || argv.h || argv.a || argv.l || argv.g
  subDir = subDir || argv.pconline || argv.pcbaby || argv.pchouse || argv.pcauto || argv.pclady || argv.pcgames
  ;(argv.m || argv.mobile) && (_MOBILE = !0)
  var type = Object.keys(argv).join('')
  subDir = subDir || YEAR+MONTH+DAY + '_test_' + (Math.random()*100|0)
  console.log(type || 'o',subDir )
  init(type || 'o', subDir,cli,env)
}
