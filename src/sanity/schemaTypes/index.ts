import { type SchemaTypeDefinition } from 'sanity';
import { blockContentType } from './components/blockContentType';
import { blockImageType } from './components/blockImageType';
import { productCategoryType } from './productCategoryType';
import { productBrandType } from './productBrandType';
import { productSizeType } from './productSize';
import { productColorType } from './productColorType';
import { productGenderType } from './productGenderType';
import { productTagType } from './productTagType';
import { productType } from './productType';
import { faqType } from './faqType';
import { shopLocationType } from './shopLocationType';
import { careerType } from './careerType';
import { utilityPageType } from './utilityPageType';
import { journalCategoryType } from './journalCategoryType';
import { authorType } from './authorType';
import { journalType } from './journalType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    blockImageType,
    productCategoryType,
    productBrandType,
    productSizeType,
    productColorType,
    productGenderType,
    productTagType,
    productType,
    faqType,
    shopLocationType,
    careerType,
    utilityPageType,
    journalCategoryType,
    authorType,
    journalType,
  ],
};
