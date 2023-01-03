import {gql} from "@apollo/client";

//get the groups data
export const GetUserWatchList = gql`
  query GetWatchList($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          wishlist
        }
      }
    }
  }
`;


export const UserWatchListVideos = gql`
query watchlistvideos($videoId: [String]) {
    videos(filters: { videoId: { in: $videoId } }, pagination: {}, sort: []) {
      data {
        id
        attributes {
          videoId
          title
          desc
          createdAt
          thumbnail
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
      }
      meta {
        pagination {
          page
          pageCount
          pageSize
          total
        }
      }
    }
  }
  
`


// export const createWatchList = gql``;
export const postWatchList = gql`
mutation post_watchlist($id : ID! , $watchlist : JSON){
  updateUsersPermissionsUser(id: $id, data: {
    wishlist : $watchlist
  }) {
    data {
      id
    }
  }
}
`

// export const deleteWatchList = gql``;

export const GetWatchList = gql`
query get_watchlist($user_id: ID!) {
  usersPermissionsUser(id: $user_id) {
    data {
      id
      attributes {
        watchlist {
          data {
            id
            attributes {
              videos {
                data {
                  id
                  attributes {
                    videoId
                    title
                    desc
                    createdAt
                    thumbnail
                    channel {
                      data {
                        attributes {
                          image
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export const AddToWatchList = gql`
mutation AddToWatchlist($id : ID! , $videoId : [ID] ){
  createWatchlist(data: {
    users_permissions_user :$id,
    videos : $videoId
  }) {
    data {
      id
      attributes {
        videos{
          data {
            attributes {
              title
            }
          }
        }
        users_permissions_user {
          data {
            attributes {
              username
            }
          }
        }
      }
    }
  }
}
`

export const getwatchlistbyUser= gql`
query get_watchlist_user($user_id: ID!) {
  usersPermissionsUser(id: $user_id) {
    data {
      id
      attributes {
        watchlist {
          data {
            id
            attributes {
              videos {
                data {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
}
`