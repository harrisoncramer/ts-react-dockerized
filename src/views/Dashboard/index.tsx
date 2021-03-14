import React, { ReactElement } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useQueryParam, StringParam } from "use-query-params";
import { SIMPLE_QUERY } from "../../graphql/queries";

import TextBox from "../../components/TextBox";

const Dashboard = (): ReactElement | null => {
  const [filter, setFilter] = useQueryParam("filter", StringParam);

  const { loading, error, data } = useQuery(SIMPLE_QUERY, {
    fetchPolicy: "no-cache",
  });
  if (error) return <div>Something wrong with server: ${error.message}</div>;

  const handleOnChange = (val: string): void => {
    setFilter(val);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <TextBox
        placeholder="Search..."
        word={filter || ""}
        callBack={handleOnChange}
      />
      <p>Welcome, {data.me.name}</p>
      <p>{filter}</p>
      <p>Data is {JSON.stringify(data)}</p>
    </div>
  );
};

export default Dashboard;
