import React, { Component } from "react";
import mutation from "../mutations/LoginUserMutation";
import AuthForm from "./AuthForm";
import { graphql } from "react-apollo";
import query from "../queries/CurrentUserQuery";
import { hashHistory } from "react-router";

class LoginForm extends Component {
  updateComponent(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push("/dashboard");
    }
  }
  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(mutation)(LoginForm);
