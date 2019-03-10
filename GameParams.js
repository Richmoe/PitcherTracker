export default class GameParams {
    constructor(innings,home,opponent,machine) {
        this.innings = innings;
        this.isHome = home;
        this.opponent = opponent;
        this.machinePitch = machine;
    }
}