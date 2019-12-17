/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import ClassNames from 'classnames';
import './styles.scss';
// eslint-disable-next-line import/no-unresolved
import { BreedingRhombusSpinner } from 'react-epic-spinners';
import CanvasJSReact from '../../../../dist/lib/canvasjs-2.3.1/canvasjs.react';

import FileHelpers from '../../helpers/file';


const { CanvasJSChart } = CanvasJSReact;
const { download } = FileHelpers;

export default class extends Component {
  constructor(props) {
    super(props);
    this.dataPoints = [];
    this.state = {
      viewMode: 'day',
      time: new Date().getDate()
    };
    this.fetchCtr = new AbortController();
  }

  get device() {
    return this.props.device || '';
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(viewMode, time) {
    this.chart.options.data = [];
    this.chart.render();

    if (this.fetchPromise) {
      this.fetchCtr.abort();
      this.fetchCtr = new AbortController();
    }
    this.showSpiner();
    this.fetchPromise = fetch(
      `${this.props.dataEndpoint}/?viewMode=${viewMode
        || this.state.viewMode}&time=${time || this.state.time}`,
      {
        signal: this.fetchCtr.signal
      }
    )
      .then((response) => {
        delete this.fetchPromise;
        this.hideSpiner();
        return response.json();
      })
      .catch(() => {
        this.hideSpiner();
        delete this.fetchPromise;
      })
      .then((data) => {
        if (!data) return;
        if (data.length > 0 && data[0].records) {
          // const records = data[0].records;
          // for (let i=1; i < records; i++) {
          //   records[i] =
          // }
          // this.appendDataSerie(records, data[i].name);
          for (let i = 0; i < data.length; i++) {
            this.appendDataSerie(data[i].records, data[i].name, 'stackedArea');
          }
        } else {
          // const first = data.records[0];
          // const last = data.records[data.records.length - 1];
          // const max = parseFloat(data.max);
          // if (first != null && last != null && max != null) {
          //   this.appendDataSerie(
          //     [{ x: first.x, y: max }, { x: last.x, y: max }],
          //     'Max'
          //   );
          // }
          this.appendDataSerie(data.records, data.name);
        }
        this.chart.render();
      });
  }

  appendDataSerie(records, name, type = 'line') {
    const dataPoints = [];
    for (let i = 0; i < records.length; i++) {
      dataPoints.push({
        x: new Date(records[i].x),
        y: records[i].y
      });
    }
    const newDataSerie = {
      type,
      name,
      showInLegend: true,
      markerSize: 0,
      xValueFormatString: 'DD/MM/YY HH:mm',
      yValueFormatString: '#,##0.00 W',
      dataPoints
    };
    this.chart.options.data.push(newDataSerie);
  }

  exportData() {
    fetch(
      `${this.props.dataEndpoint}/export/${this.device}?viewMode=${this.state
        .viewMode || ''}&time=${this.state.time || ''}`
    )
      .then((response) => response.text())
      .then((data) => {
        download(data, `${this.device || 'all'}.csv`, 'text/csv');
      });
  }

  importData(e) {
    if (e.target.files.length <= 0) return;
    const formData = new FormData();
    for (const file of e.target.files) formData.append('filedata', file);
    fetch(`${this.props.dataEndpoint}/import/${this.device}`, {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', JSON.stringify(response)))
      .then(() => this.fetchData());
  }

  handleViewMode(viewMode) {
    let time = new Date();
    switch (viewMode) {
    case 'day':
      time = time.getDate();
      break;
    case 'week':
      time = 0;
      break;
    case 'month':
      time = time.getMonth() + 1;
      break;
    default:
      time = time.getDate();
      break;
    }
    this.setState({
      viewMode,
      time
    });
    this.fetchData(viewMode, time);
  }

  handleViewTime(time) {
    // < | > or [..]
    if (typeof time === 'number') {
      time = +this.state.time + +time;
    } else {
      time = +time.target.value;
    }
    if (this.state.viewMode !== 'week' && (time <= 0 || time >= 31)) return;
    this.setState({
      time
    });
    this.fetchData(this.state.viewMode, time);
  }

  showSpiner() {
    // eslint-disable-next-line no-undef
    $('#chart-spiner').addClass('show');
  }

  hideSpiner() {
    // eslint-disable-next-line no-undef
    $('#chart-spiner').removeClass('show');
  }

  render() {
    const options = {
      title: {
        text: this.props.title
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'top',
        horizontalAlign: 'center',
        dockInsidePlotArea: true,
        itemclick: (e) => {
          if (
            typeof e.dataSeries.visible === 'undefined'
            || e.dataSeries.visible
          ) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          this.chart.render();
        }
      },
      zoomEnabled: true,
      animationEnabled: true,
      data: []
    };

    return (
      <React.Fragment>
        <div className="row">
          <div className="btn-group m-2" role="toolbar" aria-label="View Mode">
            <button
              type="button"
              className={ClassNames(
                'btn btn-primary waves-effect waves-light',
                { active: this.state.viewMode === 'day' }
              )}
              onClick={this.handleViewMode.bind(this, 'day')}
            >
              Day
            </button>
            <button
              type="button"
              className={ClassNames(
                'btn btn-primary waves-effect waves-light',
                { active: this.state.viewMode === 'week' }
              )}
              onClick={this.handleViewMode.bind(this, 'week')}
            >
              Week
            </button>
            <button
              type="button"
              className={ClassNames(
                'btn btn-primary waves-effect waves-light',
                { active: this.state.viewMode === 'month' }
              )}
              onClick={this.handleViewMode.bind(this, 'month')}
            >
              Month
            </button>
          </div>

          <div
            className="btn-group my-2 ml-3 py-1"
            role="toolbar"
            aria-label="View Mode"
          >
            <button
              type="button"
              className="btn btn-primary btn-sm waves-effect waves-light"
              onClick={this.handleViewTime.bind(this, -1)}
            >
              &lt;
            </button>
            <input
              id="time-input"
              type="number"
              min="1"
              max="31"
              step="1"
              value={this.state.time}
              className="text-center"
              onChange={this.handleViewTime.bind(this)}
            />
            <button
              type="button"
              className="btn btn-primary btn-sm waves-effect waves-light"
              onClick={this.handleViewTime.bind(this, 1)}
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="row" style={{ position: 'relative' }}>
          <CanvasJSChart options={options} onRef={(ref) => { this.chart = ref; }} />
          <div
            id="chart-spiner"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              pointerEvents: 'none'
            }}
            className="d-flex justify-content-center align-items-center fade show"
          >
            <BreedingRhombusSpinner color="#4285f4" size={75} />
          </div>
        </div>

        <div className="row">
          <button
            type="button"
            className="btn btn-sm btn-primary morpheus-den-gradient waves-effect waves-light"
            onClick={this.exportData.bind(this)}
          >
            Export
          </button>
          <button type="button" className="btn p-0 btn-sm btn-primary ripe-malinka-gradient waves-effect waves-light">
            <label
              htmlFor="import-file"
              className="m-0"
              style={{ padding: '.5rem 1.6rem', cursor: 'pointer' }}
            >
              Import
              <input
                id="import-file"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={this.importData.bind(this)}
                accept=".csv"
              />
            </label>
          </button>
        </div>
      </React.Fragment>
    );
  }
}
