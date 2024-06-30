import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const globalStyles = {
    fontFamily: 'Figtree'
}
const stripePromise= loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Elements stripe={stripePromise}>
        <Provider store={store}>
            <BrowserRouter>
                <div style={globalStyles}>
                    <App />
                    <ToastContainer />
                </div>
            </BrowserRouter>
        </Provider>
    </Elements>
)
