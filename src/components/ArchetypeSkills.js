import React from 'react';
import {bindActionCreators} from 'redux';
import {Button, Col, Input, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {changeData} from '../actions';

class Component extends React.Component {

    handleCheck = (event) => {
        const {archetype, changeData, archetypeSpecialSkills, archetypes} = this.props;
        const masterArchetypeSkills = archetypes[archetype].skills;
        let newObj = {};
        if (masterArchetypeSkills.choice > Object.keys(archetypeSpecialSkills).length) {
            newObj = {...archetypeSpecialSkills};
        } else changeData('', 'archetypeSpecialSkills');
        newObj[event.target.value] = {rank: Object.keys(masterArchetypeSkills).includes('any') ? masterArchetypeSkills.any : masterArchetypeSkills[event.target.value]};
        changeData(newObj, 'archetypeSpecialSkills');
    };

    render() {
        const {archetype, archetypes, archetypeSpecialSkills, skills} = this.props;
        const masterArchetype = archetypes[archetype];
        let list = Object.keys(masterArchetype.skills).includes('any') ? Object.keys(skills) : Object.keys(masterArchetype.skills);

        if (archetype === null) return <div/>;
        if (Object.keys(masterArchetype.skills).includes('choice')) {
            return (
                <Col>
                    <Row>Select {masterArchetype.skills.choice} {masterArchetype.skills.choice > 1 ? 'options' : 'option'} to
                        get {Object.keys(masterArchetype.skills).includes('any') ? masterArchetype.skills.any : 1} {masterArchetype.skills.any > 1 ? 'ranks' : 'rank'}:</Row>
                    <Input type='select' value='' name='archetypeSpecialSkills' onChange={this.handleCheck}>
                        <option value=''/>
                        {list.map((key) =>
                            (skills[key] && !Object.keys(archetypeSpecialSkills).includes(key)) &&
                            <option value={key} name={key} key={key}>{skills[key].name}</option>
                        )}
                    </Input>
                    <Row className='my-2'>
                        {Object.keys(archetypeSpecialSkills).map((skill) => skills[skill] ? skills[skill].name : skill).join(', ')}
                    </Row>
                    <Row className='my-2'>
                        <Button onClick={() => this.props.changeData('', 'archetypeSpecialSkills')}>Clear</Button>
                    </Row>
                </Col>

            )
        }
        return (
            <div>
                {list.map((key) =>
                    <Col key={key}>{masterArchetype.skills[key]} rank in {key}</Col>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        archetypeSpecialSkills: state.archetypeSpecialSkills,
        skills: state.skills,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export const ArchetypeSkills = connect(mapStateToProps, matchDispatchToProps)(Component);
