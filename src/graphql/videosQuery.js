import {gql} from "@apollo/client";

export const getAllVideos = gql`
query getAllVideos(
  $page: Int
  $page_size: Int
  $searchText: StringFilterInput
  $id: [ID]
  $limit: Int
  $start: Int
) {
  videos(
     filters: {
      or: [
        { title: $searchText }
        { desc: $searchText }
        { videoId: $searchText }
         { id: { in: $id } }
      ]
    }
    pagination: { page: $page, pageSize: $page_size , limit: $limit, start: $start   }
    sort: []
  ) {
   __typename
    data {
      id
      attributes {
        createdAt
        videoId
        desc
        title
        thumbnail
        thumbnail_id
        channel {
          data {
            id
            attributes {
              title
              image
            }
          }
        }
      }
    },
    meta {
      pagination{
        page
        pageCount
        pageSize
        total
      }
      
    }
  }
}

`

export const CREATE_VIDEO = gql`
mutation CREATE_VIDEO($title: String , $desc : String , $insights : JSON , $channelId : ID! , $videoId :String , $thumbnail : JSON,$thumbnail_id : String) {
  createVideo(data: {
    channel : $channelId ,
    insights : $insights,
    videoId : $videoId,
    title : $title,
    desc : $desc,
    thumbnail : $thumbnail,
    thumbnail_id : $thumbnail_id,
  }) {
    data {
      id
      attributes {
        title
        desc
        date
        uid
        insights
        tags
        time
        videoId
        thumbnail
        createdAt 
      }
    }
  }
}
`


export const UPDATE_VIDEO = gql`
mutation UpdateVideo($id: ID!, $title: String, $desc: String) {
  updateVideo(id: $id, data: { title: $title, desc: $desc }) {
    data {
      id
    }
  }
}
`

