import {GenieCollector} from "./genieCollector";
import {RecordSummary} from "../models/recordSummary";

const vibeScrapper = new GenieCollector();

test("sut return hot rankings corresponding to record summary class", async () => {
    const sut = await vibeScrapper.findRecordChart();
    const validSize = sut.filter((o: RecordSummary) => o instanceof RecordSummary).length;

    expect(validSize).toBe(sut.length);
});

test("sut return top rankings", async () => {
    const sut = await vibeScrapper.findRecordChart();

    sut.forEach((o: RecordSummary, i: number) => {
        expect(o.ranking).toBe(i + 1);
    });
});
