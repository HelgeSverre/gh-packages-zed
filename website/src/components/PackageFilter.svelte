<script lang="ts">
    import MiniSearch from 'minisearch';

    interface ExtensionMeta {
        id: string | null;
        name: string | null;
        description: string | null;
        version: string | null;
        schema_version: number | null;
        authors: string[];
        repository: string | null;
        snippets: string | null;
        sections: string[];
        categories: string[];
    }

    interface Package {
        name: string;
        url: string;
        description: string;
        stars: number;
        forks?: number;
        language?: string | null;
        license?: string | null;
        topics: string[];
        pushed_at: string;
        discovered_at: string;
        extension: ExtensionMeta;
    }

    interface Props {
        packages: Package[];
    }

    let {packages}: Props = $props();

    let sort = $state('discovered');
    let search = $state('');
    let debouncedSearch = $state('');
    let selectedCategories = $state<Set<string>>(new Set());

    // Slideout state
    let activeSlug: string | null = $state(null);
    let readmeHtml: string | null = $state(null);
    let readmeLoading = $state(false);
    let readmeError: string | null = $state(null);

    const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
    const readmeCache = new Map<string, string | null>();

    const CATEGORY_LABEL: Record<string, string> = {
        'theme': 'Theme',
        'icon-theme': 'Icon Theme',
        'grammar': 'Grammar',
        'language-server': 'LSP',
        'slash-command': 'Slash Cmd',
        'context-server': 'MCP Server',
        'agent-server': 'Agent Server',
        'debug-adapter': 'Debug',
        'docs-provider': 'Docs',
        'snippets': 'Snippets',
    };

    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const nowMs = Date.now();

    // Search matches name + description only. Category is a separate filter.
    const miniSearch = $derived.by(() => {
        const ms = new MiniSearch<Package>({
            idField: 'name',
            fields: ['displayName', 'repoName', 'description'],
            storeFields: ['stars', 'pushed_at'],
            extractField: (doc, field) => {
                const d = doc as any;
                if (field === 'displayName') return d.extension?.name || '';
                if (field === 'repoName') return d.name || '';
                if (field === 'description') return d.extension?.description || d.description || '';
                return d[field] ?? '';
            },
            searchOptions: {
                prefix: true,
                fuzzy: 0.2,
                boost: {displayName: 3, repoName: 2},
                combineWith: 'AND',
                boostDocument: (_id, _term, stored) => {
                    const stars = (stored?.stars as number) ?? 0;
                    const pushedAt = stored?.pushed_at as string | undefined;
                    const starBoost = Math.log10(1 + stars) * 0.5;
                    const ageMs = pushedAt
                        ? nowMs - new Date(pushedAt).getTime()
                        : ONE_YEAR_MS;
                    const recencyBoost = Math.max(0, 1 - ageMs / ONE_YEAR_MS) * 0.3;
                    return 1 + starBoost + recencyBoost;
                },
            },
        });
        ms.addAll(packages);
        return ms;
    });

    // Category counts across the full dataset (for the toggle bar labels)
    const categoryCounts = $derived.by(() => {
        const counts: Record<string, number> = {};
        for (const pkg of packages) {
            for (const c of (pkg.extension?.categories || [])) {
                counts[c] = (counts[c] || 0) + 1;
            }
        }
        return counts;
    });

    // Stable display order for the toggle bar
    const CATEGORY_ORDER = [
        'theme',
        'icon-theme',
        'language-server',
        'grammar',
        'snippets',
        'slash-command',
        'context-server',
        'agent-server',
        'debug-adapter',
        'docs-provider',
    ];

    function toggleCategory(cat: string) {
        const next = new Set(selectedCategories);
        if (next.has(cat)) next.delete(cat);
        else next.add(cat);
        selectedCategories = next;
    }

    function clearCategories() {
        selectedCategories = new Set();
    }

    function matchesCategories(pkg: Package): boolean {
        if (selectedCategories.size === 0) return true;
        const cats = pkg.extension?.categories || [];
        for (const c of cats) {
            if (selectedCategories.has(c)) return true;
        }
        return false;
    }

    const byName = $derived(new Map(packages.map((p) => [p.name, p])));

    let activePackage: Package | null = $derived(
        activeSlug ? byName.get(activeSlug) ?? null : null,
    );

    function packageHref(name: string): string {
        return `${BASE}/package/${name}/`;
    }

    function zedExtensionHref(pkg: Package): string {
        return pkg.extension?.id
            ? `https://zed.dev/extensions/${pkg.extension.id}`
            : 'https://zed.dev/extensions';
    }

    async function loadReadme(slug: string): Promise<string | null> {
        if (readmeCache.has(slug)) return readmeCache.get(slug) ?? null;
        const res = await fetch(packageHref(slug));
        if (!res.ok) {
            readmeCache.set(slug, null);
            return null;
        }
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const article = doc.querySelector('.readme-prose');
        const inner = article ? article.innerHTML : null;
        readmeCache.set(slug, inner);
        return inner;
    }

    async function openSlideout(slug: string, pushState = true) {
        activeSlug = slug;
        readmeError = null;
        const cached = readmeCache.get(slug);
        readmeHtml = cached ?? null;
        readmeLoading = cached === undefined;

        if (pushState) history.pushState({slug}, '', packageHref(slug));

        if (typeof document !== 'undefined') {
            const body = document.querySelector('.slideout-body');
            if (body) body.scrollTop = 0;
        }

        if (cached === undefined) {
            try {
                const html = await loadReadme(slug);
                if (activeSlug !== slug) return;
                readmeHtml = html;
            } catch (e) {
                if (activeSlug !== slug) return;
                readmeError = (e as Error).message;
            } finally {
                if (activeSlug === slug) readmeLoading = false;
            }
        }
    }

    function closeSlideout(pushState = true) {
        activeSlug = null;
        readmeHtml = null;
        readmeLoading = false;
        readmeError = null;
        if (pushState) history.pushState(null, '', BASE || '/');
    }

    function handleCardClick(e: MouseEvent, name: string) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        openSlideout(name);
    }

    $effect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape' && activeSlug) closeSlideout();
        }
        function onPop(e: PopStateEvent) {
            const state = e.state as {slug?: string} | null;
            if (state?.slug) openSlideout(state.slug, false);
            else closeSlideout(false);
        }
        window.addEventListener('keydown', onKey);
        window.addEventListener('popstate', onPop);

        const prefix = `${BASE}/package/`;
        if (location.pathname.startsWith(prefix)) {
            const slug = location.pathname.slice(prefix.length).replace(/\/$/, '');
            if (slug) {
                history.replaceState({slug}, '', location.pathname);
                openSlideout(slug, false);
            }
        }

        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('popstate', onPop);
        };
    });

    $effect(() => {
        if (typeof document === 'undefined') return;
        document.body.classList.toggle('no-scroll', !!activeSlug);
        return () => document.body.classList.remove('no-scroll');
    });

    let debounceTimer: ReturnType<typeof setTimeout> | undefined;
    $effect(() => {
        const value = search;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            debouncedSearch = value;
        }, 90);
        return () => clearTimeout(debounceTimer);
    });

    function timeAgo(dateString: string): string {
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
        return date.toLocaleDateString();
    }

    let filtered = $derived.by(() => {
        const query = debouncedSearch.trim();
        let result: Package[];

        if (query) {
            const hits = miniSearch.search(query);
            result = hits
                .map((h) => byName.get(h.id as string))
                .filter((p): p is Package => !!p && matchesCategories(p));
            if (sort === 'discovered' || sort === 'stars' || sort === 'updated' || sort === 'name') {
                result = sortList(result, sort);
            }
        } else {
            result = sortList(packages.filter(matchesCategories), sort);
        }

        return result;
    });

    function sortList(list: Package[], by: string): Package[] {
        return list.sort((a, b) => {
            switch (by) {
                case 'stars':
                    return b.stars - a.stars;
                case 'updated':
                    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'discovered':
                default:
                    return new Date(b.discovered_at).getTime() - new Date(a.discovered_at).getTime();
            }
        });
    }
