import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import tagData from '$lib/serving/tag-index.json';

// Define the type based on your JSON structure
type TagName = keyof typeof tagData;
export const load: PageLoad = ({ params }) => {
    const { tag } = params;

    // Check if the tag exists in our index
    if (tag in tagData) {
        return {
            tagTitle: tag.replaceAll('-', ' '),
            // We cast here so the Svelte page knows exactly what it's getting
            articles: tagData[tag as TagName]
        };
    }

    // If tag doesn't exist, throw a 404
    throw error(404, {
        message: `Tag "${tag}" not found`
    });
};