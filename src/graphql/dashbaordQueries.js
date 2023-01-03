import {gql} from "@apollo/client";

export const getVideos = gql`
query getAllVideos(
  $page: Int
  $page_size: Int
  $descFilter: String
  $titleFilter: String
  $videidFilter: String
) {
  videos(
    filters: {
      desc: { contains: $descFilter }
      title: { contains: $titleFilter }
      videoId: { contains: $videidFilter }
    }
    pagination: { page: $page, pageSize: $page_size }
    sort: []
  ) {
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