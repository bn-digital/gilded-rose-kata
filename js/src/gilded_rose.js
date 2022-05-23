function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

const setQualityForRegularItem = ({ sell_in, quality }) => {
  const isQualityPositive = quality > 0;
  const isSellingExpired = sell_in < 0;

  if (isQualityPositive && isSellingExpired) return -2;
  if (isQualityPositive) return -1;

  return 0;
};

const setQualityForBackstage = ({ sell_in, quality }) => {
  const isTenDaysToSell = sell_in <= 10;
  const isFiveDaysToSell = sell_in <= 5;
  const isSellingExpired = sell_in < 0;

  if (isSellingExpired) return -quality;
  if (isFiveDaysToSell) return +3;
  if (isTenDaysToSell) return +2;

  return +1;
};

const calculateSellinDifference = ({ name }) => {
  const isSulfuras = name === "Sulfuras, Hand of Ragnaros";
  return !isSulfuras ? -1 : 0;
};

const calculateQualityDifference = item => {
  const isSulfuras = item.name === "Sulfuras, Hand of Ragnaros";
  const isBrie = item.name === "Aged Brie";
  const isPasses = item.name === "Backstage passes to a TAFKAL80ETC concert";
  const isConjured = item.name.includes("Conjured");
  const isQualityLessThanMax = item.quality < 50;
  const isRegularItem = !isBrie && !isPasses && !isSulfuras && !isConjured;

  if (isRegularItem) return setQualityForRegularItem(item);
  if (isPasses) return setQualityForBackstage(item);
  if (isConjured) return setQualityForRegularItem(item) * 2;
  if (isBrie && isQualityLessThanMax) return +1;

  return 0;
};


function update_quality() {
  items.map(item => {
    item.sell_in += calculateSellinDifference(item);
    item.quality += calculateQualityDifference(item);

    return item;
  })
}
