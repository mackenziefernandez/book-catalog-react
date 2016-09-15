import React, {Component} from 'react'
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser, fetchUser, loginWithProvider} from '../../actions/firebase_actions';


class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.loginWithProvider = this.loginWithProvider.bind(this);
    this.state = {
      message: ''
    }
  }

  loginWithProvider(provider) {
    console.log("provider :", provider);
    this.props.loginWithProvider(provider).then(data=> {
      console.log("After login in provider : ", data);

      if (data.payload.errorCode)
        this.setState({message: data.payload.errorMessage})
      else
        browserHistory.push('/profile');

    });
    // alert("login with provider");
  }

  onFormSubmit(event) {
    event.preventDefault();

    var email = this.refs.email.value;
    var password = this.refs.password.value;
    this.props.loginUser({email: email, password: password}).then(data => {

        if (data.payload.errorCode)
          this.setState({message: data.payload.errorMessage})
        else
          browserHistory.push('/profile');

      }
    )

  }

  render() {
    return (
      <div className="col-md-4">
        <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
          <p>
            {this.state.message}
          </p>


          <h4>Login with</h4>
          <a href="#" className="btn btn-primary bt-social" onClick={()=> {
            this.loginWithProvider("google")
          }} data-provider="google">Google</a>
          {/*
           <a href="#" className="btn btn-info bt-social" data-provider="twitter">Twitter</a>

           <a href="#" className="btn btn-danger bt-social" data-provider="google">Google+</a>
           <a href="#" className="btn btn-default bt-social" data-provider="github">GitHub</a>
           <a href="#" className="btn btn-warning" id="btAnon">Anon</a>
           */}

        </form>
      </div>

    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser,
    fetchUser,
    loginWithProvider
  }, dispatch);
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser};

}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
