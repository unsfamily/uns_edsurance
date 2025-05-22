import React from "react";
import CountUp from "react-countup";

const stats = [
  { end: 1000, label1: "Electronic", label2: "Books", bg: "bg-success" },
  { end: 5, label1: "Educational", label2: "Software", bg: "bg-primary" },
  { end: 100, label1: "Mentorship", label2: "Programs", bg: "bg-secondary" },
  { end: 100, label1: "Industry", label2: "Partnership", bg: "bg-warning" },
];

const StatsGrid = () => {
  return (
    <div className="row pt-3 mx-0">
      {stats.map(({ end, label1, label2, bg }, index) => (
        <div className="col-6 col-md-3 px-1 mb-3 mb-md-0" key={index}>
          <div className={`${bg} text-center p-2 h-100`}>
            <h2 className="text-white">
              <CountUp end={end} duration={3} /> +
            </h2>
            <h6 className="text-uppercase text-white">
              {label1} <span className="d-block">{label2}</span>
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
