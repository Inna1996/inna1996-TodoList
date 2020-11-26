import React from 'react';
import cl from './Repo.module.css';
import classnames from 'classnames';

const Repo = ({ name, html_url, language, stars, forks, update }) => {
    return (
        <div className={cl.wrapper}>
            <a href={html_url} target='blank' className={cl.link} >
                {name}
            </a>
            <div >
                <div className={cl.descr}>
                    <div className={classnames({
                        [cl.language]: true,
                        [cl.html]: language === 'HTML',
                        [cl.css]: language === 'CSS',
                        [cl.js]: language === 'JavaScript'

                    })}>
                        {language}
                    </div>
                    <div className={cl.descrip_1}>
                        <div className={cl.deco}>
                            <p className={cl.stars}>{stars}</p>
                            <p className={cl.forks}>{forks}</p>
                        </div>
                        <div className={cl.date}>{new Date(update).toLocaleDateString(
                            "en-EN",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        )}</div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Repo;