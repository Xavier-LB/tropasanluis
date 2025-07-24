<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * Interface para el autor de posts y comentarios
	 */
	interface Author {
		id: string;
		name: string;
		avatar: string;
		url?: string;
		profile?: any;
	}

	/**
	 * Interface para attachments/imágenes
	 */
	interface Attachment {
		type?: string;
		media?: {
			image?: {
				uri: string;
				width?: number;
				height?: number;
			};
		};
		title?: string;
		description?: string;
		url?: string;
	}

	/**
	 * Interface para comentarios
	 */
	interface Comment {
		id: string;
		feedbackId: string;
		commentId: string;
		content: string;
		url: string;
		author: Author;
		reactionsCount: number;
		subCommentsCount: number;
		createdAt: number;
		parentFeedbackId: string;
		depth: number;
		children: Comment[];
		_isNeedTranslation: boolean;
		attachments: (Attachment | string)[];
		localAttachments: any[];
	}

	/**
	 * Interface para posts de Facebook
	 */
	interface FacebookPost {
		post_id: string;
		storyId: string;
		content: string;
		url: string;
		feedbackId: string;
		_isNeedTranslation: boolean;
		reactionsCount: number;
		shareCount: number;
		_commentIntentToken: any;
		commentCount: number;
		author: Author;
		createdAt: number;
		comments: Comment[];
	}

	let posts: FacebookPost[] = [];
	let loading = true;
	let error = '';
	let searchTerm = '';
	let filteredPosts: FacebookPost[] = [];
	let expandedImages: Set<string> = new Set();
	let viewedPosts: Set<string> = new Set(); // Posts marcados como vistos

	// Filtros
	let dateFilter = 'all'; // 'all', 'custom'
	let customStartDate = '';
	let customEndDate = '';
	let minComments = 0;
	let sortBy = 'date'; // 'date', 'reactions', 'comments'
	let sortOrder = 'desc'; // 'asc', 'desc'
	let showFilters = false;
	let viewedFilter = 'all'; // 'all', 'viewed', 'unviewed'
	let userFilter = ''; // Filtro por usuario
	let userSearchTerm = ''; // Búsqueda de usuarios

	// Usuarios únicos
	let uniqueUsers: Array<{id: string, name: string, postCount: number, commentCount: number}> = [];
	let totalUniqueUsers = 0;
	let filteredUsers: Array<{id: string, name: string, postCount: number, commentCount: number}> = [];

	/**
	 * Formatea un timestamp Unix a fecha legible
	 */
	function formatDate(timestamp: number): string {
		return new Date(timestamp * 1000).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	/**
	 * Calcula usuarios únicos de posts y comentarios
	 */
	function calculateUniqueUsers() {
		const userMap = new Map<string, {id: string, name: string, postCount: number, commentCount: number}>();
		
		// Procesar autores de posts
		posts.forEach(post => {
			const userId = post.author.id;
			const userName = post.author.name;
			
			if (!userMap.has(userId)) {
				userMap.set(userId, {
					id: userId,
					name: userName,
					postCount: 0,
					commentCount: 0
				});
			}
			userMap.get(userId)!.postCount++;
			
			// Procesar autores de comentarios
			post.comments.forEach(comment => {
				const commentUserId = comment.author.id;
				const commentUserName = comment.author.name;
				
				if (!userMap.has(commentUserId)) {
					userMap.set(commentUserId, {
						id: commentUserId,
						name: commentUserName,
						postCount: 0,
						commentCount: 0
					});
				}
				userMap.get(commentUserId)!.commentCount++;
			});
		});
		
		uniqueUsers = Array.from(userMap.values()).sort((a, b) => {
			// Priorizar usuarios que parezcan ser campings/sitios
			const aCamping = isCampingProvider(a.name);
			const bCamping = isCampingProvider(b.name);
			
			if (aCamping && !bCamping) return -1;
			if (!aCamping && bCamping) return 1;
			
			// Si ambos son camping o ninguno, ordenar por actividad
			return (b.postCount + b.commentCount) - (a.postCount + a.commentCount);
		});
		totalUniqueUsers = uniqueUsers.length;
		filterUsers();
	}

	/**
	 * Detecta si un usuario parece ser un proveedor de camping/sitio
	 */
	function isCampingProvider(name: string): boolean {
		const campingKeywords = [
			'camping', 'camp', 'refugio', 'hostería', 'hostal', 'cabaña', 'parcela',
			'eco', 'valle', 'cordillera', 'laguna', 'río', 'termal', 'nativa',
			'patagonia', 'turismo', 'complejo', 'centro', 'quinta', 'fundo'
		];
		
		const lowerName = name.toLowerCase();
		return campingKeywords.some(keyword => lowerName.includes(keyword));
	}

	/**
	 * Filtra usuarios según el término de búsqueda
	 */
	function filterUsers() {
		if (!userSearchTerm.trim()) {
			filteredUsers = uniqueUsers.slice(0, 50); // Mostrar top 50 por defecto
		} else {
			filteredUsers = uniqueUsers
				.filter(user => 
					user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
				)
				.slice(0, 30); // Mostrar top 30 en búsqueda
		}
	}

	/**
	 * Aplica todos los filtros y ordenamiento a los posts
	 */
	function filterAndSortPosts() {
		let filtered = posts;

		// Filtro de texto
		if (searchTerm.trim()) {
			filtered = filtered.filter(post => 
				post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
				post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				post.comments.some(comment => 
					comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
					comment.author.name.toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}

		// Filtro de fecha
		if (dateFilter !== 'all') {
			let startTime = 0;
			let endTime = Date.now() / 1000;

			if (dateFilter === 'custom') {
				if (customStartDate) {
					startTime = new Date(customStartDate).getTime() / 1000;
				}
				if (customEndDate) {
					endTime = new Date(customEndDate + 'T23:59:59').getTime() / 1000;
				}
			}

			filtered = filtered.filter(post => 
				post.createdAt >= startTime && post.createdAt <= endTime
			);
		}

		// Filtro de comentarios mínimos
		if (minComments > 0) {
			filtered = filtered.filter(post => post.commentCount >= minComments);
		}

		// Filtro de posts vistos
		if (viewedFilter !== 'all') {
			if (viewedFilter === 'viewed') {
				filtered = filtered.filter(post => viewedPosts.has(post.post_id));
			} else if (viewedFilter === 'unviewed') {
				filtered = filtered.filter(post => !viewedPosts.has(post.post_id));
			}
		}

		// Filtro por usuario
		if (userFilter.trim()) {
			filtered = filtered.filter(post => {
				// Filtrar por autor del post
				const postAuthorMatch = post.author.id === userFilter || 
					post.author.name.toLowerCase().includes(userFilter.toLowerCase());
				
				// Filtrar por autor de algún comentario
				const commentAuthorMatch = post.comments.some(comment => 
					comment.author.id === userFilter || 
					comment.author.name.toLowerCase().includes(userFilter.toLowerCase())
				);
				
				return postAuthorMatch || commentAuthorMatch;
			});
		}

		// Ordenamiento
		filtered.sort((a, b) => {
			let valueA, valueB;
			
			switch (sortBy) {
				case 'reactions':
					valueA = a.reactionsCount;
					valueB = b.reactionsCount;
					break;
				case 'comments':
					valueA = a.commentCount;
					valueB = b.commentCount;
					break;
				case 'date':
				default:
					valueA = a.createdAt;
					valueB = b.createdAt;
					break;
			}

			if (sortOrder === 'asc') {
				return valueA - valueB;
			} else {
				return valueB - valueA;
			}
		});

		filteredPosts = filtered;
	}

	/**
	 * Limpia todos los filtros
	 */
	function clearFilters() {
		searchTerm = '';
		dateFilter = 'all';
		customStartDate = '';
		customEndDate = '';
		minComments = 0;
		sortBy = 'date';
		sortOrder = 'desc';
		viewedFilter = 'all';
		userFilter = '';
		userSearchTerm = '';
		filterAndSortPosts();
	}

	/**
	 * Cuenta cuántos filtros están activos
	 */
	function getActiveFiltersCount(): number {
		let count = 0;
		if (searchTerm.trim()) count++;
		if (dateFilter !== 'all') count++;
		if (minComments > 0) count++;
		if (sortBy !== 'date' || sortOrder !== 'desc') count++;
		if (viewedFilter !== 'all') count++;
		if (userFilter.trim()) count++;
		return count;
	}

	/**
	 * Verifica si una URL es una imagen
	 */
	function isImageUrl(url: string): boolean {
		return /\.(jpg|jpeg|png|gif|webp)/i.test(url) || url.includes('fbcdn.net');
	}

	/**
	 * Carga los posts vistos desde localStorage
	 */
	function loadViewedPosts() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('sitios-fb-viewed-posts');
			if (saved) {
				try {
					const parsed = JSON.parse(saved);
					viewedPosts = new Set(parsed);
				} catch (e) {
					console.warn('Error loading viewed posts from localStorage:', e);
					viewedPosts = new Set();
				}
			}
		}
	}

	/**
	 * Guarda los posts vistos en localStorage
	 */
	function saveViewedPosts() {
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('sitios-fb-viewed-posts', JSON.stringify([...viewedPosts]));
			} catch (e) {
				console.warn('Error saving viewed posts to localStorage:', e);
			}
		}
	}

	/**
	 * Alterna el estado de visto de un post
	 */
	function togglePostViewed(postId: string) {
		if (viewedPosts.has(postId)) {
			viewedPosts.delete(postId);
		} else {
			viewedPosts.add(postId);
		}
		viewedPosts = viewedPosts; // Trigger reactivity
		saveViewedPosts();
		filterAndSortPosts();
	}



	/**
	 * Limpia todos los posts vistos
	 */
	function clearAllViewed() {
		viewedPosts.clear();
		viewedPosts = viewedPosts; // Trigger reactivity
		saveViewedPosts();
		filterAndSortPosts();
	}

	/**
	 * Obtiene la URL del perfil del autor, manejando diferentes estructuras de datos
	 */
	function getAuthorProfileUrl(author: Author): string {
		// Para comentarios: author.url existe
		if (author.url) {
			return author.url;
		}
		// Para posts principales: author.profile podría tener la URL, o construimos una básica
		if (author.profile && typeof author.profile === 'string') {
			return author.profile;
		}
		// Si tenemos ID, construimos URL directa al perfil
		if (author.id) {
			return `https://www.facebook.com/profile.php?id=${author.id}`;
		}
		// Último recurso: búsqueda por nombre en Facebook
		if (author.name && author.name !== 'Miembro anónimo') {
			const searchName = encodeURIComponent(author.name);
			return `https://www.facebook.com/search/people/?q=${searchName}`;
		}
		// Sin enlace disponible
		return '#';
	}

	/**
	 * Convierte URLs en texto a enlaces clickeables
	 */
	function linkifyText(text: string): string {
		if (!text) return text;
		
		// Escapar HTML primero
		const escaped = text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/\n/g, '<br>'); // Preservar saltos de línea
		
		// Regex más robusta para detectar URLs
		const urlRegex = /(https?:\/\/[^\s<>"']+)/gi;
		
		return escaped.replace(urlRegex, (url) => {
			// Limpiar la URL de caracteres finales problemáticos
			const cleanUrl = url.replace(/[.,;:!?)"']+$/, '');
			
			return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline break-all inline-block">${cleanUrl}</a>`;
		});
	}

	/**
	 * Alterna la expansión de una imagen
	 */
	function toggleImageExpanded(imageId: string) {
		if (expandedImages.has(imageId)) {
			expandedImages.delete(imageId);
		} else {
			expandedImages.add(imageId);
		}
		expandedImages = expandedImages; // Trigger reactivity
	}

	/**
	 * Carga los datos del JSON
	 */
	onMount(async () => {
		try {
			// Cargar posts vistos desde localStorage
			loadViewedPosts();
			
			const response = await fetch('/250723-scrap-sitios-campamento.json');
			if (!response.ok) {
				throw new Error('Error al cargar los datos');
			}
			posts = await response.json();
			calculateUniqueUsers();
			filterAndSortPosts();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Error desconocido';
		} finally {
			loading = false;
		}
	});

	// Reactiva el filtrado cuando cambian los filtros
	$: if (searchTerm !== undefined || dateFilter || minComments || sortBy || sortOrder || viewedFilter || userFilter !== undefined) {
		filterAndSortPosts();
	}

	// Reactiva el filtrado de usuarios cuando cambia el término de búsqueda
	$: if (userSearchTerm !== undefined && uniqueUsers.length > 0) {
		filterUsers();
	}
</script>

<svelte:head>
	<title>Sitios FB - Datos para Campamentos Scout Chile</title>
	<meta name="description" content="Posts scrapeados del grupo 'Datos para Campamentos Scout!!! Chile' desde diciembre 2023 hasta julio 2025" />
</svelte:head>

<main class="container mx-auto px-4 py-8">
	<header class="mb-8">
		<h1 class="text-3xl font-bold text-gray-800 mb-4">Sitios de Campamento - Facebook</h1>
		<p class="text-gray-600 mb-6">
			Posts scrapeados del grupo de Facebook 
			<a 
				href="https://www.facebook.com/groups/178444148913756/" 
				target="_blank" 
				rel="noopener noreferrer"
				class="text-blue-600 hover:text-blue-800 underline font-medium"
			>
				"Datos para Campamentos Scout!!! Chile"
			</a>
			desde diciembre 2023 hasta el 23 de julio de 2025.
		</p>
		
		<!-- Buscador y Filtros -->
		<div class="space-y-4">
			<div class="flex flex-col sm:flex-row gap-4">
				<input
					type="text"
					bind:value={searchTerm}
					placeholder="Buscar en posts y comentarios..."
					class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
				<button
					on:click={() => showFilters = !showFilters}
					class="relative px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors flex items-center space-x-2"
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
					</svg>
					<span>Filtros</span>
					{#if getActiveFiltersCount() > 0}
						<span class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
							{getActiveFiltersCount()}
						</span>
					{/if}
					<svg class={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</button>
			</div>

			<!-- Panel de Filtros -->
			{#if showFilters}
				<div class="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6">
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						
						<!-- Filtro de Fecha -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700">Período</label>
							<select
								bind:value={dateFilter}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="all">Todos los tiempos</option>
								<option value="custom">Rango personalizado</option>
							</select>
						</div>

						<!-- Filtro de Comentarios -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700">
								Comentarios mínimos: {minComments}
							</label>
							<input
								type="range"
								bind:value={minComments}
								min="0"
								max="50"
								step="1"
								class="w-full"
							/>
						</div>

						<!-- Ordenar por -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700">Ordenar por</label>
							<select
								bind:value={sortBy}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="date">Fecha</option>
								<option value="reactions">Reacciones</option>
								<option value="comments">Comentarios</option>
							</select>
						</div>

						<!-- Orden -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700">Orden</label>
							<select
								bind:value={sortOrder}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="desc">Descendente</option>
								<option value="asc">Ascendente</option>
							</select>
						</div>

						<!-- Filtro de Estado de Lectura -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700">Estado de lectura</label>
							<select
								bind:value={viewedFilter}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="all">Todos</option>
								<option value="unviewed">No vistos</option>
								<option value="viewed">Vistos</option>
							</select>
						</div>

						<!-- Filtro por Usuario -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700">
								Usuario
								<span class="text-xs text-gray-500">(prioritizando campings)</span>
							</label>
							<div class="space-y-2">
								<!-- Búsqueda de usuarios -->
								<input
									type="text"
									bind:value={userSearchTerm}
									placeholder="Buscar usuario por nombre..."
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
								<!-- Dropdown de usuarios -->
								<select
									bind:value={userFilter}
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="">Todos los usuarios</option>
									{#each filteredUsers as user}
										<option value={user.id}>
											{#if isCampingProvider(user.name)}🏕️{/if}
											{user.name} ({user.postCount}p + {user.commentCount}c)
										</option>
									{/each}
									{#if !userSearchTerm.trim() && uniqueUsers.length > 50}
										<option disabled>... y {uniqueUsers.length - 50} más (usa búsqueda)</option>
									{:else if userSearchTerm.trim() && filteredUsers.length === 0}
										<option disabled>No se encontraron usuarios</option>
									{/if}
								</select>
							</div>
						</div>

					</div>

					<!-- Botón limpiar -->
					<div class="flex justify-center pt-4">
						<button
							on:click={clearFilters}
							class="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 rounded-lg transition-colors"
						>
							Limpiar todos los filtros
						</button>
					</div>

					<!-- Fechas personalizadas -->
					{#if dateFilter === 'custom'}
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
							<div class="space-y-2">
								<label class="block text-sm font-medium text-gray-700">Fecha inicio</label>
								<input
									type="date"
									bind:value={customStartDate}
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div class="space-y-2">
								<label class="block text-sm font-medium text-gray-700">Fecha fin</label>
								<input
									type="date"
									bind:value={customEndDate}
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</header>

	{#if loading}
		<div class="flex justify-center items-center py-12">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
			<span class="ml-3 text-gray-600">Cargando datos...</span>
		</div>
	{:else if error}
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
			<strong class="font-bold">Error:</strong>
			<span class="block sm:inline"> {error}</span>
		</div>
	{:else}
		<!-- Indicador de resultados -->
		{#if getActiveFiltersCount() > 0}
			<div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-2">
						<svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
						</svg>
						<span class="text-blue-800 font-medium">
							Mostrando {filteredPosts.length} de {posts.length} posts
						</span>
					</div>
					<button
						on:click={clearFilters}
						class="text-sm text-blue-600 hover:text-blue-800 underline"
					>
						Limpiar filtros
					</button>
				</div>
				
				<!-- Filtros activos -->
				<div class="mt-2 flex flex-wrap gap-2">
					{#if searchTerm.trim()}
						<span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
							Búsqueda: "{searchTerm}"
						</span>
					{/if}
					{#if dateFilter !== 'all'}
						<span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
							{dateFilter === 'custom' ? 'Fechas personalizadas' : dateFilter}
						</span>
					{/if}
					{#if minComments > 0}
						<span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
							Min. comentarios: {minComments}
						</span>
					{/if}
					{#if viewedFilter !== 'all'}
						<span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
							{viewedFilter === 'viewed' ? 'Solo vistos' : 'Solo no vistos'}
						</span>
					{/if}
					{#if userFilter.trim()}
						<span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
							{#if isCampingProvider(uniqueUsers.find(u => u.id === userFilter)?.name || '')}🏕️{/if}
							Usuario: {uniqueUsers.find(u => u.id === userFilter)?.name || userFilter}
						</span>
					{/if}
					{#if sortBy !== 'date' || sortOrder !== 'desc'}
						<span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
							Orden: {sortBy === 'date' ? 'Fecha' : sortBy === 'reactions' ? 'Reacciones' : 'Comentarios'} 
							({sortOrder === 'desc' ? 'descendente' : 'ascendente'})
						</span>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Estadísticas -->
		<div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
			<div class="bg-blue-50 p-6 rounded-lg">
				<h3 class="text-lg font-semibold text-blue-800">Total Posts</h3>
				<p class="text-3xl font-bold text-blue-600">{filteredPosts.length}</p>
			</div>
			<div class="bg-green-50 p-6 rounded-lg">
				<h3 class="text-lg font-semibold text-green-800">Total Comentarios</h3>
				<p class="text-3xl font-bold text-green-600">
					{filteredPosts.reduce((total, post) => total + post.comments.length, 0)}
				</p>
			</div>
			<div class="bg-purple-50 p-6 rounded-lg">
				<h3 class="text-lg font-semibold text-purple-800">Total Reacciones</h3>
				<p class="text-3xl font-bold text-purple-600">
					{filteredPosts.reduce((total, post) => total + post.reactionsCount, 0)}
				</p>
			</div>
			<div class="bg-yellow-50 p-6 rounded-lg">
				<h3 class="text-lg font-semibold text-yellow-800">Usuarios Únicos</h3>
				<p class="text-3xl font-bold text-yellow-600">{totalUniqueUsers}</p>
				<p class="text-xs text-yellow-700 mt-1">
					🏕️ {uniqueUsers.filter(u => isCampingProvider(u.name)).length} campings detectados
				</p>
			</div>
			<div class="bg-gray-50 p-6 rounded-lg">
				<h3 class="text-lg font-semibold text-gray-800">Posts Vistos</h3>
				<p class="text-3xl font-bold text-gray-600">
					{posts.filter(post => viewedPosts.has(post.post_id)).length} / {posts.length}
				</p>
			</div>
		</div>

		<!-- Controles de Estado de Lectura -->
		{#if viewedPosts.size > 0}
			<div class="mb-6 flex justify-end">
				<button
					on:click={() => {
						if (confirm('¿Estás seguro de que quieres limpiar todos los posts marcados como vistos? Esta acción no se puede deshacer.')) {
							clearAllViewed();
						}
					}}
					class="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded transition-colors flex items-center space-x-1"
				>
					<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
					<span>Limpiar vistos</span>
				</button>
			</div>
		{/if}

		<!-- Lista de Posts -->
		<div class="space-y-8">
			{#each filteredPosts as post, index}
				<article class={`bg-white border rounded-lg shadow-sm overflow-hidden transition-all ${
					viewedPosts.has(post.post_id) 
						? 'border-green-200 bg-green-50/30' 
						: 'border-gray-200'
				}`}>
					<!-- Cabecera del Post -->
					<div class="p-6 border-b border-gray-100">
						<div class="flex items-start space-x-4">
							<a
								href={getAuthorProfileUrl(post.author)}
								target="_blank"
								rel="noopener noreferrer"
								class="flex-shrink-0"
							>
								<img
									src={post.author.avatar}
									alt={post.author.name}
									class="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-blue-500 transition-all"
									loading="lazy"
								/>
							</a>
							<div class="flex-1">
								<div class="flex items-center justify-between">
									{#if getAuthorProfileUrl(post.author) !== '#'}
										<a
											href={getAuthorProfileUrl(post.author)}
											target="_blank"
											rel="noopener noreferrer"
											class="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
										>
											{post.author.name}
										</a>
									{:else}
										<span class="font-semibold text-gray-500">
											{post.author.name}
										</span>
									{/if}
									<div class="flex items-center space-x-3">
										<time class="text-sm text-gray-500">
											{formatDate(post.createdAt)}
										</time>
										<!-- Toggle para marcar como visto -->
										<button
											on:click={() => togglePostViewed(post.post_id)}
											class={`p-2 rounded-full transition-colors ${
												viewedPosts.has(post.post_id)
													? 'bg-green-100 text-green-600 hover:bg-green-200'
													: 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
											}`}
											title={viewedPosts.has(post.post_id) ? 'Expandir post (marcar como no visto)' : 'Colapsar post (marcar como visto)'}
										>
											<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
												<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
												<path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
											</svg>
										</button>
									</div>
								</div>
								<a
									href={post.url}
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-600 hover:text-blue-800 text-sm"
								>
									Ver en Facebook ↗
								</a>
							</div>
						</div>
					</div>

					<!-- Contenido del Post -->
					{#if !viewedPosts.has(post.post_id)}
						<div class="p-6">
							<p class="text-gray-800 leading-relaxed">{@html linkifyText(post.content)}</p>
							
							<!-- Estadísticas del Post -->
							<div class="flex items-center space-x-6 mt-4 text-sm text-gray-500">
								<span class="flex items-center">
									<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
										<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
									</svg>
									{post.reactionsCount} reacciones
								</span>
								<span class="flex items-center">
									<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
									</svg>
									{post.commentCount} comentarios
								</span>
							</div>
						</div>
					{:else}
						<!-- Post colapsado - solo estadísticas básicas -->
						<div class="px-6 py-3 bg-gray-50/50">
							<div class="flex items-center justify-between text-sm text-gray-500">
								<div class="flex items-center space-x-4">
									<span>{post.reactionsCount} reacciones</span>
									<span>{post.commentCount} comentarios</span>
								</div>
								<span class="text-xs text-green-600 font-medium">Post marcado como visto</span>
							</div>
						</div>
					{/if}

					<!-- Comentarios -->
					{#if post.comments.length > 0 && !viewedPosts.has(post.post_id)}
						<div class="border-t border-gray-100">
							<div class="p-6">
								<h4 class="font-medium text-gray-900 mb-4">Comentarios ({post.comments.length})</h4>
								<div class="space-y-4">
									{#each post.comments as comment}
										<div class="flex space-x-3">
											<a
												href={getAuthorProfileUrl(comment.author)}
												target="_blank"
												rel="noopener noreferrer"
												class="flex-shrink-0"
											>
												<img
													src={comment.author.avatar}
													alt={comment.author.name}
													class="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-blue-500 transition-all"
													loading="lazy"
												/>
											</a>
											<div class="flex-1">
												<div class="bg-gray-50 rounded-lg p-3">
													<div class="flex items-center justify-between mb-1">
														<a
															href={getAuthorProfileUrl(comment.author)}
															target="_blank"
															rel="noopener noreferrer"
															class="font-medium text-sm text-gray-900 hover:text-blue-600 transition-colors"
														>
															{comment.author.name}
														</a>
														<time class="text-xs text-gray-500">
															{formatDate(comment.createdAt)}
														</time>
													</div>
													<p class="text-sm text-gray-800 leading-relaxed">
														{@html linkifyText(comment.content)}
													</p>
													
													<!-- Attachments/Imágenes del comentario -->
													{#if comment.attachments && comment.attachments.length > 0}
														<div class="mt-3 space-y-2">
															{#each comment.attachments as attachment, attIndex}
																{#if typeof attachment === 'string'}
																	{#if isImageUrl(attachment)}
																		{@const imageId = `${comment.id}-${attIndex}`}
																		<div class="border rounded-lg overflow-hidden">
																			<button
																				on:click={() => toggleImageExpanded(imageId)}
																				class="w-full text-left"
																			>
																				<img
																					src={attachment}
																					alt="Imagen del comentario"
																					class={`w-full object-cover transition-all ${
																						expandedImages.has(imageId) 
																							? 'max-h-none' 
																							: 'max-h-48 hover:opacity-90'
																					}`}
																					loading="lazy"
																				/>
																			</button>
																		</div>
																	{:else}
																		<a
																			href={attachment}
																			target="_blank"
																			rel="noopener noreferrer"
																			class="block text-xs text-blue-600 hover:text-blue-800 underline"
																		>
																			{attachment}
																		</a>
																	{/if}
																{:else if attachment.media?.image?.uri}
																	{@const imageId = `${comment.id}-${attIndex}`}
																	<div class="border rounded-lg overflow-hidden">
																		<button
																			on:click={() => toggleImageExpanded(imageId)}
																			class="w-full text-left"
																		>
																			<img
																				src={attachment.media.image.uri}
																				alt={attachment.title || 'Imagen del comentario'}
																				class={`w-full object-cover transition-all ${
																					expandedImages.has(imageId) 
																						? 'max-h-none' 
																						: 'max-h-48 hover:opacity-90'
																				}`}
																				loading="lazy"
																			/>
																		</button>
																		{#if attachment.title || attachment.description}
																			<div class="p-2 bg-gray-100">
																				{#if attachment.title}
																					<p class="text-xs font-medium text-gray-900">{attachment.title}</p>
																				{/if}
																				{#if attachment.description}
																					<p class="text-xs text-gray-600">{attachment.description}</p>
																				{/if}
																			</div>
																		{/if}
																	</div>
																{:else if typeof attachment === 'object' && attachment.url}
																	<a
																		href={attachment.url}
																		target="_blank"
																		rel="noopener noreferrer"
																		class="block text-xs text-blue-600 hover:text-blue-800 underline"
																	>
																		{attachment.title || attachment.url}
																	</a>
																{/if}
															{/each}
														</div>
													{/if}
													
													<div class="flex items-center justify-between mt-2">
														{#if comment.reactionsCount > 0}
															<div class="text-xs text-gray-500">
																{comment.reactionsCount} reacciones
															</div>
														{/if}
														<a
															href={comment.url}
															target="_blank"
															rel="noopener noreferrer"
															class="text-xs text-blue-600 hover:text-blue-800"
														>
															Ver comentario ↗
														</a>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</article>
			{/each}
		</div>

		{#if filteredPosts.length === 0 && searchTerm}
			<div class="text-center py-12">
				<p class="text-gray-500">No se encontraron resultados para "{searchTerm}"</p>
			</div>
		{/if}
	{/if}
</main>

<style>
	/* Estilos adicionales si son necesarios */
</style> 