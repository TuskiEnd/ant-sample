let url = {};
url.prefix = '/';
url.config = {};
// table list
url.config.tableList = `${url.prefix}getTableCollum`;
// column
url.config.columnList = `${url.prefix}getTableCollum`;
// file map
url.config.fileList = `${url.prefix}getFileList`;
// upload
url.config.upload = `${url.prefix}file/upload`;
// export
url.config.export = `${url.prefix}file/export`;

export default url;
