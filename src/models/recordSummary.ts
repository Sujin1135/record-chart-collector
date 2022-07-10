import {Vendor} from "../enums/vendor";

export class RecordSummary {
    constructor(
        vendor: Vendor,
        ranking: number,
        name: string,
        singer: string,
        album: string,
        albumId: number,
    ) {
        this.vendor = vendor;
        this.ranking = ranking;
        this.name = name;
        this.singer = singer;
        this.album = album;
        this.albumId = albumId;
    }

    vendor: Vendor;
    ranking: number;
    name: string;
    singer: string;
    album: string;
    albumId: number;
}