import { useEffect, useState } from 'react';
import logo from './icons/logo.png';
import './sass/components/_app.scss';
import {Link, Routes, Route, BrowserRouter, useLocation} from 'react-router-dom';
import Main from "./components/Main";
import Tests from './components/Tests';
import Pro from './components/Pro';
import { DataContext } from "./components/context";
import {language} from "./locale/ru-RU";
import l from './icons/slogan.svg';
import c from './icons/image.svg';

function AppRouter(){
  return(
    <BrowserRouter>
        <App />  
    </BrowserRouter>
  );
}

function App() {
  const [activeNavbar, setActiveNavbar] = useState("home");//активная запись навигации
  const [activeLeft, setActiveLeft] = useState(true);//активная запись навигации, подчеркивание слева
  const location = useLocation();

  useEffect(() => {
    setActiveNavbar(location && (location.pathname.replace("/", "") ? location.pathname.replace("/", "") : "home"));
    //console.log(window.innerWidth);
}, [location]);
  
  function navbarClick(title: string){
    //указывает направление подчеркивания
    const oldActive = document.querySelector(".a-nav-active-left") ? document.querySelector(".a-nav-active-left") : document.querySelector(".a-nav-active-right");
    document.getElementById(title)!.getBoundingClientRect().left < oldActive!.getBoundingClientRect().left ? setActiveLeft(false) : setActiveLeft(true);
    //установка активной вкладки
    setActiveNavbar(title);
  }
  return (
      <DataContext.Provider value={ language }>
        <div className='theme-dark'>
          <div className="app">
              <header className="app-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <nav className="navbar navbar-expand-sm navbar-dark border-bottom fixed-top">
                  <div className="container-fluid">
                    <div className='d-flex'>
                      <img src={c} alt="logo" width="80" height="70" className="ms-1" />
                      <img src={l} alt="logo" width="180" height="60" className="me-2 ms-1" />
                    </div>
                      
                      <div className="collapse navbar-collapse justify-content-between">
                          <ul className="navbar-nav me-auto">
                              <li>
                                  <Link to="/" id="home" onClick={(event) => { navbarClick("home") }} className={activeNavbar === "home" ? (activeLeft ? "a-nav a-nav-active-left" : "a-nav a-nav-active-right") : "a-nav"}>{language.main}</Link>
                              </li>
                              <li>
                                  <Link to="/tests" id="tests" onClick={(event) => { navbarClick("tests") }} className={activeNavbar === "tests" ? (activeLeft ? "a-nav a-nav-active-left" : "a-nav a-nav-active-right") : "a-nav"}>{language.tests}</Link>
                              </li>
                              <li>
                                  <Link to="/pro" id="pro" onClick={(event) => { navbarClick("pro") }} className={activeNavbar === "pro" ? (activeLeft ? "a-nav a-nav-active-left" : "a-nav a-nav-active-right") : "a-nav"}>{language.pro}</Link>
                              </li>
                          </ul>
                      </div>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onBlur={()=>{setTimeout(()=>{document.querySelector(".navbar-collapse")?.classList.remove("show")}, 200);}}>
                          <span className="navbar-toggler-icon"></span>
                      </button>
                    </div>
                  </nav>
              
              </header>
              <main className='body'>
                <Routes>
                      <Route path="/" element={<Main message="message-main"/>}/>
                      <Route path="/tests" element={<Tests message="message-test"/>}/>    
                      <Route path="/pro" element={<Pro message="message-test"/>}/>                           
                </Routes>
              </main>
              <footer className='footer'>
              {`© 2023${new Date().getFullYear() > 2023 ? (" - " + new Date().getFullYear()) : ""} ${language.ddC}`}
              </footer>
            </div>
        </div>
      </DataContext.Provider>
  );
}

export default AppRouter;
