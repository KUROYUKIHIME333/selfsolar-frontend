<script lang="ts">
	import type { FooterNavItem, FooterProps } from '$lib/types/general.types';
    import { MAIN_NAME } from '$lib/utils/textConstantes';

	let {
		brandName = MAIN_NAME,
		tagline = 'Precision meets personality.',
		copyright = '2024 The Crafted Calculator',
		links = [
			{ label: 'Documentation', href: '/docs' },
			{ label: 'Safety Standards', href: '/safety' },
			{ label: 'Support', href: '/support' },
			{ label: 'Privacy Policy', href: '/privacy' }
		],
		footerNav = [],
		showBackToTop = true
	}: FooterProps = $props();

	function scrollToTop(): void {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// Génère un ID unique pour chaque item de navigation
	function getNavId(item: FooterNavItem, index: number, parentId: string = ''): string {
		return `${parentId}-${index}-${item.label}`.replace(/\s+/g, '-').toLowerCase();
	}

	// Détermine si un item possède des sous-menus
	function hasSubMenu(item: FooterNavItem): boolean {
		return Array.isArray(item.sub_menu) && item.sub_menu.length > 0;
	}
</script>

<footer class="site-footer">
	<div class="footer-container">
		<!-- Section principale -->
		<div class="footer-main">
			<!-- Brand -->
			<div class="footer-brand">
				<a href="/" class="footer-logo">
					<span class="footer-logo-icon">✦</span>
					<span class="footer-logo-text">{brandName}</span>
				</a>
				<p class="footer-tagline">{tagline}</p>

				<!-- Social links décoratifs -->
				<div class="footer-social">
					<a href="#" class="social-link" aria-label="GitHub">
						<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
					</a>
					<a href="#" class="social-link" aria-label="Twitter">
						<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
							<path
								d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
							/>
						</svg>
					</a>
					<a href="#" class="social-link" aria-label="LinkedIn">
						<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
							<path
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Navigation imbriquée avec keys -->
			{#if footerNav.length > 0}
				<nav class="footer-nav" aria-label="Navigation footer">
					<ul class="footer-nav-columns">
						{#each footerNav as navItem, navIndex (getNavId(navItem, navIndex))}
							<li class="footer-nav-column">
								{#if hasSubMenu(navItem)}
									<div class="footer-nav-group">
										<span class="footer-nav-heading">{navItem.label}</span>
										{#if navItem.description}
											<span class="footer-nav-desc">{navItem.description}</span>
										{/if}
										<ul class="footer-sub-list">
											{#each navItem.sub_menu as subItem, subIndex (getNavId(subItem, subIndex, getNavId(navItem, navIndex)))}
												<li class="footer-sub-item">
													{#if hasSubMenu(subItem)}
														<div class="footer-nested-group">
															<span class="footer-nested-heading">{subItem.label}</span>
															{#if subItem.description}
																<span class="footer-nested-desc">{subItem.description}</span>
															{/if}
															<ul class="footer-nested-list">
																{#each subItem.sub_menu as nestedItem, nestedIndex (getNavId(nestedItem, nestedIndex, getNavId(subItem, subIndex)))}
																	<li class="footer-nested-item">
																		<a href={nestedItem.link} class="footer-nested-link">
																			<span class="nested-bullet">◆</span>
																			<span class="nested-label">{nestedItem.label}</span>
																		</a>
																		{#if nestedItem.description}
																			<span class="nested-desc">{nestedItem.description}</span>
																		{/if}
																	</li>
																{/each}
															</ul>
														</div>
													{:else}
														<a href={subItem.link} class="footer-sub-link">
															<span class="sub-label">{subItem.label}</span>
														</a>
														{#if subItem.description}
															<span class="sub-desc">{subItem.description}</span>
														{/if}
													{/if}
												</li>
											{/each}
										</ul>
									</div>
								{:else}
									<a href={navItem.link} class="footer-nav-heading-link">
										{navItem.label}
									</a>
									{#if navItem.description}
										<span class="footer-nav-desc">{navItem.description}</span>
									{/if}
								{/if}
							</li>
						{/each}
					</ul>
				</nav>
			{:else}
				<!-- Fallback: liens simples avec keys -->
				<nav class="footer-nav" aria-label="Navigation footer">
					<ul class="footer-links">
						{#each links as link, linkIndex (link.href + '-' + linkIndex)}
							<li class="footer-link-item">
								<a href={link.href} class="footer-link">
									<span class="link-dot">◆</span>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			{/if}
		</div>

		<!-- Divider avec animation -->
		<div class="footer-divider">
			<span class="divider-icon">✦</span>
		</div>

		<!-- Bottom bar -->
		<div class="footer-bottom">
			<p class="copyright">© {copyright}</p>

			{#if showBackToTop}
				<button class="back-to-top" onclick={scrollToTop} aria-label="Retour en haut">
					<span class="back-to-top-text">Haut</span>
					<svg
						class="back-to-top-icon"
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M18 15l-6-6-6 6" />
					</svg>
				</button>
			{/if}
		</div>
	</div>
</footer>

<style>
	.site-footer {
        width: var(--full-width);
		background: var(--back-yellow-gray);
		border-top: 1px solid var(--back-dark);
		padding: 3rem 0 1.5rem;
		margin-top: auto;
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
	}

	.footer-container {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0 2rem;
	}

	.footer-main {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 3rem;
		margin-bottom: 2rem;
	}

	/* Brand Section */
	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex-shrink: 0;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--marron-text);
		font-weight: var(--big-title-weight);
		font-size: var(--title-size);
		transition: transform 0.2s ease;
	}

	.footer-logo:hover {
		transform: translateX(3px);
	}

	.footer-logo-icon {
		color: var(--primary-color);
		font-size: 1.1rem;
		transition: transform 0.3s ease;
	}

	.footer-logo:hover .footer-logo-icon {
		transform: rotate(180deg);
	}

	.footer-tagline {
		margin: 0;
		font-size: var(--small-text-size);
		color: var(--less-gray-text);
		font-style: italic;
		font-weight: var(--text-weight);
	}

	/* Social Links */
	.footer-social {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 50%;
		background: var(--back-dark);
		color: var(--gray-text);
		text-decoration: none;
		transition: all 0.25s ease;
	}

	.social-link:hover {
		background: var(--primary-color);
		color: white;
		transform: translateY(-3px) rotate(10deg);
		box-shadow: 0 4px 12px rgba(153, 79, 8, 0.3);
	}

	/* Navigation imbriquée */
	.footer-nav {
		flex: 1;
	}

	.footer-nav-columns {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: flex-end;
	}

	.footer-nav-column {
		min-width: 140px;
	}

	.footer-nav-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-nav-heading {
		font-weight: var(--title-weight);
		font-size: var(--text-size);
		color: var(--dark-text);
		margin-bottom: 0.25rem;
	}

	.footer-nav-heading-link {
		font-weight: var(--title-weight);
		font-size: var(--text-size);
		color: var(--dark-text);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.footer-nav-heading-link:hover {
		color: var(--primary-color);
	}

	.footer-nav-desc {
		font-size: 0.75rem;
		color: var(--less-gray-text);
		font-style: italic;
	}

	.footer-sub-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin-top: 0.5rem;
	}

	.footer-sub-item {
		display: flex;
		flex-direction: column;
	}

	.footer-sub-link {
		color: var(--gray-text);
		text-decoration: none;
		font-size: 0.85rem;
		transition: all 0.2s ease;
		padding: 0.15rem 0;
	}

	.footer-sub-link:hover {
		color: var(--primary-color);
		transform: translateX(3px);
	}

	.sub-desc {
		font-size: 0.75rem;
		color: var(--less-gray-text);
		margin-left: 0.5rem;
	}

	/* Niveau imbriqué */
	.footer-nested-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: 0.25rem;
		padding-left: 0.75rem;
		border-left: 2px solid var(--back-dark);
	}

	.footer-nested-heading {
		font-weight: var(--title-weight);
		font-size: 0.85rem;
		color: var(--color-text);
	}

	.footer-nested-desc {
		font-size: 0.75rem;
		color: var(--less-gray-text);
		font-style: italic;
	}

	.footer-nested-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		margin-top: 0.25rem;
	}

	.footer-nested-item {
		display: flex;
		flex-direction: column;
	}

	.footer-nested-link {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--gray-text);
		text-decoration: none;
		font-size: 0.8rem;
		transition: all 0.2s ease;
		padding: 0.1rem 0;
	}

	.footer-nested-link:hover {
		color: var(--primary-color);
	}

	.nested-bullet {
		color: var(--tertiary-color);
		font-size: 0.5rem;
	}

	.nested-label {
		font-weight: var(--text-weight);
	}

	.nested-desc {
		font-size: 0.7rem;
		color: var(--less-gray-text);
		margin-left: 0.85rem;
	}

	/* Fallback links simples */
	.footer-links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		justify-content: flex-end;
	}

	.footer-link-item {
		position: relative;
	}

	.footer-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--gray-text);
		text-decoration: none;
		font-size: var(--small-text-size);
		font-weight: var(--text-weight);
		transition: all 0.2s ease;
		padding: 0.25rem 0;
	}

	.link-dot {
		color: var(--tertiary-color);
		font-size: 0.5rem;
		opacity: 0;
		transform: translateX(-5px);
		transition: all 0.2s ease;
	}

	.footer-link:hover {
		color: var(--primary-color);
	}

	.footer-link:hover .link-dot {
		opacity: 1;
		transform: translateX(0);
	}

	/* Divider */
	.footer-divider {
		position: relative;
		text-align: center;
		margin: 1.5rem 0;
	}

	.footer-divider::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			var(--back-dark) 20%,
			var(--back-dark) 80%,
			transparent
		);
	}

	.divider-icon {
		position: relative;
		display: inline-block;
		padding: 0 1rem;
		background: var(--back-yellow-gray);
		color: var(--tertiary-color);
		font-size: 0.8rem;
		animation: gentle-spin 4s linear infinite;
	}

	@keyframes gentle-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Bottom Bar */
	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.5rem;
	}

	.copyright {
		margin: 0;
		font-size: 0.8rem;
		color: var(--less-gray-text);
		font-weight: var(--text-weight);
	}

	.back-to-top {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 1rem;
		background: var(--back-dark);
		border: none;
		border-radius: 20px;
		color: var(--gray-text);
		font-size: 0.8rem;
		font-weight: var(--title-weight);
		cursor: pointer;
		transition: all 0.25s ease;
		font-family: inherit;
	}

	.back-to-top:hover {
		background: var(--primary-color);
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(153, 79, 8, 0.25);
	}

	.back-to-top-icon {
		transition: transform 0.2s ease;
	}

	.back-to-top:hover .back-to-top-icon {
		transform: translateY(-2px);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.footer-container {
			padding: 0 1rem;
		}

		.footer-main {
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: 2rem;
		}

		.footer-brand {
			align-items: center;
		}

		.footer-nav-columns {
			justify-content: center;
			gap: 1.5rem;
		}

		.footer-nav-column {
			min-width: 120px;
		}

		.footer-links {
			justify-content: center;
			gap: 0.75rem 1.5rem;
		}

		.footer-bottom {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
	}

	/* Hover amusant sur le logo */
	@keyframes wiggle {
		0%,
		100% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(-5deg);
		}
		75% {
			transform: rotate(5deg);
		}
	}

	.footer-logo:active {
		animation: wiggle 0.3s ease;
	}
</style>
