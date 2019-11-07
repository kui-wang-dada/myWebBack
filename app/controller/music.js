'use strict';
const axios = require('axios');
const Controller = require('egg').Controller;

class MusicController extends Controller {
  async getDiscList() {
    const { ctx } = this;
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    const res = await axios.get(url, {
      headers: {
        referer: 'https://y.qq.com',
      },
      params: ctx.query,
    });
    ctx.body = res.data;
  }
  async lyric() {
    const { ctx } = this;
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';

    const res = await axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com',
      },
      params: ctx.query,
    });
    let ret = res.data;
    if (typeof ret === 'string') {
      const reg = /^\w+\(({[^()]+})\)$/;
      const matches = ret.match(reg);
      if (matches) {
        ret = JSON.parse(matches[1]);
      }
    }
    ctx.body = ret;
  }
  async getSongList() {
    const { ctx } = this;
    const url =
      'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
    const res = await axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        host: 'y.qq.com',
      },
      params: ctx.query,
    });
    ctx.body = res.data;
  }
  async getTopList() {
    const { ctx } = this;
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
    const res = await axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        host: 'y.qq.com',
      },
      params: ctx.query,
    });
    ctx.body = res.data;
  }
  async search() {
    const { ctx } = this;
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    const res = await axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        host: 'y.qq.com',
      },
      params: ctx.query,
    });
    ctx.body = res.data;
  }
}
module.exports = MusicController;
