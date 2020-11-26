import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const CheckBoxes = ({ isDone, onClickDone, id }) => {

    return (
        <div>
            <Checkbox checked={isDone}
                onClick={() => onClickDone(id)}
            />
        </div>
    );
};
CheckBoxes.propTypes = {
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool
};

export default CheckBoxes;