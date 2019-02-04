import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  // sortByLatestOrEarliest(type) {
  //   switch (type) {
  //     case "latest":
  //       return this.props.surveys.reverse();
  //     case "earliest":
  //       return this.props.surveys;
  //     default:
  //       return this.props.surveys.reverse();
  //   }
  // }

  renderSurveys() {
    // return this.sortByLatestOrEarliest("latest").map(survey => {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="row key={survey.id}">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{survey.title}</span>
              <p>
                {survey.body}
              </p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a href="#">Yes: {survey.yes}</a>
              <a href="#">No: {survey.no}</a>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { surveys: state.surveys };
// }
function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps,{ fetchSurveys })(SurveyList);
