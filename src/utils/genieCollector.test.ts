import {GenieCollector} from "./genieCollector";
import {RecordSummary} from "../models/recordSummary";

const genieScrapper = new GenieCollector();

test("sut return hot rankings corresponding to record summary class", async () => {
    const sut = await genieScrapper.findRecordChart();
    const validSize = sut.filter((o: RecordSummary) => o instanceof RecordSummary).length;

    expect(validSize).toBe(sut.length);
});

test("sut return top rankings", async () => {
    const sut = await genieScrapper.findRecordChart();

    sut.forEach((o: RecordSummary, i: number) => {
        expect(o.ranking).toBe(i + 1);
    });
});

test("sut return album detail data by album id list", async () => {
    const albumIds = await genieScrapper.findRecordChart().then((list: RecordSummary[]) =>
        list.map(({ albumId }: RecordSummary) => albumId));
    const sut = await genieScrapper.findAlbumDetailsByAlbumIds(albumIds);

    expect(sut.length > 0).toBe(true);
}, 30000);
