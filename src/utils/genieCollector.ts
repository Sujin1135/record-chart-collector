import {RecordCollector} from "./recordCollector";
import {Vendor} from "../enums/vendor";
import {CheerioAPI} from "cheerio/lib/load";
import {RecordSummary} from "../models/recordSummary";
import {MusicDetail} from "../models/musicDetail";
import _ from "lodash";

export class GenieCollector extends RecordCollector {
    constructor() {
        super(Vendor.GENIE, "https://www.genie.co.kr");
    }

    findRecordChart = async (): Promise<RecordSummary[]> => {
        return [
            ...await this.extractRecords("chart/top200"),
            ...await this.extractRecords("chart/top200?ditc=D&pg=2"),
        ];
    }

    findAlbumDetailsByAlbumIds = async (ids: number[]): Promise<MusicDetail[]> => {
        const temp = {};
        const result: MusicDetail[] = [];

        for (const id of ids) {
            if (_.get(temp, id)) continue;

            const data = await this.scrapChart(`detail/albumInfo?axnm=${id}`)
                .then(($: CheerioAPI) => {
                    const arr = this.extractText($, ".value");
                    const detail = {publisher: arr[2], agency: arr[3]};
                    _.set(temp, id, detail);
                    return detail;
                });
            result.push(data);
        }
        return result;
    }

    private async extractRecords(uri: string) {
        return this.scrapChart(uri)
            .then(($: CheerioAPI) => ({
                    names: this.extractText($, ".title.ellipsis"),
                    singers: this.extractText($, ".artist.ellipsis"),
                    ranks: this.extractText($, ".list .number")
                        .map((v: string) => Number(v.split("\n")[0])),
                    albums: this.extractText($, ".albumtitle.ellipsis"),
                    albumIds: this.extractAttr($, ".albumtitle.ellipsis", "onclick")
                        .map((v: string) => Number(v.split("'")[1])),
                })
            )
            .then(({names, singers, ranks, albums, albumIds}) =>
                names.map((v: string, i: number): RecordSummary => {
                    return new RecordSummary(
                        this.vendor, ranks[i], v, singers[i], albums[i], albumIds[i]
                    );
            }));
    }
}