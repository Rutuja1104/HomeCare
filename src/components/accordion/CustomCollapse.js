import React, { useState } from 'react'
import { Collapse } from 'reactstrap'
import Container from '../container/Container';
import Icons from '../icon/Icon';
import { VEC_ICON_NAME } from '../icon/constants';

const CustomCollapse = ({ data, isContainer = true, isCollapsed = 0 }) => {
    const [collapse, setCollapse] = useState(isCollapsed)

    const toggle = (idx) => {
        if (collapse == idx) {
            setCollapse(-1)
        } else {
            setCollapse(idx)
        }
    }

    return (
        <React.Fragment>
            {data?.map((item, idx) => {
                return (
                    <div key={idx} className='mb-3'>
                        <div onClick={() => toggle(idx)} className={`custom-collapse ${collapse == idx && "collapse-border"}`}>
                            <div>
                                <span className='document-name'>{item.name} {item.isRequired && <span style={{ color: 'red' }}>*</span>}</span>
                            </div>
                            <Icons iconName={VEC_ICON_NAME.ARROW_DOWN_ICON} rotateDeg={collapse == idx ? 180 : 0} />
                        </div>
                        <Collapse
                            isOpen={collapse == idx}
                        >
                            {isContainer ?
                                <Container containerMainClassName="collapse-container">
                                    {item.component}
                                </Container> :
                                <>{item.component}</>
                            }
                        </Collapse>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

export default CustomCollapse
