export const WHATSAPP_NUMBER = "5493757644169";
export const WHATSAPP_DISPLAY = "+54 9 3757 64-4169";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = buildWhatsAppUrl(
  "Hola NEXUS Dev! Quiero automatizar mi negocio, ¿me cuentan más?"
);

export const EMAIL = "tobadprr@gmail.com";
export const GITHUB_URL = "https://github.com/tobadprr-code";
export const LOCATION = "Wanda, Misiones, Argentina · Triple Frontera";
