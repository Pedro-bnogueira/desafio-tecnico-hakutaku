import type { Document } from '@/features/knowledge-base/types'
import { formatDate } from '@/lib/utils/formatDate'
import { getCategoryColor } from '@/lib/utils/categoryColors'
import styles from './DocumentCard.module.css'

type DocumentCardProps = {
	doc: Document
}

export function DocumentCard({ doc }: DocumentCardProps) {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<h3 className={styles.title}>{doc.title}</h3>
				<span
					className={styles.category}
					style={{
						backgroundColor: getCategoryColor(doc.category),
					}}
				>
					{doc.category.toUpperCase()}
				</span>
			</div>

			<p className={styles.content}>{doc.content}</p>

			<div className={styles.tagsContainer}>
				{doc.tags.map((tag) => (
					<span key={tag} className={styles.tag}>
						#{tag}
					</span>
				))}
			</div>

			<div className={styles.footer}>
				<span>
					Por: <strong>{doc.author}</strong>
				</span>
				<span>{formatDate(doc.createdAt)}</span>
			</div>
		</div>
	)
}
