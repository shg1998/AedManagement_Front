import React, {lazy, Suspense} from "react";
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

const Dashboard = lazy(() => import("./layouts/MainLayout"));
const Login = lazy(() => import("./containers/Login/Login"));
const AllAdmins = lazy(() => import("./containers/Admins/AllAdmins"));
const AllAeds = lazy(() => import("./containers/Aeds/AllAeds"));
const AllUsers = lazy(() => import("./containers/Users/AllUsers"));

const App = (): React.JSX.Element => {
    const {isAuthenticated} = useAuthState();
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
                            <Route path="/" element={<Navigate replace to="/dashboard/admins"/>}/>
                            <Route
                                path="/login"
                                element={<Navigate replace to="/dashboard"/>}
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
                                    path={routes.users}
                                    element={
                                        <CustomRoute
                                            element={<Dashboard component={<AllUsers/>}/>}
                                            section_name="users"
                                            module_name="users"
                                        />
                                    }
                                />

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
