'use strict'
var spawn = require('child_process').spawn
var path = require('path')

var init = function(_TYPE,_DIR){
	// #!/usr/bin/env node
	var _ZT_WAP = ''
	// var _ZT_WAP = '_wap'
	var _ZT_HEAD = 'zt_header_cb'+_ZT_WAP+'.html';
	var _ZT_SRC = 'http://zzsvn.pcauto.com.cn/svn/other/doc/documents/%d7%a8%cc%e2%cd%b7%ce%b2%bf%f2%bc%dc/test/'
	var _ZT_CONFIG = {
		pconline : [_ZT_SRC + '/pconline/' + _ZT_HEAD,'http://count5.pconline.com.cn/newcount/count.php?channel=3936'],
		pcauto : [_ZT_SRC + '/pcauto/' + _ZT_HEAD,'http://count.pcauto.com.cn/count.php?channel=5909'],
		pcgames : [_ZT_SRC + '/pcgames/' + _ZT_HEAD,'http://count.pcgames.com.cn/count.php?channel=1065'],
		youxiB : ['http://www.pcgames.com.cn/global/zt_noad/index.html'],
		pclady : [_ZT_SRC + '/pclady/' + _ZT_HEAD,'http://count.pclady.com.cn/count.php?channel=1598'],
		pcbaby : [_ZT_SRC + '/pcbaby/' + _ZT_HEAD,'http://count.pcbaby.com.cn/count.php?channel=11'],
		pchouse : [_ZT_SRC + '/pchouse/' + _ZT_HEAD,'http://count.pchouse.com.cn/count.php?channel=2166']
	}
	_ZT_CONFIG.o = _ZT_CONFIG.pconline
	_ZT_CONFIG.a = _ZT_CONFIG.pcauto
	_ZT_CONFIG.g = _ZT_CONFIG.pcgames
	_ZT_CONFIG.l = _ZT_CONFIG.pclady
	_ZT_CONFIG.b = _ZT_CONFIG.pcbaby
	_ZT_CONFIG.h = _ZT_CONFIG.pchouse

	var fs = require('fs');
	var path = require('path');
	var http = require('http');
	// 命令行
	var _ARGUMENTS = process.argv
	// var _DIR = _ARGUMENTS[2]
	var _THIS_DIR = process.cwd()
	var _DEV = path.join(_THIS_DIR,'./dev')
	var _OUTPUT = path.join(_THIS_DIR,'./output/')
	var _ZT_OUTPUT = path.resolve(_THIS_DIR,_OUTPUT,_DIR + '/')
	var _ZT_DIR = path.resolve(_THIS_DIR,_DEV,_DIR + '/')
	// var _TYPE = _ARGUMENTS[3].replace('-','')
	var _THIS_WEB = _ZT_CONFIG[_TYPE]

	var _GET_OPTION = {
		host:'192.168.11.254',
		port:8080,
		method:'GET',
		path: _THIS_WEB[0]
	};
	var _FIS_CONTENT = 'fis.set("namespace","'+_DIR+'")\nfis.set("user","your name")\nfis.set("count","'+_THIS_WEB[1]+'")\n'
	    _FIS_CONTENT += 'fis.set("designer","designer name")\nfis.set("createTime","'+(new Date)+'")\n'
	    _FIS_CONTENT += 'fis.set("outputDir","'+_OUTPUT.replace(/\\/g,'\\\\')+'")\nfis.set("output","'+_ZT_OUTPUT.replace(/\\/g,'\\\\')+'")\n'
			_FIS_CONTENT += 'fis.pcSub()\n'
	    // _FIS_CONTENT += fs.readFileSync('./fis-conf.js').toString()

	var checkDev = new Promise(function(resolve, reject) {
		fs.exists(_DEV,function(exs){
	    if(!exs){
				fs.mkdir(_DEV,function(err){
					err && reject(err)
					resolve(_DEV)
				})
	    }else{
				resolve(_DEV)
			}
	  })
	})

	checkDev.then(function(){
		return new Promise(function(resolve, reject) {
		  fs.exists(_ZT_DIR,function(exs){
		    if(!exs){
		      fs.mkdir(_ZT_DIR,function(err){
		        if(!err)resolve(_ZT_DIR)
		        else reject(_ZT_DIR)
		      })
		    }else{
		      resolve()
		    }
		  })
		})
	})
	.then(function(dir){
	  if(!dir)return;
	  var ztDir = dir
	  var imgDir = ztDir + '/img'
	  var cssDir = ztDir + '/css'
	  var libDir = ztDir + '/lib'
		var pageDir = ztDir + '/page'
	  var source = ztDir + '/source'

		var moduleDir = source + '/module'
		var widget = source + '/widget'
		var psd = source + '/psd'
		var api = source + '/api'

	  var fisConfig = ztDir + '/fis-conf.js'

	  var index = pageDir + '/index.html'
	  var cssFile = cssDir + '/index.css'
	  var jsFile = libDir + '/index.js'
	  var i = 0
	  return Promise.all([
	    new Promise(function(resolve, reject) {
	      fs.mkdir(source,function(err){
	        if(err)reject(err);
	        else resolve(ztDir)
	      })
	    }).then(function(ztDir){
				fs.mkdir(moduleDir,function(err){
					if(err)throw new Error(err)
				})
				fs.mkdir(widget,function(err){
					if(err)throw new Error(err)
				})
				fs.mkdir(psd,function(err){
					if(err)throw new Error(err)
				})
				fs.mkdir(api,function(err){
					if(err)throw new Error(err)
				})
			}),
	    new Promise(function(resolve,reject){
	      fs.mkdir(imgDir,function(err){
	        if(err)reject(err);
	        else resolve(ztDir)
	      })
	    }),
	    new Promise(function(resolve,reject){
	      fs.mkdir(cssDir,function(err){
	        if(err)reject(err);
	        else resolve(cssDir)
	      })
	    }).then(function(cssDir){
	        fs.createWriteStream(cssFile);
	    }),
	    new Promise(function(resolve,reject){
	      fs.mkdir(libDir,function(err){
	        if(err)reject(err);
	        else resolve(libDir)
	      })
	    }).then(function(libDir){
	        fs.createWriteStream(jsFile);
	    }),
	    new Promise(function(resolve,reject){
	      var option = _GET_OPTION
	      var req = http.request(option,function(res){
	        var data = ''
	        res.on('data',function(chunk){
	          data += chunk
	        })
	        res.on('end',function(err){
	          if(err)reject(err)
	          else resolve(data)
	        })
	      }).on('error',function(e){
	        reject(e);
	      })
	      req.end()
	    }).then(function(data){
				return new Promise(function(resolve, reject) {
					fs.mkdir(pageDir,function(err){
						if(err)reject(err);
						else resolve(data)
					})
				})
			}).then(function(data){
				fs.createWriteStream(index).write(data,'utf-8')
			}),
	    new Promise(function(resolve,reject){
	      var content = _FIS_CONTENT
	      fs.createWriteStream(fisConfig).write(content,'utf-8')
	    })
	  ]).catch(function(err){
			console.log(err)
		})
	  // return new Promise(function(resolve, reject) {
	  //   fs.mkdir(imgDir,function(err){
	  //     if(err)reject(err);
	  //     fs.mkdir(cssDir,function(err){
	  //       if(err)reject(err);
	  //       fs.mkdir(libDir,function(err){
	  //         if(err)reject(err);
	  //         fs.createWriteStream(index,'',function(err){
	  //           if(err)reject(err);
	  //           fs.createWriteStream(fisConfig,'',function(err){
	  //             if(err)reject(err);
	  //             resolve(ztDir)
	  //           })
	  //         })
	  //       })
	  //     })
	  //   })
	  // });
	})
	.then(function(dir){
	  console.log(dir)
	})
	.catch(function(dir){
	  console.log(dir,'---error')
	});

}


