import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
// import { AutoSizer } from 'react-virtualized';
import demoData from './demodata';

export default ({ data, keys, indexBy }) => (
  <ResponsiveRadar
    // height={height || 300}
    // width={width}
    data={data || demoData}
    keys={keys || ['chardonay', 'carmenere', 'syrah']}
    indexBy={indexBy || 'taste'}
    maxValue={100}
    margin={{
      top: 70, right: 0, bottom: 70, left: 110
    }}
    curve="linearClosed"
    borderWidth={2}
    borderColor={{ from: 'color' }}
    gridLevels={5}
    gridShape="circular"
    gridLabelOffset={36}
    enableDots
    dotSize={6}
    // dotColor={{ theme: 'background' }}
    // dotColor={{ from: 'color' }}
    dotColor="#fff"
    dotBorderWidth={3}
    dotBorderColor={{ from: 'color' }}
    enableDotLabel
    dotLabel="value"
    dotLabelYOffset={-12}
    colors={{ scheme: 'nivo' }}
    fillOpacity={0.25}
    blendMode="multiply"
    animate
    motionStiffness={90}
    motionDamping={15}
    isInteractive
    legends={[
      {
        anchor: 'top-left',
        direction: 'column',
        translateX: -90,
        translateY: -40,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: '#999',
        symbolSize: 12,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000'
            }
          }
        ]
      }
    ]}
  />
);
