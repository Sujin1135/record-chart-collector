import {MusicDetail} from "./musicDetail";
import {MusicSummary} from "./musicSummary";

export class MusicFull implements MusicDetail, MusicSummary {
    constructor(
        { publisher, agency }: MusicDetail,
        { name, album, singer, ranking }: MusicSummary,
    ) {
        this.publisher = publisher;
        this.agency = agency;
        this.album = album;
        this.name = name;
        this.ranking = ranking;
        this.singer = singer;
    }

    publisher: string;
    agency: string;
    album: string;
    name: string;
    ranking: number;
    singer: string;
}
