var express = require('express');
var router = express.Router();
var Lable = require('../models/lables');
var Visiter = require('../models/visiter');
var Article = require('../models/articles');
var Record = require('../models/records');
var Message = require('../models/messages');
router.use(function (req, res, next) {
  if (!req.visitInfo.isAdmin) {
    res.send('warning:请使用管理员身份登陆!');
    return
  }
  next();
})
//网站统计
router.get('/home', function (req, res, next) {
  // 从数据库中读取管理者数据
  // 小bug,为何使用'isAdmin':'true'查询为空？
  Visiter.find({
    "isAdmin": {
      $ne: false
    }
  }).then(function (visiters) {
    res.render('admin/home', {
      visitInfo: req.visitInfo,
      visiters: visiters
    });
  })
})
//分类管理
router.get('/lablelist', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var limit = 5;
  Lable.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page - 1) * limit;
    Lable.find().sort({
      _id: -1
    }).limit(limit).skip(skip).then(function (lables) {
      res.render('admin/lablelist', {
        visitInfo: req.visitInfo,
        lables: lables,
        page: page,
        pages: pages
      });
    })
  })
})
//Ajax数据保存
var responseData;
router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: ''
  }
  next();
})
//分类添加
router.post('/lablelist', function (req, res, next) {
  var title = req.body.title;
  if (title == '') {
    responseData.code = 1;
    responseData.message = '分类标题不能为空';
    res.json(responseData);
    return;
  }
  Lable.findOne({
    title: title
  }).then(function (lableInfo) {
    if (lableInfo) {
      responseData.code = 2;
      responseData.message = '此分类已存在';
      res.json(responseData);
      return
    }
    var lable = new Lable({
      title: title,
    })
    return lable.save();
  }).then(function () {
    responseData.message = '添加成功';
    res.json(responseData);
  })
})
//分类修改
router.get('/lablelist/edit', function (req, res, next) {
  var id = req.query.id || '';
  Lable.findOne({
    _id: id
  }).then(function (lable) {
    res.render('admin/labledit', {
      visitInfo: req.visitInfo,
      lable: lable
    })
  })
})
router.post('/lablelist/edit', function (req, res, next) {
  var id = req.query.id || '';
  var title = req.body.title;
  Lable.findOne({
    _id: id
  }).then(function () {
    return Lable.findOne({
      _id: {
        $ne: id
      },
      title: title
    })
  }).then(function (haslable) {
    if (haslable) {
      responseData.code = 1;
      responseData.message = '此分类已存在';
      res.json(responseData);
      return;
    } else {
      return Lable.update({
        _id: id
      }, {
        title: title,
      })
    }
  }).then(function () {
    responseData.message = '修改成功';
    res.json(responseData);
    return;
  })
})
//分类删除
router.get('/lablelist/delete', function (req, res, next) {
  var id = req.query.id || '';
  Lable.findOne({
    _id: id
  }).then(function (lable) {
    res.render('admin/labledelete', {
      visitInfo: req.visitInfo,
      lable: lable
    })
  })
})
router.post('/lablelist/delete', function (req, res, next) {
  var id = req.query.id || '';
  Lable.findOne({
    _id: id
  }).then(function (lable) {
    if (lable.number != 0) {
      responseData.code = 1;
      responseData.message = '删除失败,该分类下有文章';
      res.json(responseData);
      return;
    } else {
      return Lable.remove({
        _id: id
      })
    }
  }).then(function () {
    responseData.message = '删除成功';
    res.json(responseData);
    return;
  })
})

