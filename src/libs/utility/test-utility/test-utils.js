import React from 'react'

import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import store from '../../../store/store'

const AllTheProviders = ({ children }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {children}
            </Provider>
        </BrowserRouter>
    )
}

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }