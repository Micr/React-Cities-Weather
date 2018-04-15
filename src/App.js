import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { hideModal } from './redux/modal/actions';
import Locations from './features/Locations/Locations';
import Modal from './features/Modal/Modal';

const RefreshContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
`;

class App extends Component {

  renderRefreshIndicator() {
    return <RefreshContainer>
      <RefreshIndicator
        size={50}
        top={0}
        left={0}
        loadingColor="#FF9800"
        status="loading"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
        }}
      />
    </RefreshContainer>;
  }

  render() {
    return (
      <div>
        <Locations />
        {
          this.props.error &&
          <Modal
            message={this.props.error}
            hideModal={this.props.hideModal}
          />
        }
        {this.props.isFetching ? this.renderRefreshIndicator() : null}
      </div>
    );
  }
}

App.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
};

App.defaultProps = {
  error: '',
  isFetching: false,
  hideModal: () => {}
};

const mapStateToProps = state => ({
  error: state.modal.error,
  isFetching: state.locations.isFetching,
});

export default connect(mapStateToProps, { hideModal })(App);
