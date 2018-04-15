import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { removeLocation } from '../../redux/locations/actions';

const Td = styled.td`
  border: 1px solid black;
  padding: 10px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const CloseButtonTd = Td.extend`
  position: relative;
`;

class LocationItem extends Component {
  constructor() {
    super();
    this.removeLocation = this.removeLocation.bind(this);
  }

  removeLocation() {
    this.props.removeLocation(this.props.location.id);
  }

  render() {
    return (
      <tr>
        <Td>{this.props.location.name}</Td>
        <Td>{Math.ceil(this.props.location.temp_celcius)}</Td>
        <Td>{this.props.location.pressure_mmhg}</Td>
        <CloseButtonTd>
          <CloseButton onClick={this.removeLocation}>
            X
          </CloseButton>
        </CloseButtonTd>
      </tr>
    );
  }

}

LocationItem.propTypes = {
  location: PropTypes.object.isRequired,
  removeLocation: PropTypes.func.isRequired
};

LocationItem.defaultProps = {
  location: {},
  removeLocation: () => {}
};

export default connect(null, { removeLocation })(LocationItem);
