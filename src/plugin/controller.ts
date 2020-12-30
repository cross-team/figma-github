figma.showUI(__html__, {
    height: 400,
});

figma.loadFontAsync({family: 'Roboto', style: 'Regular'});

figma.ui.onmessage = async msg => {
    switch (msg.type) {
        case 'getTokens':
            let githubToken = await figma.clientStorage.getAsync('githubToken');
            figma.ui.postMessage({
                githubToken,
            });
            break;
        case 'setGHToken':
            figma.clientStorage.setAsync('githubToken', msg.value);
            break;
        case 'setFigToken':
            figma.clientStorage.setAsync('figmaToken', msg.value);
            break;
        default:
            break;
    }

    // figma.closePlugin();
    // Uncomment the line above if you want the plugin to close after running a single message call
};
