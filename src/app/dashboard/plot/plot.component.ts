import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dashboardService } from '../../../app/services/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
})
export class PlotComponent implements OnInit {
  @ViewChild('myCanvas')
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;

  weekProDate: any = [];
  monthProData: any = [];
  monthProDate: any = [];
  weekProData: any = [];
  weekPasDate: any = [];
  monthPasData: any = [];
  monthPasDate: any = [];
  weekPasData: any = [];
  weekDetDate: any = [];
  monthDetData: any = [];
  monthDetDate: any = [];
  weekDetData: any = [];

  data: boolean = false;
  chart: any;
  constructor(public dashboaService: dashboardService) {}

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Promotor(2%)', 'Passive(5%)', 'Detractor(6%)'],
        datasets: [
          {
            data: [45, 35, 20],
            backgroundColor: ['#3cb371', '#ef820d', '#dc143c']
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
              formatter(value) {
                  return value + " kWh";
              }
          }
      },
        // responsive: false,
        // cutoutPercentage: 75,
        tooltips: {
          enabled: true,
          
        },
      },
    });
  }  
}
