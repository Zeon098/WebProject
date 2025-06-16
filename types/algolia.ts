export interface AlgoliaUser {
  objectID: string;
  name: string;
  email: string;
  image: string;
  joined: Date;
  homeId: string[];
  reviewCount: number;
  description: string;
}

export interface AlgoliaHome {
  objectID: string;
  title: string;
  description: string;
  images: string[];
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviewValue: number;
  reviewCount: number;
  location: any;
  _geoloc: {
    lat: number;
    lng: number;
  };
}

export interface AlgoliaReview {
  objectID: string;
  homeId: string;
  userId: string;
  date: Date;
  rating: number;
  comment: string;
  userName: string;
  userImage: string;
}
