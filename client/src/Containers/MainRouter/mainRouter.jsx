import axios from 'axios';
import React, { Fragment, Suspense, useCallback, useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router';

import LogoPage from '../../Components/UI/LogoPage/logo-page';
import LandingPageGuard from '../../HOC/Guards/LandingPageGuard';
import MainPageGuard from '../../HOC/Guards/MainPageGuard';

const AsyncLandingPage = React.lazy(()=>{
    return import('../LandingPage/landingPage')
})

const AsyncMainPage = React.lazy(()=>{
    return import('../MainPage/mainPage')
})

function MainRouter({ history }){

    const [authentication_status, SetAuthenticationStatus] = useState(null);

    const ChangeAuthentication = (status)=>{
        if(status){
            localStorage.clear();
            localStorage.setItem('auth-status', false);
            SetAuthenticationStatus(false);
            history.push('/?loggedout=True');
        }else{
            SetAuthenticationStatus(true);
            history.push('/main-app');
        }
    }

    const CheckJWT = (token)=>{
        axios.post('http://localhost:8000/check', { token }).then((response)=>{
            const data = response.data;
            const error = {access_denied: true}
            if(JSON.stringify(data) !== JSON.stringify(error)){
                SetAuthenticationStatus(true);
            }
        })
    }

    const fetch_jsx = useCallback(()=>{
        const token = localStorage.getItem('auth-token');
        const auth_status = JSON.parse(localStorage.getItem('auth-status'));
        if(!auth_status){
            localStorage.setItem('auth-status', false);
            SetAuthenticationStatus(false);
        }else{
            if(auth_status === false){
                SetAuthenticationStatus(false);
            }

            if(token && auth_status){
                // axios request for jwt check
                CheckJWT(token)
            }
        }
    }, []);

    useEffect(()=>{
        fetch_jsx();
    }, [ fetch_jsx ]);


    // useEffect(()=>{
    //     if(authentication_status === true){
    //         const localStorageList = JSON.parse(localStorage);
    //         const Lengthcount = Object.keys(localStorageList);
    //         if(Lengthcount.length <= 5){
    //             localStorage.clear();
    //             localStorage.setItem('auth-status', false);
    //             SetAuthenticationStatus(false);
    //         }
    //     }
    // }, [ authentication_status ])

    return (
        <Fragment>
            <MainPageGuard auth_status={authentication_status}>
                <Switch>
                    <Route path='/mainPage' render={()=>{
                        return (<Suspense fallback={<LogoPage/>}>
                            <AsyncMainPage authenticate={ (status)=>ChangeAuthentication(status) }/>
                        </Suspense>)
                    }}/>
                    <Route render={()=>{
                        return (<Suspense fallback={<LogoPage/>}>
                            <AsyncMainPage authenticate={ (status)=>ChangeAuthentication(status) }/>
                        </Suspense>)
                    }}/>
                    
                </Switch>
            </MainPageGuard>
            <LandingPageGuard auth_status={authentication_status}>
                    <Route path='/landingPage' render={()=>{
                        return (<Suspense fallback={<LogoPage/>}>
                            <AsyncLandingPage authenticate={ (status)=>ChangeAuthentication(status) }/>
                        </Suspense>)
                    }}/>
                    <Route render={
                        ()=>{
                            return(
                                <Suspense fallback={<LogoPage/>}>
                                    <AsyncLandingPage authenticate={ (status)=>ChangeAuthentication(status) }/>
                                </Suspense>
                            )
                        }
                    }/>
                    
            </LandingPageGuard>
        </Fragment>
    );
}

export default withRouter( MainRouter );
