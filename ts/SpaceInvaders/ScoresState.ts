
export class ScoresData{
    public bestScores:number = 0
    public lastScores:number = 0
}

export default class ScoresState{
    public easy:ScoresData = new ScoresData()
    public medium:ScoresData = new ScoresData()
    public hard:ScoresData = new ScoresData()
    public impossible:ScoresData = new ScoresData()

    constructor(){

    }

    public static load(data:any):ScoresState{
        const res = new ScoresState()
        if(!data){
            return res
        }
        if(data.easy){
            res.easy = data.easy as ScoresData
        }
        if(data.medium){
            res.medium = data.medium as ScoresData
        }
        if(data.hard){
            res.hard = data.hard as ScoresData
        }
        if(data.impossible){
            res.impossible = data.impossible as ScoresData
        }
        return res
    }
}
