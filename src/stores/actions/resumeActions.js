import { createTypes, async } from '../../utils/types';
import fetch from "../../services/axios";
import url from "../../services/api";
import { axiosUploadConfig } from "../../services/axiosConfig";

export const types = createTypes('resume/',
  async('GET_FILE_LIST'),
  async('GET_TABLE_LIST'),
  async('GET_COLUMN_LIST'),
  async('UPLOAD_FILE'),
  async('FILE_EXPORT'),
  async('SUBMIT_RESUME'),
  async('BATCH_UPDATE'),
  'EDIT_STORE',
  'RESET_STATE',
  'EDIT_DATA'
);

// 获取文件list
const getFileList = (params) => ({
  type: types.GET_FILE_LIST,
  payload: fetch(url.config.fileList, params, {}, 'get')
});

// 获取table list
const getTableList = (params) => ({
  type: types.GET_TABLE_LIST,
  payload: fetch(url.config.tableList, params)
});

// 获取table list
const getColumnList = (params) => ({
  type: types.GET_COLUMN_LIST,
  payload: fetch(url.config.columnList, params, {}, 'get')
});

// 附件上传
const uploadFile = (params) => {
  return {
    type: types.UPLOAD_FILE,
    payload: fetch(url.config.upload, params, axiosUploadConfig)
  }
};
// 附件上传
const fileExport = (params) => {
  return {
    type: types.FILE_EXPORT,
    payload: fetch(url.config.export, params, {}, 'get')
  }
};
// 批量更新
const batchUpdate = (params) => {
  return {
    type: types.BATCH_UPDATE,
    payload: fetch(`${url.config.batchUpdate}?tableName=${params.tableName}`, params.list)
  }
};

const editStore = (param) => ({
  type: types.EDIT_STORE,
  bridge: param
});
const editData = (param) => ({
  type: types.EDIT_DATA,
  bridge: param
});


// reset state
const resetState = () => ({
  type: types.RESET_STATE,
});

export default {
  editStore,
  getFileList,
  fileExport,
  uploadFile,
  getTableList,
  getColumnList,
  resetState,
  editData,
  batchUpdate,
}
