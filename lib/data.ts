export type Dimension = "active" | "calm" | "nurturer" | "driven" | "sweet" | "health";

export interface QuizOption {
    label: string;
    subDescription: string;
    scores: Dimension;
}

export interface QuizQuestion {
    question: string;
    subText: string;
    options: QuizOption[];
}

export interface Persona {
    id: string;
    dimension: Dimension;
    name: string;
    tagline: string;
    products: { name: string; reason: string }[];
    recipe: string;
    recipeDescription: string;
    recipeTags: string[];
    sweetMessage: string;
}

export const questions: QuizQuestion[] = [
    {
        question: "What's Mom's morning like?",
        subText: "Pick the one that sounds most like her",
        options: [
            { label: "Up early, exercises", subDescription: "Yoga, walks, or gym", scores: "active" },
            { label: "Quiet tea & reading", subDescription: "She loves her calm mornings", scores: "calm" },
            { label: "Straight to cooking", subDescription: "Breakfast is her love language", scores: "nurturer" },
            { label: "Meetings before 8am", subDescription: "Always on the move", scores: "driven" },
        ],
    },
    {
        question: "What does she reach for when she's stressed?",
        subText: "We all have our go-to comfort",
        options: [
            { label: "Something sweet", subDescription: "Chocolates, mithai, dessert", scores: "sweet" },
            { label: "A healthy snack", subDescription: "She watches what she eats", scores: "health" },
            { label: "Chai or coffee", subDescription: "The classic reset button", scores: "calm" },
            { label: "A warm home meal", subDescription: "Food fixes everything", scores: "nurturer" },
        ],
    },
    {
        question: "How does she spend Sunday afternoons?",
        subText: "Her ideal unwind",
        options: [
            { label: "Gardening or cooking", subDescription: "Hands busy, mind at peace", scores: "nurturer" },
            { label: "Series or movies", subDescription: "Couch queen mode on", scores: "calm" },
            { label: "Out for a walk or sport", subDescription: "Can't sit still for long", scores: "active" },
            { label: "Catching up with family", subDescription: "Social butterfly at heart", scores: "driven" },
        ],
    },
    {
        question: "Pick a dish she'd be proud to make",
        subText: "Her cooking style reveals a lot",
        options: [
            { label: "Paneer butter masala", subDescription: "Rich, comforting, classic", scores: "nurturer" },
            { label: "Fruit smoothie bowl", subDescription: "Nutritious and beautiful", scores: "health" },
            { label: "A layered dessert", subDescription: "She loves to impress", scores: "sweet" },
            { label: "Quick wraps & bowls", subDescription: "Fast, balanced, practical", scores: "driven" },
        ],
    },
    {
        question: "What does she value most?",
        subText: "At the heart of it all",
        options: [
            { label: "Staying strong & fit", subDescription: "Health is her wealth", scores: "active" },
            { label: "Family happiness", subDescription: "Everything is for them", scores: "nurturer" },
            { label: "Moments of joy", subDescription: "Life's little pleasures", scores: "sweet" },
            { label: "Balanced living", subDescription: "Wellness inside and out", scores: "health" },
        ],
    },
];

