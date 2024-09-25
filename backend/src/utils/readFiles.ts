const fs = require('fs');
const path = require('path');

// Função auxiliar para ler o arquivo JSON
export const readJsonFile = (fileName: string) => {
    try {
        const filePath = path.join(__dirname, '..', fileName);
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro ao ler o arquivo ${fileName}:`, error);
        return null;
    }
};

// Função auxiliar para salvar o arquivo JSON
export const writeJsonFile = (fileName: string, data: {} | []) => {
    try {
        const filePath = path.join(__dirname, '..', fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Erro ao escrever no arquivo ${fileName}:`, error);
    }
};
