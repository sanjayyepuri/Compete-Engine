System.register(['angular2/core', '../models/mock-teams'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, mock_teams_1;
    var TeamsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mock_teams_1_1) {
                mock_teams_1 = mock_teams_1_1;
            }],
        execute: function() {
            TeamsService = (function () {
                function TeamsService() {
                }
                TeamsService.prototype.getTeams = function () {
                    return Promise.resolve(mock_teams_1.TEAMS);
                };
                TeamsService.prototype.getTeam = function (id) {
                    return Promise.resolve(mock_teams_1.TEAMS).then(function (teams) { return teams.filter(function (team) { return team.id === id; })[0]; });
                };
                TeamsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TeamsService);
                return TeamsService;
            }());
            exports_1("TeamsService", TeamsService);
        }
    }
});
//# sourceMappingURL=teams.service.js.map