import { DataReader } from './DataReader';
import { Product, PaymentCard } from './models';

export class TestData {
  static products(): Record<string, Product> { return DataReader.json('json/products.json'); }
  static cards(): Record<string, PaymentCard> { return DataReader.json('json/cards.json'); }
  static searchTerms() { return DataReader.csv('json/search-terms.csv'); }
}
