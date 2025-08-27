/**
 * Retorna um código de cor hexadecimal correspondente a uma categoria de documento
 *
 * @param {string} category - O nome da categoria (ex: 'docs', 'wiki', 'api')
 * @returns {string} O código de cor hexadecimal correspondente ou uma cor padrão
 */
export const getCategoryColor = (category: string) => {
	if (category === 'docs') return '#4CAF50'
	if (category === 'wiki') return '#2196F3'
	if (category === 'api') return '#FF9800'
	return '#666'
}
