System.register(['angular2/core', '../services/teams.service'], function(exports_1, context_1) {
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
    var core_1, teams_service_1;
    var CompeteStandingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (teams_service_1_1) {
                teams_service_1 = teams_service_1_1;
            }],
        execute: function() {
            CompeteStandingsComponent = (function () {
                function CompeteStandingsComponent(_teamsService) {
                    this._teamsService = _teamsService;
                }
                CompeteStandingsComponent.prototype.getTeams = function () {
                    var _this = this;
                    this._teamsService.getTeams().then(function (teams) { return _this.teams = teams; });
                };
                CompeteStandingsComponent.prototype.ngOnInit = function () {
                    this.getTeams();
                };
                CompeteStandingsComponent = __decorate([
                    core_1.Component({
                        selector: 'compete-standings',
                        templateUrl: 'app/components/html/compete-standings.component.html'
                    }), 
                    __metadata('design:paramtypes', [teams_service_1.TeamsService])
                ], CompeteStandingsComponent);
                return CompeteStandingsComponent;
            }());
            exports_1("CompeteStandingsComponent", CompeteStandingsComponent);
        }
    }
});
//# sourceMappingURL=compete-standings.component.js.map