import React, { Component } from 'react';
import { connect } from 'react-redux';

// class-based component
class Dashboard extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <h1>Dashboard</h1>;
      default:
        return <h1>Hello, {this.props.auth.displayName}</h1>;
    }
  }

  render() {
    console.log(this.props.auth);
    return (
      <div style={{ textAlign: 'center' }}>
        {this.renderContent()}
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
