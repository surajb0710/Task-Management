import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [language, setLanguage] = useState('general');

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [
          {
            label: 'Tasks',
            data: [1, 2, 1.5, 2.5, 2, 1.8, 2.2],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#000',
            borderWidth: 2,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#3b82f6',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            max: 3,
            ticks: {
              stepSize: 1,
              color: '#6b7280',
            },
            grid: {
              display: false,
            },
          },
          x: {
            ticks: {
              color: '#6b7280',
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => '2 Task',
              label: () => '',
            },
            displayColors: false,
            backgroundColor: '#111827',
            titleColor: '#fff',
            bodyColor: '#fff',
            xAlign: 'center',
            yAlign: 'bottom',
            caretPadding: 10,
            caretSize: 5,
            cornerRadius: 4,
            padding: 8,
          },
          legend: {
            display: false,
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  console.log('language', language);

  return (
    <div className="bg-[#F5F5F7] p-4 rounded-lg grow ">
      <div className="flex justify-between mb-5">
        <p className="text-base font-semibold text-[#141522]">Activity</p>
        <div className="flex justify-between border border-[#F5F5F7] rounded-[10px]">
          <select
            name="language"
            id="language"
            defaultValue="English"
            onClick={handleLanguageChange}
            className="w-full text-[12px] font-medium text-[#141522]"
          >
            <option value="this-week">This week</option>
            <option value="last-week">Last week</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>
      </div>
      <div className="bg-white p-4 rounded-[10px] max-h-[130px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default LineChart;
