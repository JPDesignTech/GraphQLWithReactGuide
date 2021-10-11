import React, { Component } from "react";
import { graphql } from "react-apollo"; // Sandwich Query with Component
import gql from "graphql-tag"; // Write Querys and Mutations in JS file
import { Link, hashHistory } from "react-router";
import FetchSong from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        variables: {
          title: this.state.title, // Value of Text Input
        },
        refetchQueries: [{ FetchSong }],
      })
      .then(() => hashHistory.push("/"))
      .catch(() => {});
  }

  render() {
    return (
      <div>
        <Link to="/">back</Link>
        <h3>Add A New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title: </label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

// Query Mutation
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
