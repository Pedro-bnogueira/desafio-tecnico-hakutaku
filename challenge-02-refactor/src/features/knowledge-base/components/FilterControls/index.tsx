import styles from './FilterControls.module.css'

// Define as propriedades para o componente FilterControls
type FilterControlsProps = {
	// termo de busca
	searchTerm: string
	// funcao chamada quando o termo de busca muda
	onSearchChange: (value: string) => void
	// categoria selecionada
	selectedCategory: string
	// funcao chamada quando a categoria muda
	onCategoryChange: (value: string) => void
	// criterio de ordenacao selecionado
	sortBy: string
	// funcao chamada quando o criterio de ordenacao muda
	onSortChange: (value: string) => void
	// todas as tags disponiveis
	allTags: string[]
	// tags selecionadas
	selectedTags: string[]
	// funcao chamada quando uma tag e selecionada ou desselecionada
	onTagToggle: (tag: string) => void
}

/**
 * Renderiza todos os controles de filtro e ordenação para a base de conhecimento
 *
 * @param {FilterControlsProps} props - As propriedades para controlar o estado dos filtros
 * @returns {JSX.Element} O formulário contendo todos os campos de filtro
 */
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