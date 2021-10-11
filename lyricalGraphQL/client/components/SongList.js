// Fetches songs and makes a UI List of the songs
import React, { Component } from "react";
import { graphql } from "react-apollo"; //Bound Component with Query
import gql from "graphql-tag";
import { Link } from "react-router";
import query from "../queries/fetchSongs";

class SongList extends Component {
  // Deletes the song by ID
  onSongDelete(id) {
    this.props
      .mutate({ variables: { id } })
      .then(() => this.props.data.refetch()) // Reexcute Queries
      .catch(() => {});
  }

  // Iterate over list of songs
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    // Check if data has been loaded before renderSongs()
    if (this.props.data.loading) {
      return <div>Loading Page...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
