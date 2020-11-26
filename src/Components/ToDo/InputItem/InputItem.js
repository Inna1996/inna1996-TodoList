import React from 'react';
import cl from './InputItem.module.css';
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

class InputItem extends React.Component {
    state = {
        inputValue: '',
        existingValue: false
    };

    onButtonClick = () => {

        if (this.props.items.some(it => it.value === this.state.inputValue)) {
            this.setState({
                existingValue: true,
                inputValue: '',
            })
        }
        else {
            this.setState({
                inputValue: '',
                existingValue: false
            });
            this.props.onClickAdd(this.state.inputValue)
        }
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.onButtonClick()
        }
    };

    render() {
        const { translateApp, invalidValue } = this.props;
        return (<div >
            <div>
                {this.state.existingValue ? (<div className={cl.errorExisting}>{translateApp('errorExisting')}</div>) :
                    (<div></div>)}
                {invalidValue ? (<div className={cl.errorExisting}>{translateApp('errorValidate')}</div>) :
                    (<div></div>)}
            </div>
            <div className={cl.wrapper}>
                <TextField id="outlined-dense"
                    label={translateApp('inputLabel')}
                    onKeyPress={this.handleKeyPress}
                    value={this.state.inputValue}
                    onChange={event => this.setState({ inputValue: event.target.value })}
                    error={this.state.invalidValue}
                    className={cl.inputItem}
                    onKeyPress={this.handleKeyPress} />
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="Add"
                    onClick={this.onButtonClick}
                >
                    <AddIcon />
                </Fab>
            </div>
        </div>)
    }
};
export default InputItem;
