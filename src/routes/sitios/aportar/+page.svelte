<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ArrowRight, CheckCircle, Send } from 'lucide-svelte';
	import seed from '$lib/catalog/seed';
	import { REGIONS, contributionSchema, type Catalog, type Contribution } from '$lib/catalog/model';
	import { candidates } from '$lib/catalog/search';
	import { sendContribution, fetchCatalog, ContributionError } from '$lib/catalog/api';
	import NumberField from '$lib/catalog/NumberField.svelte';
	type Mode = Contribution['type'];
	const modes: [Mode, string][] = [
		['sitio', 'Agregar un lugar'],
		['texto', 'Pegar publicación'],
		['correccion', 'Corregir un dato'],
		['visita', 'Registrar visita']
	];
	const makeDraft = () => ({
		id: '',
		type: 'sitio' as Mode,
		siteId: '',
		name: '',
		region: 'Por confirmar',
		locality: '',
		capacity: '',
		areaHa: '',
		water: 'sin-datos',
		toilets: 'sin-datos',
		contact: '',
		sourceUrl: '',
		content: '',
		contributor: '',
		group: '',
		email: '',
		visitDate: '',
		visitStatus: 'realizado',
		people: '',
		shareVisit: false,
		permission: false,
		website: ''
	});
	let form = makeDraft(),
		catalog = seed as Catalog,
		ready = false,
		saving = false,
		error = '',
		success = '',
		draftInfo = '';
	const draftKey = 'tropa-sitios-aporte-v1';
	const editedDefaults = new Set<'name' | 'region' | 'locality'>();
	$: similar = form.siteId ? [] : candidates(catalog.sites, form.name, form.locality);
	function selectSite() {
		const s = catalog.sites.find((s) => s.id === form.siteId);
		if (s) {
			form.name = s.name;
			form.region = s.region;
			form.locality = s.locality || s.commune;
		}
		saveDraft();
	}
	function saveDraft() {
		if (!ready || success) return;
		try {
			localStorage.setItem(draftKey, JSON.stringify({ savedAt: Date.now(), form }));
			draftInfo = 'Borrador guardado en este dispositivo.';
		} catch {
			draftInfo =
				'No se pudo guardar el borrador en este dispositivo. Puedes enviar el aporte igualmente.';
		}
	}
	function reset() {
		form = { ...makeDraft(), id: crypto.randomUUID() };
		success = '';
		error = '';
		draftInfo = '';
		try {
			localStorage.removeItem(draftKey);
		} catch {
			/* El formulario se puede usar sin almacenamiento local. */
		}
	}
	function mode(value: Mode) {
		form = { ...form, type: value };
		saveDraft();
	}
	async function submit() {
		if (saving) return;
		error = '';
		const numeric = (v: string) => (v.trim() === '' ? null : Number(v));
		const parsed = contributionSchema.safeParse({
			...form,
			capacity: numeric(form.capacity),
			areaHa: numeric(form.areaHa),
			people: numeric(form.people),
			visitDate: form.visitDate || null
		});
		if (!parsed.success) {
			error = parsed.error.issues
				.map((i) => i.message)
				.slice(0, 3)
				.join(' ');
			return;
		}
		saving = true;
		try {
			const result = await sendContribution(parsed.data);
			success = result.id;
			try {
				localStorage.removeItem(draftKey);
			} catch {
				/* El aporte ya está recibido. */
			}
			draftInfo = '';
		} catch (e) {
			error = e instanceof Error ? e.message : 'No se pudo enviar. Conservamos tu borrador.';
			if (e instanceof ContributionError && e.status === 409) {
				form.id = crypto.randomUUID();
				error =
					'La referencia anterior corresponde a otro contenido. Generamos una referencia nueva y conservamos tu aporte. Vuelve a enviarlo para revisión.';
			}
			saveDraft();
		} finally {
			saving = false;
		}
	}
	onMount(() => {
		const params = $page.url.searchParams;
		let restored = false;
		try {
			const draft = JSON.parse(localStorage.getItem(draftKey) || 'null');
			if (
				draft?.form &&
				Date.now() - draft.savedAt < 7 * 86400000 &&
				(!params.has('sitio') || draft.form.siteId === params.get('sitio')) &&
				(!params.has('tipo') || draft.form.type === params.get('tipo')) &&
				(!params.has('nombre') || draft.form.name === params.get('nombre'))
			) {
				for (const key of Object.keys(form) as (keyof typeof form)[]) {
					const value = draft.form[key];
					if (typeof value === typeof form[key]) (form as Record<string, unknown>)[key] = value;
				}
				form.permission = false;
				restored = true;
				draftInfo = 'Recuperamos tu borrador de este dispositivo.';
			}
		} catch {
			/* Un borrador antiguo no bloquea el formulario. */
		}
		if (!restored) {
			const type = params.get('tipo');
			if (modes.some(([m]) => m === type)) form.type = type as Mode;
			form.siteId = params.get('sitio') || '';
			form.name = params.get('nombre') || '';
			if (form.siteId) selectSite();
		}
		form.id = form.id || crypto.randomUUID();
		const initial = { ...form };
		ready = true;
		fetchCatalog()
			.then((c) => {
				catalog = c;
				if (
					!restored &&
					!saving &&
					!success &&
					form.siteId === initial.siteId &&
					form.id === initial.id
				) {
					const site = catalog.sites.find((s) => s.id === initial.siteId);
					if (site) {
						// Completar lo que aún no se editó mientras llegaba el catálogo vivo.
						if (!editedDefaults.has('name') && form.name === initial.name) form.name = site.name;
						if (!editedDefaults.has('region') && form.region === initial.region)
							form.region = site.region;
						if (!editedDefaults.has('locality') && form.locality === initial.locality)
							form.locality = site.locality || site.commune;
						saveDraft();
					}
				}
			})
			.catch(() => {});
	});
