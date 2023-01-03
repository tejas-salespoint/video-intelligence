import React, { useState } from "react";
import Box from "../../components/Box/Box";
import "./upgrade.scss";
import SimpleBreadCrumb from "../../components/breadcrumb/SimpleBreadCrumb";
import { Col, Row } from "react-bootstrap";
import CollapsePanel from "../../components/collapsePanel/CollapsePanel";
import Card from "./upgrade-component/Card";
import {getGroupData, getRolesUserQuery, getUserRoleData} from "../../graphql/permissionQuery";
import { useQuery } from "@apollo/client";
import UpgradeModelForm from "./upgrade-component/UpgradeModelForm";
import PermissionModel from "../../components/models/permissionModel";
import Loader from "../../components/Loader/Loader";

function Upgrade(props) {
  const { loading, error, data } = useQuery(getUserRoleData);

  const RolesUser = useQuery(getRolesUserQuery);

  // todo :: Administrator users

  const AdministratorUsers = RolesUser?.data?.usersPermissionsRoles.data.filter(
    (item) => item.attributes.name == "Administrator"
  );

  // todo :: Author users
  const AuthorUsers = RolesUser?.data?.usersPermissionsRoles.data.filter(
    (item) => item.attributes.name == "Author"
  );

  // todo :: Approver users
  const ApproverUsers = RolesUser?.data?.usersPermissionsRoles.data.filter(
    (item) => item.attributes.name == "Approver"
  );

  // todo :: contributer users
  const ContributorUsers = RolesUser?.data?.usersPermissionsRoles.data.filter(
    (item) => item.attributes.name == "Contributor"
  );

  // todo :: Subscriber users
  const SubscriberUsers = RolesUser?.data?.usersPermissionsRoles.data.filter(
    (item) => item.attributes.name == "Subscriber"
  );

  const RolesCountingCategories = {
    Adminsitrator: AdministratorUsers?.map(
      (item) => item.attributes.users.data.length
    ),
    Approver: ApproverUsers?.map((item) => item.attributes.users.data.length),
    Author: AuthorUsers?.map((item) => item.attributes.users.data.length),
    Contributor: ContributorUsers?.map(
      (item) => item.attributes.users.data.length
    ),
    Subscriber: SubscriberUsers?.map(
      (item) => item.attributes.users.data.length
    ),
  };

  if (loading) return <Loader />;
  if (error) return `Error! ${error.message}`;

  return (
    <Box>
      <SimpleBreadCrumb root="Designation" />

      <div className="upgrade">
        <Row className="small-tag d-flex ">
          <div className="d-flex small-tag-col justify-content-evenly">
            <p>Administrator</p>
            <div className="drop-line"></div>
            <p>{RolesCountingCategories.Adminsitrator}</p>
          </div>
          <div className="d-flex small-tag-col justify-content-evenly">
            <p>Approver</p>
            <div className="drop-line"></div>
            <p>{RolesCountingCategories.Approver}</p>
          </div>
          <div className="d-flex small-tag-col justify-content-evenly">
            <p>Author</p>
            <div className="drop-line"></div>
            <p>{RolesCountingCategories.Author}</p>
          </div>
          <div className="d-flex small-tag-col justify-content-evenly">
            <p>Contributor</p>
            <div className="drop-line"></div>
            <p>{RolesCountingCategories.Contributor}</p>
          </div>
          <div className="d-flex small-tag-col justify-content-evenly">
            <p>Subscriber</p>
            <div className="drop-line"></div>
            <p>{RolesCountingCategories.Subscriber}</p>
          </div>
        </Row>
        <Row>
          <Col xs={12}>



            {/*<CollapsePanel title={"All Users"}>*/}
            {/*  <div className="card-panels d-flex gap-4 flex-wrap">*/}
            {/*    {data?.usersPermissionsUsers?.data?.map((user) => (*/}
            {/*      <Card*/}
            {/*        key={user.id}*/}
            {/*        id={user.id}*/}
            {/*        first_name={user.attributes.first_name}*/}
            {/*        last_name={user.attributes.last_name}*/}
            {/*        username={user.attributes.username}*/}
            {/*        org_name={user.attributes.org_name}*/}
            {/*        org_designation={user.attributes.org_designation}*/}
            {/*        createdAt={user.attributes.createdAt}*/}
            {/*        roles={user.attributes.roles}*/}
            {/*        image={user.attributes.image}*/}
            {/*        name={"Ritaliate lischsit"}*/}
            {/*        desc={*/}
            {/*          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sed faucibus interdum."*/}
            {/*        }*/}
            {/*        role={"Organization / Designation"}*/}
            {/*        time={"20 Jan 2021"}*/}
            {/*      />*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</CollapsePanel>*/}

            <CollapsePanel title={"Administrator"}>
              <div className="card-panels d-flex gap-4 flex-wrap">
                {AdministratorUsers?.map((item) =>
                  item.attributes.users.data.map((user) => (
                    <Card
                      key={user.id}
                      id={user.id}
                      first_name={user.attributes.first_name}
                      last_name={user.attributes.last_name}
                      username={user.attributes.username}
                      org_name={user.attributes.org_name}
                      org_designation={user.attributes.org_designation}
                      createdAt={user.attributes.createdAt}
                      image={user.attributes.image}
                      name={"Ritaliate lischsit"}
                      desc={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sed faucibus interdum."
                      }
                      role={"Organization / Designation"}
                      time={"20 Jan 2021"}
                    />
                  ))
                )}
              </div>
            </CollapsePanel>

            <CollapsePanel title={"Approver"}>
              <div className="card-panels d-flex gap-4 flex-wrap">
                {ApproverUsers?.map((item) =>
                  item.attributes.users.data.map((user) => (
                    <Card
                      key={user.id}
                      id={user.id}
                      first_name={user.attributes.first_name}
                      last_name={user.attributes.last_name}
                      username={user.attributes.username}
                      org_name={user.attributes.org_name}
                      org_designation={user.attributes.org_designation}
                      createdAt={user.attributes.createdAt}
                      image={user.attributes.image}
                      name={"Ritaliate lischsit"}
                      desc={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sed faucibus interdum."
                      }
                      role={"Organization / Designation"}
                      time={"20 Jan 2021"}
                    />
                  ))
                )}
              </div>
            </CollapsePanel>

            <CollapsePanel title={"Author"}>
              <div className="card-panels d-flex gap-4 flex-wrap">
                {AuthorUsers?.map((item) =>
                  item.attributes.users.data.map((user) => (
                    <Card
                      key={user.id}
                      id={user.id}
                      first_name={user.attributes.first_name}
                      last_name={user.attributes.last_name}
                      username={user.attributes.username}
                      org_name={user.attributes.org_name}
                      org_designation={user.attributes.org_designation}
                      createdAt={user.attributes.createdAt}
                      image={user.attributes.image}
                      name={"Ritaliate lischsit"}
                      desc={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sed faucibus interdum."
                      }
                      role={"Organization / Designation"}
                      time={"20 Jan 2021"}
                    />
                  ))
                )}
              </div>
            </CollapsePanel>

            <CollapsePanel title={"Contributor"}>
              <div className="card-panels d-flex gap-4 flex-wrap">
                {ContributorUsers?.map((item) =>
                  item.attributes.users.data.map((user) => (
                    <Card
                      key={user.id}
                      id={user.id}
                      first_name={user.attributes.first_name}
                      last_name={user.attributes.last_name}
                      username={user.attributes.username}
                      org_name={user.attributes.org_name}
                      org_designation={user.attributes.org_designation}
                      createdAt={user.attributes.createdAt}
                      image={user.attributes.image}
                      name={"Ritaliate lischsit"}
                      desc={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sed faucibus interdum."
                      }
                      role={"Organization / Designation"}
                      time={"20 Jan 2021"}
                    />
                  ))
                )}
              </div>
            </CollapsePanel>

            <CollapsePanel title={"Subscriber"}>
              <div className="card-panels d-flex gap-4 flex-wrap">
                {SubscriberUsers?.map((item) =>
                  item.attributes.users.data.map((user) => (
                    <Card
                      key={user.id}
                      id={user.id}
                      first_name={user.attributes.first_name}
                      last_name={user.attributes.last_name}
                      username={user.attributes.username}
                      org_name={user.attributes.org_name}
                      org_designation={user.attributes.org_designation}
                      createdAt={user.attributes.createdAt}
                      image={user.attributes.image}
                      name={"Ritaliate lischsit"}
                      desc={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sed faucibus interdum."
                      }
                      role={"Organization / Designation"}
                      time={"20 Jan 2021"}
                    />
                  ))
                )}
              </div>
            </CollapsePanel>
          </Col>
        </Row>
      </div>
    </Box>
  );
}

export default Upgrade;
