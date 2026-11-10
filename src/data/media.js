// Photos and videos shown beside page text. Edit this file to swap any of them.
//
//  video:  { src, poster }  looping muted video (wins over images when it can play)
//  images: [{ src, alt }]   1 image = a still photo, 2 or more = an auto-advancing slideshow
//  null:   keep the illustration
//
// If a video or photo fails to load, the next option (and finally the illustration) is shown.
//
// Photos: Pexels (free licence, no attribution required).  Videos: Mixkit (free licence).
// Pexels pages: https://www.pexels.com/photo/<id>   Mixkit pages: https://mixkit.co/free-stock-video/<slug>-<id>/

// Builds an optimised Pexels image URL from a photo id (4:3 crop).
export const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=750`;

// Builds Mixkit video + poster URLs from a video id.
export const mixkit = (id) => ({
  src: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-360-0.jpg`,
});

const photo = (id, alt) => ({ src: pexels(id), alt });

export const pageMedia = {
  // Videos: Home uses 42644, How It Works 16106, About mission 15858. Every one is different.
  howItWorks: { video: mixkit(16106) }, // Lawyer explains to client with laptop in office

  // Photos: every photo below is used on exactly one page. Keep it that way when you edit.
  findLawyers: {
    images: [
      photo(8111887, "A lawyer discussing a case with a client at an office desk"),
      photo(8730785, "Two lawyers reviewing documents with law books on a desk"),
      photo(7876144, "Two lawyers discussing a legal matter beside a Lady Justice statue"),
    ],
  },
  lawyerCategory: {
    images: [
      photo(7876154, "A lawyer consulting clients in a modern office"),
      photo(8112231, "A lawyer consulting clients with documents and coffee on the table"),
    ],
  },
  faq: {
    images: [
      photo(8111885, "A lawyer and a client looking through documents together"),
      photo(7875842, "A lawyer writing on contracts with law books and a laptop on the table"),
      photo(8730981, "Professionals reviewing documents during a meeting"),
    ],
  },
  contact: {
    images: [
      photo(8111889, "A lawyer reviewing paperwork at her desk"),
      photo(7875986, "Legal professionals discussing the details of a contract"),
      photo(8112153, "A lawyer discussing legal documents with clients"),
    ],
  },
  legalAid: {
    images: [
      photo(9870226, "Two people reviewing and signing an official document together"),
      photo(7876042, "Three professionals reviewing papers in a law office"),
      photo(8730781, "A lawyer and a client going through a contract"),
    ],
  },
  legalResources: {
    images: [
      photo(6077296, "A judge writing at a desk in a law library"),
      photo(6077381, "A judge working beside a Lady Justice statue"),
      photo(6077354, "A judge in a robe writing at her desk"),
    ],
  },

  // Emergency page keeps its calm animated illustration on purpose.
  emergency: null,

  // About page
  aboutHero: {
    images: [
      photo(34817076, "A judge in a courtroom making a ruling"),
      photo(6077447, "A judge signing papers at a desk with a gavel"),
      photo(34817075, "A judge in a courtroom with a gavel and documents"),
    ],
  },
  aboutStory: {
    images: [
      photo(8730374, "A woman signing legal documents with a pen"),
      photo(8152735, "Two people completing paperwork at a desk"),
      photo(8152746, "Hands signing official documents on a desk"),
    ],
  },
  aboutVideo: mixkit(15858), // Lawyers talk with client in late evening office
};
