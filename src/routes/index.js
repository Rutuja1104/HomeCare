import React from "react";
import { Routes, Route } from "react-router-dom";

import { AUTH_PROTECTED_ROUTES, NURSE_ONBOARDING_ROUTE, PUBLIC_ROUTES } from "./allRoutes";
import { AuthProtected, FullPageRoute } from "./authProtected";
import VerticalLayout from "../layouts/index";
import NonAuthLayout from "../layouts/NonAuthLayout";
import DataLoader from "../components/loaders/dataloader/DataLoader";

const index = () => {
    return (
        <React.Fragment>
            <Routes>
                {PUBLIC_ROUTES.map((route, idx) => {    
                    return (
                        <Route
                            path={route.path}
                            key={idx}
                            element={
                                <FullPageRoute>
                                    <DataLoader>
                                        {route.component}
                                    </DataLoader>
                                </FullPageRoute>
                            }
                        />
                    );
                })}

                {AUTH_PROTECTED_ROUTES.map((route, idx) => {
                    const { path, component, roles } = route;
                    return (
                        <Route
                            key={idx}
                            exact={true}
                            path={path}
                            element={
                                <AuthProtected roles={roles}>
                                    <DataLoader>
                                        <VerticalLayout>{component}</VerticalLayout>
                                    </DataLoader>
                                </AuthProtected>
                            }
                        />
                    );
                })}

                {NURSE_ONBOARDING_ROUTE.map((route, idx) => {
                    const { path, component } = route;
                    return (
                        <Route
                            key={idx}
                            exact={true}
                            path={path}
                            element={
                                <NonAuthLayout>
                                    <DataLoader>
                                        {component}
                                    </DataLoader>
                                </NonAuthLayout>
                            }
                        />
                    );
                })}
            </Routes>
        </React.Fragment>
    );
};

export default index;
