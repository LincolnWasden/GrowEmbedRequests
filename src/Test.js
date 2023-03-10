import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

function Form() {
    const [metrics, setMetrics] = useState([]);
    const [apiToken, setApiToken] = useState("");
    const [showMetricTitleInput, setShowMetricTitleInput] = useState(false); // the reason we need this is because we want to show the metric title input only after the user has entered the api token
    const [selectedMetrics, setSelectedMetrics] = useState([]); //the reason we need this is because we want to store the selected metrics in an array
    const [metricUrls, setMetricUrls] = useState([]); // the reason we need this is because we want to store the metric urls in an array
    const [searchQuery, setSearchQuery] = useState(""); // the reason we need this is because we want to store the search query in a state

}