import parseColor from "parse-color";
import parseUnit from "parse-css-dimension";
import { types } from "node-sass"; // eslint-disable-line node/no-unpublished-import

const unitTypes = ["length", "angle", "resolution", "frequency", "time"];

function isPlainObject(object) {
    return (
        object instanceof Object &&
        !Array.isArray(object) &&
        typeof object !== "function"
    );
}

function isColor(value) {
    return typeof parseColor(value).rgba !== "undefined";
}

function parseValueToStringOrNumber(value) {
    let resolvedValue = null;

    try {
        const resolvedUnitValue = parseUnit(value);

        if (unitTypes.indexOf(resolvedUnitValue.type) !== -1) {
            resolvedValue = new types.Number(
                resolvedUnitValue.value,
                resolvedUnitValue.unit
            );
        } else if (resolvedUnitValue.type === "percentage") {
            resolvedValue = new types.Number(resolvedUnitValue.value, "%");
        } else {
            resolvedValue = new types.String(resolvedUnitValue.value);
        }
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        resolvedValue = new types.String(value);
    }

    return resolvedValue;
}

function parseValueToColor(value) {
    const resolvedColorValue = parseColor(value).rgba;

    return new types.Color(
        resolvedColorValue[0],
        resolvedColorValue[1],
        resolvedColorValue[2],
        resolvedColorValue[3]
    );
}

function arrayToList(arr) {
    const { length } = arr;
    const data = new types.List(length);

    for (let i = 0; i < length; i++) {
        // eslint-disable-next-line no-use-before-define
        data.setValue(i, setJsonValueToSassValue(arr[i]));
    }

    return data;
}

function objectToMap(obj) {
    const { length } = Object.keys(obj);
    const data = new types.Map(length);
    let i = 0;

    for (const prop in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(prop)) {
            // eslint-disable-next-line no-use-before-define
            data.setKey(i, setJsonValueToSassValue(prop));
            // eslint-disable-next-line no-use-before-define
            data.setValue(i, setJsonValueToSassValue(obj[prop]));
            i++;
        }
    }

    return data;
}

function setJsonValueToSassValue(value) {
    let resolvedValue = types.Null.NULL;

    if (Array.isArray(value)) {
        resolvedValue = arrayToList(value);
    } else if (isPlainObject(value)) {
        resolvedValue = objectToMap(value);
    } else if (isColor(value)) {
        resolvedValue = parseValueToColor(value);
    } else if (typeof value === "string") {
        resolvedValue = parseValueToStringOrNumber(value);
    } else if (typeof value === "number") {
        resolvedValue = new types.Number(value);
    } else if (typeof value === "boolean") {
        resolvedValue = value ? types.Boolean.TRUE : types.Boolean.FALSE;
    }

    return resolvedValue;
}

export default setJsonValueToSassValue;
