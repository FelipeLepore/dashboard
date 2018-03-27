import { Component, OnInit } from '@angular/core';
import { DadosService } from './dados.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;

  constructor(private dadosService: DadosService) { }

  ngOnInit() {
    this.dadosService.obterDados().subscribe(
      dados =>  {
        this.dados = dados;
        this.init();
      }
    );
  }

  init(): void {
    if(typeof(google) !== 'undefined'){
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallBack(this.exibirGraficos());
      }, 500);
    }
  }

  exibirGraficos(): void {
    this.exibirPieChart();
    this.exibir3DPieChart();
    this.exibirDonutChart();
    this.exibirBarChart();
    this.exibirLineChart();
    this.exibirColumnChart();
  }

  exibirPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  exibir3DPieChart(): void {
    const el = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();
    opcoes['is3D'] = true;

    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirDonutChart(): void {
    const el = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();
    opcoes['pieHole'] = 0.4;

    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirBarChart(): void {
    const el = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(el);
    const opcoes = this.obterOpcoes();

    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirLineChart(): void {
    const el = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(el);
    const opcoes = this.obterOpcoes();

    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirColumnChart(): void {
    const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);
    const opcoes = this.obterOpcoes();

    chart.draw(this.obterDataTable(), opcoes);
  }

  obterDataTable(): void {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);
    console.log(data);
    return data;
  }

  obterOpcoes(): any {
    return{
      'title': 'Quantidade de cadastros primeiro semestre',
      'width': 400,
      'height': 300
    };
  }

}
