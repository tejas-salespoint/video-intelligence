import {gql} from "@apollo/client";


//get the groups data
export const getUserRoleData = gql`
query {
  usersPermissionsUsers {
   data {
     id
     attributes {
       address
       email
       createdAt
      first_name
       last_name
       username
       image
       org_name
       org_designation
     }
   }
  }
}

`

export const getRolesUserQuery = gql`
query {
  usersPermissionsRoles(filters: {}, pagination: {}, sort: []) {
    data {
      id
      attributes {
        name
        users{
          data {
          id
            attributes {
              username
              image
              createdAt
              org_designation
              org_name
            }
          }
        }
      }
    }
  }
}
`