//用户管理
router.get('/visiter', function (req, res, next) {
  // 读取数据条数      跳过数据条数
  // limit(Number)     skip(Number)
  var page = Number(req.query.page || 1);
  var limit = 9;
  //数据库中数据条数
  Visiter.count({
    "isAdmin": "false"
  }).then(function (count) {
    //计算总页数
    pages = Math.ceil(count / limit);
    //取值不能超过总页数
    page = Math.min(page, pages);
    //取值不能小于1
    page = Math.max(page, 1);
    var skip = (page - 1) * limit;
    //从数据库中读取非管理者数据
    //sort 1升序,-1降序
    Visiter.find({
      "isAdmin": "false"
    }).sort({
      _id: -1
    }).limit(limit).skip(skip).then(function (visiters) {
      res.render('admin/visiter', {
        visitInfo: req.visitInfo,
        visiters: visiters,
        page: page,
        pages: pages
      });
    })
  })
})
//用户修改
router.get('/visiter/edit', function (req, res, next) {
  var id = req.query.id || '';
  Visiter.findOne({
    _id: id
  }).then(function (visiter) {
    res.render('admin/visiteredit', {
      visitInfo: req.visitInfo,
      visiter: visiter
    })
  })
})
router.post('/visiter/edit', function (req, res, next) {
  var id = req.query.id || '';
  var visitmark = req.body.visitmark;
  var visitimg = req.body.visitimg;
  var visitname = req.body.visitname;
  var visitpass = req.body.visitpass;
  var visitsafe = req.body.visitsafe;
  Visiter.findOne({
    _id: id
  }).then(function () {
    return Visiter.findOne({
      _id: {
        $ne: id
      },
      visitname: visitname
    })
  }).then(function (hasvisiter) {
    if (hasvisiter) {
      responseData.code = 1;
      responseData.message = '该账户已存在';
      res.json(responseData);
      return;
    } else {
      return Visiter.update({
        _id: id
      }, {
        visitmark: visitmark,
        visitimg: visitimg,
        visitname: visitname,
        visitpass: visitpass,
        visitsafe: visitsafe,
      })
    }
  }).then(function () {
    responseData.message = '修改成功';
    res.json(responseData);
    return;
  })
})
//用户删除
router.get('/visiter/delete', function (req, res, next) {
  var id = req.query.id || '';
  Visiter.findOne({
    _id: id
  }).then(function (visiter) {
    res.render('admin/visiterdelete', {
      visitInfo: req.visitInfo,
      visiter: visiter
    })
  })
})
router.post('/visiter/delete', function (req, res, next) {
  var id = req.query.id || '';
  Visiter.findOne({
    _id: id
  }).then(function (target) {
    var visitname = target.visitname
    return Message.findOne({
      visitname: visitname
    })
  }).then(function (hasmessage) {
    if (hasmessage) {
      responseData.code = 1;
      responseData.message = '删除失败,此用户有留言';
      res.json(responseData);
      return;
    } else {
      return Visiter.remove({
        _id: id
      }).then(function () {
        responseData.message = '删除成功';
        res.json(responseData);
        return;
      })
    }
  })
})
//文章发布
router.get('/article', function (req, res, next) {
  Lable.find().then(function (lables) {
    res.render('admin/article', {
      visitInfo: req.visitInfo,
      lables: lables
    });
  })
})
router.post('/article', function (req, res, next) {
  var title = req.body.title;
  var writer = req.body.writer;
  var lable = req.body.lable;
  var lableId = req.body.lableId;
  var addInfo = req.body.addInfo;
  var copyInfo = req.body.copyInfo;
  var content = req.body.content;
  if (title == '') {
    responseData.code = 1;
    responseData.message = '文章标题不能为空';
    res.json(responseData);
    return;
  } else if (writer == '') {
    responseData.code = 2;
    responseData.message = '作者不能为空';
    res.json(responseData);
    return;
  } else if (addInfo == '转载' && copyInfo == '') {
    responseData.code = 3;
    responseData.message = '转载信息不能为空';
    res.json(responseData);
    return;
  } else if (content == '') {
    responseData.code = 4;
    responseData.message = '内容不能为空';
    res.json(responseData);
    return;
  }
  Article.findOne({
    title: title
  }).then(function (articleInfo) {
    if (articleInfo) {
      responseData.code = 5;
      responseData.message = '此文章已存在';
      res.json(responseData);
      return
    }
    var article = new Article({
      title: title,
      writer: writer,
      lable: lable,
      lableId: lableId,
      addInfo: addInfo,
      copyInfo: copyInfo,
      content: content,
      addTime: new Date(),
    })
    Lable.findOne({
      _id: article.lableId
    }).then(function (lable) {
      lable.number++;
      lable.save();
    })
    return article.save();
  }).then(function () {
    responseData.message = '发布成功';
    res.json(responseData);
  })
})
//文章列表
router.get('/articlelist', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var limit = 9;
  Article.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page - 1) * limit;
    Article.find().sort({
      _id: -1
    }).limit(limit).skip(skip).then(function (articles) {
      res.render('admin/articlelist', {
        visitInfo: req.visitInfo,
        articles: articles,
        page: page,
        pages: pages
      });
    })
  })
})
//文章修改
router.get('/article/edit', function (req, res, next) {
  var id = req.query.id || '';
  Article.findOne({
    _id: id
  }).then(function (article) {
    res.render('admin/articledit', {
      visitInfo: req.visitInfo,
      article: article
    })
  })
})
router.post('/article/edit', function (req, res, next) {
  var id = req.query.id || '';
  var title = req.body.title;
  var writer = req.body.writer;
  var lable = req.body.lable;
  var addInfo = req.body.addInfo;
  var copyInfo = req.body.copyInfo;
  var content = req.body.content;
  Article.findOne({
    _id: id
  }).then(function () {
    return Article.findOne({
      _id: {
        $ne: id
      },
      title: title
    })
  }).then(function (hasarticle) {
    if (hasarticle) {
      responseData.code = 1;
      responseData.message = '修改失败,此文章已存在';
      res.json(responseData);
      return;
    } else {
      return Article.update({
        _id: id
      }, {
        title: title,
        writer: writer,
        lable: lable,
        addInfo: addInfo,
        copyInfo: copyInfo,
        content: content
      })
    }
    //为何用ajax不起作用？必须仔细研究研究
    //原因是传递了id参数admin/article/edit?id=...,但是ajax的url仅为admin/article/edit
    //含参url如何写?还是直接删除url?默认指向当前页,也就解决此问题
  }).then(function () {
    responseData.message = '修改成功';
    res.json(responseData);
    return;
  })
})
// 文章删除
router.get('/article/delete', function (req, res, next) {
  var id = req.query.id || '';
  Article.findOne({
    _id: id
  }).then(function (article) {
    Lable.findOne({
      _id: article.lableId
    }).then(function (lable) {
      lable.number--;
      lable.save();
    })
    res.render('admin/articledelete', {
      visitInfo: req.visitInfo,
      article: article
    })
  })
})
router.post('/article/delete', function (req, res, next) {
  var id = req.query.id || '';
  Article.findOne({
    _id: id
  }).then(function () {
    return Article.remove({
      _id: id
    })
  }).then(function () {
    responseData.message = '删除成功';
    res.json(responseData);
    return;
  })
})