</script>

<section class="relative -mt-12 mb-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
                class="rounded-lg p-4 sm:p-5"
                style="background:var(--zed-surface);border:1px solid var(--zed-border);box-shadow:0 18px 48px -38px rgba(27,30,35,0.45);"
        >
            <div class="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
                <label class="block">
                    <span class="text-xs uppercase font-mono" style="color:var(--zed-muted);">Search extensions</span>
                    <span class="mt-2 flex items-center gap-3 rounded-md px-3 py-2.5"
                          style="background:var(--zed-paper);border:1px solid var(--zed-border);">
                        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.8"
                             stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"
                             style="color:var(--zed-blue-deep);">
                            <circle cx="11" cy="11" r="7"></circle>
                            <path d="m20 20-3.5-3.5"></path>
                        </svg>
                        <input
                                type="text"
                                bind:value={search}
                                placeholder="Search by name, repo, or description"
                                class="cmd-input flex-1 min-w-0 text-sm"
                                aria-label="Search extensions by name or description"
                        />
                    </span>
                </label>

                <label class="block min-w-48">
                    <span class="text-xs uppercase font-mono" style="color:var(--zed-muted);">Sort by</span>
                    <select bind:value={sort}
                            class="zed-select mt-2 w-full rounded-md px-3 py-2.5 text-sm"
                            aria-label="Sort order">
                        <option value="discovered">recently added</option>
                        <option value="updated">recently updated</option>
                        <option value="stars">stars</option>
                        <option value="name">name</option>
                    </select>
                </label>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-2">
                <span class="text-xs uppercase font-mono mr-1"
                      style="color:var(--zed-muted);">Type</span>
        <button type="button"
                onclick={clearCategories}
                class="cat-toggle"
                class:active={selectedCategories.size === 0}
                aria-pressed={selectedCategories.size === 0}>
            All
            <span class="cat-toggle-count">{packages.length}</span>
        </button>
        {#each CATEGORY_ORDER as cat}
            {#if categoryCounts[cat]}
                <button type="button"
                        onclick={() => toggleCategory(cat)}
                        class="cat-toggle"
                        class:active={selectedCategories.has(cat)}
                        data-cat={cat}
                        aria-pressed={selectedCategories.has(cat)}>
                    {CATEGORY_LABEL[cat] || cat}
                    <span class="cat-toggle-count">{categoryCounts[cat]}</span>
                </button>
            {/if}
        {/each}
            </div>
        </div>
    </div>
</section>

<main class="flex-1 max-w-7xl mx-auto w-full px-4 pb-8 sm:px-6 lg:px-8">
    <div class="mb-4 flex items-center justify-between gap-3 text-sm font-mono"
         style="color:var(--zed-muted);">
        <span>{filtered.length} extensions</span>
        <span>{selectedCategories.size ? `${selectedCategories.size} filter${selectedCategories.size === 1 ? '' : 's'} active` : 'All types'}</span>
    </div>
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {#each filtered as pkg (pkg.name)}
            <a
                    href={packageHref(pkg.name)}
                    onclick={(e) => handleCardClick(e, pkg.name)}
                    class="zed-card group flex min-h-52 flex-col p-4 rounded-lg transition-all overflow-hidden"
                    style="background:var(--zed-surface);border:1px solid var(--zed-border);"
            >
                <div class="flex items-start justify-between gap-2">
                    <h2
                            class="font-semibold transition truncate text-base zed-card-title"
                            style="color:var(--zed-text);"
                    >
                        {pkg.extension?.name || pkg.name.split('/')[1]}
                    </h2>
                    <span
                            class="flex items-center gap-1 text-sm whitespace-nowrap"
                            style="color:var(--zed-text-muted);"
                    >
                        <svg class="w-4 h-4" style="color:var(--zed-blue);" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        {pkg.stars}
                    </span>
                </div>
                <div class="font-mono text-xs truncate mb-1" style="color:var(--zed-muted);">
                    {pkg.name}
                </div>
                <p class="text-sm line-clamp-2 flex-1"
                   style="color:var(--zed-text-muted);">
                    {#if pkg.extension?.description}
                        {pkg.extension.description}
                    {:else if pkg.description}
                        {pkg.description}
                    {:else}
                        <span class="italic" style="color:var(--zed-muted);">No description</span>
                    {/if}
                </p>
                <div class="mt-3 flex flex-wrap items-center gap-1.5">
                    {#if pkg.extension?.version}
                        <span class="version-pill">v{pkg.extension.version}</span>
                    {/if}
                    {#each (pkg.extension?.categories || []).slice(0, 3) as cat}
                        <span class="cat-badge" data-cat={cat}>{CATEGORY_LABEL[cat] || cat}</span>
                    {/each}
                </div>
                <div class="mt-3 text-xs" style="color:var(--zed-muted);">
                    Updated {timeAgo(pkg.pushed_at)}
                </div>
            </a>
        {/each}
    </div>
</main>

<div
        class="slideout-backdrop"
        class:open={!!activeSlug}
        onclick={() => closeSlideout()}
        aria-hidden="true"
></div>

<div
        class="slideout"
        class:open={!!activeSlug}
        role="dialog"
        aria-modal="true"
        aria-label="Extension details"
>
    <header class="slideout-header">
        <div class="min-w-0 flex-1">
            {#if activePackage}
                <div class="font-mono text-xs truncate" style="color:var(--zed-muted);">
                    {activePackage.name}
                </div>
                <h2 class="font-bold truncate text-base sm:text-lg"
                    style="color:var(--zed-blue-deep);">
                    {activePackage.extension?.name || activePackage.name.split('/')[1]}
                </h2>
            {/if}
        </div>
        <div class="flex items-center gap-2 shrink-0">
            {#if activePackage}
                <a
                        href={zedExtensionHref(activePackage)}
                        target="_blank"
                        rel="noopener"
                        class="zed-btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium"
                >
                    zed.dev
                </a>
                <a
                        href={activePackage.url}
                        target="_blank"
                        rel="noopener"
                        class="zed-btn-ghost inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium"
                >
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </a>
            {/if}
            <button type="button" class="slideout-close" aria-label="Close"
                    onclick={() => closeSlideout()}>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
            </button>
        </div>
    </header>

    <div class="slideout-body" role="document">
        {#if activePackage}
            {#if activePackage.extension?.description || activePackage.description}
                <p class="text-pretty mb-4" style="color:var(--zed-text);">
                    {activePackage.extension?.description || activePackage.description}
                </p>
            {/if}
            <div class="flex flex-wrap items-center gap-2 mb-4">
                {#if activePackage.extension?.version}
                    <span class="version-pill">v{activePackage.extension.version}</span>
                {/if}
                {#each (activePackage.extension?.categories || []) as cat}
                    <span class="cat-badge" data-cat={cat}>{CATEGORY_LABEL[cat] || cat}</span>
                {/each}
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-1.5 text-sm mb-2"
                 style="color:var(--zed-text-muted);">
                <span class="inline-flex items-center gap-1">
                    <svg class="w-4 h-4" style="color:var(--zed-blue);" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {activePackage.stars.toLocaleString()}
                </span>
                {#if activePackage.language}<span>{activePackage.language}</span>{/if}
                {#if activePackage.license}<span>{activePackage.license}</span>{/if}
                <span>Updated {timeAgo(activePackage.pushed_at)}</span>
                {#if activePackage.extension?.schema_version}
                    <span>schema v{activePackage.extension.schema_version}</span>
                {/if}
            </div>
            {#if activePackage.extension?.authors && activePackage.extension.authors.length > 0}
                <div class="text-sm mb-4" style="color:var(--zed-text-muted);">
                    by {activePackage.extension.authors.map((a) => a.replace(/\s*<[^>]+>$/, '')).join(', ')}
                </div>
            {/if}
            {#if activePackage.topics && activePackage.topics.length > 0}
                <div class="flex flex-wrap gap-1.5 mb-6">
                    {#each activePackage.topics as topic}
                        <span class="px-2 py-0.5 text-xs rounded-full"
                              style="background:var(--zed-surface-soft);color:var(--zed-text-muted);border:1px solid var(--zed-border);">
                            {topic}
                        </span>
                    {/each}
                </div>
            {/if}
            {#if readmeLoading}
                <div class="slideout-skeleton" aria-label="Loading README">
                    <div class="slideout-skeleton-line long"></div>
                    <div class="slideout-skeleton-line medium"></div>
                    <div class="slideout-skeleton-line block"></div>
                    <div class="slideout-skeleton-line long"></div>
                    <div class="slideout-skeleton-line long"></div>
                    <div class="slideout-skeleton-line medium"></div>
                </div>
            {:else if readmeError}
                <div class="text-sm py-8 text-center" style="color:hsla(0, 78%, 70%, 1);">
                    {readmeError}
                </div>
            {:else if readmeHtml}
                <article class="prose readme-prose max-w-none">
                    {@html readmeHtml}
                </article>
            {:else}
                <div class="rounded-xl border border-dashed p-6 text-center text-sm"
                     style="border-color:var(--zed-border);color:var(--zed-text-muted);">
                    No README available for this extension.
                </div>
            {/if}
        {/if}
    </div>
</div>

<style>
    :global(.zed-card:hover) {
        border-color: var(--zed-border-strong) !important;
        background: var(--zed-paper) !important;
        transform: translateY(-1px);
    }
    :global(.zed-card:hover .zed-card-title) {
        color: var(--zed-blue-deep) !important;
    }
</style>
