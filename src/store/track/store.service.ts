// import { Injectable } from '@nestjs/common';

// interface Track {
//   id: string; // uuid v4
//   name: string;
//   TrackId: string | null; // refers to Track
//   albumId: string | null; // refers to Album
//   duration: number; // integer number
// }

// @Injectable()
// export class StoreService {
//   private store: Track[] = null;

//   constructor() {
//     this.store = [];
//   }

//   getTracks() {
//     return this.store;
//   }

//   getTrack(id: string) {
//     return this.store.find((Track) => Track.id === id);
//   }

//   createTrack(Track: Track) {
//     return this.store.push(Track);
//   }

//   updateTrack({ id, name, grammy }: Track): Track {
//     const Track = this.store.find((Track) => Track.id === id);

//     Track.name = name;
//     Track.grammy = grammy;

//     return Track;
//   }

//   deleteTrack(id: string) {
//     const index = this.store.findIndex((user) => user.id === id);
//     if (index !== -1) {
//       this.store.splice(index, 1);
//       return true;
//     }
//     return false;
//   }
// }
