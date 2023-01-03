import React, {useState} from 'react';
import './groups.scss'
import Box from "../../components/Box/Box";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import {PlusIcon} from "../../contants";
import {Col, Row} from "react-bootstrap";
import CollapsePanel from "../../components/collapsePanel/CollapsePanel";
import GroupChannelCards from "../../components/cards/Group-channels-cards/GroupChannelCards";

import GroupModalForm from "./ModalForm/GroupModalForm";
import {useQuery} from "@apollo/client";
import {getDeleteGroupData, getGroupData, latestGroupData} from "../../graphql/groupQuery";
import Loader from "../../components/Loader/Loader";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import GroupCards from "./GroupsCards";
import {GET_ME_USER} from "../../graphql/userQuery";

const baseURL = 'http://localhost:1337/api'

function Groups(props) {
    const rolesData = useQuery(GET_ME_USER)
    let UserRole = rolesData?.data?.me?.role?.name;


    const [groupsCreateModel, setGroupCreateModel] = useState(false)
    const [groupData, setGroupsData] = useState('');


    const {loading, error, data, fetchMore} = useQuery(getGroupData, {
        variables: {
            limit: 8,
            start: 0
        }
    });

    const latestGroup = useQuery(latestGroupData,{
        variables : {
            limit : 8
        }
    })

    const deleteGroupData = useQuery(getDeleteGroupData, {
        variables: {
            limit: 8,
            start: 0
        }
    })




    if (loading) return <Loader/>;
    if (error) return <ErrorAlert/>;


    function groupVariable(data) {
        setGroupsData((prevData) => prevData?.data?.concat(data?.data))
    }


    return (
        <Box>
            <GroupModalForm

                show={groupsCreateModel}
                onHide={() => setGroupCreateModel(false)}
                groupDataVariable={(data) => groupVariable(data)}
                baseURL={baseURL}
            />

            <BreadCrumb root={'Groups'} />
            <div className='group-section'>
                <div className='create-groups-panel d-flex align-items-center gap-4'
                     onClick={() => setGroupCreateModel(true)}>
                    <div>
                        <img className='plus-icons' src={PlusIcon} alt="pluscardicon"/>
                    </div>
                    <div className='create-groups-panel-heading'>
                        Create Group
                    </div>
                </div>
                <Row>
                    <Col xs={12}>
                        <CollapsePanel title={'All Groups'}>
                            <div className='card-panels d-flex gap-4 flex-wrap '>

                                {
                                    loading && <p>Loading ....</p>
                                }

                                {
                                    data && data?.groups?.data?.map(item => (

                                        <GroupCards
                                            userrole={UserRole}
                                            key={item.id}
                                            id={item.id}
                                            title={item.attributes?.title}
                                            subtitle={item.attributes?.subtitle}
                                            desc={item.attributes?.desc}
                                            createdAt={item.attributes?.createdAt}
                                            image={item.attributes?.image}
                                            channels={item.attributes.channels}
                                        />
                                    ))
                                }


                            </div>

                            {(data?.groups?.meta?.pagination?.page !==
                                    data?.groups?.meta?.pagination?.pageCount) &&
                            <div className=''>

                                <button onClick={() => fetchMore({
                                    variables: {
                                        start: data?.groups?.data?.map((item, index) => index)[data.groups.data.length - 1] + 1,
                                        limit: 8
                                    },
                                    updateQuery: (pv, {fetchMoreResult}) => {
                                        if (!fetchMoreResult) {
                                            return pv
                                        }
                                        return {
                                            groups: {
                                                __typename: "GroupEntityResponseCollection",
                                                data: [
                                                    ...pv.groups.data,
                                                    ...fetchMoreResult.groups.data
                                                ],
                                                meta: {
                                                    ...fetchMoreResult.groups.meta,
                                                },
                                            }
                                        }
                                    }
                                })} className='text-bg-dark rounded-4 p-3 my-5'>view more
                                </button>
                            </div>
                            }


                        </CollapsePanel>


                        <CollapsePanel title={'Latest Groups'}>
                            <div className='card-panels d-flex gap-4 flex-wrap '>

                                {
                                    latestGroup?.loading && <p>Loading...</p>
                                }

                                {
                                    latestGroup?.data && latestGroup?.data?.groups?.data?.map(item => (

                                        <GroupCards
                                            userrole={UserRole}
                                            key={item.id}
                                            id={item.id}
                                            title={item.attributes?.title}
                                            subtitle={item.attributes?.subtitle}
                                            desc={item.attributes?.desc}
                                            createdAt={item.attributes?.createdAt}
                                            image={item.attributes?.image}
                                            channels={item.attributes.channels}
                                        />
                                    ))
                                }


                            </div>



                        </CollapsePanel>

                        {
                            !(["Subscriber" , "Contributor"].includes(UserRole)) &&
                            <CollapsePanel title={'Deleted Groups'}>
                            <div className='card-panels d-flex gap-4 flex-wrap'>


                                {
                                    deleteGroupData?.loading && <p>Loading ....</p>
                                }

                                {
                                    deleteGroupData?.data && deleteGroupData?.data?.groups?.data?.map(item => (
                                        <GroupCards
                                            card_desc={"deleteGroups"}
                                            userrole={UserRole}
                                            key={item.id}
                                            id={item.id}
                                            title={item.attributes?.title}
                                            subtitle={item.attributes?.subtitle}
                                            desc={item.attributes?.desc}
                                            createdAt={item.attributes?.createdAt}
                                            image={item.attributes?.image}
                                            channels={item.attributes.channels}
                                        />
                                    ))
                                }

                            </div>

                            {/*    fetch more button */}

                                {(deleteGroupData?.data?.groups?.meta?.pagination?.page !==
                                        deleteGroupData?.data?.groups?.meta?.pagination?.pageCount) &&
                            <div className=''>
                                <button onClick={() => deleteGroupData?.fetchMore({
                                    variables: {
                                        start: deleteGroupData?.data?.groups?.data?.map((item, index) => index)[deleteGroupData?.data.groups.data.length - 1] + 1,
                                        limit: 8
                                    },
                                    updateQuery: (pv, {fetchMoreResult}) => {
                                        if (!fetchMoreResult) {
                                            return pv
                                        }
                                        return {
                                            groups: {
                                                __typename: "GroupEntityResponseCollection",
                                                data: [
                                                    ...pv.groups.data,
                                                    ...fetchMoreResult.groups.data
                                                ],
                                                meta: {
                                                    ...fetchMoreResult.groups.meta,
                                                },

                                            }
                                        }
                                    }
                                })} className='text-bg-dark rounded-4 p-3 my-5'>view more
                                </button>
                            </div>
                                }
                        </CollapsePanel>
                        }



                    </Col>
                </Row>


            </div>
        </Box>
    );
}

export default Groups;