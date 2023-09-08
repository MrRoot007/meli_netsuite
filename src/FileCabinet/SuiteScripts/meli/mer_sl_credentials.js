/**
 * @name mer_sl_credentials.js
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/crypto', 'N/encode', 'N/runtime', 'N/ui/serverWidget'],
    /**
 * @param{crypto} crypto
 * @param{encode} encode
 * @param{runtime} runtime
 * @param{serverWidget} serverWidget
 */
    (crypto, encode, runtime, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            try {
                let { request, response } = scriptContext;
                let form = serverWidget.createForm({ title: 'My Credential Form' });
                switch (request.method) {
                    case 'GET':
                        doGET(form);
                        response.writePage(form);
                        break;
                    case 'POST':
                        doPOST(request, form);
                        response.writePage(form);
                        break;
                    default:
                        break;
                }
                response.writePage(form);
            } catch (error) {
                log.error({ title: 'error', details: error });
            }
        }

        const doGET = (form) => {
            let skField = form.addSecretKeyField({
                id: 'mycredential',
                label: 'Credential',
                restrictToScriptIds: [
                    runtime.getCurrentScript().id,
                    'customscript_mer_ue_meli_netsuite'
                ],
                restrictToCurrentUser: false
            })
            skField.maxLength = 200;
            form.addSubmitButton();
            return form;
        }

        const doPOST = (request, form) => {
            const inputString = "YWJjZGVmZwo=";
            let myGuid = request.parameters.mycredential;

            // Create the key
            let sKey = crypto.createSecretKey({ guid: myGuid, encoding: encode.Encoding.UTF_8 });
            let digestSha512 = ''
            try {
                let hmacSha512 = crypto.createHmac({ algorithm: 'SHA512', key: sKey });
                hmacSha512.update({ input: inputString, inputEncoding: encode.Encoding.BASE_64 });
                digestSha512 = hmacSha512.digest({ outputEncoding: encode.Encoding.HEX });
            } catch (e) {
                log.error({ title: 'Failed to hash input', details: e });
            }

            form.addField({ id: 'result', label: 'Your digested hash value', type: 'textarea' }).defaultValue = digestSha512;
            return form;
        }

        return { onRequest }

    });
