import {gql} from "@apollo/client";

export const GROUP_FILTER_ON_CHANNELS = gql`
query GET_FILTER_GROUP($id : ID) {
  group(id: $id) {
    data {
      id
      attributes {
        title
        channels {
          data {
            id
            attributes {
              title
            }
          }
        }
      }
    }
  }
}`

export const CHANNEL_GET_FILTER_DATA = gql`
query GET_CHANNELS ($id: [ID]){
  channels (filters: { id: { in: $id } }){
    data {
      attributes {
        title
        createdAt
        desc
        image
        title
        group {
          data {
            id
            attributes {
              title
            }
          }
        }
      }
    }
  }
}
`

//channels filter to video
// channel filter on home screen