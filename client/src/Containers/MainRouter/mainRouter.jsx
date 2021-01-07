import axios from 'axios';
import React, { Fragment, Suspense, useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';

import LogoPage from '../../Components/UI/LogoPage/logo-page';
import LandingPageGuard from '../../HOC/Guards/LandingPageGuard';
import MainPageGuard from '../../HOC/Guards/MainPageGuard';

const AsyncLandingPage = React.lazy(()=>{
    return import('../LandingPage/landingPage')
})

const AsyncMainPage = React.lazy(()=>{
    return import('../MainPage/mainPage')
})

function MainRouter(){

    const [authentication_status, SetAuthenticationStatus] = useState(null);

    const ChangeAuthentication = (status)=>{
        if(status){
            localStorage.clear();
            localStorage.setItem('auth-status', false);
            SetAuthenticationStatus(false);
        }else{
            SetAuthenticationStatus(true);
        }
    }

    const CheckJWT = (token)=>{
        axios.post('/check', { token }).then((response)=>{
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
    }, [])

    useEffect(()=>{
        fetch_jsx();
    }, [ fetch_jsx ]);

    // useEffect(()=>{
    //     if(authentication_status === true){
    //         if(!localStorage.getItem('Username') || !localStorage.getItem('auth-token')|| !localStorage('auth-status')){
    //             ChangeAuthentication(true);
    //         }
    //     }
    // });

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

export default MainRouter;
