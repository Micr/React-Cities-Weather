import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../redux/locations/actions';
import * as selectors from '../../redux/locations/selectors'
import LocationItem from './LocationItem';

const LocationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

const Input = styled.input`
  padding: 5px;
`;

const Button = styled.button`
  padding: 6px 18px;
  border-left: 0;
  cursor: pointer;
`;

const Arrow = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const ArrowUp = Arrow.extend`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;
`;

const ArrowDown = Arrow.extend`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
`;

const Th = styled.th`
  border: 1px solid black;
  padding: 10px;
  text-align: left;
`;

const SortingHeader = Th.extend`
  position: relative;
`;

const CloseCell = Th.extend`
  width: 50px;
`;

const SortingName = styled.span`
  cursor: pointer;
`

const StyledTable = styled.table`
  min-width: 768px;
  max-width: 1024px;
  border-collapse: collapse;
  margin-top: 20px;
`;

class Locations extends Component {
  constructor() {
    super();
    this.state = {
      cityInput: ''
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateCityInput = this.updateCityInput.bind(this);
  }

  handleButtonClick() {
    this.props.fetchLocation(this.state.cityInput);
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.props.fetchLocation(this.state.cityInput);
    }
  }

  updateCityInput(event) {
    this.setState({ cityInput: event.target.value });
  }

  renderTableHeader() {
    let triangle;
    if (this.props.sortOrder === -1) {
      triangle = <ArrowDown />;
    } else if (this.props.sortOrder === 1) {
      triangle = <ArrowUp />;
    } else {
      triangle = null;
    }
    return <tr>
      <SortingHeader>
        <SortingName onClick={this.props.sortLocations}>City</SortingName>
        {triangle}
      </SortingHeader>
      <Th>Temperature</Th>
      <Th>Pressure</Th>
      <CloseCell />
    </tr>
  }

  render() {
    return (
      <LocationsWrapper>
        <div>
          <Input type="text"
            value={this.state.cityInput}
            onChange={this.updateCityInput}
            onKeyUp={this.handleKeyPress}
          />
          <Button type="button" onClick={this.handleButtonClick}>Add</Button>
        </div>
        <StyledTable>
          <thead>
            {this.renderTableHeader()}
          </thead>
          <tbody>
            {
              this.props.locations.map(location =>
                <LocationItem
                  key={location.id}
                  location={location}
                />)
            }
          </tbody>
        </StyledTable>
      </LocationsWrapper>
    );
  }

}

Locations.propTypes = {
  locations: PropTypes.array.isRequired,
  sortOrder: PropTypes.number.isRequired,
  fetchLocation: PropTypes.func.isRequired,
  sortLocations: PropTypes.func.isRequired
};

Locations.defaultProps = {
  locations: [],
  sortOrder: 0,
  fetchLocation: () => {},
  sortLocations: () => {}
};

const mapStateToProps = state => ({
  locations: selectors.getSortedLocations(state.locations),
  sortOrder: state.locations.sortOrder
});

export default connect(mapStateToProps, actions)(Locations);
