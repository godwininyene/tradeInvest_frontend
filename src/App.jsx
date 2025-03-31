import {createBrowserRouter, createRoutesFromElements, RouterProvider ,Route} from 'react-router-dom';

//Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Investment from './pages/Investment';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';

//Layouts
import BaseLayout from './layouts/BaseLayout';
import GuestLayout from './layouts/GuestLayout';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';

//Auth Pages
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';


//Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import Investments from './pages/Admin/Investments';
import Transactions from './pages/Admin/Transactions';
import Users from './pages/Admin/Users';
import Plans from './pages/Admin/Plans';
import PaymentOptions from './pages/Admin/PaymentOptions';

//Investors pages
import InvestorDashboard from './pages/Investors/Dashboard';
import InvestorInvestments from './pages/Investors/Investments'
import InvestorTransactions from './pages/Investors/Transactions'
import Deposit from './pages/Investors/Deposit';
import Withdrawal from './pages/Investors/Withdrawal';
import InvestorSettings from './pages/Investors/Settings';
import AdminSettings from './pages/Admin/AdminSettings';


//Others
import NotFound from './pages/NotFound';
import Error from './components/Error';
import { requireAuth } from './utils/protect';




function App() {

  
  const router = createBrowserRouter(createRoutesFromElements(
    <>

      <Route path='/' element={<BaseLayout />}>
        <Route index element={<Home />}></Route>
        <Route path='/about_us' element={<About />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/investment' element={<Investment />}></Route>
        <Route path='/contact_us' element={<Contact />}></Route>
        <Route path='FAQs' element={<FAQs />}></Route>
      </Route>

      <Route path='/users' element={<GuestLayout />}>
        <Route path='register' element={<Register />}></Route>
        <Route path='login' element={<Login />}></Route>
      </Route>


      <Route path='/manage' element={<AuthenticatedLayout />}    loader={async({request})=> await requireAuth(request)}>
        {/* Admin Related Routes */}
        <Route path='admin/dashboard' element={<Dashboard />}></Route>
        <Route path='admin/investments' element={<Investments />}></Route>
        <Route path='admin/transactions' element={<Transactions />}></Route>
        <Route path='admin/users' element={<Users />}></Route>
        <Route path='admin/plans' element={<Plans />}></Route>
        <Route path='admin/payment_options' element={<PaymentOptions />}></Route>
        <Route path='admin/settings' element={<AdminSettings />}></Route>

        

        {/* Investor Related Routes */}
        <Route path='investor/dashboard' element={<InvestorDashboard />}></Route>
        <Route path='investor/investments' element={<InvestorInvestments />}></Route>
        <Route path='investor/transactions' element={<InvestorTransactions />}></Route>
        <Route path='investor/deposit' element={<Deposit/>}></Route>
        <Route path='investor/withdrawal' element={<Withdrawal/>}></Route>
        <Route path='investor/settings' element={<InvestorSettings/>}></Route>
       
      
      </Route>
      <Route path="*" element={<NotFound />} />

    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
