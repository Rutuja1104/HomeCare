import React, { useEffect, useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import Container from '../container/Container'
import Icons from '../icon/Icon'

const TabbedNavigationWIcon = ({ tabList = [], activeTabIndex = 0, onChangeTabCb = () => { }, isContainer = true }) => {
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
                    <Nav className="tabs-with-icons mb-4">
                        {tabList?.map((item, key) => (
                            <NavItem className='nav-item-with-icons' active={activeIndex == key} key={`nav-item-${key}`} onClick={() => handleClick(key)}>
                                <NavLink className='nav-link-with-icon' style={{ cursor: "pointer" }}>
                                    {item.icon && <Icons iconName={item.icon} />}
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
                                    <Container>
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

export default TabbedNavigationWIcon

