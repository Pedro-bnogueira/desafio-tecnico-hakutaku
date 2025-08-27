import type { Document } from '@/features/knowledge-base/types'
import { DocumentCard } from '@/features/knowledge-base/components/DocumentCard'
import styles from './DocumentList.module.css'

// Define as propriedades para o componente DocumentList
type DocumentListProps = {
	documents: Document[]
}

/**
 * Renderiza uma grade de componentes `DocumentCard`
 *
 * Este componente mapeia um array de documentos, renderizando um `DocumentCard`
 * para cada item. Se o array estiver vazio, ele exibe uma mensagem
 * informando que nenhum documento foi encontrado
 *
 * @param {DocumentListProps} props - As propriedades do componente
 * @param {Document[]} props.documents - A lista de documentos a ser exibida
 * @returns {JSX.Element} Uma grade de cards de documento ou uma mensagem de estado vazio
 */
export function DocumentList({ documents }: DocumentListProps) {
	// Verifica se ha documentos para exibir
	if (documents.length === 0) {
		return (
			<div className={styles.empty}>
				<h3>Nenhum documento encontrado</h3>
				<p>Tente ajustar os filtros de busca</p>
			</div>
		)
	}

	// Renderiza a lista de documentos
	return (
		<div className={styles.list}>
			{documents.map((doc) => (
				<DocumentCard key={doc.id} doc={doc} />
			))}
		</div>
	)
}
