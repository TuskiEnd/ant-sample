import { types } from '../actions/resumeActions';

let initialState = {
  operateSuccessFlag: false,
  operateFailFlag: false,
  operateInfo: '',
  tableList: [{
    id: 'aaa',
    name: '张三',
    age: 26,
    sex: '男',
    value: '大哥',
  }, {
    id: 'bbb',
    name: '李四',
    age: 27,
    sex: '女',
    value: '大大大',
  }, {
    id: 'ccc',
    name: '王大锤',
    age: 26,
    sex: '男',
    value: '发的范德萨发',
  }, {
    id: 'ddd',
    name: '李丽',
    age: 26,
    sex: '女',
    value: '法发大水发',
  }],
  columnList: [{
    id: 0,
    tableId: 'name',
    tableCollumName: 'aa',
    excelCollumName: '表头1',
    status: 1,
    canEdit: 1,
    canView: 1,
    canSearch: 0
  }, {
    id: 1,
    tableId: 'age',
    tableCollumName: 'aa',
    excelCollumName: '表头2',
    status: 0,
    canEdit: 0,
    canView: 1,
    canSearch: 0
  }, {
    id: 2,
    tableId: 'sex',
    tableCollumName: 'aa',
    excelCollumName: '表头3',
    status: 1,
    canEdit: 1,
    canView: 0,
    canSearch: 0
  }, {
    id: 3,
    tableId: 'value',
    tableCollumName: 'aa',
    excelCollumName: '表头4',
    status: 1,
    canEdit: 1,
    canView: 1,
    canSearch: 0
  }],
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
    case types.EDIT_DATA:
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
    case types.UPLOAD_FILE_SUCCESS:
      const result = action.payload.data;
      return {
        ...state,
        operateSuccessFlag: true,
        operateFailFlag: false,
        operateInfo: '成功',
        refreshFileFlag: true,
      };
    case types.GET_TABLE_LIST_SUCCESS:
      const list = action.payload.data;
      return {
        ...state,
        tableList: list || []
      };
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
