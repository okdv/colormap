// src/routes/robots.txt/+server.ts

export const prerender = true;

export const GET = () => {
	const robotsTxt = `
User-agent: *
Allow: /
Sitemap: https://colormap.app/sitemap.txt
	`;
	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
