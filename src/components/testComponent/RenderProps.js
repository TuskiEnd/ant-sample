import React from 'react';
import { Button, Modal } from 'antd';

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}



/*----------- RenderProps ------------*/

class ModalLogic extends React.Component {
  state = { visible: false };

  showModal = (bool) => {
    this.setState({
      visible: bool
    });
  };
  render() {
    const { visible } = this.state;
    return (
      <div>
        {this.props.children({ visible, onChange: this.showModal })}
      </div>
    )
  }
}
{this.props.children}

class ModalUI extends React.Component {
  render() {
    return (

      <ModalLogic>
        {
          ({ visible, onChange }) => (
            <div>
              <Button type="primary" onClick={this.showModal}>
                Open Modal
              </Button>
              <Modal
                title="Basic Modal"
                visible={visible}
                onOk={() => onChange(false)}
                onCancel={() => onChange(false)}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </div>
          )
        }
      </ModalLogic>
    )
  }
}
