import React, {lazy, Suspense, useEffect} from "react";
import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import routes from "./routes/routes";
import {ReactQueryDevtools} from "react-query/devtools";
import {ToastContainer} from "react-toastify";
import PrivateRoutes from "./routes/PrivateRoute";
import {useAuthState} from "./context/AuthContext";
import NavigationScroll from "./layouts/MainLayout/NavigationScroll";
import CustomRoute from "./components/CustomRoute/CustomRoute";
import {styled} from "@mui/system";
import {useThemeContext} from "./ThemeContext";
import {getItemSecure} from "./utils/AESCrypto";

const Dashboard = lazy(() => import("./layouts/MainLayout"));
const Login = lazy(() => import("./containers/Login/Login"));
const AllAdmins = lazy(() => import("./containers/Admins/AllAdmins"));
const AllAeds = lazy(() => import("./containers/Aeds/AllAeds"));
const AllUsers = lazy(() => import("./containers/Users/AllUsers"));
const AllSelfTests = lazy(() => import("./containers/SelfTests/AllSelfTests"));
const NotFound = lazy(() => import("./containers/NotFound/NotFound"));


const App = (): React.JSX.Element => {
    const {isAuthenticated, isAdmin, isSuperAdmin} = useAuthState();
    const {theme} = useThemeContext();
    const StyledApp = styled("div")({
        backgroundColor: theme.palette.background.paper,
        height: "100%",
    });


    return (
        <StyledApp>
            <ToastContainer
                rtl={true}
                position="top-center"
                closeButton={false}
                toastClassName={"toastClass"}
                bodyClassName={"toast-font-class"}
            />
            <BrowserRouter>
                <Suspense fallback={<LoadingComponent/>}>
                    <NavigationScroll>
                        <Routes>
                            {!isAuthenticated && (
                                <>
                                    <Route path={routes.login} element={<Login/>}/>
                                    <Route path="/" element={<Navigate replace to="/login"/>}/>
                                    <Route path="*" element={<Navigate replace to="/login"/>}/>
                                </>
                            )}
                            <Route path="/" element={<Navigate replace to="/dashboard/aeds"/>}/>
                            <Route
                                path="/login"
                                element={<Navigate replace to="/dashboard/aeds"/>}
                            />
                            {/*Private Routes */}
                            <Route element={<PrivateRoutes/>}>

                                <Route
                                    path={routes.aeds}
                                    element={
                                        <CustomRoute
                                            element={<Dashboard component={<AllAeds/>}/>}
                                            section_name="aeds"
                                            module_name="aeds"
                                        />
                                    }
                                />

                                <Route
                                    path={routes.selfTests}
                                    element={
                                        <CustomRoute
                                            element={<Dashboard component={<AllSelfTests/>}/>}
                                            section_name="selfTests"
                                            module_name="selfTests"
                                        />
                                    }
                                />

                                {
                                    isAdmin || isSuperAdmin ? (
                                        <Route
                                            path={routes.users}
                                            element={
                                                <CustomRoute
                                                    element={<Dashboard component={<AllUsers/>}/>}
                                                    section_name="users"
                                                    module_name="users"
                                                />
                                            }
                                        />
                                    ) : <></>
                                }

                                {
                                    isSuperAdmin ? (
                                        <Route
                                            path={routes.admins}
                                            element={
                                                <CustomRoute
                                                    element={<Dashboard component={<AllAdmins/>}/>}
                                                    section_name="admins"
                                                    module_name="admins"
                                                />
                                            }
                                        />
                                    ) : <></>
                                }

                                <Route path="*" element={<NotFound />} />

                            </Route>
                        </Routes>
                    </NavigationScroll>
                </Suspense>
            </BrowserRouter>
            <ReactQueryDevtools/>
        </StyledApp>
    );
};

export default App;
