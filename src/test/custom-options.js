import jsonFunctions from '../';
import path from 'path';
import pify from 'pify'; // eslint-disable-line node/no-unpublished-import
import sassTrue from 'sass-true'; // eslint-disable-line node/no-unpublished-import

const scssFilePath = path.join(__dirname, './fixtures/custom-options.scss');

pify(sassTrue).runSass(
    {
        file: scssFilePath,
        functions: Object.assign({}, jsonFunctions),
        precision: 2
    },
    describe,
    it
);
