import React,{Suspense,lazy} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Menubar from './components/Menubar';
import Header from './components/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const CreatePlan = lazy(() => import('./pages/CreatePlan/CreatePlan'));
const CustomerPlan = lazy(() => import('./pages/CustomerPlan/CustomerPlan'));


function App() {
  //All routes to the pages
  return (
     <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Menubar />
      <Routes>
        <Route path='/' element={
          <>
          <Header/>
          </>
        }>
        </Route>
        <Route path='/customerPlan' element={<CustomerPlan />} />
        <Route path='/createplan' element={<CreatePlan />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
