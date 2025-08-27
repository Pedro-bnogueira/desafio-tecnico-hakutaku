'use client'

import { useDocuments } from "@/features/knowledge-base/hooks/useDocuments";
import { useDocumentFilters } from "@/features/knowledge-base/hooks/useDocumentFilters";
import { FilterControls } from "@/features/knowledge-base/components/FilterControls";
import { DocumentList} from "@/features/knowledge-base/components/DocumentList";
import styles from './KnowledgeBase.module.css';

/**
 * Componente principal que orquestra toda a funcionalidade da base de conhecimento
 *
 * Atua como um orquestrador que conecta a lógica de busca e filtro (através dos
 * hooks `useDocuments` e `useDocumentFilters`) com os componentes de apresentação
 * (`FilterControls` e `DocumentList`)
 *
 * @returns {JSX.Element} O componente completo da base de conhecimento ou um estado de carregamento.
 */
export default function KnowledgeBase() {
    // Hook para buscar os documentos e gerenciar o estado de carregamento
    const { documents, loading } = useDocuments();

    // Hook para gerenciar os filtros e a ordenação dos documentos
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

    // Exibe um estado de carregamento enquanto os documentos estão sendo buscados
    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div>Carregando base de conhecimento...</div>
            </div>
        );
    }

    // Renderiza a interface completa da base de conhecimento
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
