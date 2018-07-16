import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonGroup, Col, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {addCharacter, changeCharacter, changeCharacterName, changeData, deleteCharacter, loadData} from '../actions';
import {Archetype, Career, CustomArchetypes, CustomCareers, ModalDeleteConfirm} from './';

class CharacterSelectComponent extends React.Component {
    state = {
        name: this.props.characterList ? this.props.characterList[this.props.character] : '',
        playerName: this.props.description.playerName,
        setting: this.props.description.setting,
        archetypeModal: false,
        careerModal: false,
        customCareersModal: false,
        customArchetypeModal: false,
        deleteModal: false,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({playerName: nextProps.description.playerName});
        if (this.props.characterList) this.setState({name: this.props.characterList[nextProps.character]});
        if (nextProps.characterList) this.setState({name: nextProps.characterList[nextProps.character]});
    }

    handleSelect = (event) => {
        const {changeCharacter, loadData} = this.props;
        changeCharacter(event.target.value);
        loadData();
        event.preventDefault();
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleBlur = (event) => {
        const {changeData, description} = this.props;
        let type = event.target.name;
        let newObj = {...description};
        newObj[type] = this.state[type];
        changeData(newObj, 'description');
        event.preventDefault();
    };

    confirmedDelete = (event) => {
        this.props.deleteCharacter();
        this.setState({deleteModal: false});
        event.preventDefault();
    };

    handleNameChange = (event) => {
        event.preventDefault();
        this.props.changeCharacterName(this.state.name);
    };

    render() {
        const {archetype, archetypes, careers, career, characterList, character} = this.props;
        const {name, playerName, archetypeModal, careerModal, customCareersModal, customArchetypeModal, deleteModal, setting} = this.state;
        return (
            <Col>
                <Row className='justify-content-end'><h5>CHARACTER</h5></Row>
                <hr/>
                <Row className='my-2'>
                    <Col className='m-auto'>
                        <InputGroup>
                            <Input type='select' value={character} onChange={this.handleSelect}>
                                {characterList && Object.keys(characterList).map((key) =>
                                    <option value={key}
                                            key={key}>{characterList[key]}</option>
                                )}
                            </Input>
                            <InputGroupAddon addonType='append'>
                                <ButtonGroup>
                                    <Button onClick={() => this.props.addCharacter()}>New</Button>
                                    <Button onClick={() => this.setState({deleteModal: true})}>Delete</Button>
                                </ButtonGroup>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col className='m-auto'>
                        <b>CHARACTER NAME:</b>
                        <Input type='text' value={name ? name : ''} maxLength='50' name='name'
                               onChange={this.handleChange}
                               onBlur={this.handleNameChange}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm='4' className='m-auto'>
                        <b>ARCHETYPE:</b>{' '}{archetype === null ? '' : archetypes[archetype] ? archetypes[archetype].name : 'Missing Archetype Data'}
                    </Col>
                    <Col className='m-auto'>
                        <ButtonGroup>
                            <Button name='archetype'
                                    onClick={() => this.setState({archetypeModal: true})}>Select</Button>
                            <Button name='customArchetype'
                                    onClick={() => this.setState({customArchetypeModal: true})}>Custom</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm='4' className='m-auto'>
                        <b>CAREER:</b> {' '} {career === null ? '' : careers[career] ? careers[career].name : 'Missing Career Data'}
                    </Col>
                    <Col className='m-auto'>
                        <ButtonGroup>
                            <Button name='career'
                                    onClick={() => this.setState({careerModal: true})}>Select</Button>
                            <Button name='customCareer'
                                    onClick={() => this.setState({customCareersModal: true})}>Custom</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col className='m-auto'>
                        <b>SETTING:</b> <Input type='text' value={setting} maxLength='25' name='setting'
                                               onChange={this.handleChange}
                                               onBlur={this.handleBlur}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col className='m-auto'>
                        <b>PLAYER NAME:</b> <Input type='text' value={playerName} maxLength='25' name='playerName'
                                                   onChange={this.handleChange}
                                                   onBlur={this.handleBlur}/>
                    </Col>
                </Row>
                <hr/>
                <Archetype modal={archetypeModal} handleClose={() => this.setState({archetypeModal: false})}/>
                <Career modal={careerModal} handleClose={() => this.setState({careerModal: false})}/>
                <CustomCareers modal={customCareersModal}
                               handleClose={() => this.setState({customCareersModal: false})}/>
                <CustomArchetypes modal={customArchetypeModal}
                                  handleClose={() => this.setState({customArchetypeModal: false})}/>

                <ModalDeleteConfirm deleteModal={deleteModal}
                                    confirmedDelete={this.confirmedDelete}
                                    handleClose={() => this.setState({deleteModal: false})}
                                    type='Character'/>
            </Col>

        );
    }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        career: state.career,
        careers: state.careers,
        description: state.description,
        user: state.user,
        characterList: state.characterList,
        character: state.character,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changeData,
        addCharacter,
        changeCharacter,
        deleteCharacter,
        changeCharacterName,
        loadData
    }, dispatch);
}

export const CharacterSelect = connect(mapStateToProps, matchDispatchToProps)(CharacterSelectComponent);