import React, { useEffect, useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import Container from '../container/Container'

const TabbedNavigation = ({ tabList = [], activeTabIndex = 0, onChangeTabCb = () => { }, isContainer = true ,showContainerStyle}) => {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        if (activeTabIndex !== activeIndex) setActiveIndex(activeTabIndex)
    }, [activeTabIndex])

    const handleClick = (index) => {
        onChangeTabCb(index)
        setActiveIndex(index)
    }

    return (
        <React.Fragment>
            {tabList.length !== 0 ?
                <>
                    <Nav className="nav nav-tabs mb-3">
                        {tabList?.map((item, key) => (
                            <NavItem active={activeIndex == key} key={`nav-item-${key}`} onClick={() => handleClick(key)}>
                                <NavLink style={{ cursor: "pointer" }}>
                                    {item.title}
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                    <TabContent
                        activeTab={activeIndex}
                        className="text-muted"
                    >
                        {tabList?.map((item, key) => (
                            <TabPane tabId={key} id={`tab-${key}`} key={key}>
                                {isContainer ?
                                    <Container showContainerStyle={showContainerStyle}>
                                        {item.tabBodyComponent}
                                    </Container> :
                                    <>
                                        {item.tabBodyComponent}
                                    </>
                                }
                            </TabPane>
                        ))}
                    </TabContent>
                </> : ""
            }
        </React.Fragment>
    )
}

export default TabbedNavigation

