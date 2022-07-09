import {MusicFull} from "../models/musicFull";
import {Vendor} from "../enums/vendor";

export interface RecordScrapper {
    vendor: Vendor;
    findRecordChart(): MusicFull[];
}
