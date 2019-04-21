/**
 * @file: url
 * @author Shiying wang (wangshiying@baidu.com)
 */

export default {

  /**
   * 查询 url query中的每个key的值
   * @param {string} item 要查询的key
   * @return {string} value
   */
  query: function (item) {
    const search = window.location.href.split('?');
    let queryStr = '';
    if (search && search.length === 2) {
      queryStr = search[1];
    }

    const queryArr = queryStr.split('&');
    if (!item) {
      return '';
    }
    for (let i = 0, len = queryArr.length; i < len; i++) {
      const queryItem = queryArr[i].split('=');
      if (queryItem[0] === item) {
        return queryItem[1];
      }
    }
    return '';
  },
  /**
   * 获得全部的key
   * @return {Object} query
   */
  getQuerys: function () {
    let search = window.location.search.split('?');
    let queryStr = '';
    if (search && search.length === 2) {
      queryStr = search[1];
    }
    if (search[0] === '?') {
      search = search.slice(1);
    }

    const queryArr = queryStr.split('&');
    const query = {};
    for (let i = 0, len = queryArr.length; i < len; i++) {
      const queryItem = queryArr[i].split('=');
      query[queryItem[0]] = queryItem[1];
    }
    return query;
  },
};
