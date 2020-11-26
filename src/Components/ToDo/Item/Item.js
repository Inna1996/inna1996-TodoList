import React from 'react';
import cl from './Item.module.css';
import classnames from 'classnames';
import CheckBoxes from '../CheckBoxes/CheckBoxes';
import PropTypes from 'prop-types';

class Item extends React.Component {
    state = {
        inputValue: this.props.value,
        editMode: false
    }

    onChangeValue(e) {
        this.setState({
            inputValue: e.currentTarget.value
        })
    }

    deactivatedEditMode(e) {
        this.setState({
            editMode: false
        })
        this.props.updateItemValue(this.state.inputValue, this.props.id);
    }

    render() {
        const { value, isDone, id, onClickDone } = this.props;
        return (<div className={cl.item_wrapper}>
            <div className={cl.checkbox}>
                <CheckBoxes isDone={isDone} onClickDone={onClickDone} id={id} /></div>
            {!this.state.editMode && <div>
                <span className={classnames({
                    [cl.item]: true,
                    [cl.done]: isDone
                })}
                    onDoubleClick={() => this.setState({ editMode: true })} >{value}</span>
            </div>}
            {this.state.editMode && <div>
                <input value={this.state.inputValue}
                    onChange={this.onChangeValue.bind(this)}
                    autoFocus={true} onClick={this.deactivatedEditMode.bind(this)}
                    className={cl.input}></input>
            </div>
            }
        </div >
        )
    }
};

Item.propTypes = {
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool
};
export default Item;