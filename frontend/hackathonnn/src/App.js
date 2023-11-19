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
  const [sortby, setSortby] = useState();
  const handleChangeKpgzs = useCallback((newKpgzs) => {
    setKpgzs(newKpgzs);
  }, []);
  
  const handleChangeSortBy = useCallback((newSortBy) => {
    setSortby(newSortBy);
  }, []);

  const handleChangeInn = useCallback((newInn) => {
    setInn(newInn);
  }, []);

  const refreshFilters = useCallback(() => {
    setFilters({ kpgzs, inn, sortby });
  }, [kpgzs, inn, sortby]);

  return (
    <div className="App">
      <Search
        filters={filters}
        onChange={handleChangeInn}
        onClickSearch={refreshFilters}
      />
      <Box display="flex" flexDirection="row">
        <Filter filters={filters} onChangeKpgz={handleChangeKpgzs} onChangeSortBy={handleChangeSortBy}/>
        <ListItems filters={filters} />
      </Box>
    </div>
  );
}

export default App;
