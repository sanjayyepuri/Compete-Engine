import { Competitor } from './competitor.model';

export class Team{
    public teamid: string;
    public school: string;
    public submissions: any;
    public teamscore: any;
    private _id: any;
    public members: Competitor[];

}