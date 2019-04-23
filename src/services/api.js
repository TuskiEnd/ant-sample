let url = {};
url.prefix = 'http://47.100.242.85:8112/fexcel-server/';
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
url.config.batchUpdate = `${url.prefix}file/export`;

export default url;
