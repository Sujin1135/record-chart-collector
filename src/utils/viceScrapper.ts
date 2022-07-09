import {RecordScrapper} from "./recordScrapper";
import {Vendor} from "../enums/vendor";
import {MusicFull} from "../models/musicFull";
import {MusicSummary} from "../models/musicSummary";
import {MusicDetail} from "../models/musicDetail";

export class VibeScrapper implements RecordScrapper {
    vendor  = Vendor.VIBE;
    url     = "https://vibe.naver.com/chart/total";

    findRecordChart = (): MusicFull[] => {
        return [
            new MusicFull(
                {
                    publisher: "카카오엔터테인먼트",
                    agency: "큐브 엔터테인먼트",
                } as MusicDetail,
                {
                    name: "TOMBOY",
                    album: "I NEVER DIE",
                    ranking: 1,
                    singer: "(여자) 아이들",
                } as MusicSummary,
            ),
            new MusicFull(
                {
                    publisher: "카카오엔터테인먼트",
                    agency: "꿈의엔진",
                } as MusicDetail,
                {
                    name: "나의 X에게",
                    album: "나의 X에게",
                    ranking: 2,
                    singer: "경서",
                } as MusicSummary,
            ),
        ]
    }
}