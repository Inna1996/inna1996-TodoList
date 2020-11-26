import React, { useState } from 'react';
import cl from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import ToDo from './Components/ToDo/ToDo';
import AboutMe from './Components/AboutMe/AboutMe';
import { I18Provider, LOCALES } from './i18n/index';

const App = () => {
  const [locale, setLocale] = useState(LOCALES.ENGLISH);

  return (
    <I18Provider locale={locale}>
      <BrowserRouter>
        <div className={cl.main}>
          <div className={cl.main_header}>
            <div className={cl.logo}></div>
            <Navbar />
            <div className={cl.switchLanguage}>
              <button onClick={() => setLocale(LOCALES.ENGLISH)} className={cl.button}>EN</button>
              <button onClick={() => setLocale(LOCALES.GERMAN)} className={cl.button}>DE</button>
              <button onClick={() => setLocale(LOCALES.RUSSIAN)} className={cl.button}>RU</button>
            </div>
          </div>
          <div className={cl.wrapper}>
            <Switch>
              <Route exact path='/' render={() => <AboutMe />} />
              <Route path='/todo' render={() => <ToDo />} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </I18Provider>
  );
};

export default App;
