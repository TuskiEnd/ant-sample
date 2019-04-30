/* eslint-disable prefer-destructuring *//** * Created by charles on 2018/5/30. */import React, { PureComponent, Fragment } from 'react';import './Index.less';import { connect } from 'react-redux';import { Button, Col, Form, Row, Select, Layout, Table, Modal, Spin, Input, Upload } from 'antd';import { bindActionCreators } from "redux";import actions from "../../stores/actions/resumeActions";import url from "../../services/api";import RoleHOC from '../../components/RoleHOC'const FormItem = Form.Item;const Content = Layout.Content;const { info, error, success } = Modal;const formOtherLayout = {  labelCol: { span: 10 },  wrapperCol: { span: 14 },};const generalLayout = { md: 24, lg: 12, xl: 8 };class Index extends PureComponent {  constructor(props) {    super(props);    this.state = {      isShowModal: false,      //文件上传loading      fileLoading: false,      selectedRowKeys: [],      selectedRows: [],      formSearch: [],      // 动态查询项      fields: []    };  }  componentDidMount() {    this.getFileList();  }  componentWillReceiveProps(nextProps) {    if (this.props.refreshFileFlag !== nextProps.refreshFileFlag && nextProps.refreshFileFlag) {      this.getFileList();      this.props.actions.resetState();    }    // 动态查询条件    if (this.props.columnList !== nextProps.columnList && nextProps.columnList.length > 0) {      this.generateForm(nextProps.columnList);    }    // 操作提示    if (this.props.operateSuccessFlag !== nextProps.operateSuccessFlag && nextProps.operateSuccessFlag === true) {      this.showSuccess(nextProps.operateInfo);      this.props.actions.resetState();    }    if (this.props.operateFailFlag !== nextProps.operateFailFlag && nextProps.operateFailFlag === true) {      this.showError(nextProps.operateInfo);      this.props.actions.resetState();    }  }  generateForm = (list) => {    const { getFieldDecorator, setFieldsValue } = this.props.form;    let temp = [],      tempForm = [];    list.forEach(item => {      if (item.canSearch === 1) {        temp.push(item.tableCollumName);        tempForm.push(item);      }    });    this.setState({      fields: [...new Set(temp)]    });    setFieldsValue({ 'keys': tempForm });  };  // 加载表格数据  loadPage = (pageNo = 1, pageSize = 20) => {    this.setState({      pageNo,    }, () => {      this.props.form.validateFields((err, values) => {        if (!err) {          const { fields } = this.state;          let postData = {};          postData.pageNo = pageNo;          postData.pageSize = pageSize;          postData.tableName = values.fileId;          postData.condition = {};          fields.forEach(item => {            if (values[item] && values[item] !== '') {              postData['condition'][item] = values[item];            }          });          this.props.actions.getTableList(postData);          // 清空勾选          this.setState({            selectedRowKeys: [],            selectedRows: [],          });        }      });    });  };  // 翻页  handlePageChange = (pageNo, pageSize) => {    this.loadPage(pageNo, pageSize);  };  // 切换pageSize  handleShowSizeChange = (current, pageSize) => {    this.loadPage(1, pageSize);  };  handleSearch = (e) => {    e && e.preventDefault();    this.loadPage();  };  // 批量更新  batchUpdate = () => {    const { selectedRows } = this.state;    const { getFieldValue } = this.props.form;    this.props.actions.batchUpdate({ list: selectedRows, tableName: getFieldValue('fileId') });  };  showSuccess = (msg) => {    success({      title: '操作成功',      content: msg,      okText: '确定',      okType: 'info',      onOk: () => {        this.loadPage();      },    });  };  showError = (msg) => {    error({      title: '操作失败',      content: msg,      okText: '确定',      okType: 'info',    });  };  showInfo = (msg) => {    info({      title: '操作提示',      content: msg,      okText: '确定',      okType: 'info',    });  };  // 导出  exportFile = () => {    const { getFieldValue } = this.props.form;    const tableName = getFieldValue('fileId');    if (tableName && tableName !== '') {      // 下载模板文件      window.open(`${url.config.export}?tableName=${tableName}`);    } else {      this.showError('请先选择要导出的文件!');    }  };  // 查询表头  changeSelectGroup = (value) => {    if (value && value !== '') {      this.props.actions.getColumnList({ tableName: value });      this.loadPage();    }  };  getFileList = () => {    this.props.actions.getFileList();  };  // modal  handleShowModal = (params) => {    const { modalVar, flag, cb } = params;    this.setState({      [modalVar]: flag    });    cb && cb();  };  handleFieldsBlur = ({ key, value }) => {    const { setFieldsValue } = this.props.form;    setFieldsValue({ [key]: value });  };  handleBlur = ({ key, value, formKey, id }) => {    const { setFieldsValue } = this.props.form;    setFieldsValue({ [formKey]: value });    this.props.actions.editData({ key, value, id });  };  resetForm = () => {    this.props.form.resetFields();  };  // 删除文件  handleDeleteFile = () => {    const { getFieldValue } = this.props.form;    const file = getFieldValue('fileId');    Modal.confirm({      title: '确认操作',      content: '是否确认删除文件',      onOk: () => {      },      onCancel: () => {      },    });  };  render() {    const that = this;    const { getFieldDecorator, getFieldValue } = this.props.form;    const fileId = getFieldValue('fileId');    const { columnList, tableList: dataSource, fileList, loading, role } = this.props;    const { fileLoading, selectedRowKeys } = this.state;    const { pageNum, total, pageSize } = this.props.pageInfo;    const columnsObj = columnList && columnList.length > 0 ? columnList.filter(item => item.canView === 1).map(item => {      return ({        title: item.excelCollumName,        key: item.tableCollumName,        render: (text, record) => {          if (item.canEdit === 1) {            return (<FormItem label="">              {getFieldDecorator(`${item.tableCollumName}_${record.id}`, {                initialValue: record[item.tableCollumName],                onChange: (e) => this.handleBlur({                  id: record.id,                  formKey: `${item.tableCollumName}_${record.id}`,                  value: e.target.value,                  key: item.tableCollumName,                })              })(                <Input placeholder="请输入" style={{ width: '100px' }} />              )}            </FormItem>)          } else {            return (<span>{record[item.tableCollumName]}</span>)          }        }      })    }) : [];    // 分页数据    const pagination = {      current: pageNum,      total: total,      pageSize: pageSize,      showSizeChanger: true,      showQuickJumper: true,      onChange: this.handlePageChange,      onShowSizeChange: this.handleShowSizeChange,    };    const props = {      name: 'file',      beforeUpload(file, fileList) {      },      showUploadList: false,      customRequest(info) {        // 上传大小限制10M        // if (info.file && (info.file.size / 1024 / 1024) > 10) {        //   message.error('请上传小于10M的文件！');        //   return false;        // }        // that.setState({        //   fileLoading: true        // });        const formData = new FormData();        formData.append('excelFile', info.file);        // 调接口        that.props.actions.uploadFile(formData);      },    };    const rowSelection = {      selectedRowKeys,      onChange: (selectedRowKeys, selectedRows) => {        this.setState({          selectedRowKeys,          selectedRows        });      },      getCheckboxProps: record => ({        disabled: false, // Column configuration not to be checked        name: record.name,      }),    };    getFieldDecorator('keys', {      initialValue: [],    });    const inputs = getFieldValue('keys').map(item => {      return (        <Col {...generalLayout}>          <FormItem {...formOtherLayout} label={`${item.excelCollumName}`}>            {getFieldDecorator(`${item.tableCollumName}`, {              initialValue: '',              onChange: (e) => this.handleFieldsBlur({                id: item.tableCollumName,                value: e.target.value,              })            })(              <Input placeholder="请输入" />            )}          </FormItem>        </Col>)    });    return (      <div className="page-index">        <Spin spinning={fileLoading}>          <Content>            <Form              className="ant-advanced-search-form"              onSubmit={this.handleSearch}            >              <Row gutter={24}>                <Col span={10}                     style={{ height: 70 }}>                  <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}                            label="文件">                    {getFieldDecorator('fileId', {                      rules: [{                        required: true,                        whitespace: true,                        message: "请先选择文件",                      }]                    })(                      <Select                        showSearch                        optionFilterProp="children"                        allowClear                        style={{ width: 400 }}                        placeholder="请选择"                        onSelect={this.changeSelectGroup}>                        {                          fileList && fileList.length > 0 && fileList.map(item => {                            return (<Select.Option title={item.excelName} key={`tableFile_${item.id}`}                                                   value={item.tableName}>{item.excelName}</Select.Option>)                          })                        }                      </Select>,                    )}                  </FormItem>                </Col>                {                  role && role === 'admin' &&                  <Fragment>                    <Col span={8}                         style={{ textAlign: 'left' }}>                      {                        fileId && fileId !== '' &&                        <Button type="default" size={"small"} style={{ marginRight: '15px', marginLeft: '-25px' }} onClick={this.handleDeleteFile}>删除文件</Button>                      }                      <Upload {...props}>                        <Button type="primary">上传文件</Button>                      </Upload>                      <Button                        style={{ marginLeft: '10px' }}                        type="default"                        onClick={this.exportFile}>导出</Button>                    </Col>                    <Col style={{ clear: 'both' }} />                  </Fragment>                }              </Row>              <Row gutter={24}>                {                  inputs                }              </Row>              <Row gutter={24}>                <Col {...generalLayout} style={{ marginLeft: '100px', marginBottom: '15px' }}>                  <Button type="primary" htmlType="submit">查询</Button>&nbsp;&nbsp;&nbsp;&nbsp;                  <Button type="default" onClick={this.resetForm}>重置</Button>                </Col>              </Row>            </Form>            <h3 style={{ margin: '0 0 5px', paddingTop: '25px', borderTop: '1px solid #ddd' }}></h3>            <Row gutter={24} style={{ marginBottom: '10px' }}>              <Col style={{ textAlign: 'left' }}                   span={12}>                <Button type="primary" onClick={this.batchUpdate} disabled={!selectedRowKeys.length > 0}>批量更新</Button>              </Col>              <Col style={{ textAlign: 'right' }}                   span={12}>                <div className="search-count">                  共 {pagination.total} 条                </div>              </Col>            </Row>            <Spin spinning={loading}>              <Table scroll={{ x: 'max-content' }}                     rowKey="id"                     className="table-list"                     rowSelection={rowSelection}                     dataSource={dataSource}                     columns={columnsObj}                     pagination={pagination} />            </Spin>          </Content>        </Spin>      </div>    );  }}const FinalIndex = Form.create()(  Index,);const mapStateToProps = (state) => {  const {    resultList,    operateSuccessFlag,    operateFailFlag,    operateInfo,    tableList,    fileList,    refreshFileFlag,    columnList,    pageInfo,    loading,  } = state.resumeReducer;  return {    resultList,    operateSuccessFlag,    operateFailFlag,    operateInfo,    tableList,    fileList,    refreshFileFlag,    columnList,    pageInfo,    loading,  }};const mapDispatchToProps = dispatch => {  return {    actions: bindActionCreators(actions, dispatch)  }};export default connect(  mapStateToProps,  mapDispatchToProps)(RoleHOC(FinalIndex));