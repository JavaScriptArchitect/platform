import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog'; 

import { ChartsDataService } from './charts.service';

// echarts - lib: https://github.com/xieziyu/ngx-echarts
import { EchartsPageComponent } from './echarts/echarts-page.component';
import { NgxEchartsModule } from 'ngx-echarts';

// chart.js - lib: https://github.com/valor-software/ng2-charts
import { ChartsJsPageComponent } from './chartjs/chartjs-page.component';
import { NgChartsModule } from 'ng2-charts';

// ngx-charts - lib: https://swimlane.gitbook.io/ngx-charts/
import { NgxChartsPageComponent } from './ngx-charts/ngx-charts-page.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DynamicNgxComponent } from './dynamic-ngx/dynamic-ngx.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicPieComponent } from './dynamic-pie/dynamic-pie.component';
import { RealtimeChartComponent } from './real-time-chart/real-time-chart.component';
import { CustomDoughnutComponent } from './custom-doughnut/custom-doughnut.component';
import { DoughnutDialogComponent } from './doughnut-dialog/doughnut-dialog.component';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BarUploadComponent } from './bar-upload/bar-upload.component';
import { LineChartPopulationComponent } from './line-chart-population/line-chart-population.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { TopStocksService } from '../aws-bedrock/top-stocks.service';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { FormPieComponent } from './form-pie/form-pie.component';
import { UserPieComponent } from './user-pie/user-pie.component';
import { StockDragDropComponent } from './stock-drag-drop/stock-drag-drop.component';
import { StockUploadDragComponent } from './stock-upload-drag/stock-upload-drag.component';

export const chartsRoutes = [
  {
    path: '',
    redirectTo: 'echarts'
  },
  {
    path: 'echarts',
    component: EchartsPageComponent
  },
  {
    path: 'dynamic-bar',
    component: DynamicNgxComponent
  },
  {
    path: 'line-time',
    component: LineChartPopulationComponent
  },
  {
    path: 'dynamic-pie',
    component: DynamicPieComponent
  },
  {
    path: 'upload-file',
    component: FileUploadComponent
  },
  {
    path: 'bar-upload',
    component: BarUploadComponent
  },
  {
    path: 'dynamic-doughnut',
    component: CustomDoughnutComponent
  },
  {
    path: 'formPie',
    component: FormPieComponent
  },
  {
    path: 'user-pie',
    component: UserPieComponent
  },
  {
    path: 'stock-drag',
    component: StockDragDropComponent
  },
  {
    path: 'stock-upload-drag',
    component: StockUploadDragComponent
  },
  {
    path: 'bar-time',
    component: RealtimeChartComponent
  },
  {
    path: 'chart-js',
    component: ChartsJsPageComponent
  },
  {
    path: 'stockchart',
    component: StockChartComponent
  },
  {
    path: 'multistocks',
    component: StockDetailsComponent
  },
  {
    path: 'd3',
    component: NgxChartsPageComponent
  }
];

@NgModule({
  declarations: [
    EchartsPageComponent,
    ChartsJsPageComponent,
    NgxChartsPageComponent,
    DynamicNgxComponent,
    DynamicPieComponent,
    RealtimeChartComponent,
    CustomDoughnutComponent,
    DoughnutDialogComponent,
    ChartDialogComponent,
    FileUploadComponent,
    BarUploadComponent,
    LineChartPopulationComponent,
    StockChartComponent,
    StockDetailsComponent,
    FormPieComponent,
    UserPieComponent,
    StockDragDropComponent,
    StockUploadDragComponent
  ],

  providers: [
    ChartsDataService,
    TopStocksService
  ],

  imports: [
    RouterModule.forChild(chartsRoutes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'),
    }),
    NgChartsModule,
    NgxChartsModule
  ],
  entryComponents: [ ChartDialogComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartsModule { }
