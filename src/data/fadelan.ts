export type FadelanImage = {
  src: string;
  label: string;
  desc: string;
};

export const fadelanImages: FadelanImage[] = [
  {
    src: "/projects/fad-elan/about.png",
    label: "About",
    desc: "Brand story and trust-building page — sourcing philosophy, authentication promise, and local roots.",
  },
  {
    src: "/projects/fad-elan/homepage.png",
    label: "Homepage",
    desc: "Hero section with brand positioning, featured collection preview, and how-to-buy flow.",
  },
  {
    src: "/projects/fad-elan/catalog.png",
    label: "Catalog",
    desc: "Full bag catalog pulled from Sanity CMS with real-time availability status.",
  },
  {
    src: "/projects/fad-elan/product.png",
    label: "Product Page",
    desc: "Individual bag detail page with PortableText descriptions, condition notes, and inquiry CTA.",
  },
  {
    src: "/projects/fad-elan/contact.png",
    label: "Contact",
    desc: "Inquiry form with bag selection dropdown, routed via Resend API with reply-to configuration.",
  },
  {
    src: "/projects/fad-elan/how-to-buy.png",
    label: "How to Buy",
    desc: "Four-step purchase flow explaining browse, inquire, reserve, and receive.",
  },
];