/**
 * @name mer_ue_meli_netsuite
 * @author daniel.merida@cloudriver.tech
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['./controllers/meli_functions'],
    (meli_functions) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {
            try {
                let { type, newRecord } = scriptContext;
                switch (type) {
                    case scriptContext.UserEventType.CREATE:
                    case scriptContext.UserEventType.EDIT:
                        meli_functions.updateSecretKey(newRecord, type);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                log.error({ title: 'error: ' + beforeSubmit.name, details: error });
            }
        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
            try {
                let { newRecord, type } = scriptContext;
                // switch (type) {
                //     case scriptContext.UserEventType.CREATE:
                //     case scriptContext.UserEventType.EDIT:
                //         // routers.createUser(newRecord);
                //         break;
                //     default:
                //         break;
                // }
            } catch (error) {
                log.error({ title: 'error: ' + afterSubmit.name, details: error });
            }
        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
