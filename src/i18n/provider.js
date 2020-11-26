import React, { Fragment } from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from './locales';
import PropTypes from 'prop-types';
import messages from './Messages/index';

const Provider = ({ children, locale }) => {
    return (<IntlProvider
        locale={locale}
        textComponent={Fragment}
        messages={messages[locale]}>
        {children}
    </IntlProvider>

    )
};


Provider.displayName = 'I18nProvider';

Provider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    locale: PropTypes.oneOf(Object.values(LOCALES)),
};

Provider.defaultProps = {
    locale: LOCALES.ENGLISH,
};

export default Provider;