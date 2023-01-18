export const TOKEN='asddsa123321asd'
import path from 'path';
import fs from 'fs/promises';

export const upload = async (originalName: string): Promise<{fileUrl: string, filePath: string}> => {
    const name = `${Date.now()}${originalName}`
    const filePath = path.join(path.dirname(path.dirname(__dirname)), `uploads/${name}`)
    
    return {
        fileUrl: `${process.env.HOST}/uploads/${name}`,
        filePath
    }
}