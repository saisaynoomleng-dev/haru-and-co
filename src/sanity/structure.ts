import { BiCategory, BiSolidCategoryAlt } from 'react-icons/bi';
import { BsBriefcase } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import {
  FaHashtag,
  FaNewspaper,
  FaQuestion,
  FaTransgenderAlt,
  FaTshirt,
} from 'react-icons/fa';
import { IoColorPalette, IoResize } from 'react-icons/io5';
import { LuUserPen } from 'react-icons/lu';
import { SiNike } from 'react-icons/si';
import { TiDocumentText } from 'react-icons/ti';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Haru&Co.')
    .items([
      S.divider().title('Operation'),
      S.documentTypeListItem('productCategory')
        .icon(BiSolidCategoryAlt)
        .title('Product Categories'),
      S.documentTypeListItem('productBrand')
        .title('Product Brands')
        .icon(SiNike),
      S.documentTypeListItem('productSize')
        .title('Product Sizes')
        .icon(IoResize),
      S.documentTypeListItem('productColor')
        .title('Product Colors')
        .icon(IoColorPalette),
      S.documentTypeListItem('productGender')
        .title('Product Genders')
        .icon(FaTransgenderAlt),
      S.documentTypeListItem('productTag')
        .title('Product Tags')
        .icon(FaHashtag),
      S.documentTypeListItem('product').title('Products').icon(FaTshirt),
      S.documentTypeListItem('faq').title('FAQs').icon(FaQuestion),
      S.documentTypeListItem('shopLocation').title('Stores').icon(CiLocationOn),
      S.documentTypeListItem('career').title('Careers').icon(BsBriefcase),
      S.documentTypeListItem('utilityPage')
        .title('Utility Pages')
        .icon(TiDocumentText),

      S.divider().title('Marketing'),
      S.documentTypeListItem('journalCategory')
        .title('Journal Categories')
        .icon(BiCategory),
      S.documentTypeListItem('author').title('Authors').icon(LuUserPen),
      S.documentTypeListItem('journal').title('Journals').icon(FaNewspaper),
    ]);
