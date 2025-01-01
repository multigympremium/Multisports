import Select from "react-select";

const ReactSelect = ({ formatGroupLabel, options, onChange, selectOption }) => (
  <Select
    defaultValue={selectOption}
    options={options}
    value={selectOption}
    formatGroupLabel={formatGroupLabel}
  onChange={onChange}
  />
);

export default ReactSelect;
