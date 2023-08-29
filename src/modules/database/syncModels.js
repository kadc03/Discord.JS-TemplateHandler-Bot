const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const modelsPath = path.join(__dirname, 'models');

fs.readdir(modelsPath, async (err, files) => {
    if (err) {
        console.error('Error reading models folder:', err);
        return;
    }

    const modelFiles = files.filter(file => file.endsWith('.js'));
    const syncedModels = [];

    for (const modelFile of modelFiles) {
        try {
            const model = require(path.join(modelsPath, modelFile));
            if (typeof model.sync === 'function') {
                await model.sync();
                syncedModels.push(model.name);
            }
        } catch (error) {
            console.error(`Error syncing model ${modelFile}:`, error);
        }
    }

    console.log(chalk.magenta('[MODEL]:'), chalk.green(`Synced models: ${syncedModels.join(', ')}`));
});
