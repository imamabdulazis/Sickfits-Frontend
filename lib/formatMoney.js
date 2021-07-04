export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }

  const formatter = Intl.NumberFormat('id-ID',
    options);

  return formatter.format(amount)
}