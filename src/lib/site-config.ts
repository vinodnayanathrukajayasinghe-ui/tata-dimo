// [PLACEHOLDER] Replace every value below with the client's real branding/contact details.
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Lanka Commercial Motors",
  shortName: "LCM",
  tagline: "Authorised Dealer & Service Partner for TATA Commercial Vehicles in Sri Lanka",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "94770000000",
  phone: "+94 11 234 5000", // [PLACEHOLDER]
  email: "info@lcm.lk", // [PLACEHOLDER]
  address: "No. 120, Negombo Road, Wattala, Sri Lanka", // [PLACEHOLDER]
  social: {
    facebook: "https://facebook.com/", // [PLACEHOLDER]
    youtube: "https://youtube.com/", // [PLACEHOLDER]
    instagram: "https://instagram.com/", // [PLACEHOLDER]
  },
};

export function whatsappLink(message: string, number = siteConfig.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