//独白发布
router.get('/record', function (req, res, next) {
  res.render('admin/record', {
    visitInfo: req.visitInfo
  });
})
router.post('/record', function (req, res, next) {
  var title = req.body.title;
  var mood = req.body.mood;
  var weather = req.body.weather;
  var content = req.body.content;
  if (title == '') {
    responseData.code = 1;
    responseData.message = '读白标题不能为空';
    res.json(responseData);
    return;
  } else if (mood == '') {
    responseData.code = 2;
    responseData.message = '心情不能为空';
    res.json(responseData);
    return;
  } else if (weather == '') {
    responseData.code = 3;
    responseData.message = '天气不能为空';
    res.json(responseData);
    return;
  } else if (content == '') {
    responseData.code = 4;
    responseData.message = '内容不能为空';
    res.json(responseData);
    return;
  }
  Record.findOne({
    title: title
  }).then(function (recordInfo) {
    if (recordInfo) {
      responseData.code = 5;
      responseData.message = '此独白已存在';
      res.json(responseData);
      return
    }
    var record = new Record({
      title: title,
      mood: mood,
      weather: weather,
      content: content,
      addTime: new Date()
    })
    return record.save();
  }).then(function () {
    responseData.message = '发布成功';
    res.json(responseData);
  })
})
//独白列表
router.get('/recordlist', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var limit = 9;
  Record.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page - 1) * limit;
    Record.find().sort({
      _id: -1
    }).limit(limit).skip(skip).then(function (records) {
      res.render('admin/recordlist', {
        visitInfo: req.visitInfo,
        records: records,
        page: page,
        pages: pages
      });
    })
  })
})
//独白修改
router.get('/record/edit', function (req, res, next) {
  var id = req.query.id || '';
  Record.findOne({
    _id: id
  }).then(function (record) {
    res.render('admin/recordedit', {
      visitInfo: req.visitInfo,
      record: record
    })
  })
})
router.post('/record/edit', function (req, res, next) {
  var id = req.query.id || '';
  var title = req.body.title;
  var mood = req.body.mood;
  var weather = req.body.weather;
  var content = req.body.content;
  Record.findOne({
    _id: id
  }).then(function () {
    return Record.update({
      _id: id
    }, {
      title: title,
      mood: mood,
      weather: weather,
      content: content
    })
  }).then(function () {
    responseData.message = '修改成功';
    res.json(responseData);
    return;
  })
})
//独白删除
router.get('/record/delete', function (req, res, next) {
  var id = req.query.id || '';
  Record.findOne({
    _id: id
  }).then(function (record) {
    res.render('admin/recordelete', {
      visitInfo: req.visitInfo,
      record: record
    })
  })
})
router.post('/record/delete', function (req, res, next) {
  var id = req.query.id || '';
  Record.findOne({
    _id: id
  }).then(function () {
    return Record.remove({
      _id: id
    })
  }).then(function () {
    responseData.message = '删除成功';
    res.json(responseData);
    return;
  })
})

//留言管理
router.get('/messagelist', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var limit = 9;
  Message.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page - 1) * limit;
    Message.find().sort({
      _id: -1
    }).limit(limit).skip(skip).then(function (messages) {
      res.render('admin/message', {
        visitInfo: req.visitInfo,
        messages: messages,
        page: page,
        pages: pages
      });
    })
  })
})
//留言删除
router.get('/message/delete', function (req, res, next) {
  var id = req.query.id || '';
  Message.findOne({
    _id: id
  }).then(function (message) {
    res.render('admin/messagedelete', {
      visitInfo: req.visitInfo,
      message: message
    })
  })
})
router.post('/message/delete', function (req, res, next) {
  var id = req.query.id || '';
  Message.findOne({
    _id: id
  }).then(function () {
    return Message.remove({
      _id: id
    })
  }).then(function () {
    responseData.message = '删除成功';
    res.json(responseData);
    return;
  })
})
module.exports = router;