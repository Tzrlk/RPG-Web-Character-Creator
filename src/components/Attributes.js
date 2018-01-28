import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {strainThreshold, totalSoak, woundThreshold} from "../reducers";

class Attributes extends React.Component {

    handleChange = (event) => {
        const {changeData} = this.props;
        let type = event.target.name;
        let value = +event.target.value === '' ? 0 : +event.target.value;
        changeData(value, type);
    };

    render() {
        const {currentWound, woundThreshold, currentStrain, strainThreshold, totalSoak} = this.props;
        return (
            <div>
                <div className='singleAttribute Soak'>
                    <div className='AttributeText'>{totalSoak}</div>
                </div>
                <div className={`singleAttribute Wounds`}>
                    <div className='AttributeText'>
                        <div className='editableAttributeText'>{woundThreshold}</div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='text'
                            name='currentWound'
                            maxLength='2'
                            className='textEdit editableAttributeText'
                            onChange={this.handleChange}
                            onBlur={this.handleChange}
                            placeholder={currentWound ? currentWound : 0}/>
                    </div>
                </div>
                <div className={`singleAttribute Strain`}>
                    <div className='AttributeText'>
                        <div className='editableAttributeText'>{strainThreshold}</div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='text'
                           name='currentStrain'
                           maxLength='2'
                           className='textEdit editableAttributeText'
                           onChange={this.handleChange}
                           onBlur={this.handleChange}
                           placeholder={currentStrain ? currentStrain : 0}/>
                    </div>                </div>

                <div className='singleAttribute Defense'>
                    <div className='AttributeText'>{'0 | 0'}</div>
                </div>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        woundThreshold: woundThreshold(state),
        strainThreshold: strainThreshold(state),
        totalSoak: totalSoak(state),
        currentWound: state.currentWound,
        currentStrain: state.currentStrain,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Attributes);