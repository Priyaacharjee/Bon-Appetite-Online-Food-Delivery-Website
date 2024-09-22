import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home1 from './pages/Home1';
import Login from './pages/Login';
import Sign_up from './pages/Sign_up';
import Home2 from './pages/Home2';
import Menu from './pages/Menu';
import My_cart from './pages/My_cart';
import My_order from './pages/My_order';
import My_account from './pages/My_account';
import Services from './Components/Services';
import Restaurent from './pages/Restaurent';
import Admin_control_panel from './pages/Admin_control_panel';
import DeliveryPage from './pages/DeliveryPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home1 />}></Route>
          <Route exact path='/Login' element={<Login />}></Route>
          <Route exact path='/Sign_up' element={<Sign_up />}></Route>
          <Route exact path='/Home2' element={<Home2 />}></Route>
          <Route exact path='/Menu' element={<Menu/>}></Route>
          <Route exact path='/Restaurent' element={<Restaurent/>}></Route>
          <Route exact path='/My_cart' element={<My_cart/>}></Route>
          <Route exact path='/My_order' element={<My_order/>}></Route>
          <Route exact path='/My_account' element={<My_account/>}></Route>
          <Route exact path='/Services' element={<Services/>}></Route>
          <Route exact path='/Admin' element={<Admin_control_panel/>}></Route>
          <Route exact path='/DeliveryBoy' element={<DeliveryPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;