import { types } from '../actions/resumeActions';

let initialState = {
  operateSuccessFlag: false,
  operateFailFlag: false,
  operateInfo: '',
  loading: false,
  pageInfo: {
    pageSize: 20,
    pageNum: 1,
    total: 0
  },
  tableList: [],
  fileList: [],
  refreshFileFlag: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.EDIT_STORE:
      return {
        ...state,
        ...action.bridge
      };
    case types.EDIT_DATA: {
      const editObj = action.bridge;
      let tempList = [...state.tableList];
      tempList.map(item => {
        if (editObj.id === item.id) {
          item[editObj.key] = editObj.value;
        }
      });
      return {
        ...state,
        tableList: tempList
      };
    }
    // GET_FILE_LIST
    case types.GET_FILE_LIST_SUCCESS: {
      const { message } = action.payload;
      if (action.payload && action.payload.success) {
        return {
          ...state,
          fileList: action.payload.data || [],
        };
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: message || '接口获取失败',
          fileList: [],
        };
      }
    }
    // FILE_EXPORT
    case types.FILE_EXPORT_SUCCESS: {
      if (action.payload && action.payload.success) {
        return {
          ...state,
          operateSuccessFlag: true,
          operateFailFlag: false,
          operateInfo: '成功',
        };
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: action.payload.message || '操作失败',
        };
      }
    }
    // GET_column_LIST
    case types.GET_COLUMN_LIST_SUCCESS: {
      const { message } = action.payload;
      if (action.payload.success) {
        return {
          ...state,
          columnList: action.payload.data || []
        };
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: message || '接口获取失败',
          columnList: []
        };
      }
    }
    case types.UPLOAD_FILE_SUCCESS:
      if (action.payload.success) {
        return {
          ...state,
          operateSuccessFlag: true,
          operateFailFlag: false,
          operateInfo: '成功',
          refreshFileFlag: true,
        };
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: action.payload.message || '操作失败',
        };
      }
    case types.GET_TABLE_LIST_PENDING: {
      return {
        ...state,
        loading: true
      }
    }
    case types.GET_TABLE_LIST_SUCCESS:
      if (action.payload.success) {
        const { list, pageSize, pageNum, total } = action.payload.data;
        return {
          ...state,
          pageInfo: {
            pageSize,
            pageNum,
            total
          },
          tableList: list,
          loading: false
        }
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: action.payload.message || '接口获取失败',
          tableList: [],
          loading: false
        };
      }
    case types.RESET_STATE:
      return {
        ...state,
        operateSuccessFlag: false,
        operateFailFlag: false,
        operateInfo: '',
        refreshFileFlag: false,
      };
    default:
      return state;
  }
}
