import {gql} from "@apollo/client";

export const GET_CHANNELS = gql`
query GET_CHANNELS($id: [ID], $start: Int, $limit: Int) {
  channels(
    filters: { id: { in: $id }, status: { eq: "publish" } }
    pagination: { limit: $limit, start: $start }
  ) {
    data {
      id
      attributes {
        subtitle
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
        videos {
          data {
            id
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}


`

export const DELETE_STATUS_CHANNELS = gql`
query GET_CHANNELS ($id: [ID], $start: Int, $limit: Int){
  channels (
 filters: { id: { in: $id }, status: { eq: "delete" } }
    pagination: { limit: $limit, start: $start }
  ){
    data {
      id
      attributes {
        title
        createdAt
        desc
        image
        subtitle
        group {
          data {
            id
            attributes {
              title
            }
          }
        }
        videos {
          data {
            id
          }
        }
      }
    }
  }
}
`

export const DeleteChannelsStatus = gql`
mutation ($id: ID!) {
  updateChannel(id: $id, data: { status: delete }) {
    data {
      id
    }
  }
} 
`

export const RestoreChanenlsStatus = gql`
mutation ($id: ID!) {
  updateChannel(id: $id, data: { status: publish }) {
    data {
      id
    }
  }
}
`

export const PermanentDeleteChannels = gql`
mutation ($id: ID!) {
  deleteChannel(id: $id) {
    data {
      id
    }
  }
}
`

export const CREATE_CHANNEL = gql`
mutation CREATE_CHANNEL(
  $subtitle: String
  $title: String
  $desc: String
  $image: JSON
) {
  createChannel(
    data: {
      title: $title
      desc: $desc
      image: $image
      subtitle: $subtitle
    }
  ) {
    data {
      id
    }
  }
}
`

export const UPDATE_CHANNELS = gql`
  mutation updateChannel(
  $id: ID!
  $image: JSON
  $desc: String
  $title: String
  $subtitle: String
) {
  updateChannel(
    id: $id
    data: { image: $image, desc: $desc, title: $title, subtitle: $subtitle }
  ) {
    data {
      id
    }
  }
}

`

export const LATEST_CHANNELS = gql`
query LATEST_CHANNELS {
  channels(
  filters: { status: { eq: "publish" }}
    sort: "createdAt:DESC"
    pagination: { limit: 8 }
  ) {
    data {
      id
      attributes {
        subtitle
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
        videos {
          data {
            id
          }
        }
      }
    }
  }
}
`