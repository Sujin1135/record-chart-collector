import {Vendor} from "../enums/vendor";
import {Element, load} from "cheerio";
import {CheerioAPI} from "cheerio/lib/load";
import rp from "request-promise";
import {RecordSummary} from "../models/recordSummary";


export abstract class RecordCollector {
    protected constructor(vendor: Vendor, defaultUrl: string) {
        this.vendor = vendor;
        this.defaultUrl = defaultUrl;
    }

    vendor: Vendor;
    defaultUrl: string;

    private getOptions(uri: string) {
        return {
            uri: `${this.defaultUrl}/${uri}`,
            transform: (body: any): CheerioAPI => load(body),
        }
    }

    public abstract findRecordChart(): Promise<RecordSummary[]>;

    public async scrapChart(uri: string = ""): Promise<CheerioAPI> {
        const vendor = this.vendor;

        return rp(this.getOptions(uri))
            .catch(function (err) {
                console.error(`occurred an error when scrapping record charts(${vendor})`, err);
                throw err;
            });
    }

    protected extractText($: any, selector: string): string[] {
        return $(selector)
            .map((i: number, ele: Element) => $(ele).text().trim()).get();
    }

    protected extractAttr($: any, selector: string, attrSelector: string) {
        return $(selector)
            .map((i: number, ele: Element) => $(ele).attr(attrSelector)).get();
    }
}
