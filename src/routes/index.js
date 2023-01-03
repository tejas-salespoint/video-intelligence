import {Route, Routes} from "react-router-dom";


// routes
import RequireAuth from "./RequireAuth";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import VideoList from "../pages/VideoList/VideoList";
import VideoInsights from "../pages/videoInsights/videoInsights";
import SimpleVideoList from "../pages/SimpleVideoList/SimpleVideoList";
import WatchList from "../pages/watchList/WatchList";
import DashboardSubscriber from "../pages/Dashboard/subscriber/DashboardSubscriber";
import Channels from "../pages/channels/Channels";
import Groups from "../pages/groups/Groups";
import UploadVideo from "../pages/uploadVideo/UploadVideo";
import Billing from "../pages/billing/Billing";
import Permission from "../pages/permission/Permission";
import Upgrade from "../pages/upgrade/Upgrade";
import Support from "../pages/Support/Support";
import Settings from "../pages/settings/Settings";
import MinimalLayout from "../layout/MinimalLayout/MinimalLayout";
import LoginForm from "../pages/Authentication/Auth/LoginForm/LoginForm";
import RegisterForm from "../pages/Authentication/Auth/RegisterForm/RegisterFom";
import SecondUploadVideo from "../pages/uploadVideo/SecondUploadVideo";
import SampleUpload from "../pages/sample_upload/SampleUpload";
import NewSampleUpload from "../pages/sample_upload/NewSampleUpload";
import DesignUpload from "../pages/sample_upload/DesignUpload";
import GraphQlTest from "../pages/TestingPages/GraphQlTest";

export default function ThemeRoutes() {

    return (

        <Routes>
            <Route element={<RequireAuth/>}>
                <Route path='/' element={<MainLayout/>}>
                    <Route path='/' element={<Dashboard/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/video/list' element={<VideoList/>}/>
                    <Route path='/video/list/:id' element={<VideoInsights/>}/>
                    <Route path='/subscriber/video/list' element={<SimpleVideoList/>}/>
                    <Route path='/watchlist' element={<WatchList/>}/>
                    <Route path='/subscriber' element={<DashboardSubscriber/>}/>
                    <Route path='/channels' element={<Channels/>}/>
                    <Route path='/groups' element={<Groups/>}/>
                    <Route path='/upload-video' element={<DesignUpload/>}/>
                    <Route path='/second-upload-video' element={<SecondUploadVideo/>}/>
                    <Route path='/billing' element={<Billing/>}/>
                    <Route path='/permission' element={<Permission/>}/>
                    <Route path='/upgrade' element={<Upgrade/>}/>
                    <Route path='/support' element={<Support/>}/>
                    <Route path='/setting' element={<Settings/>}/>
                    <Route path='/samplevideoupload' element={<SampleUpload/>}/>
                    <Route path='/newsampleupload' element={<NewSampleUpload/>}/>
                    <Route path='/designupload' element={<DesignUpload/>}/>
                    <Route path='/graphqltest' element={<GraphQlTest/>}/>
                </Route>
            </Route>
            <Route path="/" element={<MinimalLayout/>}>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
            </Route>
        </Routes>

    )
}