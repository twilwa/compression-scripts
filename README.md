# compression-scripts
random utilities i write/use to fill in the gap between "thing i know" and "thing i need to know to do the thing"

this branch contains me simulating the knowledge I don't have that i'd need to build a frontend with Sveltekit, Bun, and Skeleton UI (and probably shadcn/ui)

this branch leverages weaviate's [Verba](https://github.com/weaviate/Verba) as an easy-to-use RAG ingestion utility.

Verba's ingest from github utility is used to grab the docs for sveltekit from https://github.com/sveltejs/kit/tree/main/documentation/docs , which is already formatted into markdown so there was no need to download it locally.

Currently, the Bun documentation largely can't be ingested due to a missing element error, I suspect there's some starter tokens that are throwing things off but i'll use unstructured.io to clean that up later and update it here.

the technical documentation from the libraries/software I'll use on the project is ingested into Verba, then verba is used as part of the "copilot stack" for my project -- i usually build one for every project I work on.

the 'newrender.cjs' file was used to convert the +page.svelte files in skeletonUI's docs folder to markdown, as they weren't formatted for ingestion into Verba. You could adapt this script to the filetype of your choice if the project's documentation page is open source.

Hopefully you find some of this material useful!