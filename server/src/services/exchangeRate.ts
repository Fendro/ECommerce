import appConfig from "../configs/appConfig";
import axios from "axios";
import fs from "fs";
import { getCollection } from "./mongoDB";
import { CurrencyModel, ServiceError } from "../models";

const descriptions = JSON.parse(
  fs.readFileSync("assets/Currencies.json").toString(),
);
let currencyModel: CurrencyModel;
(async () => {
  currencyModel = new CurrencyModel(await getCollection("currencies"));
})();

const didFetchToday = (): boolean => {
  try {
    fs.readFileSync(`misc/currencies-${new Date().toDateString()}.json`);
    return true;
  } catch (error) {
    return false;
  }
};

const fetchExchangeRates = () => {
  axios
    .get(
      "http://api.exchangeratesapi.io/v1/latest?access_key=d44e251993b32582d58c96050a0cca31",
    )
    .then(async (response) => {
      const { data } = response;
      if (!data.success)
        throw new ServiceError("Exchange rate service failure.", data);

      for (const currencyName in data.rates) {
        const document = await currencyModel.getCurrency(currencyName);
        if (!document) {
          await currencyModel.addCurrency({
            name: currencyName,
            description: descriptions[currencyName] ?? "",
            rate: data.rates[currencyName],
            manuallySet: false,
          });
        } else if (!document.manuallySet) {
          await currencyModel.editCurrency(currencyName, {
            rate: data.rates[currencyName],
          });
        }
      }
      fs.writeFileSync(
        `misc/currencies-${new Date().toDateString()}.json`,
        JSON.stringify(data, null, 2),
      );
      console.log("Exchange rates updated.");
    })
    .catch((error) => {
      console.error(error.response);
    });
};

export const exchangeRateService = () => {
  if (!didFetchToday()) fetchExchangeRates();

  setTimeout(() => {
    exchangeRateService();
  }, appConfig.currencies.updateDelay);
};
