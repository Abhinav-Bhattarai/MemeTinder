import React, { Component, Fragment, Suspense } from 'react';
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

class MainRouter extends Component {

    state = {
        authentication_status: null
    }

    componentDidMount(){
        const token = localStorage.getItem('auth-token')
        const auth_status = JSON.parse(localStorage.getItem('auth-status'))
        if(auth_status === undefined){
            localStorage.setItem('auth-status', false)
            this.setState({
                authentication_status: false
            })
        }
        if(token && auth_status){
            // axios request for jwt check
            this.setState({
                authentication_status: true
            })
        }
    }

    render() {
        return (
            <Fragment>
                <MainPageGuard auth_status={this.state.authentication_status}>
                    <Switch>
                        <Route path='/mainPage' render={()=>{
                            <Suspense fallback={<LogoPage/>}>
                                <AsyncMainPage/>
                            </Suspense>
                        }}/>

                        <Route render={()=>{
                            <Suspense fallback={<LogoPage/>}>
                                <AsyncMainPage/>
                            </Suspense>
                        }}/>
                        
                    </Switch>
                </MainPageGuard>

                <LandingPageGuard>
                        <Route path='/landingPage' render={()=>{
                            <Suspense fallback={<LogoPage/>}>
                                <AsyncLandingPage/>
                            </Suspense>
                        }}/>
                        <Route render={()=>{
                            <Suspense fallback={<LogoPage/>}>
                                <AsyncLandingPage/>
                            </Suspense>
                        }}/>
                </LandingPageGuard>
            </Fragment>
        );
    }
}

export default MainRouter;
