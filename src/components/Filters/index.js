import filterSlice, {
  getFilter,
  searchPriorityThunk,
  searchStatusThunk,
  searchTextThunk,
} from "./FiltersSlice";
import { Col, Row, Input, Typography, Radio, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { Search } = Input;

export default function Filters() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState([]);

  const dispatch = useDispatch();

  const handleStatus = (e) => {
    dispatch(searchStatusThunk(e.target.value));
    // setStatus(e.target.value);
    // dispatch(filterSlice.actions.searchFilterStatus(e.target.value));
  };

  const handleSearch = (e) => {
    // setSearch(e.target.value);
    // dispatch(filterSlice.actions.searchFilterChange(e.target.value));
    dispatch(searchTextThunk(e.target.value));
  };

  const handlePriority = (e) => {
    dispatch(searchPriorityThunk(e));
    // dispatch(filterSlice.actions.searchFilterPriority(e));
  };

  useEffect(() => {
    dispatch(getFilter());
  }, [dispatch]);
  return (
    <Row justify="center">
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search onChange={handleSearch} placeholder="input search text" />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group onChange={handleStatus}>
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Todo">To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
          style={{ width: "100%" }}
          onChange={handlePriority}
        >
          <Select.Option value="High" label="High">
            <Tag color="red">High</Tag>
          </Select.Option>
          <Select.Option value="Medium" label="Medium">
            <Tag color="blue">Medium</Tag>
          </Select.Option>
          <Select.Option value="Low" label="Low">
            <Tag color="gray">Low</Tag>
          </Select.Option>
        </Select>
      </Col>
    </Row>
  );
}
