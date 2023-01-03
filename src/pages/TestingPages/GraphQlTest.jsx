import React from 'react';
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import {Button, Row} from "react-bootstrap";
import GroupChannelCards from "../../components/cards/Group-channels-cards/GroupChannelCards";
import {Col} from "reactstrap";
import {gql, useQuery} from "@apollo/client";
import Loader from "../../components/Loader/Loader";


const GROUPS_QUERY = gql`
  query  ($limit: Int, $start: Int)  {
      groups(pagination: { limit: $limit, start: $start })  {
        data {
            id
            attributes {
                title
                desc
                image
                title
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

`;




function GraphQlTest(props) {
    const { data, loading, fetchMore ,error} = useQuery(GROUPS_QUERY, {
        variables : {
            limit : 2,
            start : 0
        }
    });


    

    if (loading) return <Loader />;
    if (error) return <p>Error :)</p>;

    return (
        <div className="main">

            {/*  breadcrumb */}
            <BreadCrumb root="My Profile" path="My name is Tejas"/>

            {/* main profile */}
            <Row className="mainContainer">

                <Col>
                    <div className='card-panels d-flex gap-4 flex-wrap '>
                    {
                        data && data?.groups?.data?.map(item => (
                            <GroupChannelCards name={item.attributes.title}
                                               id={item.id}
                                               title={item.attributes.title}
                                               desc={item.attributes.desc}
                                               role={item.attributes.title} time={'20 Jan 2021'}
                                               image={item.attributes.image}
                                               channels={item.attributes.channels}

                            />
                        ) )
                    }
                    </div>
                </Col>
            </Row>
                <Button
                    onClick={() => fetchMore({
                    variables : {
                        start : data?.groups?.data?.map((item,index)=> index)[data.groups.data.length - 1]  ,
                        limit : 2
                    },
                    updateQuery: (pv, {fetchMoreResult}) => {
                        if (!fetchMoreResult) {
                            return pv
                        }
                        return  {
                            groups : {
                                __typename : "GroupEntityResponseCollection",
                                data : [
                                    ...pv.groups.data,
                                    ...fetchMoreResult.groups.data
                                ]
                            }
                        }
                    }
                })}>FetchMore</Button>
        </div>
    );
}

export default GraphQlTest;