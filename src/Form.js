import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

function Form() {
  const [metrics, setMetrics] = useState([]);
  const [apiToken, setApiToken] = useState("");
  const [metricTitle, setMetricTitle] = useState("");
  const [metricId, setMetricId] = useState("");
  const [metricUrl, setMetricUrl] = useState("");
  const [showMetricTitleInput, setShowMetricTitleInput] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [metricUrls, setMetricUrls] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [addRequiredFilters, setAddRequiredFilters] = useState(false);

  useEffect(() => {
    if (apiToken !== "") {
      axios
        .get(`https://grow-embed-requests.vercel.app/api/embed/list/metric?token=${apiToken}`)
        .then((response) => {
          setMetrics(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [apiToken]);

  const handleApiTokenSubmit = (event) => {
    event.preventDefault();
    setApiToken(event.target.elements.apiToken.value);
    setShowMetricTitleInput(true);
  };

  const handleMetricSelect = (event) => {
    const metricId = parseInt(event.target.value);
    setSelectedMetrics((prevSelectedMetrics) => {
      if (prevSelectedMetrics.includes(metricId)) {
        return prevSelectedMetrics.filter((id) => id !== metricId);
      } else {
        return [...prevSelectedMetrics, metricId];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedMetrics([]);
    setMetricUrls([]);
    selectedMetrics.forEach((metricId) => {
      const config = addRequiredFilters ? { requiredFilters: true } : {};
      axios
        .post(
          `https://grow-embed-requests.vercel.app/api/embed/url/metric/${metricId}?token=${apiToken}`,
          { config }
        )
        .then((response) => {
          console.log(response.data);
          setMetricUrls((prevMetricUrls) => [
            ...prevMetricUrls,
            response.data.data,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const filteredMetrics = metrics.filter((metric) =>
    metric.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGetMetricIdClick = (event) => {
    event.preventDefault();
    const metric = metrics.find(
      (m) => m.title.toLowerCase() === metricTitle.toLowerCase()
    );
    if (metric) {
      setMetricId(metric.id);
    } else {
      setMetricId("");
      console.error(`Metric "${metricTitle}" not found`);
    }
  };

  const handleGetMetricUrlClick = (event) => {
    event.preventDefault();
    axios
      .post(
        `https://grow-embed-requests.vercel.app/api/embed/url/metric/${metricId}?token=${apiToken}`,
        { config: {} }
      )
      .then((response) => {
        console.log(response.data);
        setMetricUrl(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="form-container">
      <div className="form">
        <h1 className="form-heading">Metrics</h1>
        {!showMetricTitleInput && (
          <form onSubmit={handleApiTokenSubmit}>
            <label htmlFor="apiToken" className="form-label">
              API Token:
            </label>
            <input type="text" name="apiToken" id="apiToken" className="form-input" />
            <button type="submit" className="form-button">Submit</button>
          </form>
        )}
        {showMetricTitleInput && (
          <div className="form-metrics-container">
            <div className="form-metrics-background" />
            <h2 className="form-metrics-title">Select Metrics</h2>
            <input
              type="text"
              placeholder="Search metrics by title"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="form-metrics-search"
            />
            <div className="form-metrics-list">
              {filteredMetrics.map((metric) => (
                <div key={metric.id} className="form-metrics-item">
                  <label>
                    <input
                      type="checkbox"
                      value={metric.id}
                      checked={selectedMetrics.includes(metric.id)}
                      onChange={handleMetricSelect}
                    />
                    <span className="form-metrics-text">{metric.title}</span>
                  </label>
                  {selectedMetrics.includes(metric.id) && (
                    <span className="form-metrics-selected">
                      Selected
                      <span className="form-metrics-selected-icon">&#x2714;</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
            {selectedMetrics.length > 0 && metricUrls.length === 0 && (
              <form onSubmit={handleSubmit} className="form-url-container">
                <p className="form-text">Selected Metrics:</p>
                <div className="form-checkbox-container">
                  <label htmlFor="addFiltersCheckbox" className="form-checkbox-label">
                    Add required filters:
                    <input
                      type="checkbox"
                      id="addFiltersCheckbox"
                      checked={addRequiredFilters}
                      onChange={(event) =>
                        setAddRequiredFilters(event.target.checked)
                      }
                      className="form-checkbox"
                    />
                  </label>
                </div>
                <div className="form-checkbox-list">
                  {selectedMetrics.map((metricId) => {
                    const metric = metrics.find((m) => m.id === metricId);
                    return (
                      <div key={metric.id}>
                        <label>
                          <input type="checkbox" checked disabled />
                          <span className="form-checkbox-title">{metric.title}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="submit"
                  disabled={selectedMetrics.length === 0}
                  className="form-button"
                >
                  Get Metric URLs
                </button>
              </form>
            )}
            {metricUrls.length > 0 && (
              <div className="form-url-list">
                <h2 className="form-metrics-title">Metric URLs:</h2>
                <div>
                  {metricUrls.map((url) => (
                    <div key={url}>
                      <a href={url} className="form-link">{url}</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
  
  
  
  
}

export default Form;
