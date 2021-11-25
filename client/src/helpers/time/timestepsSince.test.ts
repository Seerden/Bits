import dayjs from "dayjs";
import { Timestep } from "types/time";
import { timestepsSince } from "./timestepsSince";

describe("timestepsSince", () => {
    const args = {
        startDate: dayjs("2021-10-01"),
        endDate: dayjs("2021-10-30"),
        timestep: "day" as Timestep,
    };

    test("returns days between dates", () => {
        const result = timestepsSince(args);
        expect(result).toEqual(29);
    });

    test("returns weeks between dates", () => {
        args.startDate = dayjs("Sep 10 2021");
        args.timestep = "week";
        const result = timestepsSince(args);
        expect(result).toEqual(7);
    });
});
