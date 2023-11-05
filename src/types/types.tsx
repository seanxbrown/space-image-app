export interface IPhoto {

    "date": string;
    "explanation": string;
    "hdurl": string;
    "media_type": string;
    "service_version": string;
    "title": string;
    "url": string;
    "id": string;
    "isDeleted": boolean
      
}

export interface IGallery {
    photos: Array<IPhoto>;
    id: string;
    name: string;
    isDeleted: boolean;
}