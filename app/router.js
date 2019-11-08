'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  app.model.sync({ force: true }).then(function(result) {
    (async () => {
      const aa = await app.model.Student.create({
        sid: 's-' + 1234,
        name: 'abc',
        age: '17',
        sex: '男',
      });
      const bb = await app.model.Course.create({
        cid: '1104',
        name: '物理',
      });
      await app.model.Course.create({
        cid: '1101',
        name: '英语',
      });
      await app.model.Course.create({
        cid: '1102',
        name: '语文',
      });
      await app.model.Course.create({
        cid: '1103',
        name: '数学',
      });
      bb.addStudent(aa);
    })();
  });

  router.get('/student', controller.student.index);
  router.get('/student/add', controller.student.add);
  router.post('/student/doadd', controller.student.doadd);
  router.get('/student/edit/:sid', controller.student.edit);
  router.post('/student/doedit/:sid', controller.student.doedit);
  router.get('/student/remove/:sid', controller.student.remove);

  router.get('/api/getDiscList', controller.music.getDiscList);
  router.get('/api/lyric', controller.music.lyric);
  router.get('/api/getSongList', controller.music.getSongList);
  router.get('/api/getTopList', controller.music.getTopList);
  router.get('/api/search', controller.music.search);
};
