import React, {useEffect, useState} from "react";
import "./videolist.scss";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import {ArrowLeftButton, ArrowRightButton, SearchIcon} from "../../contants";
import ListCard from "./card/ListCard";
import {useQuery} from "@apollo/client";
import {getAllVideos} from "../../graphql/videosQuery";
import Loader from "../../components/Loader/Loader";
import {Col, Row} from "react-bootstrap";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import CollapsePanel from "../../components/collapsePanel/CollapsePanel";
import {useSelector} from "react-redux";
import {GetWatchList, getwatchlistbyUser} from "graphql/watchlistQuery";
import {GET_ME_USER} from "../../graphql/userQuery";

function VideoList(props) {

  const getmerole = useQuery(GET_ME_USER)
  const [roles, setRoles] = useState(getmerole?.data?.me?.role?.name);

  const navigate = useNavigate();
  let searchfilterdata = useLocation();



  const users = useSelector((state) => state.auth.user);

  const watchlist = useQuery(getwatchlistbyUser, {
    variables: {
      user_id: users?.id,
    },
  });

  let watchlistArray = watchlist?.data?.usersPermissionsUser?.data?.attributes?.watchlist?.data?.attributes?.videos?.data?.map(item => item.id);


  console.log(searchfilterdata);
  const [videoIdList, setVideoIdList] = useState(
      searchfilterdata?.state?.video_id
  );
  const [videoNameList, setVideoNameList] = useState(
      searchfilterdata?.state?.name
  );

  const [filterVideoShow, setFilterVideoShow] = useState(
      Boolean(searchfilterdata?.state?.video_id) || false
  );
  const [search, setSearch] = useState();

  useEffect(() => {
    if (searchfilterdata?.state?.video_id) {
      setSearch(search);
      setFilterVideoShow(true);
    } else if (searchfilterdata?.state?.search) {
      setSearch(searchfilterdata?.state?.search);
      setFilterVideoShow(true);
    }
  }, [searchfilterdata]);

  const [searchInput, setInputSearch] = useState();
  // const [pagelimit,setPageLimit] = useState(5)
  //
  // const LIMIT = 5
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pageDetails, setPageDetails] = useState();
  const [page, setPage] = useState(1);

  const {data, loading, error, refetch} = useQuery(getAllVideos, {
    variables: {
      page_size: limit,
      page: page,
      searchText: {
        contains: search,
      },
      id: videoIdList,
    },
  });

  const user_id = useSelector((state) => state.auth.user.id)

  const getWatchList = useQuery(GetWatchList , {
    variables : {
      "user_id" : user_id
    }
  })


  console.log("videos : " ,data)
  console.log("watchlist : " , getWatchList?.data)
  const [accessToken, setAccessToken] = useState();


  useEffect(() => getAccessToken(), []);
  if (roles === 'Subscriber' || roles === 'Contributor') {
    return <Navigate to={'/subscriber/video/list'}/>;
  }
  if (loading) return <Loader/>;
  if (error) return <p>Error :( </p>;

  function getAccessToken() {
    const accountId = "e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0";
    const accountAccessUrl = `https://api.videoindexer.ai/Auth/trial/Accounts/${accountId}/AccessToken?allowEdit=true`;
    fetch(accountAccessUrl, {
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key": "f70e6ddb41b74a5880d773f63bc1c1ab",
      },
    })
        .then((response) => response.json())
        .then((data) => {
          setAccessToken(data);

          return data;
        })
        .catch((error) => console.log(error));
  }

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    setPage((prev) => prev - 1);
  }

  function clickPage(page) {
    setPage(page);
  }

  function searchSubmit(event) {


    if (searchfilterdata?.state?.search) {
      setSearch(searchfilterdata?.state?.search);
    }

    if (event.key === "Enter") {
      setSearch(searchInput);
    }

  }

  return (
      <div className="main videolist-main">
        <BreadCrumb root="My Profile" path="Tejas Lade"/>

        {/* if filter is not coming then this data is come */}

        {filterVideoShow ? (
            <Row>
              <Col xs={12}>
                <div className="filter-container">
                  <div className="filter-section">
                    <button
                        className="text-bg-dark rounded-4 p-3 my-2"
                        onClick={() => {
                          setFilterVideoShow(false);
                          setVideoIdList();
                          navigate("/video/list", {
                            state: null,
                          });
                          refetch({
                            searchText: undefined
                          })
                        }}
                    >
                      Clear Filters
                    </button>

                    <div className="channel_new_section d-flex justify-content-between align-items-center mb-3">
                      <CollapsePanel
                          title={`Channels > ${videoNameList}`}
                          noData={videoIdList?.length === 0}
                      >
                        <div className="mt-5">
                          {data?.videos?.data?.map((video) => (
                              <div className="container-fluid mb-4 ">
                                <ListCard
                                    id={video.id}
                                    user_id={users?.id}
                                    name={video.attributes.title}
                                    desc={video.attributes.desc}
                                    createdAt={video.attributes.createdAt}
                                    videoid={video.attributes.videoId}
                                    thumbnail={video.attributes.thumbnail}
                                    thumbnail_id={video.attributes.thumbnail_id}
                                    channel_name={video.attributes?.channel?.data?.attributes?.title}
                                    channel_image={video.attributes?.channel?.data?.attributes?.image}
                                    accessToken={accessToken}
                                    watchlistArray={watchlistArray}
                                />
                              </div>
                          ))}
                        </div>
                      </CollapsePanel>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
        ) : (
            <>
              {/* search bar */}
              <div className="d-flex gap-5 mb-5 ">
                <div className="input-group  rounded-5 ">
                  <div className="input-group-text ">
                    <img className="searchicon" src={SearchIcon} alt="searchicon"/>
                  </div>
                  <div className="form-floating radius-video-card">
                    <div className="search d-flex gap-3">
                      <input
                          value={searchInput}
                          onKeyDown={searchSubmit}
                          onChange={(e) => setInputSearch(e.target.value)}
                          type="text"
                          className="search-input color-second"
                          placeholder="Search"
                      />

                    </div>
                  </div>
                </div>
                {/* search bar end*/}

                <div className="d-flex gap-3  align-items-center me-5">
                  <p>Show</p>
                  <select
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      className="selectpicker "
                  >
                    <option className="select-picker-option" value={10} selected>
                      10
                    </option>
                    <option className="select-picker-option" value={20}>
                      20
                    </option>
                    <option className="select-picker-option" value={50}>
                      50
                    </option>
                    <option className="select-picker-option" value={100}>
                      100
                    </option>
                  </select>
                </div>
              </div>

              <div className="">
                {data?.videos?.data?.map((video) => (
                    <div className="container-fluid mb-4 ">
                      <ListCard
                          id={video.id}
                          user_id={users?.id}
                          name={video.attributes.title}
                          desc={video.attributes.desc}
                          createdAt={video.attributes.createdAt}
                          videoid={video.attributes.videoId}
                          thumbnail={video.attributes.thumbnail}
                          thumbnail_id={video.attributes.thumbnail_id}
                          channel_name={video.attributes?.channel?.data?.attributes?.title}
                          channel_image={video.attributes?.channel?.data?.attributes?.image}
                          accessToken={accessToken}
                          watchlistArray={watchlistArray}
                      />
                    </div>
                ))}
              </div>

              <div className="video-list-pagination d-flex justify-content-end align-items-center">
                <button
                    disabled={data?.videos?.meta?.pagination?.page == 1}
                    onClick={prevPage}
                    className={`page-link ${
                        data?.videos?.meta?.pagination?.page == 1 ? "disabled" : ""
                    } `}
                >
                  <img src={ArrowLeftButton} alt="arrow_left_button"/>
                </button>
                <button
                    disabled={
                        data?.videos?.meta?.pagination?.page ===
                        data?.videos?.meta?.pagination?.pageCount
                    }
                    onClick={nextPage}
                    className={`page-link
                            ${
                        data?.videos?.meta?.pagination?.page ===
                        data?.videos?.meta?.pagination?.pageCount
                            ? "disabled"
                            : ""
                    }`}
                >
                  <img src={ArrowRightButton} alt="arrow_right_button"/>
                </button>
              </div>
            </>
        )}

        {/*card*/}
      </div>
  );
}

export default VideoList;
