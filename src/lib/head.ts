// ─── The head, described once ────────────────────────────────────────────────
// src/components/Seo.tsx applies these to the live DOM; scripts/prerender.mjs
// serialises the same list into static HTML. Adding a tag here reaches both.

import { DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_LOCALE, SITE_NAME, absoluteUrl } from './site';
import type { RouteMeta } from './site';
import { breadcrumbList, graph, webPage } from './schema';
import { pageJsonLd } from './pageSchema';
import type { JsonLd } from './schema';

export interface HeadTag {
  kind: 'meta-name' | 'meta-property' | 'link';
  /** name= / property= / rel= */
  key: string;
  /** content= / href= */
  value: string;
}

const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export function headTags(route: RouteMeta): HeadTag[] {
  const url = absoluteUrl(route.path);
  const image = route.image ?? DEFAULT_OG_IMAGE;
  const imageAlt = route.imageAlt ?? `${SITE_NAME} — ${route.title}`;

  const tags: (HeadTag | null)[] = [
    { kind: 'meta-name', key: 'title', value: route.title },
    { kind: 'meta-name', key: 'description', value: route.description },
    { kind: 'meta-name', key: 'keywords', value: route.keywords ?? DEFAULT_KEYWORDS },
    { kind: 'meta-name', key: 'robots', value: route.noindex ? 'noindex, follow' : ROBOTS_INDEX },
    { kind: 'link', key: 'canonical', value: url },

    { kind: 'meta-property', key: 'og:type', value: route.ogType ?? 'website' },
    { kind: 'meta-property', key: 'og:site_name', value: SITE_NAME },
    { kind: 'meta-property', key: 'og:url', value: url },
    { kind: 'meta-property', key: 'og:title', value: route.title },
    { kind: 'meta-property', key: 'og:description', value: route.description },
    { kind: 'meta-property', key: 'og:image', value: image },
    { kind: 'meta-property', key: 'og:image:type', value: 'image/png' },
    { kind: 'meta-property', key: 'og:image:width', value: '1200' },
    { kind: 'meta-property', key: 'og:image:height', value: '630' },
    { kind: 'meta-property', key: 'og:image:alt', value: imageAlt },
    { kind: 'meta-property', key: 'og:locale', value: SITE_LOCALE },

    { kind: 'meta-name', key: 'twitter:card', value: 'summary_large_image' },
    { kind: 'meta-name', key: 'twitter:url', value: url },
    { kind: 'meta-name', key: 'twitter:title', value: route.title },
    { kind: 'meta-name', key: 'twitter:description', value: route.description },
    { kind: 'meta-name', key: 'twitter:image', value: image },
    { kind: 'meta-name', key: 'twitter:image:alt', value: imageAlt },
  ];

  return tags.filter((t): t is HeadTag => t !== null);
}

/** The @graph for one route: WebPage, its breadcrumb trail, then page nodes. */
export function headGraph(route: RouteMeta, extra: JsonLd[] = []): JsonLd {
  return graph([
    webPage({
      path: route.path,
      title: route.title,
      description: route.description,
      breadcrumb: route.breadcrumb,
    }),
    ...(route.breadcrumb?.length ? [breadcrumbList(route.path, route.breadcrumb)] : []),
    ...pageJsonLd(route.path),
    ...extra,
  ]);
}
