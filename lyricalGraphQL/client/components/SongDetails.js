import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchAllSongs from "../queries/fetchAllSongs";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) {
      return <div>Loading... </div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

// Query for fetching from ID URL
export default graphql(fetchAllSongs, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
