/**
 * Share or copy text + URL.
 * Handles: Web Share API (mobile HTTPS), clipboard API (secure context), and textarea fallback (HTTP).
 */
export async function shareOrCopy(opts: {
    title: string;
    text: string;
    url: string;
}): Promise<"shared" | "copied" | "failed"> {
    // Try Web Share API first (mobile, HTTPS only)
    if (typeof navigator !== "undefined" && navigator.share && isSecureContext()) {
        try {
            await navigator.share({ title: opts.title, text: opts.text, url: opts.url });
            return "shared";
        } catch (err) {
            // User cancelled — don't fall through, just return
            if (err instanceof Error && err.name === "AbortError") return "failed";
            // Other error — try clipboard
        }
    }

    // Try clipboard API (requires secure context)
    const fullText = `${opts.text}\n${opts.url}`;
    if (typeof navigator !== "undefined" && navigator.clipboard && isSecureContext()) {
        try {
            await navigator.clipboard.writeText(fullText);
            return "copied";
        } catch {
            // Fall through to textarea fallback
        }
    }

    // Textarea fallback — works on HTTP
    try {
        const textarea = document.createElement("textarea");
        textarea.value = fullText;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, fullText.length);
        const success = document.execCommand("copy");
        document.body.removeChild(textarea);
        return success ? "copied" : "failed";
    } catch {
        return "failed";
    }
}

function isSecureContext(): boolean {
    if (typeof window === "undefined") return false;
    return window.isSecureContext ?? window.location.protocol === "https:";
}
