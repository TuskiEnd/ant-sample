let url = {};
url.prefix = 'http://fexcel.com:8112/';
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

export default url;
