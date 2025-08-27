export const getCategoryColor = (category: string) => {
	if (category === 'docs') return '#4CAF50'
	if (category === 'wiki') return '#2196F3'
	if (category === 'api') return '#FF9800'
	return '#666'
}
