import { expect } from 'chai'
import { searchKnowledge } from '../lib/searchAPI'

describe('Search Relevance Algorithm', () => {
	it('should return empty array for empty query', async () => {
		const results = await searchKnowledge('')
		expect(results).to.deep.equal([])
	})

	it('should return results for valid query', async () => {
		const results = await searchKnowledge('busca')
		expect(results.length).to.be.greaterThan(0)
		expect(results[0]).to.have.property('id')
		expect(results[0]).to.have.property('title')
		expect(results[0]).to.have.property('score')
	})

	it('should prioritize title matches over content matches', async () => {
		const results = await searchKnowledge('busca')

		const titleMatch = results.find((r) => r.title.toLowerCase().includes('busca'))
		const contentOnlyMatch = results.find((r) => !r.title.toLowerCase().includes('busca') && r.content.toLowerCase().includes('busca'))

		if (titleMatch && contentOnlyMatch) {
			expect(titleMatch.score).to.be.greaterThan(contentOnlyMatch.score)
		}
	})

	it('should calculate relevance scores correctly', async () => {
		const results = await searchKnowledge('RAG')

		// Todos os resultados devem ter score calculado (não 0)
		results.forEach((result) => {
			expect(result.score).to.be.greaterThan(0)
		})

		for (let i = 1; i < results.length; i++) {
			expect(results[i - 1].score).to.be.at.least(results[i].score)
		}
	})

	it('should handle accent normalization', async () => {
		const results = await searchKnowledge('semantica')
		expect(results.some((r) => r.title.includes('semântica') || r.content.includes('semântica'))).to.equal(true)
	})

	it('should respect limit parameter', async () => {
		const results = await searchKnowledge('busca', 3)
		expect(results.length).to.be.at.most(3)
	})

	it('should handle partial word matches', async () => {
		const results = await searchKnowledge('integr')
		expect(results.some((r) => r.title.includes('integração') || r.content.includes('integração'))).to.equal(true)
	})
})

describe('Edge Cases', () => {
	it('should handle single character query', async () => {
		const results = await searchKnowledge('a')
		expect(Array.isArray(results)).to.equal(true)
	})

	it('should handle special characters', async () => {
		const results = await searchKnowledge('GraphQL')
		expect(results.length).to.be.greaterThan(0)
	})

	it('should handle case insensitive search', async () => {
		const lowerResults = await searchKnowledge('graphql')
		const upperResults = await searchKnowledge('GRAPHQL')
		const mixedResults = await searchKnowledge('GraphQL')

		expect(lowerResults.length).to.equal(upperResults.length)
		expect(lowerResults.length).to.equal(mixedResults.length)
	})
})

describe('Search Relevance - extras', () => {
	it('should handle fuzzy typos ("buca")', async () => {
		const results = await searchKnowledge('buca')

		// Deve achar pelo menos um doc com "busca" no título ou conteúdo
		const hasBusca = results.some((r) => r.title.toLowerCase().includes('busca') || r.content.toLowerCase().includes('busca'))
		expect(hasBusca).to.equal(true)
	})

	it('should normalize scores to [0, 1]', async () => {
		const results = await searchKnowledge('busca')
		results.forEach((r) => {
			expect(r.score).to.be.greaterThan(0)
			expect(r.score).to.be.at.most(1)
		})
	})

	it('should trim whitespace in queries', async () => {
		const withSpaces = await searchKnowledge('   busca   ')
		const clean = await searchKnowledge('busca')

		expect(withSpaces.map((r) => r.id)).to.deep.equal(clean.map((r) => r.id))
	})

	it('should prioritize title matches over content matches by assigning a higher score', async () => {
		const results = await searchKnowledge('integração');

		// ID 4: Título contém "Integração"
		const titleMatch = results.find((r) => r.id === '4');

		// ID 10: Conteúdo contém "integração"
		const contentMatch = results.find((r) => r.id === '10');

		// Ambos os resultados devem existir
		expect(titleMatch).to.exist;
		expect(contentMatch).to.exist;

		// O resultado com correspondência no título deve ter uma pontuação maior
		expect(titleMatch!.score).to.be.greaterThan(contentMatch!.score);
	});
})
