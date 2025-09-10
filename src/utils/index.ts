const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatCurrency = (price: string) => {
  const numericPrice = parseFloat(price)

  if (isNaN(numericPrice)) {
    return price
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(numericPrice)
}

const safeSplit = (input: string) => {
  return input
    .split(',')
    .map((element) => element.trim())
    .filter((element) => element.length > 0)
}

export { formatDate, formatCurrency, safeSplit }
