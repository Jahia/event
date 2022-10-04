window.jahia.i18n.loadNamespaces('event');

window.jahia.uiExtender.registry.add('callback', 'eventPickerRegistration', {
    //Content-Editor initialisation callback as a priority of 2
    targets: ['jahiaApp-init:33'],
    callback: () => {
        const registry = window.jahia.uiExtender.registry;

        const contentFolderRegex = /^\/sites\/[^/]+\/contents\/.*/;
        const siteContentFolderRegex = /^\/sites\/[^/]+\/contents((\/.*)|$)/;
        const systemSiteRegex = /^\/sites\/systemsite\/contents\/.*/;
        const systemSiteContentFolderRegex = /^\/sites\/systemsite\/contents((\/.*)|$)/;

        registry.add('pickerConfiguration', 'event', {
            pickerInput: {
                emptyLabel: 'event:label.picker.empty',
                notFoundLabel: 'event:label.picker.notFound',
            },
            pickerDialog: {
                view: 'List',
                dialogTitle: 'event:label.picker.title',
                displayTree: true,
                displaySiteSwitcher: true,
                displaySearch: true
            },
            searchContentType: 'jnt:event',
            selectableTypesTable: ['jnt:event'],
            accordions: ['picker-pages', 'picker-content-folders', 'system-site-content-folders'],
            accordionItem: {
                "picker-pages": {
                    tableConfig: {
                        fragments: [{
                            gql: jahia.graphqlTag('fragment MyProp on JCRNode { eventsType: property(name: "eventsType") { value:choicelistValue(renderer:"resourceBundle", language: $language) }, startDate: property(name: "startDate") { value }, endDate: property(name: "endDate") { value }}'),
                            applyFor: 'node'
                        }],
                        columns: ["publicationStatus", "name", {
                            id: 'event-type',
                            accessor: row => row.eventsType && row.eventsType.value,
                            label: 'event:label.picker.type',
                            sortable: true,
                            property: 'eventsType.value'
                        },
                            {
                                id: 'start-date',
                                accessor: row => row.startDate && new Date(row.startDate.value).toLocaleDateString(),
                                label: 'event:label.picker.startDate',
                                width: '100px',
                                sortable: true,
                                property: 'startDate.value'
                            },
                            {
                                id: 'end-date',
                                accessor: row => row.endDate && new Date(row.endDate.value).toLocaleDateString(),
                                label: 'event:label.picker.endDate',
                                width: '100px',
                                sortable: true,
                                property: 'endDate.value'
                            }]
                    },
                    treeConfig: {
                        hideRoot: true
                    }
                },
                "picker-content-folders": {
                    tableConfig: {
                        fragments: [{
                            gql: jahia.graphqlTag('fragment MyProp on JCRNode { eventsType: property(name: "eventsType") { value:choicelistValue(renderer:"resourceBundle", language: $language) }, startDate: property(name: "startDate") { value }, endDate: property(name: "endDate") { value }}'),
                            applyFor: 'node'
                        }],
                        columns: ["publicationStatus", "name", {
                            id: 'event-type',
                            accessor: row => row.eventsType && row.eventsType.value,
                            label: 'event:label.picker.type',
                            sortable: true,
                            property: 'eventsType.value'
                        },
                            {
                                id: 'start-date',
                                accessor: row => row.startDate && new Date(row.startDate.value).toLocaleDateString(),
                                label: 'event:label.picker.startDate',
                                width: '100px',
                                sortable: true,
                                property: 'startDate.value'
                            },
                            {
                                id: 'end-date',
                                accessor: row => row.endDate && new Date(row.endDate.value).toLocaleDateString(),
                                label: 'event:label.picker.endDate',
                                width: '100px',
                                sortable: true,
                                property: 'endDate.value'
                            }]
                    },
                    canDisplayItem: ({selectionNode, folderNode}) => selectionNode ? contentFolderRegex.test(selectionNode.path) : siteContentFolderRegex.test(folderNode.path),
                    treeConfig: {
                        hideRoot: false
                    }
                },
                "system-site-content-folders":{
                    tableConfig: {
                        fragments: [{
                            gql: jahia.graphqlTag('fragment MyProp on JCRNode { eventsType: property(name: "eventsType") { value:choicelistValue(renderer:"resourceBundle", language: $language) }, startDate: property(name: "startDate") { value }, endDate: property(name: "endDate") { value }}'),
                            applyFor: 'node'
                        }],
                        columns: ["publicationStatus", "name", {
                            id: 'event-type',
                            accessor: row => row.eventsType && row.eventsType.value,
                            label: 'event:label.picker.type',
                            sortable: true,
                            property: 'eventsType.value'
                        },
                            {
                                id: 'start-date',
                                accessor: row => row.startDate && new Date(row.startDate.value).toLocaleDateString(),
                                label: 'event:label.picker.startDate',
                                width: '100px',
                                sortable: true,
                                property: 'startDate.value'
                            },
                            {
                                id: 'end-date',
                                accessor: row => row.endDate && new Date(row.endDate.value).toLocaleDateString(),
                                label: 'event:label.picker.endDate',
                                width: '100px',
                                sortable: true,
                                property: 'endDate.value'
                            }]
                    },
                    label: 'event:label.picker.sharedFolder',
                    canDisplayItem: ({selectionNode, folderNode}) => selectionNode ? systemSiteRegex.test(selectionNode.path) : systemSiteContentFolderRegex.test(folderNode.path),
                    treeConfig: {
                        hideRoot: false
                    },
                    icon: window.jahia.moonstone.toIconComponent('Event', {size: 'default'})
                }
            }
        });
    }
});

window.jahia.uiExtender.registry.add('callback', 'systemSiteContentFoldersAccordionRegistration', {
    targets: ['jahiaApp-init:35'],
    callback: () => {
        const registry = window.jahia.uiExtender.registry;
        const jcontent = window.jahia.jcontent;

        registry.add('accordionItem', 'system-site-content-folders', jcontent.jcontentUtils.mergeDeep({}, registry.get('accordionItem', 'picker-content-folders'), {
            targets: [],
            label: 'Shared folders',
            icon: window.jahia.moonstone.toIconComponent('Folder', {size: 'default'}),
            treeConfig: {
                hideRoot: false
            },
            rootPath: '/sites/systemsite/contents'
        }));

    }
});
