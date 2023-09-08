/**
 * @name 
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/url', './controllers/meli_publication', './controllers/meli_category'],
    (url, meli_publication, meli_category) => {
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
            try {
                let { newRecord, type, form } = scriptContext;
                switch (type) {
                    case scriptContext.UserEventType.CREATE:
                    case scriptContext.UserEventType.EDIT:
                        break;
                    case scriptContext.UserEventType.VIEW:
                        doView(newRecord, form);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                log.error({ title: 'error', details: error });
            }
        }

        const doView = (newRecord, form) => {
            let urlSL = url.resolveScript({ deploymentId: 'customdeploy_mer_sl_meli_publication', scriptId: 'customscript_mer_sl_meli_publication', params: { internalid: newRecord.id } });
            // form.addButton({ id: 'custpage_download', label: 'Descargar', functionName: 'doRequest("' + urlSL + '&type=download")' });
            form.addButton({ id: 'custpage_description', label: 'Actualizar Descripcion', functionName: 'doRequest("' + urlSL + '&type=description")' });
            form.addButton({ id: 'custpage_upload', label: 'Cargar', functionName: 'doRequest("' + urlSL + '&type=upload")' });
            form.clientScriptFileId = 48921;
            return form;
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
                return
                let { type, newRecord } = scriptContext;
                switch (type) {
                    case scriptContext.UserEventType.CREATE:
                    case scriptContext.UserEventType.EDIT:
                        let itemId = newRecord.getValue('custrecord_cr_meli_id');
                        let category = newRecord.getValue('custrecord_cr_category');
                        if (itemId) {
                            meli_publication.create(itemId, newRecord);
                        } else if (!category) {
                            let description = newRecord.getValue('custrecord_crml_pub_desc');
                            meli_category.predictor(description);
                        }
                        break;
                    default:
                        break;
                }
            } catch (error) {
                log.error({ title: 'error:' + afterSubmit.name, details: error });
            }
        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
