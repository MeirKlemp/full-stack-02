export class ScoresData {
    constructor() {
        this.bestScores = 0;
        this.lastScores = 0;
    }
}
export default class ScoresState {
    constructor() {
        this.easy = new ScoresData();
        this.medium = new ScoresData();
        this.hard = new ScoresData();
        this.impossible = new ScoresData();
    }
    static load(data) {
        const res = new ScoresState();
        if (!data) {
            return res;
        }
        if (data.easy) {
            res.easy = data.easy;
        }
        if (data.medium) {
            res.medium = data.medium;
        }
        if (data.hard) {
            res.hard = data.hard;
        }
        if (data.impossible) {
            res.impossible = data.impossible;
        }
        return res;
    }
}
