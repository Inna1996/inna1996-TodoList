import React from 'react';
import cl from './AboutMe.module.css';
import { Octokit } from '@octokit/rest';
import GitHubIcon from '@material-ui/icons/GitHub';
import Preloader from './../Preloader/Preloader';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Repo from './Repo';


const octokit = new Octokit();

class AboutMe extends React.Component {

    state = {
        isLoading: true,
        username: 'Inna1996',
        repoList: [],
        isFetchSuccess: true,
        error: '',
        userData: '',
        firstRepo: 0,
        lastRepo: 4
    }

    prevPage = () => {
        this.setState({
            firstRepo: this.state.firstRepo - 4,
            lastRepo: this.state.lastRepo - 4
        });
    }

    nextPage = () => {
        this.setState({
            firstRepo: this.state.firstRepo + 4,
            lastRepo: this.state.lastRepo + 4
        });
    }

    componentDidMount() {
        octokit.repos.listForUser({
            username: this.state.username
        }).then(({ data }) => {
            console.log(data)
            this.setState({
                isLoading: false,
                repoList: data,
                isFetchSuccess: true,

            });
        }).catch(err => {
            this.setState({
                isLoading: false,
                isFetchSuccess: false,
                error: err
            })
        });

        octokit.users.getByUsername({
            username: this.state.username
        }).then((data) => {
            this.setState({
                userData: data.data,
                name: data.data.name,
                avatarUrl: data.data.avatar_url,
                bio: data.data.bio
            })
            console.log(data)
        })
    }

    render() {
        const { isLoading, repoList, error, isFetchSuccess, name, avatarUrl, bio, userData, firstRepo, lastRepo } = this.state;
        const repoListPage = repoList.slice(firstRepo, lastRepo);

        return (
            <div className={cl.aboutMe}>
                {isLoading ? <Preloader /> :
                    <div className={cl.profile}>
                        <div className={cl.avatar}>
                            <img src={avatarUrl} alt='avatar' />
                        </div >
                        <div className={cl.headers}>
                            <h1 className={cl.name}>{name}</h1>
                            <h2>{bio}</h2>
                            <a href='mailto:inazimmermann1996@gmail.com' className={cl.contact_link + ' ' + cl.mail}>inazimmermann1996@gmail.com</a>
                            <a href='tg://resolve?domain=InnaZim' className={cl.contact_link + ' ' + cl.teleg}> +49 (176) 301-457-29</a>
                        </div>
                        <div className={cl.contacts}>
                            <a rel='noopener noreferrer' target='_blank' href={userData.html_url} className={cl.github}>
                                <GitHubIcon style={{ color: 'indigo'[800], fontSize: 26 }} name='gh' className={cl.link + ' ' + cl.mediaLink} />
                            </a>
                            <a rel='noopener noreferrer' target='_blank' href='https://www.facebook.com' className={cl.link + ' ' + cl.facebook}>
                                <FacebookIcon style={{ color: 'indigo'[800], fontSize: 27 }} name='facebook' className={cl.mediaLink} />
                            </a>

                            <a rel='noopener noreferrer' target='_blank' href="https://www.instagram.com/" className={cl.link + ' ' + cl.instagram}>
                                <InstagramIcon style={{ color: 'indigo'[800], fontSize: 27 }} name='instagram' className={cl.mediaLink} />
                            </a>
                        </div>
                    </div>}
                {!isLoading &&
                    <div>
                        {!isFetchSuccess ? 'Something is wrong ' + error :
                            <div >
                                <div className={cl.list_wrapper}>
                                    {repoList.length <= 4 ? null :
                                        <div className={cl.arrows}>
                                            <button onClick={this.prevPage}
                                                disabled={firstRepo < 4} className={cl.arrowLeft}>
                                            </button>
                                            <button onClick={this.nextPage}
                                                disabled={repoList.length <= lastRepo}
                                                className={cl.arrowRight}>
                                            </button>
                                        </div>
                                    }
                                    <ol className={cl.list}>
                                        {repoListPage.map(repo => (<li className={cl.link} key={repo.id}>
                                            <Repo language={repo.language}
                                                name={repo.name}
                                                html_url={repo.html_url}
                                                stars={repo.stargazers_count}
                                                forks={repo.forks_count}
                                                update={repo.updated_at} />
                                        </li>))}
                                    </ol>
                                </div>
                            </div>}
                    </div>
                }
            </div>
        )
    }

};
export default AboutMe;