---
title: initial product specs for synaptic project
---

## about
these are initial required product specs for the `synaptic-upgrade` project on the website. this project adds a sanskrit reader and discovery platform to the website.

## build elements
1. foundation - panini's ashtadhyayi and the dhatus of dhatupatha.
2. extension 1 - from each dhatu to the words that form from it, guna and vriddhi. 
3. extension 2 - adding dictionary layers, apte and monier-williams.
4. extension 3 - adding puranic encyclopedia and vedic concordance
5. extension 4 - add rigveda
6. extension 6 - add ramayana
7. extension 7 - add mahabharata

## global rules
1. do not create new classes. use existing classes from sass files in `/src/lib/styles/system`
2. use only single-tab indented sass for styling
3. for pages, each page uses standard layout:
```svelte
<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte'
	import Crumb from '$lib/comps/breadcrumbs.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import { DEFAULT_IMAGE, SITE_URL, organizationJsonLd, stringifyJsonLd, websiteJsonLd } from '$lib/utils/seo';

	//use Head and the imports from utils/seo like they are used on other pages
</script>
<Container>
	<section class="wrapper-std">
		<!--use this component like its used on other pages-->
		<Crumb>

		<!--add all page content here-->
	</section>
</Container>
```
4. maintain all your notes, dev notes, comments, questions and answers received to them at `/sitemaster/synaptic-dev-notes.md`
5. maintain a `/sitemaster/synaptic-readme.md` as a complete developer guide for the setup. update it after each change.

## foundation
- ability to see any rule from ashtadhyayi
- complete dhatus ui and data
- paginated lists
- navigation, dynamic subrouting
- for ashtatdhayi, reference site - https://ashtadhyayi.com/. 
- for dhatus, reference site - https://sanskritdictionary.com/roots.php
- refer images in `/static/images/sitemaster` - list-ashtadhyayi, ashtadhyayi-item, list-dhatus, list-dhatu-words, list-dhatu-word-meanings.
- routing should be inside `/src/routes/library/sections` as `/src/routes/library/sections/ashtadhyayi` and `/src/routes/library/sections/dhatus` 

## development phase 1
- implement the foundation level features
- identify the sources of data in the reference sites - use same, or discuss alternates.

## extension 1
- incorporate the apte and monier-williams sanskrit to english dictionaries with universal word-list.
- replicate the view of words from dhatu, and then meaning of any word, that exists at https://sanskritdictionary.com/roots.php, with reference images at `/static/images/sitemaster` - list-dhatus, list-dhatu-words, list-dhatu-word-meanings.

## development phase 2
- implement all features of extension 1.