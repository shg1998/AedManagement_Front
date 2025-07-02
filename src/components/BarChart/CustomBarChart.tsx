import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Paper, Box } from '@mui/material';
import { useThemeContext } from "../../ThemeContext";

interface DataPoint {
    name: string;
    pass: number;
    fail: number;
    trend: number;
}

const default_data: DataPoint[] = [
    { name: 'Shahrivar', pass: 3, fail: 1, trend: 4 },
    { name: 'Mehr', pass: 4, fail: 1, trend: 5 },
    { name: 'Aban', pass: 5, fail: 2, trend: 7 },
    { name: 'Azar', pass: 5, fail: 0, trend: 5 },
    { name: 'Dey', pass:  7, fail: 1, trend: 8 },
    { name: 'Bahman', pass: 10, fail: 2, trend: 12 },
    { name: 'Esfand', pass: 13, fail: 1, trend: 14 },
    { name: 'Farvardin', pass: 17, fail: 3, trend: 20 },
    { name: 'Ordibehesht', pass: 19, fail: 3, trend: 22 },
    { name: 'Khordad', pass: 22, fail: 2, trend: 24 },
];

interface CustomBarChartProps {
    data: DataPoint[];
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({data = default_data}) => {
    const { themeMode } = useThemeContext();

    const chartColors = themeMode === 'dark'
        ? {
            backgroundColor: '#333',
            passColor: '#4caf50',
            failColor: '#f44336',
            trendLineColor: '#ff9800',
            textColor: '#fff',
            tooltipBackgroundColor: '#444',
            paperBackgroundColor: '#222',
        }
        : {
            backgroundColor: '#fafafa',
            passColor: '#2e7d32',
            failColor: '#e53935',
            trendLineColor: '#ff9800',
            textColor: '#333',
            tooltipBackgroundColor: '#ffffff',
            paperBackgroundColor: '#fafafa',
        };

    const options = {
        chart: {
            type: 'column',
            backgroundColor: chartColors.backgroundColor,
            height: 450,
            spacingTop: 40,
            spacingBottom: 40,
        },
        title: {
            text: 'Data from 1403-1404',
            style: {
                color: chartColors.textColor,
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
            },
        },
        xAxis: {
            categories: data.map(item => item.name),
            labels: {
                style: {
                    color: chartColors.textColor,
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            },
            title: {
                text: 'Months',
                style: {
                    color: chartColors.textColor,
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            },
        },
        yAxis: [
            {
                title: {
                    text: 'Number of Tests',
                    style: {
                        color: chartColors.textColor,
                        fontSize: '14px',
                        fontWeight: 'bold',
                    },
                },
                labels: {
                    style: {
                        color: chartColors.textColor,
                    },
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: chartColors.textColor,
                    },
                },
                min: 0,
                stacking: 'normal', // For stacked columns
            },
            {
                title: {
                    text: 'Trend of Tests',
                    style: {
                        color: chartColors.textColor,
                        fontSize: '14px',
                        fontWeight: 'bold',
                    },
                },
                labels: {
                    style: {
                        color: chartColors.textColor,
                    },
                },
                opposite: true,
            },
        ],
        tooltip: {
            backgroundColor: chartColors.tooltipBackgroundColor,
            style: {
                color: chartColors.textColor,
                fontSize: '14px',
            },
            shared: true,
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
            layout: 'horizontal',
            itemStyle: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: chartColors.textColor,
            },
        },
        series: [
            {
                name: 'Pass',
                data: data.map(item => item.pass),
                color: chartColors.passColor,
                tooltip: {
                    valueSuffix: ' tests',
                },
            },
            {
                name: 'Fail',
                data: data.map(item => item.fail),
                color: chartColors.failColor,
                tooltip: {
                    valueSuffix: ' tests',
                },
            },
            {
                name: 'SelfTest Trend',
                type: 'line',
                data: data.map(item => item.trend),
                color: chartColors.trendLineColor,
                lineWidth: 3,
                marker: {
                    symbol: 'circle',
                    radius: 4,
                    color: chartColors.trendLineColor,
                    fillColor: chartColors.textColor,
                },
                tooltip: {
                    valueSuffix: ' trend',
                },
            },
        ],
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Paper sx={{ width: 'inherit', height: 595, padding: 2, backgroundColor: chartColors.paperBackgroundColor }}>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Paper>
        </Box>
    );
};

export default CustomBarChart;
