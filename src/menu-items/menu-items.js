

// ==============================||  MENU ITEMS ||============================== //

import {
    BillingSideIcon,
    ChannelsSideIcon,
     DashboardSideIcon,
    GroupsSideIcon, permissionsSideIcon, ProfileSideIcon, SettingSideIcon, SupportSideIcon, UpgradeSideIcon,
    UploadVideoSideIcon,
    VideosSideIcon,
    WatchlistSideIcon
} from "../contants";

const  menuItems = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        path: '/',
        icon: DashboardSideIcon,
        active : true,
        permission : ['Administrator','Approver','Author']
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        path: '/subscriber',
        icon: DashboardSideIcon,
        active : true,
        permission : ['Contributor','Subscriber']
    },
    {
        id: 'group',
        title: 'Groups',
        path: '/groups',
        icon: GroupsSideIcon,
        active : false,
        permission : ['Administrator','Approver','Author','Contributor','Subscriber']
    },
    {
        id: 'channels',
        title: 'Channels',
        path: '/channels',
        icon: ChannelsSideIcon,
        active : false,
        permission : ['Administrator','Approver','Author','Contributor','Subscriber']
    },
    {
        id: 'video',
        title: 'Videolist',
        path: '/video/list',
        icon: VideosSideIcon,
        active : false,
        permission : ['Administrator','Approver','Author']
    },
    {
        id: 'video',
        title: 'Videolist',
        path: '/subscriber/video/list',
        icon: VideosSideIcon,
        active : false,
        permission : ['Contributor','Subscriber']
    },
    {
        id: 'watchlist',
        title: 'WatchList',
        path: '/watchlist',
        icon: WatchlistSideIcon ,
        active : false,
        permission : ['Administrator','Approver','Author','Contributor','Subscriber']
    },
    {
        id: 'uploadvideo',
        title: 'Upload Video',
        path: '/upload-video',
        icon: UploadVideoSideIcon ,
        active : false,
        permission : ['Administrator','Approver','Author']
    },
    {
        id: 'profile',
        title: 'Profile',
        path: '/profile',
        icon: ProfileSideIcon,
        active : false,
        permission : ['Administrator','Approver','Author','Contributor','Subscriber']
    },
    // {
    //     id: 'billing',
    //     title: 'Billing',
    //     path: '/billing',
    //     icon: BillingSideIcon,
    //     active : false,
    //     permission : ['Administrator','Approver','Author','Contributor','Subscriber']
    // },
    // {
    //     id: 'permission',
    //     title: 'Permission',
    //     path: '/permission',
    //     icon: permissionsSideIcon,
    //     active : false,
    // permission : ['Administrator','Approver','Author','Contributor','Subscriber']
    // },
    {
        id: 'upgrade',
        title: 'Upgrade',
        path: '/upgrade',
        icon: UpgradeSideIcon,
        active : false,
        permission : ['Administrator','Approver']
    },
    // {
    //     id: 'support',
    //     title: 'Support',
    //     path: '/support',
    //     icon: SupportSideIcon,
    //     active : false,
    // permission : ['Administrator','Approver','Author','Contributor','Subscriber']
    // },
    {
        id: 'setting',
        title: 'Settings',
        path: '/setting',
        icon: SettingSideIcon,
        active : false,
        permission : ['Administrator','Approver','Author','Contributor','Subscriber']
    },



];


export default menuItems;

