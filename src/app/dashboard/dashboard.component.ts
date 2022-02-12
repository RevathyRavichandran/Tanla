import { Component, OnInit } from '@angular/core';
import { dashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboaService: dashboardService) {}
  promotersPercentage: any;
  passivesPercentage: any;
  detractorsPercentage: any;
  overallScore: any;
  survey: boolean = true;
  question: boolean = false;
  date: boolean = false;

  ngOnInit() {
    this.dashboaService.getDashboardPercentage().subscribe((res) => {
      if (res && res.ProcessVariables) {
        this.overallScore = res.ProcessVariables.overallCount;
        this.promotersPercentage = parseFloat(res.ProcessVariables.promoPercentage).toFixed(2);
        this.passivesPercentage = parseFloat(res.ProcessVariables.passivePercentage).toFixed(2);
        this.detractorsPercentage = parseFloat(res.ProcessVariables.detractorsPercentage).toFixed(2);
      }
    });
  }
  weekData(color) {
    this.survey = true;
    this.question = false;
    this.date = false;
    document.getElementById("week").style.background = color;
    document.getElementById("month").style.background = 'none';
    document.getElementById("year").style.background = 'none';
  }
  monthData(color) {
    this.survey = true;
    this.question = true;
    this.date = false;
    document.getElementById("week").style.background = 'none';
    document.getElementById("month").style.background = color;
    document.getElementById("year").style.background = 'none';
  }
  yearData(color) {
    this.survey = false;
    this.question = false;
    this.date = true;
    document.getElementById("week").style.background = 'none';
    document.getElementById("month").style.background = 'none';
    document.getElementById("year").style.background = color;
  }
}
