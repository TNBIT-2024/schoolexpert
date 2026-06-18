import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { GetStarted } from './pages/GetStarted';
import { SchoolDirectory } from './pages/SchoolDirectory';
import { SchoolDetail } from './pages/SchoolDetail';
import { CommunityPage } from './pages/CommunityPage';
import { ResetPassword } from './pages/ResetPassword';
import { MeetFounder } from './pages/MeetFounder';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'signin', Component: SignIn },
      { path: 'get-started', Component: GetStarted },
      { path: 'schools', Component: SchoolDirectory },
      { path: 'schools/:id', Component: SchoolDetail },
      { path: 'community', Component: CommunityPage },
      { path: 'reset-password', Component: ResetPassword },
      { path: 'meet-the-founder', Component: MeetFounder },
      { path: 'features', Component: FeaturesPage },
      { path: 'AboutUs', Component: AboutPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
    ],
  },
]);


