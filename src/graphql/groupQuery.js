import {gql} from "@apollo/client";


//get the groups data
export const getGroupData = gql`
query group_data($limit: Int, $start: Int) {
  groups(
    pagination: { limit: $limit, start: $start }
    filters: { status: { eq: "publish" } }
  ) {
    data {
      id
      attributes {
        image
        title
        desc
        subtitle
        createdAt
        channels {
          data {
            id
            attributes {
              title
              image
            }
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

export const DashboardGroups = gql`
query group_data($limit: Int, $start: Int) {
  groups(
    pagination: { limit: $limit, start: $start }
    filters: { status: { eq: "publish" } }
  ) {
    data {
      id
      attributes {
        image
        title
        desc
        subtitle
        createdAt
        channels {
          data {
            id
            attributes {
              title
              image
            }
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


export const latestGroupData = gql`
query group_data($limit: Int, $start: Int)  {
      groups(
      pagination: { limit: $limit, start: $start }
      sort: "createdAt:DESC"
      filters: { status: { eq: "publish" } }
      )  {
    data {
      id
      attributes {
        image
        title
        desc    
        subtitle
        createdAt
        channels {
          data {
            id 
            attributes {
              title
              image
            }
          }
        }
      }
    }
  }
}
`

export const create_group = gql`
mutation CREATE_GROUPS(
  $title: String
  $subtitle: String
  $desc: String
  $image: JSON
) {
  createGroup(
    data: { title: $title, subtitle: $subtitle, desc: $desc, image: $image }
  ) {
    data {
      id
    }
  }
}
`

export const getDeleteGroupData = gql`
query ($limit: Int, $start: Int) {
  groups(
    pagination: { limit: $limit, start: $start }
    filters: { status: { eq: "delete" } }
  ) {
    data {
      id
      attributes {
        title
        desc
        image
        subtitle
        createdAt
        channels {
          data {
            id
            attributes {
              title
              image
            }
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


//post the group data
export const UpdateGroupData = gql`
mutation UpdateGroup($id: ID! , $subtitle : String , $title : String , $desc : String, $image : JSON){
  updateGroup(id: $id, data: {
    title : $title,
    subtitle : $subtitle,
    desc : $desc,
    image : $image
  }) {
    data {
      id
    }
  }
}
`


export const DeleteGroupStatus = gql`
mutation ($id: ID!) {
  updateGroup(id: $id, data: { status: delete }) {
    data {
      id
     attributes {
        status
      }
    }
  }
}    
`


export const RestoreDeleteStatus = gql`
mutation ($id: ID!) {
  updateGroup(id: $id, data: { status: publish }) {
    data {
      id
    }
  }
}
`


export const PermanentDeleteGroup = gql`
mutation ($id: ID!) {
  deleteGroup(id: $id) {
    data {
      id
    }
  }
}
`


