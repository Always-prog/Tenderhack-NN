import React, { useCallback, useState } from "react";
import Search from "./components/search";
import SupersetEmbedded from "./components/superset";
import Filter from "./components/filter";
import ListItems from "./components/listItem";
import { Box } from "@mui/material";

function App() {
  const [filters, setFilters] = useState({});
  const [kpgzs, setKpgzs] = useState();
  const [inn, setInn] = useState();
  const handleChangeKpgzs = useCallback(
    (newKpgzs) => {
      setKpgzs(newKpgzs)
    },
    []
  );

  const handleChangeInn = useCallback(
    (newInn) => {
      setInn(newInn);
    },
    []
  );

  const refreshFilters = useCallback(() => {
    setFilters({kpgzs, inn})
  }, [kpgzs, inn])

  return (
    <div className="App">
      <Search filters={filters} onChange={handleChangeInn} onClickSearch={refreshFilters}/>
      <Box display="flex" flexDirection="row">
        <Filter filters={filters} onChange={handleChangeKpgzs} />
        <ListItems filters={filters} />
      </Box>
      {/* <SupersetEmbedded supplier_inn={7720518494} /> */}
    </div>
  );
}

export default App;
