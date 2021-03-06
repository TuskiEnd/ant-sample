let url = {};
url.prefix = 'http://47.100.242.85:8112/';
url.config = {};
// table list
url.config.tableList = `${url.prefix}queryData`;
// column
url.config.columnList = `${url.prefix}getTableCollum`;
// file map
url.config.fileList = `${url.prefix}getFileList`;
// upload
url.config.upload = `${url.prefix}file/upload`;
// export
url.config.export = `${url.prefix}file/export`;
// batch
url.config.batchUpdate = `${url.prefix}batchCommit`;
// 更新表头列
url.config.tableCollumManager = `${url.prefix}tableCollumManager`;
// delete file
url.config.tableDelete = `${url.prefix}tableDelete`;
// page columns
url.config.getTableCollumPage = `${url.prefix}getTableCollumPage`;

export default url;
