import React, { useState } from "react";
import "./channels.scss";
import Box from "../../components/Box/Box";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { PlusIcon } from "../../contants";
import { Col, Row } from "react-bootstrap";
import CollapsePanel from "../../components/collapsePanel/CollapsePanel";
import ChannelModalForm from "./ModelForm/ChannelModalForm";
import ChannelDelete from "./ModelForm/ChannelDelete";
import { useQuery } from "@apollo/client";
import {
  DELETE_STATUS_CHANNELS,
  GET_CHANNELS, LATEST_CHANNELS,
} from "../../graphql/channelsQuery";
import Loader from "../../components/Loader/Loader";
import { useLocation } from "react-router-dom";
import {
  CHANNEL_GET_FILTER_DATA,
  GROUP_FILTER_ON_CHANNELS,
} from "../../graphql/filters/filterQuery";
import ChannelsCards from "./ChannelsCards";
import {GET_ME_USER} from "../../graphql/userQuery";

const baseURL = "http://localhost:1337/api";

function Channels(props) {
  const rolesData = useQuery(GET_ME_USER)
  let UserRole = rolesData?.data?.me?.role?.name;
  let stateData = useLocation();

  const { data, loading, error, fetchMore } = useQuery(GET_CHANNELS, {
    variables: {
      limit: 8,
      start: 0,
    },
  });



  const latestChannels = useQuery(LATEST_CHANNELS)



  const deleteStatusChannelData = useQuery(DELETE_STATUS_CHANNELS, {
    variables: {
      limit: 8,
      start: 0,
    },
  });

  const [filterShow, setFilterShow] = useState(
    Boolean(stateData?.state?.channels)
  );

  // filter data comes from groups
  const filterGroupData = useQuery(CHANNEL_GET_FILTER_DATA, {
    variables: {
      id: stateData?.state?.channels,
    },
  });

  // const filterChannels = useQuery()
  const groupChannelsFilterData = useQuery(GROUP_FILTER_ON_CHANNELS, {
    variables: {
      id: stateData?.state?.channels,
    },
  });

  const [channelCreateModel, setChannelCreateModel] = useState(false);
  const [channelDelete, setChannelDelete] = useState(false);

  function changeValue(value) {
    setChannelCreateModel(value);
  }

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <Box>
      <ChannelModalForm
        show={channelCreateModel}
        onHide={() => setChannelCreateModel(false)}
        baseURL={baseURL}
      />

      <ChannelDelete
        show={channelDelete}
        onHide={() => setChannelDelete(false)}
      />
      <BreadCrumb root={"Channels"} />
      <div className="channel-section">
        {filterShow ? (
          //  values comes from group data then its shows this data

          <Row>
            <Col xs={12}>
              <div className="filter-container">
                <div className="filter-section">
                  <button
                    className="text-bg-dark rounded-4 p-3 my-2"
                    onClick={() => setFilterShow(false)}
                  >
                    Clear Filters
                  </button>

                  <CollapsePanel
                    title={`Groups > ${stateData?.state?.name}`}
                    noData={stateData?.state?.channels?.length === 0}
                  >
                    <div className="card-panels d-flex gap-4 flex-wrap mt-3 ">
                      {filterGroupData?.data?.channels?.data?.map((item) => (


                        <ChannelsCards
                        userrole={UserRole}
                          key={item.id}
                          id={item.id}
                          title={item.attributes.title}
                          subtitle={item.attributes.subtitle}
                          image={item.attributes.image}
                          desc={item.attributes.desc}
                        videoid={item.attributes.videos}
                        />
                      ))}
                    </div>
                  </CollapsePanel>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <div
              className="create-channel-panel d-flex align-items-center gap-4"
              onClick={() => setChannelCreateModel(true)}
            >
              <div>
                <img className="plus-icons" src={PlusIcon} alt="pluscardicon" />
              </div>
              <div className="create-channel-panel-heading">
                Create Channels
              </div>
            </div>

            <Row>
              <Col xs={12}>
                <CollapsePanel title={"All Channels"}>
                  <div className="card-panels d-flex gap-4 flex-wrap">
                    {loading && <p>Loading ....</p>}

                    {data?.channels?.data?.map((item) => (
                      <ChannelsCards

                      userrole={UserRole}
                        key={item.id}
                        id={item.id}
                        title={item.attributes.title}
                        subtitle={item.attributes.subtitle}
                        image={item.attributes.image}
                        desc={item.attributes.desc}
                      videoid={item.attributes.videos}
                      />
                    ))}
                  </div>

                  {(data?.channels?.meta?.pagination?.page !==
                      data?.channels?.meta?.pagination?.pageCount) &&
                  <button
                    onClick={() =>
                      fetchMore({
                        variables: {
                          start:
                            data?.channels?.data?.map((item, index) => index)[
                              data.channels.data.length - 1
                            ] + 1,
                          limit: 8,
                        },
                        updateQuery: (pv, { fetchMoreResult }) => {
                          if (!fetchMoreResult) {
                            return pv;
                          }
                          return {
                            channels: {
                              __typename: "ChannelEntityResponseCollection",
                              data: [
                                ...pv.channels.data,
                                ...fetchMoreResult.channels.data,
                              ],
                              
                                                        meta: {
                                                            ...fetchMoreResult.channels.meta,
                                                        },
                            },
                          };
                        },
                      })
                    }
                    className="text-bg-dark rounded-4 p-3 my-5"
                  >
                    View More
                  </button>}
                </CollapsePanel>



                <CollapsePanel title={"Latest Channels"}>
                  <div className="card-panels d-flex gap-4 flex-wrap">
                    {latestChannels?.loading && <p>Loading ....</p>}

                    {latestChannels?.data?.channels?.data?.map((item) => (
                      <ChannelsCards
                        userrole={UserRole}
                        key={item.id}
                        id={item.id}
                        title={item.attributes.title}
                        subtitle={item.attributes.subtitle}
                        image={item.attributes.image}
                        desc={item.attributes.desc}
                        videoid={item.attributes.videos}
                      />
                    ))}
                  </div>


                </CollapsePanel>
                {!(["Subscriber", "Contributor"].includes(UserRole)) &&

                    <CollapsePanel title={"Deleted Channels"}>
                      <div className="card-panels d-flex gap-4 flex-wrap">
                        {/* deleted channels */}

                        {deleteStatusChannelData?.loading && <p>Loading ....</p>}

                        {deleteStatusChannelData?.data &&
                            deleteStatusChannelData?.data?.channels?.data?.map(
                                (item) => (
                                    <ChannelsCards
                                        userrole={UserRole}
                                        key={item.id}
                                        id={item.id}
                                        title={item.attributes.title}
                                        subtitle={item.attributes.subtitle}
                                        image={item.attributes.image}
                                        desc={item.attributes.desc}
                                        card_desc={"deleteGroups"}
                                        videoid={item.attributes.videos}
                                    />
                                )
                            )}
                      </div>


                    </CollapsePanel>}

                <br />
              </Col>
            </Row>
          </>
        )}
      </div>
    </Box>
  );
}

export default Channels;
