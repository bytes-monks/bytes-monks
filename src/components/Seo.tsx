import { useLayoutEffect } from 'react';
import { HAND_FONT_HREF, getRouteMeta } from '../lib/site';
import { headGraph, headTags } from '../lib/head';
import type { HeadTag } from '../lib/head';
import type { JsonLd } from '../lib/schema';

const MANAGED = 'data-seo';

function selectorFor(tag: HeadTag): string {
  if (tag.kind === 'link') return `link[rel="${tag.key}"]`;
  const attr = tag.kind === 'meta-name' ? 'name' : 'property';
  return `meta[${attr}="${tag.key}"]`;
}

/** Reuse the tag already in the document — prerendered or left by the previous
 *  route — instead of stacking a second copy of it. */
function apply(tag: HeadTag) {
  const h = document.head;
  let el = h.querySelector<HTMLElement>(selectorFor(tag));
  if (!el) {
    el = document.createElement(tag.kind === 'link' ? 'link' : 'meta');
    if (tag.kind === 'link') el.setAttribute('rel', tag.key);
    else el.setAttribute(tag.kind === 'meta-name' ? 'name' : 'property', tag.key);
    el.setAttribute(MANAGED, '');
    h.appendChild(el);
  }
  el.setAttribute(tag.kind === 'link' ? 'href' : 'content', tag.value);
}

export interface SeoProps {
  /** Route path used to look up the manifest entry in src/lib/site.ts. */
  path: string;
  /** Extra JSON-LD beyond what src/lib/pageSchema.ts declares for this route.
   *  Prefer adding nodes there — the prerender only reads that module. */
  jsonLd?: JsonLd[];
}

/**
 * Imperative head manager. React 19 can hoist <title>/<meta> rendered from a
 * component, but it appends rather than replacing what index.html already
 * ships, which leaves two <title> tags after every client-side navigation.
 * Writing to the head directly keeps exactly one of each tag on every route.
 */
export default function Seo({ path, jsonLd }: SeoProps) {
  const route = getRouteMeta(path);
  const tags = headTags(route);
  const ldJson = JSON.stringify(headGraph(route, jsonLd));

  useLayoutEffect(() => {
    document.title = route.title;
    tags.forEach(apply);

    // The handwriting face is a separate request loaded only where .hand is
    // rendered. It is never removed once fetched — a later route dropping it
    // would only cause a reflow for no saving.
    if (route.hand && !document.head.querySelector('link[data-font-hand]')) {
      const font = document.createElement('link');
      font.rel = 'stylesheet';
      font.href = HAND_FONT_HREF;
      font.setAttribute('data-font-hand', '');
      document.head.appendChild(font);
    }

    // Client-side navigation reuses the head the previous route left behind.
    // Anything managed (data-seo) that this route does not declare has to go,
    // or a page inherits the last one's og:image, keywords, and so on.
    const declared = new Set(tags.map(selectorFor));
    document.head.querySelectorAll<HTMLElement>(`meta[${MANAGED}], link[${MANAGED}]`).forEach((el) => {
      if (el.tagName === 'LINK' && el.getAttribute('rel') === 'modulepreload') return;
      const rel = el.getAttribute('rel');
      const key =
        el.tagName === 'LINK'
          ? `link[rel="${rel}"]`
          : el.hasAttribute('name')
            ? `meta[name="${el.getAttribute('name')}"]`
            : `meta[property="${el.getAttribute('property')}"]`;
      if (!declared.has(key)) el.remove();
    });

    // Page-level JSON-LD is replaced wholesale on every route change; the
    // site-wide graph in index.html carries no data-seo and is left alone.
    document.head
      .querySelectorAll(`script[type="application/ld+json"][${MANAGED}]`)
      .forEach((n) => n.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(MANAGED, '');
    script.textContent = ldJson;
    document.head.appendChild(script);

    return () => script.remove();
    // `tags` is derived from route + ldJson; both are covered by the deps below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.title, route.hand, ldJson]);

  return null;
}
