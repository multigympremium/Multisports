import { useEffect, useRef, useState } from "react";

import moment from "moment";
import ReportFilterBtn from "./ReportFilterBtn/ReportFilterBtn";
import TransactionSummery from "../TransactionSummery/TransactionSummery";
import InvoiceSummery from "../InvoiceSummery/InvoiceSummery";

const startYear = 2000;
const endYear = new Date().getFullYear();

const yearsArray = [];

for (let year = startYear; year <= endYear; year++) {
  yearsArray.push(year);
}

const monthsArray = [
  { name: "January", value: "01" },
  { name: "February", value: "02" },
  { name: "March", value: "03" },
  { name: "April", value: "04" },
  { name: "May", value: "05" },
  { name: "June", value: "06" },
  { name: "July", value: "07" },
  { name: "August", value: "08" },
  { name: "September", value: "09" },
  { name: "October", value: "10" },
  { name: "November", value: "11" },
  { name: "December", value: "12" },
];

function ReportFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate = () => {},
  setIsSubmit = () => {},
  setReceiver = () => {},
  summary = {},
  setTimeFrame = () => {},
  receivers = {},
  setSearch = () => {},
  search = "",
  setIsAddFilterWithSearch = () => {},
  isAddFilterWithSearch = false,
  method_summary = [],
  summary_type = "",
  cumulativeBalance = {},
}) {
  const currentMonth = moment().format("MM");
  const currentYear = moment().format("YYYY");

  const [tabIndex, setTabIndex] = useState(0);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [detectSearch, setDetectSearch] = useState("");
  const [isAddFilter, setIsAddFilter] = useState(false);

  const transaction_types = [
    { value: "Male", name: "Male" },
    { value: "Female", name: "Female" },
    { value: "Others", name: "Others" },
  ];

  const filterDate = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const start_date = e.target.start_date;
    const end_date = e.target.end_date;
    const receiver = e.target.receiver;
    const search = e.target.search;
    const addFilter = e.target.addFilter;

    if (search) {
      setSearch(search?.value);
    }
    if (addFilter) {
      setIsAddFilterWithSearch(addFilter?.checked);
    }

    if (start_date) {
      setStartDate(start_date?.value);
      setEndDate(start_date?.value);
    }

    if (tabIndex === 0) {
      setTimeFrame("daily");
    } else {
      setTimeFrame("monthly");
    }
    setReceiver(receiver?.value);
  };

  useEffect(() => {
    if (month && year) {
      const firstDate = `${year}-${month}-01`;
      const lastDateNumber = new Date(year, month, 0).getDate();
      const end_Date = `${year}-${month}-${lastDateNumber}`;
      setStartDate(firstDate);
      setEndDate(end_Date);
    }
  }, [month, year, setStartDate, setEndDate]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const lastDateNumber = new Date(currentYear, currentMonth, 0).getDate();
    if (tabIndex === 1) {
      setTimeFrame("monthly");
      setStartDate(`${currentYear}-${currentMonth + 1}-01`);
      setEndDate(`${currentYear}-${currentMonth + 1}-${lastDateNumber}`);
    } else {
      setTimeFrame("daily");
      setStartDate(moment().format("YYYY-MM-DD"));
      setEndDate(moment().format("YYYY-MM-DD"));
    }
    setReceiver("");
  }, [tabIndex, setTimeFrame, setStartDate, setEndDate, setReceiver]);
  return (
    <div className="col-span-1 space-y-5  rounded-xl  md:sticky md:top-0 md:left-0">
      <form
        className="space-y-4 bg-white shadow p-4 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="text-lg font-medium leading-6 text-gray-900 border-b pb-4 flex items-center gap-5">
          <ReportFilterBtn
            isActive={tabIndex === 0}
            onClick={() => setTabIndex(0)}
          >
            Filter By Date
          </ReportFilterBtn>
          <ReportFilterBtn
            isActive={tabIndex === 1}
            onClick={() => setTabIndex(1)}
          >
            Filter By Month
          </ReportFilterBtn>
        </div>
        <input
          type="text"
          placeholder="Search By Name"
          className="md:p-3 p-2 focus:border-gray-300 border rounded-xl outline-none w-full"
          name="search"
          value={detectSearch}
          onChange={(e) => {
            setDetectSearch(e.target.value);
          }}
        />

        {detectSearch.length >= 1 && (
          <div className="flex gap-4">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              id="addFilter"
              name="addFilter"
              checked={isAddFilter}
              onChange={(e) => setIsAddFilter(e.target.checked)}
            />
            <label htmlFor="addFilter" className="cursor-pointer">
              Add Filter
            </label>
          </div>
        )}

        {(detectSearch.length < 1 || isAddFilter) && (
          <>
            {tabIndex === 0 ? (
              <input
                type="date"
                className="border outline-none focus:border-gray-300 md:p-3 p-2 rounded-xl w-full "
                name="start_date"
                defaultValue={startDate}
                value={startDate}
                onChange={(e) => {
                  setStartDate(moment(e.target.value).format("YYYY-MM-DD"));
                  setEndDate(moment(e.target.value).format("YYYY-MM-DD"));
                }}
              />
            ) : (
              <>
                <div className={"w-full space-y-2 pt-2"}>
                  <select
                    className={`border outline-none md:p-3 p-2 rounded-xl w-full`}
                    name="transaction_type"
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {yearsArray.map((value, index) => {
                      return (
                        <option
                          value={value}
                          selected={new Date().getFullYear() === value}
                          key={index}
                        >
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={"w-full space-y-2 pt-2"}>
                  <select
                    className={`border outline-none md:p-3 p-2 rounded-xl w-full`}
                    name="transaction_type"
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {monthsArray.map((item, index) => {
                      return (
                        <option
                          value={item.value}
                          selected={
                            parseInt(new Date().getMonth() + 1) ===
                            parseInt(item.value)
                          }
                          key={index}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </>
            )}
          </>
        )}

        <button
          className="text-white w-full py-2  grid place-items-center rounded-xl  bg-neutral-800    hover:bg-neutral-700 hover:text-white  text-base md:text-xl  font-semibold transition-all duration-200 ease-in-out"
          type="submit"
        >
          View Report
        </button>
      </form>

      {summary_type === "transactions" ? (
        <TransactionSummery
          data={summary[0]}
          startDate={startDate}
          endDate={endDate}
          method_summary={method_summary}
          cumulativeBalance={cumulativeBalance}
        />
      ) : (
        <InvoiceSummery
          data={summary[0]}
          startDate={startDate}
          endDate={endDate}
          method_summary={method_summary}
          cumulativeBalance={cumulativeBalance}
        />
      )}
    </div>
  );
}

export default ReportFilter;
