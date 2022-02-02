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
    this.dashboaService.weekBtn.next('week');
    document.getElementById("week").style.background = color;
    document.getElementById("month").style.background = 'none';
    document.getElementById("year").style.background = 'none';
  }
  monthData(color) {
    this.dashboaService.monthBtn.next('month');
    document.getElementById("week").style.background = 'none';
    document.getElementById("month").style.background = color;
    document.getElementById("year").style.background = 'none';
  }
  yearData(color) {
    document.getElementById("week").style.background = 'none';
    document.getElementById("month").style.background = 'none';
    document.getElementById("year").style.background = color;
  }
}
