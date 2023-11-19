import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../constants";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

export default function CompareGroup() {
  const { inns } = useParams();
  const search = useLocation().search;
  const kpgzs = new URLSearchParams(search).get("kpgzs");
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch(
      `${baseUrl}/compare/bygroup?inns=${inns}${
        kpgzs ? "&" + "kpgzs=" + kpgzs : ""
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        setResponse(json);
      });
  }, []);

  return (
    <div>
      {response ? (
        <div>
          КПГЗ: {kpgzs}
          <br />
          {response.map((supplier) => (
            <Card sx={{ minWidth: 275, marginTop: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  ИНН: {supplier.inn}
                </Typography>
                <Typography variant="body2">
                  Цена: {supplier.avg_price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="loading">Загрузка...</div>
      )}
    </div>
  );
}

