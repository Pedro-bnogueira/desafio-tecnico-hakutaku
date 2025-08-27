import styles from './FilterControls.module.css'

type FilterControlsProps = {
	searchTerm: string
	onSearchChange: (value: string) => void
	selectedCategory: string
	onCategoryChange: (value: string) => void
	sortBy: string
	onSortChange: (value: string) => void
	allTags: string[]
	selectedTags: string[]
	onTagToggle: (tag: string) => void
}

export function FilterControls({
	searchTerm,
	onSearchChange,
	selectedCategory,
	onCategoryChange,
	sortBy,
	onSortChange,
	allTags,
	selectedTags,
	onTagToggle,
}: FilterControlsProps) {
	return (
		<>
			<div className={styles.topControls}>
				<div>
					<label className={styles.label}>Buscar:</label>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Digite para buscar..."
						className={styles.input}
					/>
				</div>

				<div>
					<label className={styles.label}>Categoria:</label>
					<select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} className={styles.select}>
						<option value="all">Todas</option>
						<option value="docs">Documentação</option>
						<option value="wiki">Wiki</option>
						<option value="api">API</option>
					</select>
				</div>

				<div>
					<label className={styles.label}>Ordenar por:</label>
					<select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className={styles.select}>
						<option value="title">Título</option>
						<option value="date">Data</option>
						<option value="author">Autor</option>
					</select>
				</div>
			</div>

			<div className={styles.tagsContainer}>
				<label className={styles.label}>Tags:</label>
				<div className={styles.tagsList}>
					{allTags.map((tag) => (
						<button key={tag} onClick={() => onTagToggle(tag)} className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagSelected : ''}`}>
							{tag}
						</button>
					))}
				</div>
			</div>
		</>
	)
}