exports.name = 'create'
exports.usage = '<commad> [option]'
exports.desc = 'create dir for deferant works'
// exports.register = function (commander) {
// 	commander
// 		.option('-o,--pconline <subject name>','create subject file',String,'zt').action(function(){
// 			console.log(arguments[1],'pconline')
// 		})
// 	commander
// 		.option('-b,--pcbaby <subject name>','create subject file',String,'zt').action(function(){
// 			console.log(arguments[1],'pcbaby')
// 		})
// 	commander
// 		.option('-h,--pchouse <subject name>','create subject file',String,'zt').action(function(){
// 			console.log(arguments[1],'pchouse')
// 		})
// 	commander
// 		.option('-a,--pcauto <subject name>','create subject file',String,'zt').action(function(){
// 			console.log(arguments[1],'pcauto')
// 		})
// 	commander
// 		.option('-l,--pclady <subject name>','create subject file',String,function(){
// 			console.log(arguments[1],'pclady')
// 		})
// 	  .action(function(){
// 		})
// }
exports.options = {
	'-o,--pconline <subject name>':'create pconline subject file',
	'-b,--pcbaby <subject name>':'create pcbaby subject file',
	'-h,--pchouse <subject name>':'create pchouse subject file',
	'-a,--pcauto <subject name>':'create pcauto subject file',
	'-l,--pclady <subject name>':'create pclady subject file',
};
exports.run = function(argv, cli, env){
	if (argv.h || argv.help) {
    return cli.help(exports.name, exports.options);
  }
	var command = argv._
	delete argv._;
	var subDir = argv.o || argv.b || argv.h || argv.a || argv.l || argv.g
	subDir = subDir || argv.pconline || argv.pcbaby || argv.pchouse || argv.pcauto || argv.pclady || argv.pcgames
	var type = Object.keys(argv).join()

	console.log(type,subDir)
	init(type,subDir)
}
