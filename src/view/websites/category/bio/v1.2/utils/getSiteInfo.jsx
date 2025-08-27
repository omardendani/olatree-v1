export function getSiteInfo(siteUrl) {
  try {
    const urlObj = new URL(siteUrl);

    // hostname : ex. "www.github.com"
    let host = urlObj.hostname;

    // retirer "www."
    if (host.startsWith("www.")) {
      host = host.substring(4);
    }

    // prendre seulement la partie avant le premier point → "github"
    let title = host.split(".")[0];

    // première lettre en majuscule
    title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

    return {
      siteName: urlObj.hostname, // ex: github.com
      favicon: `https://www.google.com/s2/favicons?sz=64&domain=${urlObj.hostname}`,
      title // ex: Github
    };
  } catch (err) {
    console.error("Invalid URL:", err);
    return null;
  }
}
