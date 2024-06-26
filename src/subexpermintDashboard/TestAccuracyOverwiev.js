import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import textToJsonObject from "../ToJsonData";

const TestAccuracyOverwiev = ({ path, jsonSubexperiment, theme }) => {
  const [historyMetric, setHistoryMetric] = useState(null);

  const newPath = `/machine-learning-dashboard${path}history.jsonl`;

  useEffect(() => {
    const historyData = async () => {
      const response = await fetch(newPath);

      const text = await response.text();
      const historyMetric = textToJsonObject(text);
      setHistoryMetric(historyMetric);
    };
    historyData();
  }, [newPath]);

  if (!historyMetric || !newPath) return null;

  const modelsName = historyMetric
    .filter((metric) => metric.experiment === jsonSubexperiment.name)
    .map((metric) => metric.model);
  const uniqueModelsName = modelsName.filter(
    (model, index) => modelsName.indexOf(model) === index
  );

  const metricData = uniqueModelsName.map((model) => {
    const metricModel = historyMetric.filter(
      (metric) =>
        metric.model === model &&
        metric.experiment === jsonSubexperiment.name &&
        metric.test_accuracy !== undefined
    );
    const modelDate = metricModel.map((metric) => metric.date);
    const testAccuracy = metricModel.map((metric) => metric.test_accuracy);

    return {
      model,
      date: modelDate,
      test: testAccuracy,
    };
  });

  const data = metricData.map((metricModel) => ({
    x: metricModel.date,
    y: metricModel.test,
    mode: "markers+text",
    type: "scatter",
    name: `${metricModel.model} `,
  }));
  const layout = {
    title: `Test Accuracy of Each Model in ${jsonSubexperiment.name} by Date`,
    font: { color: theme.palette.primary.font },
    xaxis: { title: "Date" },
    yaxis: { title: "Validation Accuracy" },
    autosize: true,
    responsive: true,
    width: "100%",
    height: "100%",
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    margin: { l: 60, r: 300, b: 50, t: 70 },
  };

  return <Plot data={data} layout={layout} />;
};

export default TestAccuracyOverwiev;
