<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { SvelteSet } from 'svelte/reactivity';
	import type { HeaderProps, MenuItem } from '$lib/types/general.types';
	import MainLogo from '$components/atoms/MainLogo.svelte';

	let { menu = [] }: HeaderProps = $props();

	let mobileMenuOpen = $state<boolean>(false);

	const activeMenus = new SvelteSet<string>();
	const mobileActiveMenus = new SvelteSet<string>();

	// Génère un ID unique
	function getMenuId(item: MenuItem, index: number, parentId: string = ''): string {
		return `${parentId}-${index}-${item.label}`.replace(/\s+/g, '-').toLowerCase();
	}

	// Si on ouvre un menu, on ferme les autres menus de même niveau.
	function toggleExclusive(set: SvelteSet<string>, id: string, parentId: string = ''): void {
		if (set.has(id)) {
			set.delete(id);
		} else {
			// Optionnel : Pour fermer SEULEMENT les frères (et garder les parents ouverts)
			// On itère et on supprime ceux qui partagent le même préfixe de parenté
			for (const activeId of set) {
				if (activeId.startsWith(parentId)) {
					set.delete(activeId);
				}
			}
			set.add(id);
		}
	}

	// Desktop
	function toggleDesktopMenu(id: string, parentId: string = ''): void {
		toggleExclusive(activeMenus, id, parentId);
	}

	// Mobile
	function toggleMobileMenu(id: string, parentId: string = ''): void {
		toggleExclusive(mobileActiveMenus, id, parentId);
	}

	// Ferme tout
	function closeAll(): void {
		activeMenus.clear();
		mobileActiveMenus.clear();
		mobileMenuOpen = false;
	}

	const isParentActive = (item: MenuItem, index: number, parentId: string = '') =>
		activeMenus.has(getMenuId(item, index, parentId));

	const isMobileParentActive = (item: MenuItem, index: number, parentId: string = '') =>
		mobileActiveMenus.has(getMenuId(item, index, parentId));
</script>

<svelte:window
	onclick={() => {
		if (!mobileMenuOpen && activeMenus.size > 0) {
			activeMenus.clear();
		}
	}}
/>

