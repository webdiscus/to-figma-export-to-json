figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'export-to-json') {
        const nodes = figma.root.children;

        function extractNodeData(node) {
            const data = {
                id: node.id,
                name: node.name,
                type: node.type,
                children: []
            };

            if ('children' in node) {
                for (const child of node.children) {
                    data.children.push(extractNodeData(child));
                }
            }

            return data;
        }

        const documentData = nodes.map(extractNodeData);

        figma.ui.postMessage({
            type: 'exported-json',
            data: JSON.stringify(documentData, null, 2)
        });
    }
};
