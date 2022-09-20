window.jahia.uiExtender.registry.add('callback', 'eventPickerRegistration', {
    targets: ['jahiaApp-init:777'],
    callback: () => {
        //get default pickerConfig
        const defaultPicker = window.jahia.uiExtender.registry.get('pickerConfiguration', 'default')
        const usePickerInputData = defaultPicker.pickerInput.usePickerInputData;
        window.jahia.uiExtender.registry.add('pickerConfiguration', 'event', {
            pickerInput: {
                emptyLabel: 'No event here',
                notFoundLabel: 'No event Found',
                usePickerInputData
            },
            pickerDialog: {
                view: 'List',
                dialogTitle: 'Pick an event',
                displayTree: true,
                displaySiteSwitcher: true,
                displaySearch: true
            },
            searchContentType: 'jnt:event',
            selectableTypesTable: ['jnt:event'],
            accordions: ['picker-pages'],
            accordionItem: {
                "picker-pages": {
                    tableConfig: {
                        columns: ["publicationStatus", "name", "lastModified"]
                    },
                    rootPath: "/sites/{site}/home/events",
                    treeConfig: {
                        hideRoot: false
                    }
                }
            }
        });
    }
});
