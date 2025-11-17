export const maskPhone = (phone) => {
    if (!phone) return '—';
        const visible = phone.slice(-3); // últimos 3 dígitos
        return '******' + visible;
};

export const handleOpenLink = (url) => {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
};