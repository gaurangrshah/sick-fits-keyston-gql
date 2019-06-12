import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
 query {
  me {
    id
    email
    name
    permissions
  }
 }
`;

const User = props => (
  <Query
    {...props} // spreading any props out we want to give to the User component
    query={CURRENT_USER_QUERY} // pass in query
  >
    {/* instead of rendering function here as a child, instead we'll pass the payload onto the child component to render: */}
    {payload => console.log(payload) || props.children(payload)}
    {/* this will allow us to pass in this payload without having to rewrite this query every time */}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User;
export { CURRENT_USER_QUERY }
