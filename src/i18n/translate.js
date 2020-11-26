import React from 'react';
import { FormattedMessage } from 'react-intl';

const translate = (id) => {
    return (<div>
        <FormattedMessage id={id} />
    </div>
    )
}

export default translate;