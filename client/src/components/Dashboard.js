import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

// class-based component
class Dashboard extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <h1>Dashboard</h1>;
      default:
        return (
          <div>
            <h3>Hello, {this.props.auth.displayName}</h3>
            <SurveyList />
          </div>
        );
    }
  }

  render() {
    // console.log(this.props.auth);
    return (
      <div style={{ textAlign: 'center' }}>
        {this.renderContent()}
        <div className="fixed-action-btn">
          <Link to="/surveys/new" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}
// function mapStateToProps(state) {
//   return { auth: state.auth };
// }
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
