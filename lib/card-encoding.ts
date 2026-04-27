/**
 * Encode persona ID and mom's name into a URL-safe string.
 * Format: base64url(personaId:momName)
 */
export function encodeCardData(personaId: string, momName: string): string {
    const data = `${personaId}:${momName}`;
    if (typeof window !== "undefined") {
        return btoa(unescape(encodeURIComponent(data)))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }
    return Buffer.from(data, "utf-8")
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

/**
 * Decode the card hash back into persona ID and mom's name.
 */
export function decodeCardData(hash: string): { personaId: string; momName: string } | null {
    try {
        const base64 = hash.replace(/-/g, "+").replace(/_/g, "/");
        let decoded: string;
        if (typeof window !== "undefined") {
            decoded = decodeURIComponent(escape(atob(base64)));
        } else {
            decoded = Buffer.from(base64, "base64").toString("utf-8");
        }
        const colonIndex = decoded.indexOf(":");
        if (colonIndex === -1) return null;
        const personaId = decoded.substring(0, colonIndex);
        const momName = decoded.substring(colonIndex + 1);
        if (!personaId || !momName) return null;
        return { personaId, momName };
    } catch {
        return null;
    }
}
