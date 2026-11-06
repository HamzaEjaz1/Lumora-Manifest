/* Editable homepage content. Prices, stories, voices, and feature copy live here. */

export const marketing = {
  badge: "Stories written from the life you describe",
  headline: ["Your next chapter", "starts with you."],
  subhead: "Personal audio stories about the life you want, narrated in your own voice.",
  getApp: "Get the app",
  howLink: "How it works",
  categories: ["Love Life", "Financial Freedom", "Family", "Career Era", "Health"],
  stories: [
    {
      id: "love",
      category: "Love Life",
      title: "The evening I stopped waiting",
      lines: [
        "Warm sunlight fills the room, and I feel completely at home.",
        "I set the table for two without rehearsing what I will say.",
        "Their laugh lands softly, and the future stops feeling far away.",
        "I stay. That is the whole story, and it is enough.",
      ],
    },
    {
      id: "money",
      category: "Financial Freedom",
      title: "A morning with the numbers settled",
      lines: [
        "The numbers settle, and I choose my morning without rushing.",
        "Coffee cools while I decide what the day is actually for.",
        "I pay the bill that used to sit in the back of my mind.",
        "Freedom, it turns out, sounds a lot like a quiet kitchen.",
      ],
    },
    {
      id: "family",
      category: "Family",
      title: "The kitchen that already knows us",
      lines: [
        "Laughter reaches the kitchen before I do, and I already belong.",
        "Someone saved me a chair without making a speech about it.",
        "The window is open, and the evening has nowhere else to be.",
        "I listen longer than I talk, and that feels like love.",
      ],
    },
    {
      id: "career",
      category: "Career Era",
      title: "The room I walked into ready",
      lines: [
        "I walk into the room already certain of the work I came to do.",
        "My name is on the work, and I do not shrink it to fit.",
        "The question they ask is one I have already lived inside.",
        "I leave with the next chapter still open, on purpose.",
      ],
    },
    {
      id: "health",
      category: "Health",
      title: "A body I trust again",
      lines: [
        "My breath is slow, and my body feels like a place I trust.",
        "I take the long way home because my legs want the light.",
        "Rest is on the calendar, the same way work used to be.",
        "I thank the day for being ordinary and kind.",
      ],
    },
  ],
  voices: [
    {
      id: "mine",
      name: "My voice 01",
      description: "A short recording you made yourself.",
    },
    {
      id: "emma",
      name: "Emma",
      description: "Warm, steady, and close.",
    },
    {
      id: "lauren",
      name: "Lauren",
      description: "Bright, with a little air in the pauses.",
    },
    {
      id: "henry",
      name: "Henry",
      description: "Low and unhurried.",
    },
    {
      id: "james",
      name: "James",
      description: "Clear, like someone reading across a table.",
    },
  ],
  steps: [
    {
      title: "Tell LUMORA Manifest about your world",
      body: "A guided set of questions covers the people, places, and details you want in the story.",
    },
    {
      title: "Dream freely",
      body: "Name the goals, the city, and the home you keep picturing. The chapter is written from that.",
    },
    {
      title: "Record your voice",
      body: "Read a short prompt. LUMORA Manifest can keep up to three recordings, and only after you agree.",
    },
    {
      title: "Listen, read, share",
      body: "Play the story, follow the lines on screen, save it, or turn a passage into a card.",
    },
  ],
  features: [
    {
      span: 4,
      wash: "a",
      title: "A chapter written for your life",
      body: "Love, money, family, work, or health. Each story starts from what you chose to share.",
      mock: "lines",
    },
    {
      span: 2,
      wash: "b",
      title: "The app, in your hand",
      body: "Home, player, and library live in one quiet screen.",
      mock: "phone",
    },
    {
      span: 2,
      wash: "c",
      title: "Listen or read",
      body: "The same chapter plays out loud, or sits on the page with the current line marked.",
      mock: "read",
    },
    {
      span: 4,
      wash: "b",
      title: "A card you can post",
      body: "Turn one sentence into a small card, sized for the places you already share.",
      mock: "card",
    },
    {
      span: 4,
      wash: "c",
      title: "A new story can wait overnight",
      body: "Open LUMORA Manifest in the morning and a fresh chapter can already be there.",
      mock: "daily",
    },
    {
      span: 2,
      wash: "a",
      title: "Keep the ones you replay",
      body: "Favorites stay in one list, ready for a walk or a late evening.",
      mock: "saved",
    },
  ],
  privacy: {
    title: "Your privacy matters.",
    body: "You decide what goes into a story. A voice clone is made only after you agree, the microphone is on only while you record, and you can delete the account whenever you want.",
    checks: [
      "Share only what you are comfortable with",
      "Voice clone used only with consent",
      "Microphone on only during a recording",
      "Delete your account at any time",
    ],
  },
  pricing: {
    title: "Choose your next chapter",
    bestValue: "BEST VALUE",
    stories: "new stories daily",
    continueWith: "Continue with",
    renews: "Auto-renews · Cancel anytime",
    restore: "Restore purchases",
    terms: "Terms",
    privacy: "Privacy",
  },
  faq: [
    {
      q: "How does voice cloning work?",
      a: "You record a short sample in the app. After you agree, LUMORA Manifest builds a voice and uses it only to narrate your stories. You can keep up to three recordings, switch to a preset voice, or delete a take.",
    },
    {
      q: "Is my data private?",
      a: "You choose what to share. Voice audio is used only with your consent, the microphone is active only while you record, and you can delete your account and recordings.",
    },
    {
      q: "Which languages can I use?",
      a: "English, Russian, Arabic, Bahasa Indonesia, Spanish, and Chinese.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Explore, LUMORA Manifest Plus, and LUMORA Manifest Premium renew until you cancel them in the App Store. You can also restore purchases if you change phones.",
    },
    {
      q: "Is LUMORA Manifest on iOS?",
      a: "Yes. LUMORA Manifest is on the App Store.",
    },
  ],
} as const;

export type StoryId = (typeof marketing.stories)[number]["id"];
