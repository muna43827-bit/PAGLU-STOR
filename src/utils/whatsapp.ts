import { Order, Business } from '../types';

export function formatWhatsAppOrderMessage(order: Order, business: Business): string {
  const itemsText = order.items
    .map(item => `• ${item.name} x ${item.quantity} - ${business.currency}${item.price * item.quantity}`)
    .join('\n');

  let text = `*New Order #${order.orderNumber}* 🍔\n\n`;
  text += `*Items:*\n${itemsText}\n\n`;
  text += `*Total:* *${business.currency}${order.total}*\n\n`;
  text += `*Customer Details:*\n`;
  text += `Name: ${order.customerName}\n`;
  text += `Phone: ${order.customerPhone}\n`;
  text += `Address: ${order.customerAddress}\n`;

  if (order.specialRequest && order.specialRequest.trim()) {
    text += `📍 Special Request: ${order.specialRequest.trim()}\n`;
  }

  return text;
}

export function cleanWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (!cleaned) return '919876543210';
  // If user entered 10 digits (e.g. Indian mobile number without country code), default to 91
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  return cleaned;
}

export function getWhatsAppOrderUrl(order: Order, business: Business): string {
  const message = formatWhatsAppOrderMessage(order, business);
  const phone = cleanWhatsAppNumber(business.whatsapp);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getDirectWhatsAppChatUrl(phone: string, text = 'Hi, I would like to inquire about your menu!'): string {
  const cleanPhone = cleanWhatsAppNumber(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
