import { convertSegmentPathToStaticExportFilename } from 'next/dist/shared/lib/segment-cache/segment-value-encoding'
import mockData from './mockData.json'
import { title } from 'process'

export type SearchResult = {
	id: string
	title: string
	content: string
	category: 'documentation' | 'api' | 'wiki' | 'slack' | 'email'
	source: string
	score: number
	snippet: string
	timestamp: string
	author?: string
}

const mockResults: SearchResult[] = mockData as SearchResult[]

// Definição dos pesos para cada campo
const WEIGHTS = {
	title: 3.0,
	content: 1.0,
	snippet: 1.5,
	author: 0.5,
}

// Limite de distância para considerar uma correspondência fuzzy (match) dinâmico por tamanho do termo
function fuzzyThreshold(term: string): number {
	const n = term.length
	if (n <= 1) return 0
	if (n <= 4) return 1
	if (n <= 7) return 2
	return 3
}

export async function searchKnowledge(query: string, limit = 10): Promise<SearchResult[]> {
	if (!query.trim()) {
		return []
	}

	// Normalizar e dividir a query em termos
	const queryTerms = normalizeString(query).split(/\s+/).filter(Boolean)

	const scoredResults: SearchResult[] = mockResults.map((result) => {
		let totalScore = 0

		// Iterar sobre cada termo de busca
		for (const term of queryTerms) {
			let termScore = 0

			// Calcular score para cada campo
			const titleScore = calculateFieldScore(result.title, term, WEIGHTS.title)
			const contentScore = calculateFieldScore(result.content, term, WEIGHTS.content)
			const snippetScore = calculateFieldScore(result.snippet, term, WEIGHTS.snippet)
			const authorScore = calculateFieldScore(result.author || '', term, WEIGHTS.author)

			totalScore += titleScore + contentScore + snippetScore + authorScore
		}

		// Transforma o score bruto em um valor normalizado entre 0 e 1
		const normalizedScore = totalScore / (totalScore + 10)

		return { ...result, score: normalizedScore }
	})

	// Filtrar resultados sem score e ordenar por relevância
	const relevantResults = scoredResults
		.filter((result) => result.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)

	return relevantResults
}

/**
 * Normaliza uma string, convertendo para minúsculas e removendo acentos
 * @param str A string de entrada
 * @returns A string normalizada
 */
function normalizeString(str: string): string {
	if (!str) return ''

	return str
		.toLowerCase()
		.normalize('NFD') // Normaliza para decompor caracteres acentuados
		.replace(/[\u0300-\u036f]/g, '') // Remove os acentos e caracteres fonéticos
}

/**
 * Calcula a distância de Levenshtein entre duas strings
 * @param a A primeira string
 * @param b A segunda string
 * @returns A distância (número de edições)
 */
function levenshteinDistance(a: string, b: string): number {
	const matrix = Array(b.length + 1)
		.fill(null)
		.map(() => Array(a.length + 1).fill(null))
	for (let i = 0; i <= a.length; i++) {
		matrix[0][i] = i
	}
	for (let j = 0; j <= b.length; j++) {
		matrix[j][0] = j
	}
	for (let j = 1; j <= b.length; j++) {
		for (let i = 1; i <= a.length; i++) {
			const indicator = a[i - 1] === b[j - 1] ? 0 : 1
			matrix[j][i] = Math.min(
				matrix[j][i - 1] + 1, // Deletion
				matrix[j - 1][i] + 1, // Insertion
				matrix[j - 1][i - 1] + indicator, // Substitution
			)
		}
	}
	return matrix[b.length][a.length]
}

/**
 * Calcula o score de um termo de busca para um campo de texto específico
 * @param text O conteúdo do campo (ex: título, conteúdo do documento)
 * @param term O termo de busca normalizado
 * @param weight O peso do campo
 * @returns O score calculado para o campo
 */
function calculateFieldScore(text: string, term: string, weight: number): number {
	if (!text) return 0;

	const normalizedText = normalizeString(text);
	const words = normalizedText.split(/\s+/).filter(Boolean);
	let score = 0;

	// Match exato
	const exactCount = words.filter((word) => word === term).length;
	if (exactCount > 0) {
		score += 1.0 * (1 + Math.log(1 + exactCount));
		return score * weight;
	}

	// Match de prefixo
	const prefixCount = words.filter((word) => word.startsWith(term) && word !== term).length;
	if (prefixCount > 0) {
		score += 0.75 * (1 + Math.log(1 + prefixCount));
	}

	// Fuzzy match
	const treshold = fuzzyThreshold(term);

	if (treshold > 0) {
		for (const word of words) {
			const distance = levenshteinDistance(word, term);

			if (distance <= treshold) {
				// A similaridade é 1 para match exato, decresce com a distância
				const similarity = 1 - distance / Math.max(word.length, term.length);
				score += 0.5 * similarity;
			}
		}
	}
	return score * weight;
}
