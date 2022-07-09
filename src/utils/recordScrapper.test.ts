import {VibeScrapper} from "./viceScrapper";
import {MusicFull} from "../models/musicFull";

const vibeScrapper = new VibeScrapper();

test("sut get hot ranking records", () => {
    const sut = vibeScrapper.findRecordChart();
    const validSize = sut.filter((o: MusicFull) => o instanceof MusicFull).length;

    expect(validSize).toBe(sut.length);
});