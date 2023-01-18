import path from "path"

export class PostsTools {
    private getExtension(name: string): string {
        const splitedName = name.split('.')

        return splitedName[splitedName.length - 1]
    }
    async uploadFile(originalName: string): Promise<{fileUrl: string, filePath: string}> { 
        const name = `${Date.now()}.${this.getExtension(originalName)}`
        const filePath = path.join(path.dirname(path.dirname(__dirname)), `uploads/${name}`)
        
        return {
            fileUrl: `${process.env.HOST}/uploads/${name}`,
            filePath
        }
    }
}