import React, { ReactElement } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useQueryParam, StringParam } from "use-query-params";
import { SIMPLE_QUERY } from "../../graphql/queries";

import TextBox from "../../components/TextBox";

const Dashboard = (): ReactElement | null => {
  const [filter, setFilter] = useQueryParam("filter", StringParam);

  const { loading, error, data, fetchMore } = useQuery(SIMPLE_QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something wrong with server: ${error.message}</div>;

  const handleOnChange = (val: string): void => {
    setFilter(val);
  };

  return (
    <div>
      <TextBox
        placeholder="Search..."
        word={filter || ""}
        callBack={handleOnChange}
      />
      <p>Welcome to the Dashboard page!</p>
      <p>{filter}</p>
      <p>Data is {JSON.stringify(data)}</p>
    </div>
  );
};

export default Dashboard;
