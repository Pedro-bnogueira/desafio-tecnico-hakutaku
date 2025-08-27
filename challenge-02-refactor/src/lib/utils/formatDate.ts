/**
 * Formata uma string de data para o padrão brasileiro (DD/MM/AAAA)
 *
 * @param {string} dateString - A string de data a ser formatada (preferencialmente em formato ISO)
 * @returns {string} A data formatada como uma string no formato 'DD/MM/AAAA'
 */
export const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	return date.toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
}