</script>

<svelte:head
	><title>Aportar un lugar o visita | Tropa San Luis</title><meta
		name="description"
		content="Comparte un sitio para acampar, pega una publicación o registra una visita. Los aportes se revisan antes de publicarse."
	/></svelte:head
>
<div class="form-wrap">
	{#if success}<div class="notice success" role="status">
			<CheckCircle size={26} aria-hidden="true" />
			<h1 style="margin-top:16px">Tu aporte quedó recibido</h1>
			<p>
				Lo revisaremos antes de incorporarlo al catálogo. Tu correo y las notas internas no se
				publican.
			</p>
			<p class="small">Referencia: {success}</p>
			<div class="actions">
				<a class="button primary" href="/sitios">Volver al catálogo</a><button on:click={reset}
					>Enviar otro aporte</button
				>
			</div>
		</div>
	{:else}
		<header>
			<h1>Cada dato ayuda al próximo grupo</h1>
			<p class="muted">
				No necesitas conocer todos los detalles. Agrega lo que sabes y deja el resto por confirmar.
			</p>
		</header>
		<div class="mode-tabs" aria-label="Tipo de aporte">
			{#each modes as [value, label]}<button
					type="button"
					disabled={saving}
					aria-pressed={form.type === value}
					on:click={() => mode(value)}>{label}</button
				>{/each}
		</div>
		<form
			on:submit|preventDefault={submit}
			on:input={() => queueMicrotask(saveDraft)}
			on:change={() => queueMicrotask(saveDraft)}
		>
			<fieldset class="form-section" disabled={saving}>
				<legend>{form.type === 'visita' ? 'El lugar que visitaron' : 'El lugar'}</legend>
				<div class="form-grid">
					<label class="span-2"
						>Ya existe en el catálogo?<select bind:value={form.siteId} on:change={selectSite}
							><option value="">Es un lugar nuevo o no lo encuentro</option
							>{#each catalog.sites as s}<option value={s.id}
									>{s.name} · {s.commune || s.region}</option
								>{/each}</select
						></label
					>
					<label class="span-2"
						>Nombre del lugar<input
							required
							maxlength="150"
							autocomplete="off"
							bind:value={form.name}
							on:input={() => editedDefaults.add('name')}
							placeholder="Nombre o referencia para reconocerlo"
						/></label
					>
					<label
						>Región<select bind:value={form.region} on:change={() => editedDefaults.add('region')}
							>{#each REGIONS as r}<option>{r}</option>{/each}</select
						></label
					>
					<label
						>Comuna o localidad<input
							maxlength="300"
							bind:value={form.locality}
							on:input={() => editedDefaults.add('locality')}
							placeholder="Por ejemplo, San Fabián de Alico"
						/></label
					>
				</div>
				{#if similar.length}<div class="notice">
						<strong>Podría ser uno de estos lugares</strong>
						<p class="small">
							Revisa antes de crear otra ficha. Compartir un contacto no significa que sean el mismo
							predio.
						</p>
						{#each similar as s}<div style="margin-top:8px">
								<button
									type="button"
									class="quiet"
									on:click={() => {
										form.siteId = s.id;
										selectSite();
									}}>Usar {s.name}<ArrowRight size={15} aria-hidden="true" /></button
								><a class="small" href={`/sitios/${s.id}`} target="_blank" rel="noopener noreferrer"
									>Ver ficha</a
								>
							</div>{/each}
					</div>{/if}
			</fieldset>
			{#if form.type === 'sitio' || form.type === 'correccion'}<fieldset
					class="form-section"
					disabled={saving}
				>
					<legend>Lo que sabes del sitio</legend>
					<div class="form-grid">
						<NumberField
							label="Capacidad para acampar (personas)"
							placeholder="Si fue informada por el lugar"
							bind:value={form.capacity}
						/><NumberField
							label="Superficie total (hectáreas)"
							min={0.01}
							step="any"
							placeholder="Si la conoces"
							bind:value={form.areaHa}
						/>
						<label
							>Agua potable<select bind:value={form.water}
								><option value="sin-datos">No lo sé</option><option value="si">Sí</option><option
									value="no">No</option
								></select
							></label
						>
						<label
							>Baños<select bind:value={form.toilets}
								><option value="sin-datos">No lo sé</option><option value="si"
									>Sí, incluso sencillos</option
								><option value="no">No</option><option value="en-construccion"
									>En construcción</option
								></select
							></label
						>
						<label class="span-2"
							>Contacto comercial del lugar (opcional)<input
								maxlength="600"
								bind:value={form.contact}
								placeholder="Web, correo, teléfono del encargado…"
							/><span class="hint"
								>Se revisa antes de publicarlo. No incluyas teléfonos de participantes o dirigentes
								como contactos del camping.</span
							></label
						>
					</div>
				</fieldset>{/if}
			{#if form.type === 'visita'}<fieldset class="form-section" disabled={saving}>
					<legend>La visita o campamento</legend>
					<div class="form-grid">
						<label
							>Fecha o año conocido<input
								required
								maxlength="10"
								bind:value={form.visitDate}
								placeholder="2026, 2026-01 o 2026-01-15"
								pattern="[0-9]{4}(-[0-9]{2}(-[0-9]{2})?)?"
							/><span class="hint">Puedes indicar solo el año si no recuerdas la fecha.</span
							></label
						>
						<label
							>Estado<select bind:value={form.visitStatus}
								><option value="realizado">Campamento realizado</option><option value="exploracion"
									>Visita exploratoria</option
								><option value="planificado">Campamento planificado</option><option
									value="cancelado">Cancelado</option
								><option value="por-confirmar">Realización por confirmar</option></select
							></label
						>
						<NumberField
							label="Personas que asistieron"
							placeholder="Opcional"
							bind:value={form.people}
						/>
						<label class="check"
							><input type="checkbox" bind:checked={form.shareVisit} />Compartir esta experiencia
							con otros grupos</label
						>
					</div>
					<p class="hint">
						Si no marcas compartir, la visita queda como nota interna para los responsables del
						catálogo.
					</p>
				</fieldset>{/if}
			<fieldset class="form-section" disabled={saving}>
				<legend
					>{form.type === 'texto' ? 'La publicación o el dato' : 'Descripción y fuente'}</legend
				>
				<div class="form-grid">
					<label class="span-2"
						>{form.type === 'texto'
							? 'Pega el texto de la publicación'
							: 'Qué información quieres agregar o corregir?'}<textarea
							required
							maxlength="12000"
							bind:value={form.content}
							placeholder={form.type === 'visita'
								? 'Qué servicios había, cómo fue el acceso y qué conviene saber para volver.'
								: form.type === 'texto'
									? 'Pega aquí la descripción. Conservaremos el texto como aporte privado para revisarlo.'
									: 'Describe el lugar o el cambio, y cómo obtuviste la información.'}
						></textarea></label
					>
					<label class="span-2"
						>Enlace de referencia o fotos (opcional)<input
							type="url"
							maxlength="1500"
							bind:value={form.sourceUrl}
							placeholder="https://…"
						/><span class="hint"
							>Puede ser una publicación, álbum o ubicación. Los grupos privados pueden requerir
							acceso; pegar un enlace no extrae automáticamente su contenido.</span
						></label
					>
				</div>
			</fieldset>
			<fieldset class="form-section" disabled={saving}>
				<legend>Quién aporta</legend>
				<div class="form-grid">
					<label
						>Tu nombre<input
							required
							minlength="2"
							maxlength="100"
							autocomplete="name"
							bind:value={form.contributor}
						/></label
					><label
						>Grupo scout<input
							maxlength="150"
							bind:value={form.group}
							required={form.type === 'visita'}
						/></label
					><label class="span-2"
						>Correo para consultas<input
							type="email"
							required
							maxlength="200"
							autocomplete="email"
							bind:value={form.email}
						/><span class="hint">Solo para revisión del aporte. No se muestra en el catálogo.</span
						></label
					>
				</div>
			</fieldset>
			<label class="honeypot" aria-hidden="true"
				>Dejar vacío<input
					tabindex="-1"
					autocomplete="off"
					bind:value={form.website}
					disabled={saving}
				/></label
			>
			<label class="check"
				><input type="checkbox" required bind:checked={form.permission} disabled={saving} />Tengo
				autorización para compartir estos datos. Entiendo que se revisarán antes de publicarse.</label
			>
			{#if error}<p class="notice error" role="alert">{error}</p>{/if}
			<div class="actions" style="margin-top:24px">
				<button class="primary" type="submit" disabled={!ready || saving}
					><Send size={17} aria-hidden="true" />{saving
						? 'Enviando…'
						: 'Enviar para revisión'}</button
				><button type="button" on:click={saveDraft} disabled={saving}>Guardar borrador</button>
			</div>
			{#if draftInfo}<p class="hint" role="status">{draftInfo}</p>{/if}
			<p class="hint">
				El borrador se guarda en este navegador durante siete días. Solo “Enviar para revisión” lo
				entrega a los responsables del catálogo.
			</p>
		</form>
		<noscript
			><p class="notice">Activa JavaScript para completar y enviar el formulario.</p></noscript
		>
	{/if}
</div>
