import React from 'react'
import PropTypes from 'prop-types'
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { withStyles } from '@material-ui/core'
import { trimText } from '~utils/strings'
import { formatThousands } from '~utils/numbers'

export function ResultsPerEndpointChart({ data, execution, theme }) {
  const { color, gridLine, font } = theme.palette.chart

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          bottom: 30,
          right: 0,
          left: 60,
        }}
        layout="vertical"
        barCategoryGap="20%"
        barGap={5}
        barSize={20}
      >
        <CartesianGrid strokeDasharray={gridLine.dash} stroke={gridLine.color} />
        <XAxis
          axisLine={{ strokeDasharray: gridLine.dash, stroke: gridLine.color }}
          scale="linear"
          type="number"
          tick={{ fill: font.color }}
          tickFormatter={formatThousands}
        />
        <YAxis
          axisLine={{ strokeDasharray: gridLine.dash }}
          dataKey="Name"
          name="Name"
          type="category"
          tickFormatter={label => trimText(label, 15)}
          tick={{ width: 130, fill: font.color }}
        />

        <Tooltip
          isAnimationActive={false}
          cursor={false}
          formatter={formatThousands}
        />

        <Bar
          stroke={color.area.secondary}
          fill={color.area.secondary}
          dataKey="# failures"
          name="Fail"
          stackId={1}
        />
        <Bar
          stroke={color.area.primary}
          fill={color.area.primary}
          dataKey="# successes"
          name="Success"
          stackId={1}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
ResultsPerEndpointChart.propTypes = {
  data: PropTypes.array,
  execution: PropTypes.object,
  theme: PropTypes.object.isRequired,
}

export default withStyles({}, { withTheme: true })(ResultsPerEndpointChart)