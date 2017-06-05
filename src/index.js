import getJsonValueFromSassValue from './lib/sass-to-json';
import setJsonValueToSassValue from './lib/json-to-sass';
import { types } from 'node-sass'; // eslint-disable-line node/no-unpublished-import

function encode(value, quotes) {
    const shouldQuote = quotes.getValue();
    let resolvedValue = JSON.stringify(
        getJsonValueFromSassValue(value, {
            precision: this.options.precision
        })
    );

    if (shouldQuote) {
        resolvedValue = `'${resolvedValue}'`;
    }

    return new types.String(resolvedValue);
}

function decode(value) {
    let resolvedValue = {};

    try {
        resolvedValue = JSON.parse(value.getValue());
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        resolvedValue = null;
    }

    return setJsonValueToSassValue(resolvedValue);
}

export { encode, decode };

export default {
    'json-decode($value)': decode,
    'json-encode($value, $quotes: true)': encode
};