<header class="site-header">
	<div class="header-container">
		<MainLogo onClickAction={closeAll} />

		<nav class="desktop-nav" aria-label="Navigation principale">
			<ul class="nav-list">
				{#each menu as item, index (getMenuId(item, index))}
					<li class="nav-item" class:has-children={item.sub_menu && item.sub_menu.length > 0}>
						{#if item.sub_menu && item.sub_menu.length > 0}
							<button
								class="nav-link"
								class:active={isParentActive(item, index)}
								onclick={(e) => {
									e.stopPropagation();
									toggleDesktopMenu(getMenuId(item, index));
								}}
								aria-expanded={isParentActive(item, index)}
							>
								{item.label}
								<svg
									class="chevron"
									viewBox="0 0 24 24"
									width="16"
									height="16"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M6 9l6 6 6-6" />
								</svg>
							</button>

							{#if isParentActive(item, index)}
								<div class="dropdown-panel" transition:slide={{ duration: 250, easing: quintOut }}>
									<div class="dropdown-content">
										<p class="dropdown-description">{item.description}</p>
										<ul class="sub-nav-list">
											{#each item.sub_menu as subItem, subIndex (getMenuId(subItem, subIndex, getMenuId(item, index)))}
												<li
													class="sub-nav-item"
													class:has-children={subItem.sub_menu && subItem.sub_menu.length > 0}
												>
													{#if subItem.sub_menu && subItem.sub_menu.length > 0}
														<button
															class="sub-nav-link"
															class:active={isParentActive(
																subItem,
																subIndex,
																getMenuId(item, index)
															)}
															onclick={(e) => {
																e.stopPropagation();
																toggleDesktopMenu(
																	getMenuId(subItem, subIndex, getMenuId(item, index))
																);
															}}
															aria-expanded={isParentActive(
																subItem,
																subIndex,
																getMenuId(item, index)
															)}
														>
															<span class="sub-label">{subItem.label}</span>
															<svg
																class="chevron-small"
																viewBox="0 0 24 24"
																width="14"
																height="14"
																fill="none"
																stroke="currentColor"
																stroke-width="2"
															>
																<path d="M9 18l6-6-6-6" />
															</svg>
														</button>

														{#if isParentActive(subItem, subIndex, getMenuId(item, index))}
															<div
																class="nested-panel"
																transition:slide={{ duration: 200, easing: quintOut }}
															>
																<p class="nested-description">{subItem.description}</p>
																<ul class="nested-nav-list">
																	{#each subItem.sub_menu as nestedItem, nestedIndex (getMenuId(nestedItem, nestedIndex, getMenuId(subItem, subIndex)))}
																		<li class="nested-nav-item">
																			<a
																				href={nestedItem.link}
																				class="nested-nav-link"
																				onclick={closeAll}
																			>
																				<span class="nested-bullet">◆</span>
																				<div class="nested-content">
																					<span class="nested-label">{nestedItem.label}</span>
																					{#if nestedItem.description}
																						<span class="nested-desc">{nestedItem.description}</span
																						>
																					{/if}
																				</div>
																			</a>
																		</li>
																	{/each}
																</ul>
															</div>
														{/if}
													{:else}
														<a href={subItem.link} class="sub-nav-link simple" onclick={closeAll}>
															<span class="sub-label">{subItem.label}</span>
															{#if subItem.description}
																<span class="sub-desc">{subItem.description}</span>
															{/if}
														</a>
													{/if}
												</li>
											{/each}
										</ul>
									</div>
								</div>
							{/if}
						{:else}
							<a href={item.link} class="nav-link" onclick={closeAll}>
								{item.label}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>

		<div class="header-actions">
			<button class="icon-btn user-btn" aria-label="Compte utilisateur">
				<svg
					viewBox="0 0 24 24"
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
				</svg>
			</button>
			<button class="icon-btn settings-btn" aria-label="Paramètres">
				<svg
					viewBox="0 0 24 24"
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="12" cy="12" r="3" />
					<path
						d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24M6.34 6.34L2.1 2.1m17.8 17.8l-4.24-4.24M6.34 17.66l-4.24 4.24M23 12h-6m-6 0H1"
					/>
				</svg>
			</button>
		</div>

		<button
			class="hamburger"
			class:open={mobileMenuOpen}
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
			aria-expanded={mobileMenuOpen}
		>
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
		</button>
	</div>

	{#if mobileMenuOpen}
		<div class="mobile-menu" transition:slide={{ duration: 300, easing: quintOut }}>
			<div class="mobile-menu-inner">
				<nav class="mobile-nav" aria-label="Navigation mobile">
					<ul class="mobile-nav-list">
						{#each menu as item, index (getMenuId(item, index))}
							<li
								class="mobile-nav-item"
								class:has-children={item.sub_menu && item.sub_menu.length > 0}
							>
								{#if item.sub_menu && item.sub_menu.length > 0}
									<button
										class="mobile-nav-link"
										class:active={isMobileParentActive(item, index)}
										onclick={() => toggleMobileMenu(getMenuId(item, index))}
										aria-expanded={isMobileParentActive(item, index)}
									>
										<span class="mobile-link-text">
											<span class="mobile-link-label">{item.label}</span>
											{#if item.description}<span class="mobile-link-desc">{item.description}</span
												>{/if}
										</span>
										<svg
											class="mobile-chevron"
											viewBox="0 0 24 24"
											width="20"
											height="20"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<path d="M6 9l6 6 6-6" />
										</svg>
									</button>

									{#if isMobileParentActive(item, index)}
										<div
											class="mobile-dropdown"
											transition:slide={{ duration: 250, easing: quintOut }}
										>
											<ul class="mobile-sub-list">
												{#each item.sub_menu as subItem, subIndex (getMenuId(subItem, subIndex, getMenuId(item, index)))}
													<li
														class="mobile-sub-item"
														class:has-children={subItem.sub_menu && subItem.sub_menu.length > 0}
													>
														{#if subItem.sub_menu && subItem.sub_menu.length > 0}
															<button
																class="mobile-sub-link"
																class:active={isMobileParentActive(
																	subItem,
																	subIndex,
																	getMenuId(item, index)
																)}
																onclick={() =>
																	toggleMobileMenu(
																		getMenuId(subItem, subIndex, getMenuId(item, index))
																	)}
																aria-expanded={isMobileParentActive(
																	subItem,
																	subIndex,
																	getMenuId(item, index)
																)}
															>
																<span class="mobile-sub-label">{subItem.label}</span>
																<svg
																	class="mobile-chevron-small"
																	viewBox="0 0 24 24"
																	width="16"
																	height="16"
																	fill="none"
																	stroke="currentColor"
																	stroke-width="2"
																>
																	<path d="M9 18l6-6-6-6" />
																</svg>
															</button>

															{#if isMobileParentActive(subItem, subIndex, getMenuId(item, index))}
																<div
																	class="mobile-nested"
																	transition:slide={{ duration: 200, easing: quintOut }}
																>
																	<ul class="mobile-nested-list">
																		{#each subItem.sub_menu as nestedItem, nestedIndex (getMenuId(nestedItem, nestedIndex, getMenuId(subItem, subIndex)))}
																			<li class="mobile-nested-item">
																				<a
																					href={nestedItem.link}
																					class="mobile-nested-link"
																					onclick={closeAll}
																				>
																					<span class="mobile-nested-bullet">◆</span>
																					<span class="mobile-nested-label">{nestedItem.label}</span
																					>
																				</a>
																			</li>
																		{/each}
																	</ul>
																</div>
															{/if}
														{:else}
															<a
																href={subItem.link}
																class="mobile-sub-link simple"
																onclick={closeAll}
															>
																<span class="mobile-sub-label">{subItem.label}</span>
																{#if subItem.description}<span class="mobile-sub-desc"
																		>{subItem.description}</span
																	>{/if}
															</a>
														{/if}
													</li>
												{/each}
											</ul>
										</div>
									{/if}
								{:else}
									<a href={item.link} class="mobile-nav-link simple" onclick={closeAll}>
										<span class="mobile-link-label">{item.label}</span>
										{#if item.description}<span class="mobile-link-desc">{item.description}</span
											>{/if}
									</a>
								{/if}
							</li>
						{/each}
					</ul>
				</nav>

				<button class="mobile-close-btn" onclick={closeAll}>
					<span>Fermer le menu</span>
					<svg
						viewBox="0 0 24 24"
						width="20"
						height="20"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	{/if}
</header>

<style>
	.site-header {
		width: var(--full-width);
		height: var(--header-height);
		position: sticky;
		top: 0;
		z-index: 1000;
		background: var(--back-yellow-gray);
		border-bottom: 1px solid var(--back-dark);
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
	}

	.header-container {
		max-width: var(--max-width);
		margin: 0 auto;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		position: relative;
	}

	/* Navigation Desktop */
	.desktop-nav {
		display: flex;
		align-items: center;
	}

	.nav-list {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 0.25rem;
	}

	.nav-item {
		position: relative;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.6rem 1rem;
		color: var(--color-text);
		text-decoration: none;
		font-size: var(--text-size);
		font-weight: var(--title-weight);
		border-radius: 8px;
		transition: all 0.2s ease;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--primary-color);
		scale: 1.05;
	}

	.chevron {
		transition: transform 0.25s ease;
	}

	.nav-link.active .chevron {
		transform: rotate(180deg);
	}

	/* Dropdown Panel */
	.dropdown-panel {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		min-width: 280px;
		background: white;
		border-radius: 12px;
		box-shadow:
			0 10px 40px rgba(0, 0, 0, 0.12),
			0 2px 8px rgba(0, 0, 0, 0.06);
		border: 1px solid var(--back-dark);
		overflow: hidden;
		z-index: 100;
	}

	.dropdown-content {
		padding: 1.25rem;
	}

	.dropdown-description {
		margin: 0 0 1rem 0;
		font-size: 0.8rem;
		color: var(--less-gray-text);
		font-style: italic;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--back-dark);
	}

	.sub-nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.sub-nav-item {
		position: relative;
	}

	.sub-nav-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.6rem 0.75rem;
		color: var(--color-text);
		text-decoration: none;
		font-size: 0.9rem;
		border-radius: 8px;
		transition: all 0.2s ease;
		background: none;
		border: none;
		cursor: pointer;
		width: 100%;
		text-align: left;
		font-family: inherit;
	}

	.sub-nav-link:hover,
	.sub-nav-link.active {
		background: var(--back-yellow-gray);
		color: var(--primary-color);
	}

	.sub-nav-link.simple {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.15rem;
	}

	.sub-label {
		font-weight: var(--title-weight);
	}

	.sub-desc {
		font-size: 0.75rem;
		color: var(--less-gray-text);
	}

	.chevron-small {
		transition: transform 0.25s ease;
		color: var(--less-gray-text);
	}

	.sub-nav-link.active .chevron-small {
		transform: rotate(90deg);
		color: var(--primary-color);
	}

	/* Nested Panel */
	.nested-panel {
		margin-top: 0.25rem;
		margin-left: 0.5rem;
		padding-left: 0.75rem;
		border-left: 2px solid var(--back-dark);
	}

	.nested-description {
		margin: 0 0 0.5rem 0;
		font-size: 0.75rem;
		color: var(--less-gray-text);
		font-style: italic;
	}

	.nested-nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.nested-nav-link {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		color: var(--color-text);
		text-decoration: none;
		font-size: 0.85rem;
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.nested-nav-link:hover {
		background: var(--back-yellow);
		color: var(--primary-color);
	}

	.nested-bullet {
		color: var(--tertiary-color);
		font-size: 0.6rem;
		margin-top: 0.2rem;
	}

	.nested-content {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.nested-label {
		font-weight: var(--title-weight);
	}

	.nested-desc {
		font-size: 0.75rem;
		color: var(--less-gray-text);
	}

	/* Header Actions */
	.header-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		border: none;
		background: transparent;
		color: var(--gray-text);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.icon-btn:hover {
		background: var(--back-dark);
		color: var(--primary-color);
		transform: rotate(15deg);
	}

	/* Hamburger */
	.hamburger {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 2.5rem;
		height: 2.5rem;
		background: none;
		border: none;
		cursor: pointer;
		gap: 5px;
		padding: 0;
		z-index: 101;
	}

	.hamburger-line {
		display: block;
		width: 24px;
		height: 2px;
		background: var(--dark-text);
		border-radius: 2px;
		transition: all 0.3s ease;
		transform-origin: center;
	}

	.hamburger.open .hamburger-line:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.hamburger.open .hamburger-line:nth-child(2) {
		opacity: 0;
		transform: scaleX(0);
	}

	.hamburger.open .hamburger-line:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Mobile Menu */
	.mobile-menu {
		position: fixed;
		top: var(--header-height);
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(250, 249, 244, 0.98);
		backdrop-filter: blur(10px);
		z-index: 99;
		overflow-y: auto;
		border-top: 1px solid var(--back-dark);
	}

	.mobile-menu-inner {
		max-width: 600px;
		margin: 0 auto;
		padding: 1.5rem;
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}

	.mobile-nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.mobile-nav-item {
		border-radius: 12px;
		overflow: hidden;
	}

	.mobile-nav-item.has-children {
		background: white;
		border: 1px solid var(--back-dark);
	}

	.mobile-nav-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1rem 1.25rem;
		color: var(--dark-text);
		text-decoration: none;
		font-size: var(--text-size);
		font-weight: var(--title-weight);
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: all 0.2s ease;
	}

	.mobile-nav-link.simple {
		background: white;
		border: 1px solid var(--back-dark);
		border-radius: 12px;
	}

	.mobile-nav-link:hover,
	.mobile-nav-link.active {
		color: var(--primary-color);
		background: var(--back-yellow);
	}

	.mobile-link-text {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.mobile-link-label {
		font-weight: var(--title-weight);
	}

	.mobile-link-desc {
		font-size: 0.8rem;
		color: var(--less-gray-text);
		font-weight: var(--text-weight);
	}

	.mobile-chevron {
		transition: transform 0.3s ease;
		color: var(--less-gray-text);
		flex-shrink: 0;
	}

	.mobile-nav-link.active .mobile-chevron {
		transform: rotate(180deg);
		color: var(--primary-color);
	}

	.mobile-dropdown {
		background: var(--back-yellow-gray);
		border-top: 1px solid var(--back-dark);
	}

	.mobile-sub-list {
		list-style: none;
		margin: 0;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.mobile-sub-item {
		border-radius: 8px;
		overflow: hidden;
	}

	.mobile-sub-item.has-children {
		background: white;
		border: 1px solid var(--back-dark);
	}

	.mobile-sub-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.75rem 1rem;
		color: var(--color-text);
		text-decoration: none;
		font-size: 0.9rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: all 0.2s ease;
	}

	.mobile-sub-link.simple {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.15rem;
		background: white;
		border: 1px solid var(--back-dark);
		border-radius: 8px;
	}

	.mobile-sub-link:hover,
	.mobile-sub-link.active {
		color: var(--primary-color);
		background: var(--back-yellow);
	}

	.mobile-sub-label {
		font-weight: var(--title-weight);
	}

	.mobile-sub-desc {
		font-size: 0.75rem;
		color: var(--less-gray-text);
	}

	.mobile-chevron-small {
		transition: transform 0.3s ease;
		color: var(--less-gray-text);
	}

	.mobile-sub-link.active .mobile-chevron-small {
		transform: rotate(90deg);
		color: var(--primary-color);
	}

	.mobile-nested {
		background: var(--back-yellow-gray);
		border-top: 1px solid var(--back-dark);
	}

	.mobile-nested-list {
		list-style: none;
		margin: 0;
		padding: 0.5rem 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.mobile-nested-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 0.75rem;
		color: var(--color-text);
		text-decoration: none;
		font-size: 0.85rem;
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.mobile-nested-link:hover {
		background: var(--back-yellow);
		color: var(--primary-color);
	}

	.mobile-nested-bullet {
		color: var(--tertiary-color);
		font-size: 0.6rem;
	}

	.mobile-nested-label {
		font-weight: var(--title-weight);
	}

	/* Bouton fermeture mobile */
	.mobile-close-btn {
		margin-top: auto;
		margin-bottom: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem;
		background: var(--back-dark);
		border: none;
		border-radius: 12px;
		color: var(--gray-text);
		font-size: var(--text-size);
		font-weight: var(--title-weight);
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: inherit;
	}

	.mobile-close-btn:hover {
		background: var(--back-more-dark);
		color: var(--dark-text);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.header-container {
			padding: 0 1rem;
		}

		.desktop-nav,
		.header-actions {
			display: none;
		}

		.hamburger {
			display: flex;
		}
	}

	@media (min-width: 769px) {
		.mobile-menu {
			display: none !important;
		}
	}

	/* Animations amusantes */
	@keyframes gentle-bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-3px);
		}
	}

	/* .logo:hover .logo-icon {
		animation: gentle-bounce 0.6s ease infinite;
	} */

	/* Scrollbar personnalisée pour mobile */
	.mobile-menu::-webkit-scrollbar {
		width: 6px;
	}

	.mobile-menu::-webkit-scrollbar-track {
		background: transparent;
	}

	.mobile-menu::-webkit-scrollbar-thumb {
		background: var(--back-dark);
		border-radius: 3px;
	}

	.mobile-menu::-webkit-scrollbar-thumb:hover {
		background: var(--less-gray-text);
	}
</style>
