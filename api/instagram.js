export default async (req, res) => {
  const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
  const INSTAGRAM_GRAPH_API_BASE_URL = 'https://graph.instagram.com/';
  const limit = parseInt(req.query.limit, 10) || 6;

  if (!INSTAGRAM_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Missing Instagram access token.' });
  }

  try {
    // Get user ID
    const userRes = await fetch(`${INSTAGRAM_GRAPH_API_BASE_URL}/me?access_token=${INSTAGRAM_ACCESS_TOKEN}`);
    const userData = await userRes.json();
    if (!userData.id) throw new Error('Failed to fetch Instagram user ID.');

    // Get post IDs
    const postsRes = await fetch(`${INSTAGRAM_GRAPH_API_BASE_URL}/${userData.id}/media?access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${limit}`);
    const postsData = await postsRes.json();
    if (!postsData.data) throw new Error('Failed to fetch Instagram posts.');

    // Get details for each post
    const details = await Promise.all(
      postsData.data.map(async (post) => {
        const detailRes = await fetch(`${INSTAGRAM_GRAPH_API_BASE_URL}/${post.id}?access_token=${INSTAGRAM_ACCESS_TOKEN}&fields=permalink,thumbnail_url,media_url,media_type`);
        const detailData = await detailRes.json();
        let imageUrl = detailData.media_url;
        if (detailData.media_type === 'VIDEO' && detailData.thumbnail_url) {
          imageUrl = detailData.thumbnail_url;
        }
        return {
          id: post.id,
          permalink: detailData.permalink,
          imageUrl,
          mediaType: detailData.media_type,
        };
      })
    );

    res.status(200).json(details.filter(d => d.imageUrl && d.permalink));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
