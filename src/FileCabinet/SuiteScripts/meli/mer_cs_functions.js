/**
 * @name mer_cs_functions.js
 * @author daniel.merida
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/ui/message'],

    function (https, message) {

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

        }

        const doRequest = (urlCall) => {
            const headers = { name: 'Accept-Language', value: 'en-us' };
            let { body } = https.get({ url: urlCall, headers });
            body = JSON.parse(body);
            let type = message.Type.ERROR;
            let myMessage = body.message;
            let title = 'Error';
            if (body.code == 200) { type = message.Type.CONFIRMATION; title = 'Exito'; }
            message.create({ title, message: myMessage, type }).show();
        }
        return {
            pageInit,
            doRequest
        };

    });
