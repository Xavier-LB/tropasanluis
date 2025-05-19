<script>
	// Estructura de datos para los miembros del staff
	const staffMembers = [
		{
			name: 'Nombre del Staff 1',
			photo: '/SCR-20250518-ksov.jpeg',
			years: 5,
			nickname: 'Apodo 1',
			typicalPhrase: 'Frase típica del staff 1',
			greatAchievement: 'Gran hazaña del staff 1',
			usefulGift: 'Regalo útil para el staff 1',
			frustratedDesire: 'Deseo frustrado del staff 1',
			neverSeen: 'Lo que nunca se vio del staff 1',
			bruncePhrase: 'Frase pal brunce del staff 1'
		},
		{
			name: 'Nombre del Staff 2',
			photo: '/staff2.webp',
			years: 3,
			nickname: 'Apodo 2',
			typicalPhrase: 'Frase típica del staff 2',
			greatAchievement: 'Gran hazaña del staff 2',
			usefulGift: 'Regalo útil para el staff 2',
			frustratedDesire: 'Deseo frustrado del staff 2',
			neverSeen: 'Lo que nunca se vio del staff 2',
			bruncePhrase: 'Frase pal brunce del staff 2'
		},
		{
			name: 'Nombre del Staff 3',
			photo: '/staff3.webp',
			years: 7,
			nickname: 'Apodo 3',
			typicalPhrase: 'Frase típica del staff 3',
			greatAchievement: 'Gran hazaña del staff 3',
			usefulGift: 'Regalo útil para el staff 3',
			frustratedDesire: 'Deseo frustrado del staff 3',
			neverSeen: 'Lo que nunca se vio del staff 3',
			bruncePhrase: 'Frase pal brunce del staff 3'
		},
		{
			name: 'Nombre del Staff 4',
			photo: '/staff4.webp',
			years: 4,
			nickname: 'Apodo 4',
			typicalPhrase: 'Frase típica del staff 4',
			greatAchievement: 'Gran hazaña del staff 4',
			usefulGift: 'Regalo útil para el staff 4',
			frustratedDesire: 'Deseo frustrado del staff 4',
			neverSeen: 'Lo que nunca se vio del staff 4',
			bruncePhrase: 'Frase pal brunce del staff 4'
		},
		{
			name: 'Nombre del Staff 5',
			photo: '/staff5.webp',
			years: 2,
			nickname: 'Apodo 5',
			typicalPhrase: 'Frase típica del staff 5',
			greatAchievement: 'Gran hazaña del staff 5',
			usefulGift: 'Regalo útil para el staff 5',
			frustratedDesire: 'Deseo frustrado del staff 5',
			neverSeen: 'Lo que nunca se vio del staff 5',
			bruncePhrase: 'Frase pal brunce del staff 5'
		},
		{
			name: 'Nombre del Staff 6',
			photo: '/staff6.webp',
			years: 6,
			nickname: 'Apodo 6',
			typicalPhrase: 'Frase típica del staff 6',
			greatAchievement: 'Gran hazaña del staff 6',
			usefulGift: 'Regalo útil para el staff 6',
			frustratedDesire: 'Deseo frustrado del staff 6',
			neverSeen: 'Lo que nunca se vio del staff 6',
			bruncePhrase: 'Frase pal brunce del staff 6'
		},
		{
			name: 'Nombre del Staff 7',
			photo: '/staff7.webp',
			years: 3,
			nickname: 'Apodo 7',
			typicalPhrase: 'Frase típica del staff 7',
			greatAchievement: 'Gran hazaña del staff 7',
			usefulGift: 'Regalo útil para el staff 7',
			frustratedDesire: 'Deseo frustrado del staff 7',
			neverSeen: 'Lo que nunca se vio del staff 7',
			bruncePhrase: 'Frase pal brunce del staff 7'
		},
		{
			name: 'Nombre del Staff 8',
			photo: '/staff8.webp',
			years: 8,
			nickname: 'Apodo 8',
			typicalPhrase: 'Frase típica del staff 8',
			greatAchievement: 'Gran hazaña del staff 8',
			usefulGift: 'Regalo útil para el staff 8',
			frustratedDesire: 'Deseo frustrado del staff 8',
			neverSeen: 'Lo que nunca se vio del staff 8',
			bruncePhrase: 'Frase pal brunce del staff 8'
		},
		{
			name: 'Nombre del Staff 9',
			photo: '/staff9.webp',
			years: 4,
			nickname: 'Apodo 9',
			typicalPhrase: 'Frase típica del staff 9',
			greatAchievement: 'Gran hazaña del staff 9',
			usefulGift: 'Regalo útil para el staff 9',
			frustratedDesire: 'Deseo frustrado del staff 9',
			neverSeen: 'Lo que nunca se vio del staff 9',
			bruncePhrase: 'Frase pal brunce del staff 9'
		}
	];
