import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeUser} from '../actions';
import {DataPage, MainPage, User} from './index';
import firebase from 'firebase';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';


class App extends React.Component {
    state = {loading: true};

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.changeUser(user.uid);
                this.setState({loading: false});
            }
            else this.setState({loading: false});
        })
    }

    render() {
        const {loading} = this.state;
        if (loading) return <h1 className='text-center mt-3'>LOADING</h1>;
        if (!(this.props.user)) return <User/>;
        else return (
            <Tabs defaultIndex={0} className='m-1'>
                <TabList>
                    <Tab>CHARACTERS</Tab>
                    <Tab>EXPORT / IMPORT</Tab>
                </TabList>
                <TabPanel>
                    <MainPage/>
                </TabPanel>
                <TabPanel>
                    <DataPage/>
                </TabPanel>
            </Tabs>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
