'use client'

import { useDocuments } from "@/features/knowledge-base/hooks/useDocumets";
import { useDocumentFilters } from "@/features/knowledge-base/hooks/useDocumentFilters";
import { FilterControls } from "@/features/knowledge-base/components/FilterControls";
import { DocumentList} from "@/features/knowledge-base/components/DocumentList";
import styles from './KnowledgeBase.module.css';

export default function KnowledgeBase() {
    const { documents, loading } = useDocuments();
    const {
        filteredDocs,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        allTags,
        selectedTags,
        handleTagToggle,
    } = useDocumentFilters(documents);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div>Carregando base de conhecimento...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>📚 Base de Conhecimento Hakutaku</h1>

            <FilterControls
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                allTags={allTags}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
            />

            <div className={styles.resultsCount}>
                <strong>{filteredDocs.length}</strong> documento(s) encontrado(s)
            </div>

            <DocumentList documents={filteredDocs} />
        </div>
    )
}
