// src/routes/sitemap.txt/+server.ts

export const prerender = true;

export const GET = () => {
	const robotsTxt = `
	https://colormap.app
	`;
	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
