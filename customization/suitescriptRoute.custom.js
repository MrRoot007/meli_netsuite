module.exports = {
    toNetSuite: (filePath) => {
        const splitedPath = filePath.replace(/(\\|\/)/g, '/').split('/');
        const virtualCabinet = splitedPath.reduce((result, el) => {
            if((result.indexOf('SuiteScripts') > -1 || el === 'SuiteScripts'))result.push(el.replace(/\s/g, '\\ '));
            return result;
        }, []);

        return `"/${virtualCabinet.join('/')}"`;
    }
}