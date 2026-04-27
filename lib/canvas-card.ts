import type { Persona } from "@/lib/data";

const C = {
    primary: "#C06030",
    bgWarm: "#FFF8F0",
    bgCard: "#FFFFFF",
    bgTint: "#FFF3EB",
    border: "#F0C8A0",
    textDark: "#2C1A0E",
    textMid: "#7A5540",
    textMuted: "#B07050",
};

const W = 960; // 480 * 2x
const PAD = 72;
const CONTENT_W = W - PAD * 2;

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth) {
            if (current) lines.push(current);
            current = word;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);
    return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function pillWidth(ctx: CanvasRenderingContext2D, text: string, font: string): number {
    ctx.font = font;
    return ctx.measureText(text).width + 28;
}

function drawPill(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, font: string, color: string, bg: string, borderColor: string): { w: number; h: number } {
    ctx.font = font;
    const pw = ctx.measureText(text).width + 28;
    const ph = 40;
    roundRect(ctx, x, y, pw, ph, ph / 2);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + 14, y + ph / 2 + 1);
    return { w: pw, h: ph };
}

/** Lay out pills in centered rows that wrap within maxWidth */
function drawCenteredPills(
    ctx: CanvasRenderingContext2D,
    texts: string[],
    startY: number,
    font: string,
    color: string,
    bg: string,
    borderColor: string,
    maxWidth: number,
    gap: number,
): number {
    // Break into rows
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentRowW = 0;

    for (const text of texts) {
        const pw = pillWidth(ctx, text, font);
        if (currentRow.length > 0 && currentRowW + gap + pw > maxWidth) {
            rows.push(currentRow);
            currentRow = [text];
            currentRowW = pw;
        } else {
            currentRow.push(text);
            currentRowW += (currentRow.length > 1 ? gap : 0) + pw;
        }
    }
    if (currentRow.length > 0) rows.push(currentRow);

    let y = startY;
    const pillH = 40;
    const rowGap = 10;

    for (const row of rows) {
        // Measure row width
        let rowW = 0;
        for (let i = 0; i < row.length; i++) {
            rowW += pillWidth(ctx, row[i], font);
            if (i < row.length - 1) rowW += gap;
        }
        // Center the row
        let x = (W - rowW) / 2;
        for (const text of row) {
            const { w } = drawPill(ctx, text, x, y, font, color, bg, borderColor);
            x += w + gap;
        }
        y += pillH + rowGap;
    }

    return y - rowGap; // return final y after last row (minus trailing gap)
}

