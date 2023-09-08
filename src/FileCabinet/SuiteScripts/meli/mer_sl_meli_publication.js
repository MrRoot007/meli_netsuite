/**
 * @name mer_sl_meli_publication.js
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['./controllers/meli_publication'],
    /**
     * @param{meli_publication} meli_publication
    */
    (meli_publication) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            let code = 500, message;
            try {
                let { request, response } = scriptContext;
                switch (request.method) {
                    case 'GET':
                        ({ code, message } = doGET(request));
                        break;
                    case 'POST':
                        doPOST(request);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                log.error({ title: 'error: ' + onRequest.name, details: error });
                message = error.message;
            } finally {
                scriptContext.response.write({ output: JSON.stringify({ code, message }) });
            }
        }

        const doGET = (request) => {
            let { parameters } = request;
            let { type, internalid } = parameters;
            let code, message, body;
            switch (type) {
                case 'upload':
                    ({ code, body } = meli_publication.updateFromNetSuite(internalid));
                    if (code != 200) {
                        body = JSON.parse(body);
                        message = body.message + '; ' + body.cause.map(x => x.message).join(', ');
                    } else {
                        message = 'Informacion cargada exitosamente'
                    }
                    break;
                case 'description':
                    ({ code, body } = meli_publication.updateDescriptionFromNetSuite(internalid));
                    if (code != 200) {
                        body = JSON.parse(body);
                        message = body.message + '; ' + body.cause.map(x => x.message).join(', ');
                    } else {
                        message = 'Informacion cargada exitosamente'
                    }
                    break;
                default:
                    break;
            }
            return { code, message };
        }



        const doPOST = (request, form) => {

        }

        return { onRequest }

    });
