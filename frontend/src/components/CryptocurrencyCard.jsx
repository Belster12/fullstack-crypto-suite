import { Card } from "antd"

function CryptocurrencyCard(props) {
  const { currency } = props; 

//------ Fixed Price ------//

  const price = (currency.quote.USD.price).toFixed(3);
  const changePrice24 = (currency.quote.USD.percent_change_24h).toFixed(2);
  const changeVol24 = (currency.quote.USD.volume_change_24h).toFixed(2);

//------ Price Change Style ------//

  const priceChangeStyle = {
    color: changePrice24 > 0 ? 'green' : 'red', // зеленый, если больше 0, красный - если меньше
  };
  const VolChangeStyle = {
    color: changeVol24 > 0 ? 'green' : 'red', // зеленый, если больше 0, красный - если меньше
  };

//------ Format Number ------//

  const formatNumber = (num) => {
    if (Math.abs(num) >= 1.0e9) {
      return (num / 1.0e9).toFixed(1) + "B"; // миллиарды
    } else if (Math.abs(num) >= 1.0e6) {
      return (num / 1.0e6).toFixed(1) + "M"; // миллионы
    } else if (Math.abs(num) >= 1.0e3) {
      return (num / 1.0e3).toFixed(1) + "K"; // тысячи
    } else {
      return num; // если число меньше тысячи, не форматируем
    }
  }

  const formattedVolume = formatNumber(currency.quote.USD.volume_24h);

//------ Main Card ------//

  return (
    <div>
      <Card className="shadow-lg"
      title={
        <div className="flex items-center gap-3">
          <img className="rounded-full w-12 h-12 my-4" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt={currency.name} />

          <span className="font-bold text-lg">{currency.name}</span>
        </div>
      }
      style={{
        width: 300,
      }}
    >
      <div>
        <p className="font-bold">
            Price:
            <span className="font-semibold"> {price} USD</span>
        </p>
        <p className="font-bold">Price Change 24h: <span style={priceChangeStyle} className="font-semibold">{changePrice24}</span></p>
        <p className="font-bold">Vol 24h: <span className="font-semibold">{formattedVolume}</span></p>
        <p className="font-bold">Vol Change 24h: <span style={VolChangeStyle} className="font-semibold">{changeVol24}</span></p>
      </div>
    </Card>
    </div>
  )
}

export default CryptocurrencyCard
