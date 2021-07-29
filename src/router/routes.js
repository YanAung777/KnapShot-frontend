
import Layout from 'layout';

// pages
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import ResetPasswordRequestPage from 'pages/login/reset'
import ResetPasswordPage from 'pages/login/change'
import OverviewPage from 'pages/overview';
import TechnologyPage from 'pages/technology';
import DigitalEngagementPage from 'pages/digitalEngagement';
import CompanySearchPage from 'pages/companySearch';
import CompanyProfilePage from 'pages/companyProfile';
import ManagePage from 'pages/manage';
import UserPage from 'pages/manage/user';
import UserDashboard from 'pages/manage/user/dashboard';
import UserCreate from 'pages/manage/user/create';
import Respondents from 'pages/respondents'
import NotFoundPage from 'pages/not-found';


const routes = [
    {
        component: Layout,
        routes: [
            {
                component: HomePage,
                path: '/',
                exact: true,
            },
            {
                component: LoginPage,
                // path: '/login/:urlEmail?',
                path: '/login',
                exact: true
            },
            {
                component: LoginPage,
                path: '/login/:urlEmail'
            },
            {
                component: ResetPasswordRequestPage,
                path: '/reset',
            },
            {
                component: ResetPasswordPage,
                path: '/resetPassword/:email'
            },
            {
                component: OverviewPage,
                path: '/overview',
            },
            {
                component: TechnologyPage,
                path: '/technology',
            },
            {
                component: DigitalEngagementPage,
                path: '/digitalEngagement',
            },
            {
                component: CompanySearchPage,
                path: '/companySearch/:companyName/:dataset',
                exact: true,
            },
            {
                component: CompanyProfilePage,
                path: '/company/:companyName',
                exact: true,
            },
            {
                component: ManagePage,
                path: '/manage',
                exact: true
            },
            {
                component: UserPage,
                path: '/manage/user',
                exact: true
            },
            {
                component: UserDashboard,
                path: '/manage/user/dashboard',
                exact: true
            },
            {
                component: UserCreate,
                path: '/manage/user/create',
                exact: true
            },
            {
                component: Respondents,
                path: '/respondents',
                exact: true,
            },
            {
                component: NotFoundPage
            },
        ]
    }
]

export { routes };