import QRCode from 'qrcode';

export async function generateQrDataUrl(text: string, size = 320): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      color: {
        dark: '#07080C',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    });
  } catch (err) {
    console.error('QR code generation error:', err);
    // Fallback QR API in case of unusual environment issue
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
  }
}

export async function renderQrToCanvas(canvas: HTMLCanvasElement, text: string, size = 260): Promise<void> {
  try {
    await QRCode.toCanvas(canvas, text, {
      width: size,
      margin: 1,
      color: {
        dark: '#07080C',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    });
  } catch (err) {
    console.error('Failed to render QR to canvas:', err);
  }
}

export function downloadQrCode(dataUrl: string, filename = 'quickstore-qr.png'): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
