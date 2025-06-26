import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import LoginPage from './assets/pages/LoginPage'
import AmendTutorials from './assets/pages/amendtutorials';
import NewTutorial from './assets/pages/newtutorial';
import { useState, useEffect } from 'react';
import EditTutorial from './assets/pages/edit';


function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    // Demo mode - no auth check
    setIsAuth(false);
  };

  const signUserOut = async () => {
    setIsAuth(false);
    window.location.pathname = "/";
  };


  return (
    <Router>
      <header>
      <div className='container'>
        <div id="branding">
            <h1>Opulence by Design</h1>
        </div>
        <nav>
          {!isAuth && <Link to="/" id='navitem'>Login</Link> }
          {isAuth && <Link to="/" onClick={signUserOut} id='navitem'>Logout</Link>}
          
        </nav>
        </div>
        </header>
      <Routes>
          <Route path='/' element={<LoginPage setIsAuth={setIsAuth}/>} />
          <Route path='/amend' element={<AmendTutorials isAuth={isAuth}/>} />
          <Route path='/newtutorial' element={<NewTutorial isAuth={isAuth}/>} />
          <Route path='/edittutorial' element={<EditTutorial isAuth={isAuth}/>} />
      </Routes>
    </Router>
  )
}

export default App
