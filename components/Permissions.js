import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const possiblePermissions = [
  // array of possible permissions used to list out table headers for permissions settings.
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;


const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <Error error={error} />
        <p>Permissions Granted</p>
        <div>
          <h2>Manage Permissions:</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {/* map possible permissions from array above */}
                {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
                <th>👇</th>
              </tr>
            </thead>
            <tbody>
              {/* map through each user in db */}
              {data.users.map(user => <UserPermissions user={user} key={user.id} />)}
            </tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
)


class UserPermissions extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

  state = {
    permissions: this.props.user.permissions,
  };

  handlePermissionChange = (e) => {
    // console.log('permissionHandler 🔥', e.target.checked, e.target.value)
    const checkbox = e.target;
    // create a copy of state -  💡 best practice always spread out arrays to copy them.
    let updatedPermissions = [...this.state.permissions];
    // are we adding or removing permission?
    if (checkbox.checked) {
      // add item to [updatedPermissions] from checkbox.value
      updatedPermissions.push(checkbox.value);
      console.log('addedPermission:', checkbox.value);
    } else {
      // remove permission from [updatedPermissions] if permission does not match value checked.
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
      // console.log('afterRemove', updatedPermissions)
    }
    // set state from updatedPermissions
    this.setState({ permissions: updatedPermissions });
    console.log('permissionsUpdated', updatedPermissions)
  }

  render() {
    const user = this.props.user;
    console.log('id', user.id);
    return (
      <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{
        permissions: this.state.permissions,
        userId: this.props.user.id,
      }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && <tr><td colSpan="8"><Error error={error} /></td></tr>}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      // if permission is included in array of permissions, then (checked = true)
                      checked={this.state.permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td><SickButton type="button" disabled={loading} onClick={updatePermissions}>Updat{loading ? 'ing' : 'e'}</SickButton></td>
            </tr>
          </>
        )}
      </Mutation>
    )
  }
}

export default Permissions
