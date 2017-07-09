import {Injectable} from "@angular/core";
import * as moment from "moment-timezone";

@Injectable()
export class DateService {

    DATE_FORMAT: string = 'DD.MM.YYYY';
    TIMEZONE: string = "UTC";

    getDateAsString(date? : Date, format = this.DATE_FORMAT) : string {
        if (date)
            return moment(date).format(format);

        return moment().format(format);
    }

    getDateFromString(date: string, format = this.DATE_FORMAT, timezone = this.TIMEZONE) : Date {
        return moment.tz(date, format, timezone);
    }

    getDate(timezone = this.TIMEZONE) : Date {
        return moment.tz(timezone);
    }
}
