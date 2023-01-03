import {gql} from "@apollo/client";

// get our data
export const GET_ME_USER = gql`
{
  me {
    id
    username
    email
    confirmed
    blocked
    role {
      id
      name
      description
      type
    }
  }
}
`

//get user data
export const GET_OUR_USER = gql`query GET_OUR_USER($id : ID!){
    usersPermissionsUser(id: $id) {
        data {
            id
            attributes {
                username
                createdAt
                email
                address
                first_name
                last_name
                org_designation
                org_name
                image
                role {
                    data {
                        id
                        attributes {
                            name
                        }
                    }
                }
            }
        }
    }
}`


// mutate our profile data
export const UpdateUserInfo = gql`
mutation UpdateUserInfo(
  $id: ID!
  $address: String
  $first_name: String
  $last_name: String
  $image: JSON
  $org_name: String
  $org_designation: String
  $role: ID
) {
  updateUsersPermissionsUser(
    id: $id
    data: {
      address: $address
      first_name: $first_name
      last_name: $last_name
      image: $image
      org_name: $org_name
      org_designation: $org_designation
      role: $role
    }
  ) {
    data {
      id
    }
  }
}`


export const GET_PROFILE_PHOTO = gql`
query get_profile_photo($user_id: ID!){
  usersPermissionsUser(id: $user_id) {
    data {
      id
      attributes {
        image
      }
    }
  }
}
`