export async function generateCardPNG(persona: Persona, momName: string): Promise<string> {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    const ctx = canvas.getContext("2d")!;

    // We'll draw in two passes: first measure height, then draw
    // For simplicity, estimate height then adjust
    let y = 0;

    // Helper to draw centered text and advance y
    const centerText = (text: string, font: string, color: string, maxW: number, lineH: number): number => {
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const lines = wrapText(ctx, text, maxW);
        let drawn = 0;
        for (const line of lines) {
            ctx.fillText(line, W / 2, y + lineH / 2);
            y += lineH;
            drawn += lineH;
        }
        return drawn;
    };

    const drawLine = (width: number, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(W / 2 - width / 2, y, width, 2);
        y += 2;
    };

    // First pass: calculate total height
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = W;
    tempCanvas.height = 4000;
    const tctx = tempCanvas.getContext("2d")!;

    // Estimate height by running layout
    let estY = 0;
    estY += 12; // top band
    estY += 80; // top padding
    estY += 60; // logo
    estY += 40; // gap
    estY += 20; // "HAPPY MOTHER'S DAY"
    estY += 16;
    estY += 60; // mom name
    estY += 32; // divider
    estY += 20; // "You are"
    estY += 16;

    tctx.font = "500 52px Georgia, serif";
    const nameLines = wrapText(tctx, persona.name, CONTENT_W);
    estY += nameLines.length * 60;
    estY += 16;

    tctx.font = "300 28px sans-serif";
    const tagLines = wrapText(tctx, persona.tagline, CONTENT_W - 40);
    estY += tagLines.length * 38;
    estY += 40; // divider
    estY += 20; // "YOUR MILKY MIST STAPLES"
    estY += 16;
    estY += 110; // product pills (2 rows possible)
    estY += 40; // gap
    estY += 20; // "A RECIPE JUST FOR YOU"
    estY += 16;
    estY += 44; // recipe name

    tctx.font = "300 26px sans-serif";
    const recipeLines = wrapText(tctx, persona.recipeDescription, CONTENT_W - 80);
    estY += recipeLines.length * 36;
    estY += 16;
    estY += 48; // recipe tags
    estY += 48; // gap
    estY += 4; // divider
    estY += 32;

    tctx.font = "italic 40px Georgia, serif";
    const msgLines = wrapText(tctx, `\u201C${persona.sweetMessage}\u201D`, CONTENT_W - 40);
    estY += msgLines.length * 52;
    estY += 24;
    estY += 30; // "With love"
    estY += 60; // bottom padding
    estY += 12; // bottom band

    canvas.height = estY + 40; // extra buffer

    // Fill background
    ctx.fillStyle = C.bgCard;
    ctx.fillRect(0, 0, W, canvas.height);

    // Top gradient band
    const topGrad = ctx.createLinearGradient(0, 0, W, 0);
    topGrad.addColorStop(0, C.primary + "99");
    topGrad.addColorStop(0.5, C.primary);
    topGrad.addColorStop(1, C.primary + "99");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, W, 12);
    y = 12;

    y += 60; // padding

    // Logo
    try {
        const logo = await loadImage("/images/logo.png");
        const logoW = 220;
        const logoH = (logo.height / logo.width) * logoW;
        ctx.drawImage(logo, W / 2 - logoW / 2, y, logoW, logoH);
        y += logoH + 36;
    } catch {
        y += 60;
    }

    // "HAPPY MOTHER'S DAY"
    ctx.font = "500 20px sans-serif";
    ctx.fillStyle = C.textMuted;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "4px";
    ctx.fillText("HAPPY MOTHER\u2019S DAY", W / 2, y);
    ctx.letterSpacing = "0px";
    y += 36;

    // Mom name
    ctx.font = "italic 72px Georgia, serif";
    ctx.fillStyle = C.primary;
    const momLines = wrapText(ctx, momName, CONTENT_W);
    for (const line of momLines) {
        ctx.fillText(line, W / 2, y + 36);
        y += 76;
    }
    y += 8;

    // Divider line
    drawLine(96, C.border);
    y += 28;

    // "YOU ARE"
    ctx.font = "500 20px sans-serif";
    ctx.fillStyle = C.textMuted;
    ctx.letterSpacing = "3px";
    ctx.fillText("YOU ARE", W / 2, y);
    ctx.letterSpacing = "0px";
    y += 32;

    // Persona name
    ctx.font = "500 52px Georgia, serif";
    ctx.fillStyle = C.textDark;
    const pNameLines = wrapText(ctx, persona.name, CONTENT_W);
    for (const line of pNameLines) {
        ctx.fillText(line, W / 2, y + 26);
        y += 60;
    }
    y += 8;

    // Tagline
    ctx.font = "300 28px sans-serif";
    ctx.fillStyle = C.textMid;
    const tLines = wrapText(ctx, persona.tagline, CONTENT_W - 40);
    for (const line of tLines) {
        ctx.fillText(line, W / 2, y + 19);
        y += 38;
    }
    y += 24;

    // Dot divider
    ctx.fillStyle = C.border + "80";
    ctx.fillRect(PAD, y, CONTENT_W * 0.4, 1);
    ctx.fillRect(W - PAD - CONTENT_W * 0.4, y, CONTENT_W * 0.4, 1);
    ctx.beginPath();
    ctx.arc(W / 2, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = C.primary + "66";
    ctx.fill();
    y += 28;

    // "YOUR MILKY MIST STAPLES"
    ctx.font = "500 20px sans-serif";
    ctx.fillStyle = C.textMuted;
    ctx.letterSpacing = "3px";
    ctx.fillText("YOUR MILKY MIST STAPLES", W / 2, y);
    ctx.letterSpacing = "0px";
    y += 36;

    // Product pills — centered rows with wrapping
    const pillTexts = persona.products.map(p => `${p.name}  \u00B7  ${p.reason}`);
    y = drawCenteredPills(ctx, pillTexts, y, "400 24px sans-serif", C.textDark, C.bgWarm, C.border, CONTENT_W, 10);
    y += 24;

    // Recipe section (tinted bg)
    const recipeBoxY = y;
    ctx.font = "300 26px sans-serif";
    const rDescLines = wrapText(ctx, persona.recipeDescription, CONTENT_W - 80);
    const recipeBoxH = 32 + 24 + 44 + 12 + rDescLines.length * 36 + 16 + 48 + 32;

    roundRect(ctx, PAD, recipeBoxY, CONTENT_W, recipeBoxH, 24);
    ctx.fillStyle = C.bgTint;
    ctx.fill();

    y = recipeBoxY + 32;
    ctx.textAlign = "center";

    ctx.font = "500 20px sans-serif";
    ctx.fillStyle = C.textMuted;
    ctx.letterSpacing = "3px";
    ctx.fillText("A RECIPE JUST FOR YOU", W / 2, y);
    ctx.letterSpacing = "0px";
    y += 36;

    ctx.font = "500 36px Georgia, serif";
    ctx.fillStyle = C.textDark;
    ctx.fillText(persona.recipe, W / 2, y + 4);
    y += 44;

    ctx.font = "300 26px sans-serif";
    ctx.fillStyle = C.textMid;
    for (const line of rDescLines) {
        ctx.fillText(line, W / 2, y + 18);
        y += 36;
    }
    y += 12;

    // Recipe tags — centered rows with wrapping
    y = drawCenteredPills(ctx, persona.recipeTags, y, "500 22px sans-serif", C.primary, C.bgCard, C.border + "80", CONTENT_W - 40, 8);
    y = recipeBoxY + recipeBoxH + 36;

    // Sweet message divider
    ctx.textAlign = "center";
    drawLine(64, C.border);
    y += 28;

    // Sweet message
    ctx.font = "italic 40px Georgia, serif";
    ctx.fillStyle = C.textDark;
    const sweetLines = wrapText(ctx, `\u201C${persona.sweetMessage}\u201D`, CONTENT_W - 40);
    for (const line of sweetLines) {
        ctx.fillText(line, W / 2, y + 26);
        y += 52;
    }
    y += 16;

    // "With love"
    ctx.font = "300 24px sans-serif";
    ctx.fillStyle = C.textMuted;
    ctx.fillText("With love, from your family", W / 2, y);
    y += 48;

    // Bottom gradient band
    const botGrad = ctx.createLinearGradient(0, 0, W, 0);
    botGrad.addColorStop(0, C.primary + "99");
    botGrad.addColorStop(0.5, C.primary);
    botGrad.addColorStop(1, C.primary + "99");
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, y, W, 12);

    // Trim canvas to actual content
    const finalH = y + 12;
    const trimmed = document.createElement("canvas");
    trimmed.width = W;
    trimmed.height = finalH;
    const tctx2 = trimmed.getContext("2d")!;
    tctx2.drawImage(canvas, 0, 0);

    return trimmed.toDataURL("image/png");
}
