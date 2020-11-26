import React from 'react';
import cl from './Filter.module.css';

class Filter extends React.Component {

    handleSubmit(e) {
        this.props.onClickSetActive(e.currentTarget.dataset.value)
    }

    render() {
        const { items, translateApp } = this.props;

        return (<div className={cl.footer}>
            <div className={cl.btn}>
                <button data-value='all'
                    className={cl.button}
                    onClick={this.handleSubmit.bind(this)}>{translateApp('all')}
                </button>
                <span>{items.filter(it => it).length}</span>
            </div>
            <div className={cl.btn}>
                <button data-value='activ'
                    className={cl.button}
                    onClick={this.handleSubmit.bind(this)}>{translateApp('active')}
                </button>
                <span>{items.filter(it => !it.isDone).length}</span>
            </div>
            <div className={cl.btn}>
                <button data-value='completed'
                    className={cl.button}
                    onClick={this.handleSubmit.bind(this)}>{translateApp('completed')}
                </button>
                <span>{items.filter(it => it.isDone).length}</span>
            </div>
        </div >
        )
    }
};

export default Filter;