</script>

<main class="relative">
	<!-- Decorative elements -->
	<div class="pointer-events-none fixed inset-0">
		<div
			class="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.1),rgba(255,255,255,0))]"
		></div>
		<div
			class="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-800/5 mix-blend-multiply blur-3xl filter"
		></div>
		<div
			class="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 transform rounded-full bg-orange-600/5 mix-blend-multiply blur-3xl filter"
		></div>
		<div
			class="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-800/5 mix-blend-multiply blur-3xl filter"
		></div>
	</div>

	<div class="relative z-10 container mx-auto px-4 py-8">
		<section class="mb-16 text-center">
			<h1
				class="mb-6 bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-center text-5xl font-bold text-transparent"
			>
				Staff
			</h1>

			<!-- Foto grupal del staff -->
			<div class="mx-auto my-10 max-w-4xl">
				<img
					src="/staff.webp"
					alt="Equipo Staff de la Tropa San Luis"
					class="w-full rounded-lg shadow-xl"
				/>
				<p class="mt-3 text-sm text-gray-500">Staff de la Tropa San Luis 2025</p>
			</div>
		</section>

		<!-- Secciones individuales de cada miembro del staff -->
		<section class="mx-auto max-w-6xl px-4">

			<div class="space-y-24">
				{#each staffMembers as member, index}
					<div
						class="relative transform rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
					>
						<!-- Alterna la posición de la foto (izquierda o derecha) según el índice -->
						<div
							class="flex flex-col md:flex-row {index % 2 === 1
								? 'md:flex-row-reverse'
								: ''} items-center gap-8"
						>
							<!-- Foto del staff en círculo -->
							<div class="flex flex-col items-center w-48 flex-shrink-0">
								<div
									class="h-48 w-48 overflow-hidden rounded-full border-4 border-red-600/20 shadow-lg"
								>
									<img src={member.photo} alt={member.name} class="h-full w-full object-cover" />
								</div>
								<div class="mt-4 text-center">
									<h3 class="text-2xl font-bold text-gray-800">{member.name}</h3>
									<p class="text-red-600">{member.years} años en el Staff</p>
								</div>
							</div>

							<!-- Información del staff -->
							<div class="mt-16 w-full md:mt-0">
								<div
									class="rounded-lg border-l-4 border-red-400 bg-gradient-to-r from-gray-50 to-white p-5 shadow-md"
								>
									<div class="space-y-3">
										<div class="flex items-start">
											<span class="min-w-24 font-bold text-red-600">A:</span>
											<span class="flex-1">{member.nickname}</span>
										</div>
										<div class="flex items-start">
											<span class="min-w-24 font-bold text-red-600">FT:</span>
											<span class="flex-1">{member.typicalPhrase}</span>
										</div>
										<div class="flex items-start">
											<span class="min-w-24 font-bold text-red-600">GH:</span>
											<span class="flex-1">{member.greatAchievement}</span>
										</div>
										<div class="flex items-start">
											<span class="min-w-24 font-bold text-red-600">RU:</span>
											<span class="flex-1">{member.usefulGift}</span>
										</div>
										<div class="flex items-start">
											<span class="min-w-24 font-bold text-red-600">DF:</span>
											<span class="flex-1">{member.frustratedDesire}</span>
										</div>
										<div class="flex items-start">
											<span class="min-w-24 font-bold text-red-600">LQNSV:</span>
											<span class="flex-1">{member.neverSeen}</span>
										</div>
										<div class="flex items-start">
											<span class="min-w-24 font-bold text-red-600">FPB:</span>
											<span class="flex-1">{member.bruncePhrase}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		min-height: 100vh;
		background: linear-gradient(to bottom right, white, #fee2e2, #fecaca);
		background-attachment: fixed;
	}

	:global(html) {
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}

	:global(#svelte) {
		min-height: 100vh;
	}

	.min-w-24 {
		min-width: 6rem;
	}

	main {
		min-height: 100vh;
		width: 100%;
		position: relative;
	}
</style>
