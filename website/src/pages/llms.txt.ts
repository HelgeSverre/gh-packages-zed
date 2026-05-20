import type { APIRoute } from "astro";
import extensionsData from "../../../data/extensions.json";

interface ExtensionLite {
  name: string;
  description?: string | null;
  extension?: {
    name?: string | null;
    description?: string | null;
  };
}

function sanitize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export const GET: APIRoute = ({ site }) => {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const origin = site ? site.toString().replace(/\/$/, "") : "";
  const homepage = `${origin}${base}/`;

  const packages = (Object.values(extensionsData) as ExtensionLite[])
    .slice()
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  const lines: string[] = [];
  lines.push("# Zed Extension Safari");
  lines.push("");
  lines.push(
    "> Discover fresh Zed editor extensions, themes and language packs that are actively maintained but haven't gone viral yet. Updated every 6 hours.",
  );
  lines.push("");
  lines.push(
    `This index lists ${packages.length} Zed editor extensions discovered on GitHub. Each package page links to the GitHub repository and embeds the project's README. Data refreshes every 6 hours.`,
  );
  lines.push("");
  lines.push("## Site");
  lines.push("");
  lines.push(
    `- [Homepage](${homepage}): Browse, search, and filter all ${packages.length} packages`,
  );
  lines.push("");
  lines.push("## Packages");
  lines.push("");
  for (const pkg of packages) {
    const label = sanitize(pkg.extension?.name || pkg.name);
    const desc = sanitize(pkg.description || pkg.extension?.description || "");
    const url = `${origin}${base}/package/${pkg.name}/`;
    lines.push(`- [${label}](${url})${desc ? `: ${desc}` : ""}`);
  }
  lines.push("");
  lines.push("## Optional");
  lines.push("");
  lines.push(
    "- [Source repository](https://github.com/HelgeSverre/gh-packages-zed): Crawler and site source",
  );
  lines.push(
    "- [Report a missing extension](https://github.com/HelgeSverre/gh-packages-zed/issues/new?template=missing-extension.yml): Submit packages not yet indexed",
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
