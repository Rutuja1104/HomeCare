import React, { useState } from "react";
import { BUTTON_TYPE } from "../libs/constant";

import Container from './container/Container'
import HorizontalSeparator from './separator/HorizontalSeparator'
// import TextInput from './input/TextInput'
import TabbedNavigation from './tabbedNavigation/TabbedNavigation'
import RichGrid from './richgrid/RichGrid'
import StepperNavigation from './stepperNavigation/StepperNavigation'
import Information from './information/Information'
import { VEC_ICON_NAME } from './icon/constants'
import Heading from './heading/Heading'
import { HEADING } from './heading/constants/constants'
import ImageWithDescription from "./ImageWithDescription/ImageWithDescription";

const ComponentDirectory = () => {
    const [selectedRow, setSelectedRow] = useState([]);

    const tabList = [
        {
            title: "Educational Info",
            tabBodyComponent: <p>Tabbed Body Component 1</p>,
            linkTo: "/tab1",
        },
        {
            title: "Employee History",
            tabBodyComponent: <p>Tabbed Body Component 2</p>,
            linkTo: "/tab2",
        },
        {
            title: "Health",
            tabBodyComponent: <p>Tabbed Body Component 3</p>,
            linkTo: "/tab2",
        },
    ];

    const ASSIGN_MEMBER_COLUMNS = [
        {
            field: "memberName",
            header: "Member",
            renderLogic: (row, idx) => <span>{row.member}</span>,
        },
        {
            field: "memberName",
            header: "Name",
            renderLogic: (row, idx) => <span>{row.name}</span>,
        },
        {
            field: "memberName",
            header: "Email",
            renderLogic: (row, idx) => <span>{row.email}</span>,
        },
        {
            field: "memberName",
            header: "Contact",
            renderLogic: (row, idx) => <span>{row.contact}</span>,
        },
    ];

    const GRID_DATA = [
        {
            member: "memberName",
            name: "Meber",
            email: "test@gmail.com",
            contact: "9877987987",
        },
        {
            member: "memberName",
            name: "Membe",
            email: "test@gmail.com",
            contact: "9877987987",
        },
        {
            member: "memberName",
            name: "ember",
            email: "test@gmail.com",
            contact: "9877987987",
        },
        {
            member: "memberName",
            name: "Memer",
            email: "test@gmail.com",
            contact: "9877987987",
        },
        {
            member: "memberName",
            name: "Mmber",
            email: "test@gmail.com",
            contact: "9877987987",
        },
        {
            member: "memberName",
            name: "Meber",
            email: "test@gmail.com",
            contact: "9877987987",
        },
    ];

    const steps = [
        {
            title: "Domain",
            stepBodyComponent: <p>Step Body 1 </p>,
            discardCb: () => { },
            backButtonText: "Back",
            prevCb: () => { },
            submitButtonText: "Next",
            submitCb: () => { },
        },
        {
            title: "Sub Domain",
            stepBodyComponent: <p>Step Body 2 </p>,
            discardCb: () => { },
            backButtonText: "Back",
            prevCb: () => { },
            submitButtonText: "Next",
            submitCb: () => { },
        },
        {
            title: "DNS Set Up",
            stepBodyComponent: <p>Step Body 3</p>,
            discardCb: () => { },
            backButtonText: "Back",
            prevCb: () => { },
            submitButtonText: "Next",
            submitCb: () => { },
        },
        {
            title: "DNS Set Up",
            stepBodyComponent: <p>Step Body 4</p>,
            backButtonText: "Back",
            prevCb: () => { },
            submitButtonText: "Next",
            submitCb: () => { },
        },
        {
            title: "DNS Set Up",
            stepBodyComponent: <p>Step Body 5</p>,
            backButtonText: "Back",
            prevCb: () => { },
            submitButtonText: "Submit",
            submitCb: () => { },
        },
    ];

    return (
        <Container header="Component directory">
            <Container
                header="Container"
                prefixProps={{
                    name: "Back",
                    variant: BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER,
                }}
                suffixProps={{ name: "Submit" }}
            >
                <h1>Hello</h1>
            </Container>

            <HorizontalSeparator style={{ margin: "30px 0" }} />

            {/* <TextInput /> */}

            <h3 className="mt-5">Tabbed Navigation</h3>
            <TabbedNavigation tabList={tabList} />

            <h3 className="mt-5">Rich Grid Table</h3>

            <RichGrid
                data={GRID_DATA}
                columns={ASSIGN_MEMBER_COLUMNS}
                selectable={true}
                extractRowKey={(row) => row.name}
                onSelectionChangeCallBack={(selectedData) =>
                    setSelectedRow(selectedData)
                }
                onHeaderSelectionChangeCallBack={(selectedData) =>
                    setSelectedRow(selectedData)
                }
                selectedRows={selectedRow}
            />

            <h3 className="mt-5">stepper navigation</h3>

            <StepperNavigation steps={steps} />

            < ImageWithDescription />
        </Container>
    );
};

export default ComponentDirectory;
