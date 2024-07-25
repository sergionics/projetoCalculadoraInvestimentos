import { Spot } from "@binance/connector";

const apiKey =
  "tIUO9atblIe1wkmrgDy0sxjPl4RoHGi2k5pE0gemOhmcUpp8kE4VVH9ZWHbgfK5f";
const apiSecret =
  "ZMfemSrHxsp6qgaKmTGIOt9bZlW8E27gdlVW8X0inCDY3OFpuYIRxxaNQ9lt2emU";

const client = new Spot(apiKey, apiSecret);

const CRYPTOS = [
  "BTCUSDT",
  "AGIXUSDT",
  "AAVEUSDT",
  "LINKUSDT",
  "AVAXUSDT",
  "ATOMUSDT",
  "NEARUSDT",
  "ADAUSDT",
  "CHZUSDT",
  "MATICUSDT",
  "STXUSDT",
  "IMXUSDT",
  "BLURUSDT",
  "INJUSDT",
  "ENJUSDT",
  "SOLUSDT",
  "OCEANUSDT",
  "DOTUSDT",
  "RNDRUSDT",
  "ASTRUSDT",
  "SNXUSDT",
  "GALAUSDT",
  "HOTUSDT",
  "KSMUSDT",
  "ANKRUSDT",
  "SANDUSDT",
  "VETUSDT",
  "CELRUSDT",
  "TIAUSDT",
  "MANTAUSDT",
  "DYDXUSDT",
  "SUIUSDT",
  "SEIUSDT",
  "HBARUSDT",
];

client.tickerPrice("", CRYPTOS).then((response) => console.log(response.data));

let investimento = {
  coin: "BTC",
  qtd: 0.00821178,
  custoMedio: 60860.86,
  PosicaoInicial: 499.78,
  PrecoAtual: 61065.93, // pegar da api
  //PosicaoAtual: PrecoAtual * qtd,
  // LucrosPerdas: PosicaoAtual - PosicaoInicial,
  // LucrosPerdasPercent: PosicaoAtual / PosicaoInicial,
  Alocacao: 0.0692, // calcular do objeto total
};

console.log(investimento);
