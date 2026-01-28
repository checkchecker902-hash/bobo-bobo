/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: chefs
 * Interface for Chefs
 */
export interface Chefs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  chefName?: string;
  /** @wixFieldType image */
  chefPhoto?: string;
  /** @wixFieldType text */
  shortIntroduction?: string;
  /** @wixFieldType text */
  passionAndStory?: string;
  /** @wixFieldType text */
  specialty?: string;
}


/**
 * Collection ID: customerreviews
 * Interface for CustomerReviews
 */
export interface CustomerReviews {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  reviewText?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType date */
  reviewDate?: Date | string;
  /** @wixFieldType image */
  customerPhoto?: string;
  /** @wixFieldType text */
  source?: string;
}


/**
 * Collection ID: faqs
 * Interface for FrequentlyAskedQuestions
 */
export interface FrequentlyAskedQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
  /** @wixFieldType number */
  sortOrder?: number;
}


/**
 * Collection ID: menuitems
 * Interface for MenuItems
 */
export interface MenuItems {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  ingredients?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  chefNote?: string;
  /** @wixFieldType text */
  dietaryRestrictions?: string;
}


/**
 * Collection ID: reasonstochooseus
 * Interface for ReasonsToChooseUs
 */
export interface ReasonsToChooseUs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  reasonTitle?: string;
  /** @wixFieldType text */
  reasonDescription?: string;
  /** @wixFieldType image */
  reasonImage?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  callToActionText?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
}


/**
 * Collection ID: seatingtypes
 * Interface for SeatingTypes
 */
export interface SeatingTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  seatingTypeName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  image?: string;
  /** @wixFieldType number */
  maxCapacity?: number;
  /** @wixFieldType boolean */
  isBookable?: boolean;
  /** @wixFieldType text */
  locationDetails?: string;
}
