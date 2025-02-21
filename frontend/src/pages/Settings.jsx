import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getPendingTime } from '../utils/dateFormat.js';

import { getAllTasksApi } from '../api/apiService';

export default function Settings() {
  const [value, setValue] = React.useState('general');
  const [language, setLanguage] = React.useState('general');
  const [selectedValue, setSelectedValue] = React.useState('24');
  const [array, setArray] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasksApi();
      setArray(tasks);
    };
    fetchTasks();
  }, []);

  React.useEffect(() => {
    array.map((item) => {
      const pendingTime = getPendingTime(item.dueDate);
      console.log('pendingTime', pendingTime);
    });
  }, [array]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };
  console.log('lang', language);

  return (
    <div className="p-8 ml-[254px]">
      <Box sx={{ width: '100%', typography: 'body1' }} className="p-8 bg-white">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="General" value="general" />
              <Tab label="Notifications" value="notifications" />
            </TabList>
          </Box>
          <TabPanel value="general">
            <div className="mb-8">
              <label
                htmlFor="language"
                className="mb-4 block font-semibold text-sm text-[#141522]"
              >
                Language
              </label>
              <div className="px-5 py-4 w-100 flex justify-between border border-[#F5F5F7] rounded-[10px]">
                <select
                  name="language"
                  id="language"
                  defaultValue="English"
                  onClick={handleLanguageChange}
                  className="w-full"
                >
                  <option value="English">English (Default)</option>
                  <option value="German">German</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
            <div className="mb-8">
              <label
                htmlFor="timezone"
                className="mb-4 block font-semibold text-sm text-[#141522]"
              >
                Timezone
              </label>
              <div className="px-5 py-4 w-100 flex justify-between border border-[#F5F5F7] rounded-[10px]">
                <select
                  name="timezone"
                  id="timezone"
                  defaultValue="English"
                  onClick={handleLanguageChange}
                  className="w-full"
                >
                  <option value="English">English (Default)</option>
                  <option value="German">German</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
            <div className="mb-16">
              <label className="mb-4 block font-semibold text-sm text-[#141522]">
                Timezone
              </label>
              <div className="flex gap-8">
                <div
                  className={`${
                    selectedValue === '24' &&
                    'rounded-[10px] border border-[#546FFF]'
                  } px-5 py-4 flex gap-[64px]`}
                >
                  <label htmlFor="24">24 Hours</label>
                  <input
                    type="radio"
                    id="24"
                    value="24"
                    checked={selectedValue === '24'}
                    onChange={() => handleRadioChange('24')}
                  />
                </div>
                <div
                  className={`${
                    selectedValue === '12' &&
                    'rounded-[10px] border border-[#546FFF]'
                  } px-5 py-4 flex gap-[64px]`}
                >
                  <label htmlFor="12">12 Hours</label>
                  <input
                    type="radio"
                    id="12"
                    value="12"
                    checked={selectedValue === '12'}
                    onChange={() => handleRadioChange('12')}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="px-[60px] py-[12px] bg-[#546FFF] rounded-[10px] text-white font-semibold text-sm"
            >
              Save Changes
            </button>
          </TabPanel>
          <TabPanel value="notifications">Notifications</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
