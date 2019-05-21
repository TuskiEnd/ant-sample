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
  columnList: [],
  refreshFileFlag: false,
  columnListPage: [],
  fileLoading: true
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
    // TABLE_DELETE
    case types.TABLE_DELETE_SUCCESS: {
      const { message } = action.payload;
      if (action.payload && action.payload.success) {
        return {
          ...state,
          operateSuccessFlag: true,
          operateFailFlag: false,
          operateInfo: message || '删除成功',
        };
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: message || '删除失败',
        };
      }
    }
    // BATCH_UPDATE
    case types.BATCH_UPDATE_SUCCESS: {
      const { message } = action.payload;
      if (action.payload && action.payload.success) {
        return {
          ...state,
          operateSuccessFlag: true,
          operateFailFlag: false,
          operateInfo: message || '更新成功',
        };
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: message || '更新失败',
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
    // TABLE_COLUMN_MANAGER
    case types.TABLE_COLUMN_MANAGER_SUCCESS: {
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
          columnList: action.payload.data || [],
        };
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: message || '接口获取失败',
          columnList: [],
        };
      }
    }
    // GET_column_LIST_PAGE
    case types.GET_COLUMN_LIST_PAGE_SUCCESS: {
      if (action.payload.success) {
        const { list, pageSize, pageNum, total } = action.payload.data;
        list && list.length > 0 && list.forEach(item => {
          let temp = [];
          item.can_search === 1 && temp.push('can_search');
          item.can_view === 1 && temp.push('can_view');
          item.can_edit === 1 && temp.push('can_edit');
          item.initialChecked = temp;
        });
        return {
          ...state,
          pageInfo: {
            pageSize,
            pageNum,
            total
          },
          columnListPage: list,
          loading: false
        }
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: action.payload.message || '接口获取失败',
          columnListPage: [],
          loading: false
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
          fileLoading: false
        };
      } else {
        return {
          ...state,
          operateSuccessFlag: false,
          operateFailFlag: true,
          operateInfo: action.payload.message || '操作失败',
          fileLoading: false
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
    case types.CLEAR_DATA:
      return {
        ...state,
        pageInfo: {
          pageSize: 20,
          pageNum: 1,
          total: 0
        },
        tableList: [],
        columnList: [],
        columnListPage: []
      };
    default:
      return state;
  }
}
