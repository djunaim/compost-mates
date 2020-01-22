import React from 'react';
import compostTypesData from '../../../helpers/data/compostTypesData';


class SingleCompost extends React.Component {
  state = {
    compostType: {},
  }

  componentDidMount() {
    const { compostId } = this.props.match.params;
    console.log(compostId);
    compostTypesData.getSingleCompostTypeByCompostId(compostId)
      .then((response) => {
        console.log(response);
        this.setState({ compostType: response.data });
      })
      .catch((errFromSingleCompost) => console.error(errFromSingleCompost));
  }
  // get all food wastes. Make an array for all the different compost types. Do a find to compare the 2 arrays to each other. Do object.keys to make an array of compost types. Then map over it and print

  render() {
    const { compostType } = this.state;

    return (
      <div className="SingleCompost">
        <h1>Single Compost</h1>
        <h4>{compostType.compostId}</h4>
      </div>
    );
  }
}

export default SingleCompost;
