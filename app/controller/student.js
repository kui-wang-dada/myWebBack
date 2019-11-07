'use strict';

const Controller = require('egg').Controller;

class StudentController extends Controller {
  async index() {
    const { ctx } = this;

    const initData2 = await ctx.model.Course.findAll();
    const initData = await ctx.model.Student.findAll({
      include: { model: ctx.model.Course, as: 'course' },
    });
    console.log('initData', initData, initData2);
    try {
      await ctx.render('index.nj', { students: initData });
    } catch (e) {
      return (ctx.body = { msg: '获取信息失败', ab: e, code: -1 });
    }
  }
  async add() {
    const { ctx } = this;

    try {
      const aa = await ctx.model.Course.findAll();
      console.log('aa', aa);
      await ctx.render('add.nj', {
        quanbukecheng: aa,
      });
    } catch (e) {
      return (ctx.body = {
        msg: '获取信息失败',
        ab: e,
        code: -1,
      });
    }
  }
  async doadd() {
    const { ctx } = this;

    try {
      const query = ctx.request.body;
      console.log('query', query);
      const aa = await ctx.model.Student.create({
        sid: query.sid,
        name: query.name,
        age: query.age,
        sex: query.sex,
      });
      console.log('aa', aa);
      for (let i = 0; i < query.courses.length; i++) {
        const bb = await ctx.model.Course.findOne({
          where: {
            cid: query.courses[i],
          },
        });
        await bb.addStudent(aa);
      }

      return ctx.redirect('/student');
    } catch (e) {
      return (ctx.body = {
        msg: '获取信息失败',
        ab: e,
        code: -1,
      });
    }
  }
  async edit() {
    const { ctx } = this;

    try {
      const sid = ctx.params.sid;
      console.log('sid', sid);
      const cc = await ctx.model.Student.findOne({
        where: {
          sid,
        },
        include: {
          model: ctx.model.Course,
          as: 'course',
        },
      });
      console.log('cc', cc);
      const newCourses = [];
      cc.course.forEach(item => {
        newCourses.push(item.cid);
      });
      const bb = await ctx.model.Course.findAll();
      await ctx.render('edit.nj', {
        student: cc,
        quanbukecheng: bb,
        newCourses,
      });
    } catch (e) {
      return (ctx.body = {
        msg: '获取信息失败',
        ab: e,
        code: -1,
      });
    }
  }
  async doedit() {
    const { ctx } = this;
    try {
      const sid = ctx.params.sid;
      const query = ctx.request.body;
      console.log('sidsd', sid, query);
      const tt = await ctx.model.Student.update(
        {
          name: query.name,
          age: query.age,
          sex: query.sex,
        },
        {
          where: {
            sid,
          },
        }
      );
      console.log('tt', tt);
      const dd = await ctx.model.Student.findOne({
        where: {
          sid,
        },
      });
      console.log('dd', dd);
      const ee = query.courses;
      const ff = [];
      for (let i = 0; i < ee.length; i++) {
        const bb = await ctx.model.Course.findOne({
          where: {
            cid: ee[i],
          },
        });
        ff.push(bb);
      }
      console.log('ff', ff);
      dd.setCourse(ff);
      console.log('ddd', dd);
      return ctx.redirect('/student');
    } catch (e) {
      return (ctx.body = {
        msg: '获取信息失败',
        ab: e,
        code: -1,
      });
    }
  }
  async remove() {
    const { ctx } = this;
    try {
      const sid = ctx.params.sid;
      await ctx.model.Student.destroy({
        where: {
          sid,
        },
      });
      return ctx.redirect('/student');
    } catch (e) {
      return (ctx.json = {
        msg: '获取信息失败',
        ab: e,
        code: -1,
      });
    }
  }
}

module.exports = StudentController;
