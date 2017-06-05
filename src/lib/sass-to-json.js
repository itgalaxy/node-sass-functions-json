import rgbHex from 'rgb-hex';
import round from 'lodash.round';
import shortHexColor from 'shorten-css-hex';
import { types } from 'node-sass'; // eslint-disable-line node/no-unpublished-import

function listToArray(list, opts) {
    const length = list.getLength();
    const data = [];

    for (let i = 0; i < length; i++) {
        // eslint-disable-next-line no-use-before-define
        const value = getJsonValueFromSassValue(list.getValue(i), opts);

        data.push(value);
    }

    return data;
}

function mapToObject(map, opts) {
    const length = map.getLength();
    const data = {};

    for (let i = 0; i < length; i++) {
        const key = map.getKey(i).getValue();

        // eslint-disable-next-line no-use-before-define
        data[key] = getJsonValueFromSassValue(map.getValue(i), opts);
    }

    return data;
}

function getJsonValueFromSassValue(value, opts) {
    let resolvedValue = null;
    let rgbValue = [];

    if (value instanceof types.List) {
        resolvedValue = listToArray(value, opts);
    } else if (value instanceof types.Map) {
        resolvedValue = mapToObject(value, opts);
    } else if (value instanceof types.Color) {
        rgbValue = [value.getR(), value.getG(), value.getB()];

        const alphaValue = value.getA();

        if (alphaValue === 1) {
            resolvedValue = shortHexColor(`#${rgbHex(...rgbValue)}`);
        } else {
            resolvedValue = `rgba(${rgbValue.join(',')},${alphaValue})`;
        }
    } else if (value instanceof types.Number) {
        if (value.getUnit() !== '') {
            resolvedValue = String(
                round(Number(value.getValue()), opts.precision) +
                    value.getUnit()
            );
        } else {
            resolvedValue = round(Number(value.getValue()), opts.precision);
        }
    } else if (!(value instanceof types.Null)) {
        resolvedValue = value.getValue();
    }

    return resolvedValue;
}

export default getJsonValueFromSassValue;
