import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';
import { MyComponent } from '../../components/index';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MyComponent />
        <p>
          这是我的自己搭建的脚手架<br />
        https://github.com/liang869219658
        </p>
      </div>
    );
  }
}



App.contextTypes = {
	router: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({

});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
