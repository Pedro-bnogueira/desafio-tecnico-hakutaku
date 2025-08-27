import type { Document } from '@/features/knowledge-base/types'
import { DocumentCard } from '@/features/knowledge-base/components/DocumentCard'
import styles from './DocumentList.module.css'

type DocumentListProps = {
	documents: Document[]
}

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
