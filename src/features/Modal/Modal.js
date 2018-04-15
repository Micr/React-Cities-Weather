import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #fff;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.div`
  padding: 10px 20px;
  border: 1px solid black;
  cursor: pointer;
`;

const ModalMessage = styled.div`
  margin-bottom: 10px;
`;

class Modal extends Component {

  render() {
    return (
      <ModalContainer>
        <ModalBox>
          <ModalMessage>{this.props.message}</ModalMessage>
          <Button onClick={this.props.hideModal}>
            OK
          </Button>
        </ModalBox>
      </ModalContainer>
    );
  }

}

Modal.propTypes = {
  message: PropTypes.string,
  hideModal: PropTypes.func.required
};

Modal.defaultProps = {
  message: ''
};

export default Modal;
