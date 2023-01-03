import {gql} from "@apollo/client";

// get our data
export const UPDATE_ROLES = gql`
mutation ($id : ID!, $role_id : ID!) {
  updateUsersPermissionsUser(id: $id, data: {
    role : $role_id
  }) {
    data {
      id
      attributes {
        username
      }
    }
  }
}
`