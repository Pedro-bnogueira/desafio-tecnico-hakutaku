import { useState, useMemo } from 'react'
import type { Document } from '@/features/knowledge-base/types'

export function useDocumentFilters(documents: Document[]) {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [sortBy, setSortBy] = useState<string>('title')

	const handleTagToggle = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag))
		} else {
			setSelectedTags([...selectedTags, tag])
		}
	}

	const allTags = useMemo(() => {
		const tags = documents.flatMap((doc) => doc.tags)
		return [...new Set(tags)]
	}, [documents])

	const filteredDocs = useMemo(() => {
		let filtered = [...documents];

        // Filtragem
		if (searchTerm.trim() !== '') {
			filtered = filtered.filter(
				(doc) =>
					doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
			)
		}

		if (selectedCategory !== 'all') {
			filtered = filtered.filter((doc) => doc.category === selectedCategory)
		}

		if (selectedTags.length > 0) {
			filtered = filtered.filter((doc) => selectedTags.some((tag) => doc.tags.includes(tag)))
		}

        // Ordenacao
		if (sortBy === 'title') {
			filtered.sort((a, b) => a.title.localeCompare(b.title))
		} else if (sortBy === 'date') {
			filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		} else if (sortBy === 'author') {
			filtered.sort((a, b) => a.author.localeCompare(b.author))
		}

		return filtered;
	},[documents, searchTerm, selectedCategory, selectedTags, sortBy]);

    return {
        filteredDocs,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedTags,
        handleTagToggle,
        sortBy,
        setSortBy,
        allTags
    }
}