export const personas: Record<string, Persona> = {
    active: {
        id: "active",
        dimension: "active",
        name: "The Wellness Warrior",
        tagline: "Strong, disciplined, and full of energy — she inspires everyone around her.",
        products: [
            { name: "Milk", reason: "High protein start" },
            { name: "Curd", reason: "Probiotic power" },
            { name: "Yogurt", reason: "Post-workout fuel" },
        ],
        recipe: "High-Protein Yogurt Parfait",
        recipeDescription:
            "Layer Milky Mist Greek Yogurt with honey, mixed berries, and a handful of nuts. Ready in 5 minutes — as efficient as she is.",
        recipeTags: ["5 min", "High protein", "No cook"],
        sweetMessage: "You make strength look effortless, Amma.",
    },
    calm: {
        id: "calm",
        dimension: "calm",
        name: "The Serene Soul",
        tagline: "Unhurried, wise, and deeply comforting — she is the calm in every storm.",
        products: [
            { name: "Milk", reason: "Warm comfort" },
            { name: "Ghee", reason: "Golden warmth" },
            { name: "Curd", reason: "Cooling balance" },
        ],
        recipe: "Golden Milk with Ghee",
        recipeDescription:
            "Warm Milky Mist full cream milk with a spoon of pure ghee, turmeric, and a pinch of cardamom. The oldest hug in a mug.",
        recipeTags: ["10 min", "Immunity boost", "Calming"],
        sweetMessage: "Your peace is our home's heartbeat.",
    },
    nurturer: {
        id: "nurturer",
        dimension: "nurturer",
        name: "The Heartful Cook",
        tagline: "Food is her love language — every meal she makes carries a piece of her heart.",
        products: [
            { name: "Paneer", reason: "Kitchen staple" },
            { name: "Ghee", reason: "Secret ingredient" },
            { name: "Curd", reason: "Marinade magic" },
        ],
        recipe: "Ghee-Roasted Paneer Tikka",
        recipeDescription:
            "Cube Milky Mist paneer, marinate in curd, spices, and a drizzle of ghee. Roast until golden. A dish as warm and generous as she is.",
        recipeTags: ["30 min", "High protein", "Family favourite"],
        sweetMessage: "Every meal you make tastes like home.",
    },
    driven: {
        id: "driven",
        dimension: "driven",
        name: "The Go-Getter Mom",
        tagline: "Ambitious, multi-tasking, and unstoppable — she makes everything look easy.",
        products: [
            { name: "Yogurt", reason: "On-the-go protein" },
            { name: "Paneer", reason: "Quick meal base" },
            { name: "Milk", reason: "Daily essential" },
        ],
        recipe: "5-Minute Paneer & Veggie Wrap",
        recipeDescription:
            "Crumble Milky Mist paneer into a wholewheat wrap with cucumber, mint chutney, and a dollop of yogurt. Fuel that matches her pace.",
        recipeTags: ["5 min", "Balanced", "Meal-prep friendly"],
        sweetMessage: "Supermom isn't a title — it's you, always.",
    },
    sweet: {
        id: "sweet",
        dimension: "sweet",
        name: "The Joy Maker",
        tagline:
            "Life's sweetest moments are made sweeter by her — she finds happiness in the little things.",
        products: [
            { name: "Milk", reason: "Sweet base" },
            { name: "Ghee", reason: "Rich indulgence" },
            { name: "Yogurt", reason: "Creamy delight" },
        ],
        recipe: "Creamy Shrikhand",
        recipeDescription:
            "Hang Milky Mist curd overnight, whisk with sugar, saffron, and cardamom. A traditional dessert as joyful and indulgent as she is.",
        recipeTags: ["Easy", "Festive", "No bake"],
        sweetMessage: "You are the sweetest part of every day.",
    },
    health: {
        id: "health",
        dimension: "health",
        name: "The Mindful Nurturer",
        tagline:
            "Thoughtful, intentional, and always reading labels — her family eats well because of her.",
        products: [
            { name: "Yogurt", reason: "Probiotic daily" },
            { name: "Curd", reason: "Gut health hero" },
            { name: "Milk", reason: "Calcium rich" },
        ],
        recipe: "Curd Rice with Tadka",
        recipeDescription:
            "Mix Milky Mist curd into warm cooked rice. Temper mustard seeds, curry leaves, and green chilli in a teaspoon of ghee. Pour and serve.",
        recipeTags: ["15 min", "Probiotic", "Gut-friendly"],
        sweetMessage: "You keep us healthy with so much love.",
    },
};

export function computePersona(answers: Dimension[]): Persona {
    const scores: Record<Dimension, number> = {
        active: 0,
        calm: 0,
        nurturer: 0,
        driven: 0,
        sweet: 0,
        health: 0,
    };

    for (const answer of answers) {
        scores[answer]++;
    }

    let maxDimension: Dimension = "nurturer";
    let maxScore = 0;

    for (const [dimension, score] of Object.entries(scores) as [Dimension, number][]) {
        if (score > maxScore) {
            maxScore = score;
            maxDimension = dimension;
        }
    }

    return personas[maxDimension];
}
