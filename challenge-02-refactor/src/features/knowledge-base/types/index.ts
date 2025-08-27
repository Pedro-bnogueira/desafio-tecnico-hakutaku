// Define a estrutura de dados para um único documento na base de conhecimento
export type Document = {
    id: string
    title: string
    content: string
    category: 'docs' | 'wiki' | 'api'
    tags: string[]
    createdAt: string
    author: string
}