import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexFill,
} from 'ng-apexcharts';
import { dashboardService } from '../../../app/services/dashboard.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
};

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
})
export class PlotComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;

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

  constructor(public dashboaService: dashboardService) {
    this.dashboaService.getChartData('1').subscribe((res) => {
      if (res && res.graphDateList && res.graphDateList.length > 1) {
        res.graphDateList.forEach((element) => {
          if (element.graphDate && !element.graphCount) {
            this.weekProDate.push(element.graphDate);
            this.weekProData.push(0);
            this.weekPasData.push(0);
            this.weekDetData.push(0);
          } else {
            this.weekProDate.push(element.graphDate);
            this.weekProData.push(element.graphCount);
            this.weekPasData.push(element.promoCount);
            this.weekDetData.push(element.detractCount);
          }
        });
      }
      this.chartData = [
        {
          data: this.weekProData,
          label: 'Promoters',
          fill: true,
        },
        {
          data: this.weekPasData,
          label: 'Passives',
          fill: true,
        },
        {
          data: this.weekDetData,
          label: 'Detractors',
          fill: true,
        },
      ];
      this.chartLabels = this.weekProDate;
      this.chartColors = [
        {
          backgroundColor: 'rgba(60,179,113,0.5)',
          borderColor: 'rgba(60,179,113,1)',
        },
        {
          backgroundColor: 'rgba(239,130,13,0.5)',
          borderColor: 'rgba(239,130,13,1)',
        },
        {
          backgroundColor: 'rgba(220,20,60,0.5)',
          borderColor: 'rgba(220,20,60,1)',
        },
      ];
      this.chartOptions = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 3,
              },
            },
          ],
        },
        maintainAspectRatio: false,
        annotation: {
          drawTime: 'beforeDatasetsDraw',
          annotations: [
            {
              type: 'box',
              id: 'a-box-1',
              yScaleID: 'y-axis-0',
              yMin: 0,
              yMax: 1,
              backgroundColor: '#4cf03b',
            },
            {
              type: 'box',
              id: 'a-box-2',
              yScaleID: 'y-axis-0',
              yMin: 1,
              yMax: 2.7,
              backgroundColor: '#fefe32',
            },
            {
              type: 'box',
              id: 'a-box-3',
              yScaleID: 'y-axis-0',
              yMin: 2.7,
              yMax: 5,
              backgroundColor: '#fe3232',
            },
          ],
        },
      };
    });
  }

  ngOnInit(): void {
    this.dashboaService.weekBtnObs().subscribe((opt) => {
      if (opt == 'week') {
        this.weekProDate = [];
        this.weekProData = [];
        this.weekPasData = [];
        this.weekPasDate = [];
        this.weekDetData = [];
        this.weekDetDate = [];
        this.dashboaService.getChartData('1').subscribe((res) => {
          if (res && res.graphDateList && res.graphDateList.length > 1) {
            res.graphDateList.forEach((element) => {
              if (element.graphDate && !element.graphCount) {
                this.weekProDate.push(element.graphDate);
                this.weekProData.push(0);
                this.weekPasData.push(0);
                this.weekDetData.push(0);
              } else {
                this.weekProDate.push(element.graphDate);
                this.weekProData.push(element.graphCount);
                this.weekPasData.push(element.promoCount);
                this.weekDetData.push(element.detractCount);
              }
            });
          }
          this.chartData = [
            {
              data: this.weekProData,
              label: 'Promoters',
              fill: true,
            },
            {
              data: this.weekPasData,
              label: 'Passives',
              fill: true,
            },
            {
              data: this.weekDetData,
              label: 'Detractors',
              fill: true,
            },
          ];
          this.chartLabels = this.weekProDate;
          this.chartColors = [
            {
              backgroundColor: 'rgba(60,179,113,0.5)',
              borderColor: 'rgba(60,179,113,1)',
            },
            {
              backgroundColor: 'rgba(239,130,13,0.5)',
              borderColor: 'rgba(239,130,13,1)',
            },
            {
              backgroundColor: 'rgba(220,20,60,0.5)',
              borderColor: 'rgba(220,20,60,1)',
            },
          ];
          this.chartOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    stepSize: 3,
                  },
                },
              ],
            },
            maintainAspectRatio: false,
            annotation: {
              drawTime: 'beforeDatasetsDraw',
              annotations: [
                {
                  type: 'box',
                  id: 'a-box-1',
                  yScaleID: 'y-axis-0',
                  yMin: 0,
                  yMax: 1,
                  backgroundColor: '#4cf03b',
                },
                {
                  type: 'box',
                  id: 'a-box-2',
                  yScaleID: 'y-axis-0',
                  yMin: 1,
                  yMax: 2.7,
                  backgroundColor: '#fefe32',
                },
                {
                  type: 'box',
                  id: 'a-box-3',
                  yScaleID: 'y-axis-0',
                  yMin: 2.7,
                  yMax: 5,
                  backgroundColor: '#fe3232',
                },
              ],
            },
          };
        });
      }
    });

    this.dashboaService.monthBtnObs().subscribe((opt) => {
      if (opt == 'month') {
        this.monthProDate = [];
        this.monthProData = [];
        this.monthPasData = [];
        this.monthPasDate = [];
        this.monthDetData = [];
        this.monthDetDate = [];
        this.dashboaService.getChartData('2').subscribe((res) => {
          if (res && res.graphDateList && res.graphDateList.length > 1) {
            res.graphDateList.forEach((element) => {
              if (element.graphDate && !element.graphCount) {
                this.monthProDate.push(element.graphDate);
                this.monthProData.push(0);
                this.monthPasData.push(0);
                this.monthDetData.push(0);
              } else {
                this.monthProDate.push(element.graphDate);
                this.monthProData.push(element.graphCount);
                this.monthPasData.push(element.promoCount);
                this.monthDetData.push(element.detractCount);
              }
            });
          }
          this.chartData = [
            {
              data: this.monthProData,
              label: 'Promoters',
              fill: true,
            },
            {
              data: this.monthPasData,
              label: 'Passives',
              fill: true,
            },
            {
              data: this.monthDetData,
              label: 'Detractors',
              fill: true,
            },
          ];
          this.chartLabels = this.monthProDate;
          this.chartColors = [
            {
              backgroundColor: 'rgba(60,179,113,0.5)',
              borderColor: 'rgba(60,179,113,1)',
            },
            {
              backgroundColor: 'rgba(239,130,13,0.5)',
              borderColor: 'rgba(239,130,13,1)',
            },
            {
              backgroundColor: 'rgba(220,20,60,0.5)',
              borderColor: 'rgba(220,20,60,1)',
            },
          ];
          this.chartOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    stepSize: 3,
                  },
                },
              ],
            },
            maintainAspectRatio: false,
            annotation: {
              drawTime: 'beforeDatasetsDraw',
              annotations: [
                {
                  type: 'box',
                  id: 'a-box-1',
                  yScaleID: 'y-axis-0',
                  yMin: 0,
                  yMax: 1,
                  backgroundColor: '#4cf03b',
                },
                {
                  type: 'box',
                  id: 'a-box-2',
                  yScaleID: 'y-axis-0',
                  yMin: 1,
                  yMax: 2.7,
                  backgroundColor: '#fefe32',
                },
                {
                  type: 'box',
                  id: 'a-box-3',
                  yScaleID: 'y-axis-0',
                  yMin: 2.7,
                  yMax: 5,
                  backgroundColor: '#fe3232',
                },
              ],
            },
          };
        });
      }
    });
  }
}
