window.jahia.uiExtender.registry.add('callback', 'eventPickerRegistration', {
    //Content-Editor initialisation callback as a priority of 2
    targets: ['jahiaApp-init:33'],
    callback: () => {
        window.jahia.uiExtender.registry.add('pickerConfiguration', 'event', {
            pickerInput: {
                emptyLabel: 'No event here',
                notFoundLabel: 'No event Found'
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
                        fragments: [{
                            gql: window.jahia.graphqlTag('fragment EventProp on JCRNode { eventsType: property(name: "eventsType") { value } }'),
                            applyFor: 'node'
                        }],
                        columns: ["publicationStatus", "name", "lastModified", {
                            id: 'event-info',
                            accessor: row => row.eventsType && row.eventsType.value,
                            label: 'Event info',
                        }]

                    },
                    rootPath: "/sites/{site}/home",
                    treeConfig: {
                        hideRoot: false
                    }
                }
            }
        });
    }
});
