import gql from "graphql-tag";

// GraphQL Query
const fetchSong = gql`
  {
    songs {
      id
      title
    }
  }
`;
export default fetchSong;
