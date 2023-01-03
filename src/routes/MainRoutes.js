
import Dashboard from "pages/Dashboard/Dashboard";
import Profile from "pages/profile/Profile";
import MainLayout from "../layout/MainLayout";
import VideoList from "../pages/VideoList/VideoList";
import SimpleVideoList from "../pages/SimpleVideoList/SimpleVideoList";
import DashboardSubscriber from "../pages/Dashboard/subscriber/DashboardSubscriber";
import Channels from "../pages/channels/Channels";
import WatchList from "../pages/watchList/WatchList";
import Groups from "../pages/groups/Groups";
import UploadVideo from "../pages/uploadVideo/UploadVideo";
import Billing from "../pages/billing/Billing";
import Permission from "../pages/permission/Permission";
import Upgrade from "../pages/upgrade/Upgrade";
import Support from "../pages/Support/Support";
import Settings from "../pages/settings/Settings";
import VideoInsights from "../pages/videoInsights/videoInsights";
import SecondUploadVideo from "../pages/uploadVideo/SecondUploadVideo";



const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard  />
        },
        {
            path: '/profile',
            element: <Profile />
        },

        {
            path: '/video/list',
            element: <VideoList />
        },
        {
            path: '/video/list/id',
            element: <VideoInsights />
        },
        {
            path: '/subscriber/video/list',
            element: <SimpleVideoList />
        },
        {
            path: '/watchlist',
            element: <WatchList />
        },
        {
            path: '/subscriber',
            element: <DashboardSubscriber />
        },
        {
            path: '/channels',
            element: <Channels />
        },
        {
            path: '/groups',
            element: <Groups />
        },
        {
            path: '/upload-video',
            element: <UploadVideo />
        },
        {
            path: '/second-upload-video',
            element: <SecondUploadVideo />
        },
        {
            path: '/billing',
            element: <Billing />
        },
        {
            path: '/permission',
            element: <Permission />
        },
        {
            path: '/upgrade',
            element: <Upgrade />
        },
        {
            path: '/support',
            element: <Support />
        },
        {
            path: '/setting',
            element: <Settings />
        },


    ]
}

export default MainRoutes;